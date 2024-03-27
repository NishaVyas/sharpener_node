const path = require('path');

const express = require('express');

const router = express.Router();

// /admin/add-product => GET
router.get('/contact_us', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'contact_us.html'));
});

// /admin/add-product => POST
router.post('/success', (req, res, next) => {
  console.log(req.body);
  res.send('Form successfuly filled');
});

module.exports = router;
