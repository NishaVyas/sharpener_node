// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Handle login and store username in local storage
app.post('/login', (req, res) => {
    const { username } = req.body;
    res.cookie('username', username); // Save username in cookie
    res.redirect('/');
});

// Serve main page with send message form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle sending message
app.post('/send-message', (req, res) => {
    const { message } = req.body;
    console.log("Received message:", message);
    const username = req.cookies.username;
    if (!username) {
        return res.status(400).send('Username not found');
    }
    const data = `${username}: ${message}\n`;
    fs.appendFile('messages.txt', data, (err) => {
        if (err) throw err;
        console.log('Message saved!');
        res.send('Message sent successfully');
    });
});

// Serve messages
app.get('/messages', (req, res) => {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading messages');
        }
        const messages = data.split('\n');
        res.json({ messages });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
