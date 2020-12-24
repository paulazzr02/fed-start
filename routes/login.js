const express = require('express');
const router = express.Router();

/* GET about page */
router.get('/login', (req, res) => {
  res.render('login.html', { title: 'Login' });
});

module.exports = router;
