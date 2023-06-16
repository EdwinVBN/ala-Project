

// document.querySelector('#color').onclick = (e) =>  {
//     let color = document.getElementById("color-slider").value;
//     const state = 'toggle';
//     const button_topic = document.querySelector('#color');
//     const topic = button_topic.value;

//     payload = {
//         'topic': topic,
//         'feature': {"color":{"hex":`${color}`}}
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
