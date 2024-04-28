const express = require('express')
const app = express()
const port = 3000
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const server = createServer(app)
const io = new Server(server)







app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/style.css")
})
app.get('/main.js', (req, res) => {
    res.sendFile(__dirname + "/main.js")
})
app.get('/gu.png', (req, res) => {
    res.sendFile(__dirname + "/gu.png")
})
app.get('/choki.png', (req, res) => {
    res.sendFile(__dirname + "/choki.png")
})
app.get('/pa.png', (req, res) => {
    res.sendFile(__dirname + "/pa.png")
})
app.get('/maru.png', (req, res) => {
    res.sendFile(__dirname + "/maru.png")
})
app.get('/aiko.png', (req, res) => {
    res.sendFile(__dirname + "/aiko.png")
})

var junkenArray = [];
var time = 0;
function allEmit() {
    time += 1;
    if (time == 1) {
        io.emit("timer", {time: time});
    }
    if (time == 2) {
        io.emit("timer", {time: time});
    }
    if (time == 3) {
        io.emit("timer", {time: time});
    }

    if (time == 4) {
        if (junkenArray.length <= 1) {
            junkenArray.push({junken: Math.floor(Math.random() * 3) + 1, name: "コンピュータ", socketid: 0, color: {r: Math.random(), g: Math.random(), b: Math.random()}});
        }
        io.emit("junkenpon", {time: time, junkenpon: junkenArray});
    }
    if (time == 5) {
        io.emit("finish", {time: time});
        junkenArray = [];
        time = 0;
    }
}
function timer() {
    setInterval(allEmit, 2000)
}

io.on('connection', (socket) => {
    console.log('a user connected')

    const color = {r: Math.random(), g: Math.random(), b: Math.random()};
    socket.emit("initUserData", {socketid: socket.id, color: color})

    socket.on("junken", (data) => {
        if (data.junken != 0) {
            junkenArray.push(data);
        }
    });
})

timer();




server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
