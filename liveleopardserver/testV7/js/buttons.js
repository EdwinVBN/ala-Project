document.getElementById('buttonOn').onclick = (e) =>  {
    const state = 'toggle';
    const button_topic = document.getElementById('buttonOn');
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
/*
document.querySelector('#buttonOff').onclick = (e) =>  {
    let color = document.getElementById("color-slider").value;
    const state = 'toggle';
    const button_topic = document.querySelector('#buttonOff');
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
}; */
