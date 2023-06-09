class Device {
    constructor(data) {
        this.name = data.friendly_name;
    }

    makeHtml(){
        const devicesTemplate = document.getElementById('dev-template');
        const devicesSection = devicesTemplate.content.cloneNode(true);

        const devName = devicesSection.querySelector("h1 #name");
        devName.innerHTML = this.name;

        return devicesSection;
    }    
    
}

class DeviceList {
    constructor() {
        this.devices = [];

        /*fetch("js/device.json")
            .then((res) => res.json())
            .then((items) => this.parse(items));*/
    }

    parse(items){
        for(let item of items){

            const device = new Device(item);
            this.devices.push(device);
        }

        this.show();
    }

    show(){
        const container = document.getElementById("devices");
        container.innerHTML = "";


    }
}

new DeviceList();

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

