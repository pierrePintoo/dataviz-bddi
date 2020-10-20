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
        let personsToDraw = []
        if(isChecked){
            began = true
            addFilters(constraintName, constraintValue)
            personsToDraw = pushPersonsToDraw(personsToDraw, datas)
            console.log(personsToDraw)
            drawResponse(personsToDraw)
        } else {
            removeFilters(constraintName, constraintValue)
            personsToDraw = pushPersonsToDraw(personsToDraw, datas)
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
        "H": false,
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

function pushPersonsToDraw(personsToDraw, datas) {
    for(let i = 0; i < datas.length; i++){
        for(filterNames in filters){
            for(filterValues in filters[filterNames]){
                // console.log(filters[filterNames][filterValues])
                if(filters[filterNames][filterValues] === true){
                    console.log("bite")
                    console.log("nom filtre: ", datas[i][filterNames])
                    console.log("valeur filtre: ", filterValues)
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

function isPresent(newPersons, datas, indexData){
    let present = false
    for(let i = 0; i < newPersons.length; i++){
        if(newPersons[i]["id"] === datas[indexData]["id"]){
            present = true
        }
    }
    return present
}