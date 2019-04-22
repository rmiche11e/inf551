import pandas, json, requests

health = pandas.read_csv('demo_data.csv')
health_json = health.to_json(orient='records')
url = 'https://inf551-5220d.firebaseio.com/patients.json'
response = requests.put(url, health_json)
