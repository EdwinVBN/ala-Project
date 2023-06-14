/*const message = JSON.parse(e.data)
const msgTopic = message.topic;
const msgPayload = message.payload;
console.log('@onmessage')

function showName(){
    console.log('new dev');
}

if (msgTopic == 'devices') {
  // received info on all devices on the network, handle with care
  // just logging here
  msgPayload.forEach(showName());
  console.log(msgPayload);
} else {
  // received device update, handle with care
  // just loggin here
  console.log(msgTopic.devices)
} */


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
    let color = document.getElementById("color-slider").value;
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

// document.querySelector('#color').onclick = (e) =>  {
//     // let color = document.getElementById("color-slider").value;
//     // const state = 'toggle';
//     const button_topic = document.querySelector('#color');
//     const topic = button_topic.value;
    
//     function disco(kleur) {
//         const kleur = ['#8237e2', '#f3cc08', '#f00c63', '#c33587'];
//         const randomKleur = kleur[Math.floor(Math.random() * kleur.length)];
//     }

//     for (let i = 0; i < kleur.length; i++) {
//         disco(kleur) = kleur[i]; 
//     }

//     payload = {
//         'topic': topic,
//         'feature': {"color":{"hex":`${randomKleur}`}}
//     }
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify( payload )
//     };
    
//     fetch('http://192.168.0.100:8000/api/set', options)
// };
