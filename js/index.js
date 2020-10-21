let datas = [];
let filteredDatas = []
let personsToDraw = []
let began = false;
let jointure = false;
let first = true;
let etatJointure = true;
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
        let filterName = e.target.id
        let filterValue = e.target.name
        let isChecked = e.target.checked
        etatJointure = isJointure()
        // console.log(isChecked, etatJointure)
        if(isChecked && etatJointure === false){
            console.log("jointure desactivé bite")
            personsToDraw = []
            addFilters(filterName, filterValue)
            personsToDraw = pushPersonsToDraw(personsToDraw, datas)
            console.log(personsToDraw)
            drawResponse(personsToDraw)
        } else if(etatJointure === false) {
            console.log("jointure desactivé bite2")
            personsToDraw = []
            removeFilters(filterName, filterValue)
            personsToDraw = pushPersonsToDraw(personsToDraw, datas)
            console.log(personsToDraw)
            drawResponse(personsToDraw)
        } else if(etatJointure === true && isChecked){
            // isFiltersActivated()
            // console.log("y'a t'il au moins un filtre activé ? : ", isFiltersActivated())
            // Si on décide de faire des ET dans les filtres
            // console.log('au moins un filtre activé')
            addFilters(filterName, filterValue)
            personsToDraw = pushWithJointures(datas)
            console.log(personsToDraw)
            drawResponse(personsToDraw)
        } else if (etatJointure === true){
            // Quand j'enlève un filtre et que la jointure est à true.
            removeFilters(filterName, filterValue)
            personsToDraw = []
            personsToDraw = pushWithJointures(datas)
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
        c.fillStyle = `rgba(155, 0, 0, 1)`;
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
                    // console.log("nom filtre: ", datas[i][filterNames])
                    // console.log("valeur filtre: ", filterValues)
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

function pushWithJointures(datas){
    let personsWaiting = []
    let isFirstFilter = true
    for(filterNames in filters){
        for(filterValues in filters[filterNames]){
            // console.log(filters[filterNames][filterValues])
            if(filters[filterNames][filterValues] === true && isFirstFilter){
                // console.log("nom filtre: ", datas[i][filterNames])
                // console.log("valeur filtre: ", filterValues)
                for(let i = 0; i < datas.length; i++){
                    if(datas[i][filterNames] === filterValues){
                        let present
                        present = isPresent(personsWaiting, datas, i)
                        if(present === false){
                            personsWaiting.push(datas[i])
                        }
                    }
                }
                // console.log('premières personnes ajoutées : ', personsWaiting)
                isFirstFilter = false
            } else if (filters[filterNames][filterValues] === true){
                for(let i = 0; i < personsWaiting.length; i++){
                    if(personsWaiting[i][filterNames] === filterValues){
                        // let present
                        // present = isPresent(personsWaiting, datas, i)
                        // if(present === false){
                        //     personsWaiting.push(personsWaiting[i])
                        // }
                        // console.log("ezoezezz")
                    } else {
                        console.log("personne supprimée : ", personsWaiting[i])
                        personsWaiting.splice(i, 1)
                    }
                }
            }
        }
    }
    return personsWaiting
}

function isFiltersActivated(){
    let filtersActivated = false
    console.log(filters)
    for(filterNames in filters){
        for(filterValues in filters[filterNames]){
            // console.log(filters[filterNames]," : ", filters[filterNames][filterValues])
            if(filters[filterNames][filterValues] === true){
                filtersActivated = true
            }
        }
    }
    return filtersActivated
}

function isJointure(){
    let choix = document.querySelector("h1");
    let classes = choix.classList;
    choix.onclick = function() {
        etatJointure = classes.toggle("c");
    }
    return etatJointure
}

