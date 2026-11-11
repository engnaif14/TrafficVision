# مسار | MASAR

Traffic forecasting and scenario simulation for Jazan City.

Developed by Naif, Ibrahim, and Abdullah.

## Website

https://trafficvision-jazan.onrender.com

- Homepage — interactive Jazan map, weather scenarios, forecasts, and traffic exposure indicators.
- /lab — Excel and CSV forecasting laboratory.
- Scenario results — synchronized baseline comparison, hourly details, and CSV export.
- Scenario settings are retained within the same browser tab.

Traffic simulation uses illustrative historical data and assumed road capacities. The map is geographic OpenStreetMap data.

## Run locally

Install requirements.txt with Python 3.12, then run python app.py.

Render runs the WSGI application through Gunicorn using the existing render.yaml configuration.

The frontend source is embedded in index.html and lab.html. MASAR-Studio-Source.zip includes the separate Studio source files and model parameters.
