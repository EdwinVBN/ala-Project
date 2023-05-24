// fetch('http://192.168.0.100:8000/api/set')
//     .then((r) => {return r.json();})
//     .then((data) => {console.log(data)})
const state = 'toggle';
const button_topic = document.querySelector('#toggle');
const topic = button_topic.value;

payload = {
    'topic': topic,
    'feature': {'state': state } };
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify( payload )
};

fetch('http://192.168.0.100:8000/api/set', options)
