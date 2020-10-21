let datas = [];
let filteredDatas = []
let personsToDraw = []
let began = false;
let first = true;
let etatJointure = false;
let requestURL = '../datas_mercredi_midi.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    datas = request.response
    if(began === false){
        drawResponse(datas)
    }
    document.getElementById('validation').addEventListener("click", (e) => {
        let filterName = e.target.id
        let filterValue = e.target.name
        let isChecked = e.target.checked
        etatJointure = isJointure()
        listenFilters()
        // console.log(isChecked, etatJointure)
        if(etatJointure === false){
            // console.log("jointure desactivé bite")
            personsToDraw = []
            // addFilters(filterName, filterValue)
            personsToDraw = pushPersonsToDraw(personsToDraw, datas)
            console.log(personsToDraw)
            drawResponse(personsToDraw)
        } else if(etatJointure === true){
            console.log('jointure activé')
            // isFiltersActivated()
            // console.log("y'a t'il au moins un filtre activé ? : ", isFiltersActivated())
            // Si on décide de faire des ET dans les filtres
            // console.log('au moins un filtre activé')
            // addFilters(filterName, filterValue)
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
    "sexe": {
        "hommes": false,
        "femmes": false
    },
    "localisation": {
        "Campagne" : false,
        "Metropole" : false
    },
    "bac": {
        "S" : false,
        "ES": false,
        "L": false,
        "Techno": false,
        "Pro": false
    },
    "avenir_lycee": 
    {
        "Oui": false,
        "Non": false
    },
    "premiere_idee_etudes": {
        "Oui" : false,
        "Non" : false
    },
    "influences" : {
        "Personne": false,
        "Amis": false,
        "parents": false,
        "Autre": false
    },
    "reorientation" : {
        "Oui" : false,
        "Non" : false
    },
    "epanoui":{
        "Oui" : false,
        "Non" : false
    },
    "changement_etudes" : {
        "Oui" : false,
        "Non" : false
    },
    "reco_etudes" : {
        "Oui" : false,
        "Non" : false        
    },
    "jeux_videos" : {
        "Oui" : false,
        "Non" : false        
    },
    "vision_dix_ans" : {
        "CDI" : false,
        "Freelance" : false
    }
}    

function addFilters(name, value){
    filters[name][value] = true
}

function removeFilters(name, value){
    filters[name][value] = false
}

// Si la personne respecte AU MOINS un filtre. 
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
        if(newPersons[i]["Horodateur"] === datas[indexData]["Horodateur"]){
            present = true
        }
    }
    return present
}

// Si la personne respece ce filtre ET les autres filtres
function pushWithJointures(datas){
    let personsWaiting = []
    let finalPersons = []
    let isFirstFilter = true
    let firstFilter
    for(filterNames in filters){
        for(filterValues in filters[filterNames]){
            // console.log(filters[filterNames][filterValues])
            if(filters[filterNames][filterValues] === true && isFirstFilter){ // Si c'est filtre est le premier,  je teste toutes les personnes sous ce filtre
                // console.log("nom filtre: ", datas[i][filterNames])
                // console.log("valeur filtre: ", filterValues)
                for(let i = 0; i < datas.length; i++){
                    if(datas[i][filterNames] === filterValues){
                        // console.log("fais une premiere fois", filterValues)
                        personsWaiting.push(datas[i])
                        // console.log('tab en attente : ', personsWaiting)
                    }
                }
                firstFilter = filterValues
                // console.log('premières personnes ajoutées : ', personsWaiting)
                isFirstFilter = false
            } else if (filters[filterNames][filterValues] === true){ // Si le filtre est au moins le deuxième, je reprends le tableaux de personnes filtrées par les anciens filtres
                for(let y = 0; y < personsWaiting.length; y++){
                    if (personsWaiting[y][filterNames] === filterValues){
                        finalPersons.push(personsWaiting[y])
                    } 
                }
                personsWaiting = finalPersons
            }
        }
    }
    // console.log('premier filtre : ', firstFilter)
    // console.log('personnes finales : ', personsWaiting)
    return finalPersons
}

function pushToDraw(datas){
    let personsWaiting = []
    let finalPersons = []
    for(filterNames in filters){
        for(filterValues in filters[filterNames]){
            // console.log(filters[filterNames][filterValues])
            if(filters[filterNames][filterValues] === true){ // Si c'est filtre est le premier,  je teste toutes les personnes sous ce filtre
                // console.log("nom filtre: ", datas[i][filterNames])
                // console.log("valeur filtre: ", filterValues)
                for(let i = 0; i < datas.length; i++){
                    if(datas[i][filterNames] === filterValues){
                        // console.log("fais une premiere fois", filterValues)
                        personsWaiting.push(datas[i])
                        console.log('personne ajoutée : ', datas[i])
                    }
                }
            }
        }
    }
    // console.log('premier filtre : ', firstFilter)
    // console.log('personnes finales : ', personsWaiting)
    return personsWaiting
}


function isJointure(){
    let choix = document.querySelector("h1")
    let classes = choix.classList
    choix.onclick = function() {
        etatJointure = classes.toggle("c")
    }
    return etatJointure
}

function listenFilters(){
    let activatedFilters = []
    let inputs = []
    let options = []
    inputs = document.querySelectorAll("input")
    options = document.querySelectorAll("option")
    activatedFilters.push(inputs)
    activatedFilters.push(options)

    for(let j = 0; j < activatedFilters.length; j++){
        if(j == 0){
            // Si c'est un élément input radio
            for(let i = 0; i < activatedFilters[j].length; i++){
                console.log(activatedFilters[j])
                if(activatedFilters[j][i].checked){
                    filters[activatedFilters[j][i].attributes["name"].value][activatedFilters[j][i].attributes["value"].value] = true
                } else if (activatedFilters[j][i].checked === false){
                    filters[activatedFilters[j][i].attributes["name"].value][activatedFilters[j][i].attributes["value"].value] = false
                } 
            }
        } else if (j == 1){
            // Si c'est une boite option dans un select
            for(let i = 0; i < activatedFilters[j].length; i++){
                // console.log(filters)
                if(activatedFilters[j][i].selected){
                    if(filters[activatedFilters[j][i].parentNode.attributes["name"].value][activatedFilters[j][i].attributes["value"].value] == "ES"){
                        console.log('ha gros c\'est true')
                    }
                    filters[activatedFilters[j][i].parentNode.attributes["name"].value][activatedFilters[j][i].attributes["value"].value] = true
                } else if (activatedFilters[j][i].selected === false){
                    filters[activatedFilters[j][i].parentNode.attributes["name"].value][activatedFilters[j][i].attributes["value"].value] = false
                } 
            }
        }
    }

    console.log(filters)
}

// function pushOptimized(targetName, targetValue, datas){
//     let personsWaiting = []
//     let personsWaitingSave = []
//     let finalPersons = []
//     let firstTime = true
//     if(firstTime){
//         for(let i = 0; i < datas.length; i++){
//             if(datas[i][targetName] === targetValue){
//                 // console.log("fais une premiere fois", filterValues)
//                 personsWaiting.push(datas[i])
//                 // console.log('tab en attente : ', personsWaiting)
//             }
//         }
//         personsWaitingSave = personsWaiting
//         firstTime = false
//     } else {
//         for(let i = 0; i < personsWaiting.length; i++){
//             if(personsWaiting[i][targetName] === targetValue){
//                 // console.log("fais une premiere fois", filterValues)
//                 finalPersons.push(personsWaiting[i])
//                 // console.log('tab en attente : ', personsWaiting)
//             }
//         }
//         personsWaiting = finalPersons
//     }
// }