"""Generate a current, hourly cached MASAR homepage using saved model parameters."""
from datetime import datetime
from zoneinfo import ZoneInfo
from pathlib import Path
import os
import subprocess
import sys
import tempfile
import threading

ROOT = Path(__file__).resolve().parent
_LOCK = threading.Lock()
_CACHE = {'key': None, 'html': None}

def homepage():
    key = datetime.now(ZoneInfo('Asia/Riyadh')).strftime('%Y-%m-%dT%H')
    with _LOCK:
        if _CACHE['key'] == key and _CACHE['html'] is not None:
            return _CACHE['html']
        with tempfile.TemporaryDirectory(prefix='masar-') as directory:
            output = Path(directory) / 'index.html'
            subprocess.run([sys.executable, str(ROOT/'studio/build.py'), str(output),
                            '--site-url', 'https://trafficvision-jazan.onrender.com/'],
                           cwd=ROOT, check=True, timeout=65,
                           env={**os.environ, 'OPENBLAS_NUM_THREADS':'1'},
                           stdout=subprocess.DEVNULL)
            html = output.read_bytes()
        _CACHE.update(key=key, html=html)
        return html
