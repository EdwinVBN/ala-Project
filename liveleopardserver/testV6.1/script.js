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

