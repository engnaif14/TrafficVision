"""Build a portable, independent preview from MASAR's fitted simulation models."""
import argparse
import base64
import json
import os
import sys
from datetime import datetime, timedelta
from html import escape
from pathlib import Path
from urllib.parse import urlsplit

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import numpy as np
import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX
from jazan_model import ORDER, PARAMS_PATH, ROADS, SEASONAL_ORDER, TZ, exog, proxy_weather, synthetic_history

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("output", nargs="?", type=Path, default=ROOT / "studio-preview.html")
parser.add_argument("--site-url", help="Public HTTPS homepage URL for an index.html build")
args = parser.parse_args()
if args.site_url:
    url = urlsplit(args.site_url)
    if (url.scheme != "https" or not url.hostname or url.path not in ("", "/")
            or url.query or url.fragment or url.username or args.output.name != "index.html"):
        parser.error("--site-url requires an HTTPS homepage and an index.html output")

start = datetime.now(TZ).replace(minute=0, second=0, microsecond=0) + timedelta(hours=1)
hours = pd.date_range(start, periods=366 * 24, freq="h")
weather = proxy_weather(hours)
params = json.loads(PARAMS_PATH.read_text())["roads"]
data = {"start": start.isoformat(), "temp": weather.temperature_c.round(2).tolist(),
        "rain": weather.precipitation_mm.tolist(), "roads": {}}
for road in ROADS:
    series, past = synthetic_history(road, start, with_weather=True)
    coeffs = params[road["id"]]["weather_aware"]["params"]
    model = SARIMAX(series.to_numpy(), exog=exog(past.temperature_c, past.precipitation_mm),
                    order=ORDER, seasonal_order=SEASONAL_ORDER, trend="n",
                    enforce_stationarity=False, enforce_invertibility=False)
    fit = model.filter(coeffs)
    # Forecast means only: avoids propagating thousands of covariance matrices.
    state = fit.predicted_state[:, -1].copy()
    transition = model.ssm['transition']
    design = model.ssm['design'][0]
    baseline = np.empty(len(hours))
    for i in range(len(hours)):
        baseline[i] = design @ state
        state = transition @ state
    expected = np.asarray(fit.forecast(24, exog=np.zeros((24, 2))))
    if not np.allclose(baseline[:24], expected, atol=1e-6):
        raise ValueError('Forecast mean recurrence differs from SARIMAX')
    if not np.isfinite(baseline).all():
        raise ValueError(f"Invalid projection for {road['id']}")
    data["roads"][road["id"]] = {"baseline": baseline.round(3).tolist(), "coeffs": coeffs[:2]}
source = ROOT / "studio"
data["map"] = json.loads((source / "jazan-map.json").read_text())
html = (source / "page.html").read_text()
mark = (source / "masar-mark.svg").read_bytes()
icon = "data:image/svg+xml;base64," + base64.b64encode(mark).decode("ascii")
public_metadata = ""
favicon = icon
if args.site_url:
    site_url = args.site_url.rstrip("/") + "/"
    schema = {"@context": "https://schema.org", "@type": "WebSite",
              "name": "مسار", "alternateName": "MASAR", "url": site_url}
    schema_json = json.dumps(schema, ensure_ascii=False).replace("<", r"<")
    public_metadata = (
        f'<link rel="canonical" href="{escape(site_url)}">\n'
        f'<meta property="og:url" content="{escape(site_url)}">\n'
        f'<script type="application/ld+json">{schema_json}</script>'
    )
    favicon = "/masar-mark.svg"
    args.output.with_name("masar-mark.svg").write_bytes(mark)
for token, value in {"__MARK__": icon,
                     "__FAVICON__": favicon,
                     "__PUBLIC_METADATA__": public_metadata,
                     "__CSS__": (source / "style.css").read_text(),
                     "__JS__": (source / "studio.js").read_text(),
                     "__EXPERIENCE__": (source / "experience.js").read_text(),
                     "__DATA__": json.dumps(data, separators=(",", ":"))}.items():
    html = html.replace(token, value)
args.output.write_text(html)
