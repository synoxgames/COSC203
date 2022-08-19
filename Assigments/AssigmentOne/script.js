var colourDict = {
    "test" : '#69420B' 
};

let allBirds;

let englishNames = [];
let teReoNames = [];
let scienceNames = [];
let statusList = [];

function filterByName() {
    var name = document.getElementById('search').value;
    name = name.toLowerCase();
    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function getColour(type) {
    return colourDict[type];
}

function setUpDisplay(data) {
    return new Promise((resolve, reject) => {
         let birdStatus = document.getElementById('status');
        console.log("Hello "+data.length);

         for (let i = 0; i < data.length; i++) {
            
            let toAdd = "";

            englishNames.push(data[i].englishNames.toLowerCase());
            teReoNames.push(data[i].primary_name);
            scienceNames.push(data[i].scientific_name.toLowerCase());
            if (!statusList.includes(data[i].status)) {
                statusList.push(data[i].status);
                birdStatus.innerHTML += `<option value="${data[i].status}">${data[i].status}</option>`;
            }
         }
         resolve();
        }).catch(error => console.error(error));
}

function fetchData() {
    return fetch('./data/nzbird.json')
    .then (response => response.json())
    .then (data => {
        setUpDisplay(data);
        allBirds = data;
    }).catch(error => console.error(error));
}

const birdData = fetchData();