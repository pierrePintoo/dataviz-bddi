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

function drawResponse(datas){
    console.log(datas)
}
