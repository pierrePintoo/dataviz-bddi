let datas = [];
let requestURL = './datas.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    datas = request.response
    drawResponse(datas)
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
function getRandomInt(){
    return Math.floor(Math.random() * 255)
}


function drawAllPersons(datas){
    let x = 100
    let y = 100
    let r = 20
    for (let i = 0; i < datas.length; i++){
        x += 50
        if(x > canvas.width - 100){
            x = 100
            y += 50
        }
        c.beginPath()
        c.fillSyle = `rgba(${getRandomInt()}, 0, 0, 0)`;
        c.arc(x, y, r, 0, Math.PI * 2)
        c.fill()
        c.closePath()
    }
}