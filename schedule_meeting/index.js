const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let scheduledMeetings = [];

function generateMeetingLink(timing) {
    return `http://your-meeting-link/${timing.replace(/ /g, '-').toLowerCase()}`;
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/schedule', (req, res) => {
    const { timing, name, email } = req.body;

    const existingMeeting = scheduledMeetings.find(meeting => meeting.timing === timing);
    if (existingMeeting) {
        return res.status(400).json({ error: `Meeting already scheduled for ${timing}` });
    }

    const meetingLink = generateMeetingLink(timing);

    const meeting = { timing, name, email, meetingLink };
    scheduledMeetings.push(meeting);

    res.json({ 
        message: `Meeting scheduled for ${timing} with ${name} (${email})`,
        meetingLink
    });
});

app.get('/meetings', (req, res) => {
    res.json(scheduledMeetings);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
