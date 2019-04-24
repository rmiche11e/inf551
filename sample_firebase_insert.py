import pandas, json, requests

health = pandas.read_csv('demo_data.csv')
health_json = health.to_json(orient='records')
url = 'https://inf551-5220d.firebaseio.com/patients.json'
response = requests.put(url, health_json)


weight = {"id": "1", "date": "22/4/2019", "time":"9:45:13", "weight":135}
weight_json = json.dumps(weight)
url = 'https://inf551-5220d.firebaseio.com/weight.json'
response = requests.post(url, weight_json)

heart_rate = {"id": "1", "date": "22/4/2019", "time":"9:45:13", "heart_rate":90}
heart_rate_json = json.dumps(heart_rate)
url = 'https://inf551-5220d.firebaseio.com/heartrate.json'
response = requests.post(url, heart_rate_json)

food = {"id": "1", "date": "22/4/2019", "time":"9:45:13", "food":"cookie", "serving_size":3}
food_json = json.dumps(food)
url = 'https://inf551-5220d.firebaseio.com/foodlog.json'
response = requests.post(url, food_json)

user = {2:{"name":"Lu Niu"}}
user_json = json.dumps(user)
url = 'https://inf551-5220d.firebaseio.com/users.json'
response = requests.put(url, user_json)

user = {"name":"Robyn Goldberg"}
user_json = json.dumps(user)
url = 'https://inf551-5220d.firebaseio.com/users/1.json'
response = requests.put(url, user_json)
