const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.render('index.html', { title: 'Home' });
});

module.exports = router;
