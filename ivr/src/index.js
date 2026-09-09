const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'IVR' });
});

app.post('/voice', (req, res) => {
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say language="en">Welcome to RYTHU SEVA. Agricultural Procurement Management System.</Say>
      <Say language="en">Plan your visit and skip the wait.</Say>
      <Say language="en">Press 1 for English, 2 for Telugu, 3 for Hindi.</Say>
      <Gather numDigits="1" action="/menu" method="POST" />
    </Response>
  `);
});

app.post('/menu', (req, res) => {
  const digit = req.body.Digits;
  const language = digit === '1' ? 'en' : digit === '2' ? 'te' : 'hi';
  
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say language="${language}">${getWelcomeMessage(language)}</Say>
    </Response>
  `);
});

function getWelcomeMessage(language) {
  const messages = {
    en: 'Main menu. Press 1 to add crop, 2 to book slot, 3 to check token.',
    te: 'ప్రధాన మెనూ',
    hi: 'मुख्य मेनू'
  };
  return messages[language] || messages.en;
}

const PORT = process.env.IVR_PORT || 5001;

app.listen(PORT, () => {
  console.log(`🎤 IVR System running on port ${PORT}`);
  console.log(`📱 RYTHU SEVA IVR - Phone Access`);
});

module.exports = app;
