const express = require('express');
const router = express.Router();

/* GET about page */
router.get('/search', (req, res) => {
  res.render('search.html', { title: 'Search' });
});

module.exports = router;
