const socket = io();
var canvas;
var myName = "";
var socketid = "";
var globalData;
var finishData;
var junkenNumber = 0;
var buttonGu;
var buttonChoki;
var buttonPa;

function colorToText(mm) {
    let colorText = '#';
    let m1 = Math.floor(mm.r * 255 % 16);
    let m2 = Math.floor(mm.r * 255 / 16);
    if      (m1 == 10) { m1 = 'a'; }
    else if (m1 == 11) { m1 = 'b'; }
    else if (m1 == 12) { m1 = 'c'; }
    else if (m1 == 13) { m1 = 'd'; }
    else if (m1 == 14) { m1 = 'e'; }
    else if (m1 == 15) { m1 = 'f'; }
    if      (m2 == 10) { m2 = 'a'; }
    else if (m2 == 11) { m2 = 'b'; }
    else if (m2 == 12) { m2 = 'c'; }
    else if (m2 == 13) { m2 = 'd'; }
    else if (m2 == 14) { m2 = 'e'; }
    else if (m2 >= 15) { m2 = 'f'; }
    colorText += m2 + '' + m1;
    m1 = Math.floor(mm.g * 255 % 16);
    m2 = Math.floor(mm.g * 255 / 16);
    if      (m1 == 10) { m1 = 'a'; }
    else if (m1 == 11) { m1 = 'b'; }
    else if (m1 == 12) { m1 = 'c'; }
    else if (m1 == 13) { m1 = 'd'; }
    else if (m1 == 14) { m1 = 'e'; }
    else if (m1 == 15) { m1 = 'f'; }
    if      (m2 == 10) { m2 = 'a'; }
    else if (m2 == 11) { m2 = 'b'; }
    else if (m2 == 12) { m2 = 'c'; }
    else if (m2 == 13) { m2 = 'd'; }
    else if (m2 == 14) { m2 = 'e'; }
    else if (m2 >= 15) { m2 = 'f'; }
    colorText += m2 + '' + m1;
    m1 = Math.floor(mm.b * 255 % 16);
    m2 = Math.floor(mm.b * 255 / 16);
    if      (m1 == 10) { m1 = 'a'; }
    else if (m1 == 11) { m1 = 'b'; }
    else if (m1 == 12) { m1 = 'c'; }
    else if (m1 == 13) { m1 = 'd'; }
    else if (m1 == 14) { m1 = 'e'; }
    else if (m1 == 15) { m1 = 'f'; }
    if      (m2 == 10) { m2 = 'a'; }
    else if (m2 == 11) { m2 = 'b'; }
    else if (m2 == 12) { m2 = 'c'; }
    else if (m2 == 13) { m2 = 'd'; }
    else if (m2 == 14) { m2 = 'e'; }
    else if (m2 >= 15) { m2 = 'f'; }
    colorText += m2 + '' + m1;
    return colorText;
}  
const IMG_SIZE = 128;
var ctx;
window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);




    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0px";
    overlay.style.left = "0px";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "black";
    overlay.style.opacity = 0.5;
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";

    const centerPanel = document.createElement("div");
    centerPanel.style.width = "500px";
    centerPanel.style.height = "300px";
    centerPanel.style.background = "white";
    centerPanel.style.display = "flex";
    centerPanel.style.flexDirection = "column";
    centerPanel.style.justifyContent = "center";
    centerPanel.style.alignItems = "center";
    centerPanel.style.borderRadius = "20px";

    const input = document.createElement("input");
    input.style.width = "300px";
    input.style.height = "50px";
    input.style.fontSize = "30px";
    input.placeholder = "名前";
    const button = document.createElement("button");
    button.style.width = "200px";
    button.style.height = "50px";
    button.style.marginTop = "20px";
    button.style.fontSize = "30px";
    button.style.borderRadius = "20px";
    button.textContent = "決定";

    centerPanel.appendChild(input);
    centerPanel.appendChild(button);
    overlay.appendChild(centerPanel);
    document.body.appendChild(overlay);

    button.addEventListener("click", (e) => {
        myName = input.value;
        document.body.removeChild(overlay);
        overlay.remove();
    });

    document.getElementById("gu").addEventListener("click", (e) => {
        junkenNumber = 1;
    });
    document.getElementById("choki").addEventListener("click", (e) => {
        junkenNumber = 2;
    });
    document.getElementById("pa").addEventListener("click", (e) => {
        junkenNumber = 3;
    });
}

function junText() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "48px serif";
    ctx.fillText("ジャン", canvas.width / 2, canvas.height / 2);

}

function kenText() {
    ctx.fillStyle = "black";
    ctx.font = "48px serif";
    ctx.fillText("ケン", canvas.width / 2 + 150, canvas.height / 2);
}
function ponText() {
    ctx.fillStyle = "black";
    ctx.font = "48px serif";
    ctx.fillText("ポン", canvas.width / 2 + 300, canvas.height / 2);
}

socket.on("timer", (data) => {
    if (data.time == 1) {
        junText();
    } else if (data.time == 2) {
        kenText();
    } else if (data.time == 3) {
        ponText();
        console.log(junkenNumber);
        socket.emit("junken", {junken: junkenNumber, name: myName, socketid: globalData.socketid, color: globalData.color});
    }
});

socket.on("initUserData", (data) => {
    globalData = data;

    document.getElementById("gu").style.background = colorToText(data.color);
    document.getElementById("choki").style.background = colorToText(data.color);
    document.getElementById("pa").style.background = colorToText(data.color);
});
const NEXT_SIZE = 150;

const positions =[{x: 0, y: 0},            {x: NEXT_SIZE, y: 0},             {x: NEXT_SIZE * 2, y: 0},            {x: NEXT_SIZE * 3, y: 0},
                  {x: 0, y: NEXT_SIZE},    {x: NEXT_SIZE, y: NEXT_SIZE},     {x: NEXT_SIZE * 2, y: NEXT_SIZE},    {x: NEXT_SIZE * 3, y: NEXT_SIZE},
                  {x: 0, y: NEXT_SIZE * 2},{x: NEXT_SIZE, y: NEXT_SIZE * 2}, {x: NEXT_SIZE * 2, y: NEXT_SIZE * 2},{x: NEXT_SIZE * 3, y: NEXT_SIZE * 2},
                  {x: 0, y: NEXT_SIZE * 3},{x: NEXT_SIZE, y: NEXT_SIZE * 3}, {x: NEXT_SIZE * 2, y: NEXT_SIZE * 3},{x: NEXT_SIZE * 3, y: NEXT_SIZE * 3}
                ];

socket.on("junkenpon", (data) => {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    finishData = data;
    for (let i = 0; i < data.junkenpon.length; i++) {
        if (data.junkenpon[i].junken == 1) {
            ctx.fillStyle = "black";
            ctx.font = "24px serif";
            ctx.fillText(data.junkenpon[i].name, positions[i].x, positions[i].y + NEXT_SIZE);
            ctx.fillStyle = colorToText(data.junkenpon[i].color);
            ctx.fillRect(positions[i].x, positions[i].y, IMG_SIZE, IMG_SIZE);            
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, positions[i].x, positions[i].y);
            };
            img.src = "./gu.png";
        }
        if (data.junkenpon[i].junken == 2) {
            ctx.fillStyle = "black";
            ctx.font = "24px serif";
            ctx.fillText(data.junkenpon[i].name, positions[i].x, positions[i].y + NEXT_SIZE);
            ctx.fillStyle = colorToText(data.junkenpon[i].color);
            ctx.fillRect(positions[i].x, positions[i].y, IMG_SIZE, IMG_SIZE);            
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, positions[i].x, positions[i].y);
            };
            img.src = "./choki.png";
        }
        if (data.junkenpon[i].junken == 3) {
            ctx.fillStyle = "black";
            ctx.font = "24px serif";
            ctx.fillText(data.junkenpon[i].name, positions[i].x, positions[i].y + NEXT_SIZE);
            ctx.fillStyle = colorToText(data.junkenpon[i].color);
            ctx.fillRect(positions[i].x, positions[i].y, IMG_SIZE, IMG_SIZE);            
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, positions[i].x, positions[i].y);
            };
            img.src = "./pa.png";
        }
    }
});

socket.on("finish", (data) => {
    for (let k = 0; k < finishData.junkenpon.length; k++) {
        let gu = 0;
        let choki = 0;
        let pa = 0;
        for (let i = 0; i < finishData.junkenpon.length; i++) {
            if (finishData.junkenpon[i].junken == 1) {
                gu++;
            }
            if (finishData.junkenpon[i].junken == 2) {
                choki++;
            }
            if (finishData.junkenpon[i].junken == 3) {
                pa++;
            }
        }

        if (finishData.junkenpon.length == gu ||
            finishData.junkenpon.length == choki ||
            finishData.junkenpon.length == pa ||
            (gu >= 1 && choki >= 1 && pa >= 1)) {
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, positions[k].x, positions[k].y);
            };
            img.src = "./aiko.png";    
        } else if (choki == 0) {
            if (finishData.junkenpon[k].junken == 3) {
                const img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, positions[k].x, positions[k].y);
                };
                img.src = "./maru.png";
            }
        } else if (gu == 0) {
            if (finishData.junkenpon[k].junken == 2) {
                const img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, positions[k].x, positions[k].y);
                };
                img.src = "./maru.png";
            }
        } else if (pa == 0) {
            if (finishData.junkenpon[k].junken == 1) {
                const img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, positions[k].x, positions[k].y);
                };
                img.src = "./maru.png";
            }
        }
    }

});
