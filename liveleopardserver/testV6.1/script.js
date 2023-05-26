function buttOn(){
    let state = 'toggle';
    let topic = "woonkamer/schemerlamp";

    fetch('http://192.168.0.100:8000/api/set', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'topic': topic,
            'feature': {'state': state } 
        })
    })

    .then(res => res.json())
    .then(data => console.log(data))

    document.querySelector('#toggle').onclick = (e) =>  {
        const state = 'toggle';
        const button_topic = document.querySelector('#toggle');
        const topic = button_topic.value;
    }
}