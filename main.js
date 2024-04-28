const socket = io();
var canvas;
var myName = "";
var socketid = "";
var globalData;
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
const IMG_SIZE = 256;
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

// function initUI(data) {
//     const divImg = document.createElement("div");
//     const imgGu = document.createElement("img");
//     imgGu.src = "./gu.png";
//     imgGu.style.background = colorToText(data.color);

//     const imgChoki = document.createElement("img");
//     imgChoki.src = "./choki.png";
//     imgChoki.style.background = colorToText(data.color);

//     const imgPa = document.createElement("img");
//     imgPa.src = "./pa.png";
//     imgPa.style.background = colorToText(data.color);

//     buttonGu    = document.createElement("button");
//     buttonChoki = document.createElement("button");
//     buttonPa    = document.createElement("button");
    
//     buttonGu.appendChild(imgGu)
//     buttonChoki.appendChild(imgChoki)
//     buttonPa.appendChild(imgPa)
    
//     divImg.appendChild(buttonGu);
//     divImg.appendChild(buttonChoki);
//     divImg.appendChild(buttonPa);

//     document.body.appendChild(divImg);
//     buttonGu.addEventListener("click", (e) => {
//         junkenNumber = 1;
//     });

//     buttonChoki.addEventListener("click", (e) => {
//         junkenNumber = 2;
//     });

//     buttonPa.addEventListener("click", (e) => {
//         junkenNumber = 3;
//     });

// }

socket.on("initUserData", (data) => {
    globalData = data;

    document.getElementById("gu").style.background = colorToText(data.color);
    document.getElementById("choki").style.background = colorToText(data.color);
    document.getElementById("pa").style.background = colorToText(data.color);
});

socket.on("junkenpon", (data) => {
    console.log(data);
    for (const junken of data.junkenpon) {
        if (junken.junken == 1) {
            ctx.fillStyle = "black";
            ctx.font = "48px serif";
            ctx.fillText(junken.name, 0, 300);
            ctx.fillStyle = colorToText(junken.color);
            ctx.fillRect(0, 0, IMG_SIZE, IMG_SIZE);            
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
            img.src = "./gu.png";
        }
        if (junken.junken == 2) {
            ctx.fillStyle = "black";
            ctx.font = "48px serif";
            ctx.fillText(junken.name, 0, 300);
            ctx.fillStyle = colorToText(junken.color);
            ctx.fillRect(0, 0, IMG_SIZE, IMG_SIZE);            
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
            img.src = "./choki.png";
        }
        if (junken.junken == 3) {
            ctx.fillStyle = "black";
            ctx.font = "48px serif";
            ctx.fillText(junken.name, 0, 300);
            ctx.fillStyle = colorToText(junken.color);
            ctx.fillRect(0, 0, IMG_SIZE, IMG_SIZE);            
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            };
            img.src = "./pa.png";
        }
    }

    // for (const junken of data.junkenpon) {
    //     if (junken.junken == 1) {
    //         const div = document.createElement("div");
    //         div.style.display = "flex";
    //         div.style.flexDirection = "column";
    //         div.style.justifyContent = "center";
    //         div.style.alignItems = "center";
    //         const imgGu = document.createElement("img");
    //         imgGu.src = "./gu.png";
    //         imgGu.style.background = colorToText(junken.color);
    //         const userName = document.createElement("h2");
    //         userName.textContent = junken.name;            
    //         div.appendChild(imgGu);
    //         div.appendChild(userName);
    //         document.body.appendChild(div);
    //     }
    //     if (junken.junken == 2) {
    //         const div = document.createElement("div");
    //         div.style.display = "flex";
    //         div.style.flexDirection = "column";
    //         div.style.justifyContent = "center";
    //         div.style.alignItems = "center";
    //         const imgChoki = document.createElement("img");
    //         imgChoki.src = "./choki.png";
    //         imgChoki.style.background = colorToText(junken.color);
    //         const userName = document.createElement("h2");
    //         userName.style.alignItems = "center";
    //         userName.textContent = junken.name;
    //         div.appendChild(imgChoki);
    //         div.appendChild(userName);
    //         document.body.appendChild(div);
    //     }
    //     if (junken.junken == 3) {
    //         const div = document.createElement("div");
    //         div.style.display = "flex";
    //         div.style.flexDirection = "column";
    //         div.style.justifyContent = "center";
    //         div.style.alignItems = "center";
    //         const imgPa = document.createElement("img");
    //         imgPa.src = "./pa.png";
    //         imgPa.style.background = colorToText(junken.color);
    //         const userName = document.createElement("h2");
    //         userName.style.alignItems = "center";
    //         userName.textContent = junken.name;
    //         div.appendChild(imgPa);
    //         div.appendChild(userName);
    //         document.body.appendChild(div);
    //     }
    // }
});

socket.on("finish", (data) => {
});
