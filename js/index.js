let datas = [];
let filteredDatas = []
let began = false;
let requestURL = '../datas-pour-tests.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    datas = request.response
    if(began === false){
        drawResponse(datas)
    }
    document.addEventListener("click", (e) => {
        let constraintName = e.target.id
        let constraintValue = e.target.name
        let isChecked = e.target.checked
        let persons = []
        let personsToDraw = []
        if(isChecked){
            began = true
            addFilters(constraintName, constraintValue)
            personsToDraw = pushPersonsToDraw(personsToDraw, constraintName, constraintValue)
            console.log(personsToDraw)
            drawResponse(personsToDraw)
            // for(let filterNameCount = 1; filterNameCount <= Object.keys(filters).length; filterNameCount++){
            //     for(let filterValueCount = 1; filterValueCount <= Object.keys(filters.localisation).length; filterValueCount++){
            //         if(filters[filterNameCount][filterValueCount] === true){

            //         }
            //     }
            // }
            // persons = addConstraint(datas.length, constraintName, constraintValue, datas)
            // console.log(persons)
        } else {
            removeFilters(constraintName, constraintValue)
            personsToDraw = pushPersonsToDraw(personsToDraw, constraintName, constraintValue)
            console.log(personsToDraw)
            drawResponse(personsToDraw)
        }
    })
  }

  let canvas = document.getElementById('canvas')
  let c = canvas.getContext('2d')  

function drawResponse(datas){
    initCanvas()
    drawAllPersons(datas)
}

function initCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  
    c.fillStyle = 'rgba(255,0,0,0.5)';
    c.fillRect( 0, 0, canvas.width, canvas.height);
    c.fill()
}

function getRandomIntBefore255(){
    let randomNumber = Math.floor(Math.random() * 255)
    return randomNumber
}

function drawAllPersons(datas){
    let x = 300
    let y = 100
    let r = 20
    let randomInt = 0
    for (let i = 0; i < datas.length; i++){
        if(x > canvas.width - 100){
            x = 300
            y += 50
        }
        c.beginPath()
        randomInt = getRandomIntBefore255()
        c.fillStyle = `rgba(${randomInt}, 0, 0, 1)`;
        c.arc(x, y, r, 0, Math.PI * 2)
        c.fill()
        c.closePath()
        x += 50
    }
}

let filters = {
    "localisation": {
        "Campagne" : false,
        "Métropole" : false
    },
    "sexe": {
        "M": false,
        "F": false
    },
    "bac": {
        "L" : false,
        "ES": false,
        "S": false
    },
    "avenir_lycee": 
    {
        "Oui": false,
        "Non": false
    },
    "premiere_idee": {
        "Oui" : false,
        "Non" : false
    }
}    

function addFilters(name, value){
    filters[name][value] = true
}

function removeFilters(name, value){
    filters[name][value] = false
}

let animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

function pushPersonsToDraw(personsToDraw, constraintName, constraintValue) {

    for(let i = 0; i < datas.length; i++){
        for(filterNames in filters){
            for(filterValues in filters[filterNames]){
                // console.log(filters[filterNames][filterValues])
                if(filters[filterNames][filterValues] === true){
                    if(datas[i][filterNames] === filterValues){
                        let present
                        present = isPresent(personsToDraw, datas, i)
                        if(present === false){
                            personsToDraw.push(datas[i])
                        }
                    }
                }
            }
        }
    }
    return personsToDraw
}
let present
for(filterNames in filters){
    for(filterValues in filterNames){
        if(filters[filterNames][filterValues] === true){
            if(datas[i][constraintName] === constraintValue){
                personsToDraw.push(datas[i])
                console.log(datas[i])
                nbPersons++
            }
        }
    }
}

function isPresent(newPersons, datas, k){
    let present = false
    for(let i = 0; i < newPersons.length; i++){
        // console.log('nouvelle pers id', newPersons[i]["id"])
        // console.log('id perso actuel', datas[k]["id"])
        if(newPersons[i]["id"] === datas[k]["id"]){
            present = true
        }
    }
    return present
}