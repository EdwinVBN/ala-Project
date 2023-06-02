document.getElementById('toggle').onclick = (e) =>  {
    const state = 'toggle';
    const button_topic = document.getElementById('toggle');
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
};

document.querySelector('#color').onclick = (e) =>  {
    let color = document.getElementById("color-sliderf").value;
    const state = 'toggle';
    const button_topic = document.querySelector('#color');
    const topic = button_topic.value;

    payload = {
        'topic': topic,
        'feature': {"color":{"hex":`${color}`}}
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( payload )
    };
    
    fetch('http://192.168.0.100:8000/api/set', options)
};

// 233.2}
// woonkamer/schemerlamp: {"brightness":50,"color":{"x":0.7006,"y":0.2993},
// "color_mode":"xy","color_temp":160,"level_config":{"on_level":"previous"},"linkquality":255,
// "state":"ON","update":{"installed_version":587806257,"latest_version":587806257,