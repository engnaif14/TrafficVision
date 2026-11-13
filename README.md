# مسار | MASAR 4.0

Production: https://trafficvision-jazan.onrender.com/

## Run
`pip install -r requirements.txt` then `python app.py`.
Render: `gunicorn app:application --workers 1 --threads 2 --bind 0.0.0.0:$PORT --timeout 90`.

## Source
`studio/` contains the bilingual UI, map and scenario engine.
`studio_runtime.py` builds and caches a current homepage each hour using saved SARIMAX parameters. It does not retrain the model. Forecast means use a state recurrence checked against statsmodels for 24 hours. Matching Open-Meteo weather is refreshed in the browser. Longer weather and traffic are illustrative.
`masar_analysis.py` trains and evaluates SARIMA on uploaded hourly observations independently.

## Experiments and reports
Named experiments retain reference and scenario hourly snapshots in browser localStorage, maximum 12, with up to 6 selected for comparison. Same segment, window and source anchor are required. Prior windows remain readable as archived snapshots; they cannot be loaded for editing in a new window. Names and text are escaped before HTML rendering. PDF export uses a print layout and the browser Save as PDF dialog; maps and charts are vector. No server experiment database, user accounts, routing, engineering LOS, emissions or accident probability model is claimed.

## Release and rollback
Previous production commit: a0fbea86eee82bdda3b7ca591a03b1cff36b90ad.
Deploy this branch in Render. Roll back by selecting that prior successful deployment.

Developed by Naif, Ibrahim and Abdullah.
