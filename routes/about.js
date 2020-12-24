const express = require('express');
const router = express.Router();

/* GET about page */
router.get('/about', (req, res) => {
  res.render('about.html', { title: 'About' });
});

module.exports = router;
