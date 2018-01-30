const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line

// Routes for Sprint 3 Tin prototype
router.post('/protos/tuaad-sprint-3/tuaad-tin/2-details-deceased', function (req, res) {
  if (req.body['first-name-2']=='Alice'||req.body['first-name-2']=='alice'){ 
    res.redirect('/protos/tuaad-sprint-3/tuaad-tin/5-complete')
  } else if(req.body['first-name-2']=='Jane'||req.body['first-name-2']=='jane') { 
    res.redirect('/protos/tuaad-sprint-3/tuaad-tin/3-details-notifier')
  } else {
    res.redirect('/protos/tuaad-sprint-3/tuaad-tin/2b-details-deceased')
  }

})

router.post('/protos/tuaad-sprint-3/tuaad-tin/2b-details-deceased', function (req, res) {
  if (req.body['first-name-2']=='Alice'||req.body['first-name-2']=='alice'){ 
    res.redirect('/protos/tuaad-sprint-3/tuaad-tin/5-complete')
  } else if(req.body['first-name-2']=='Jane'||req.body['first-name-2']=='jane') { 
    res.redirect('/protos/tuaad-sprint-3/tuaad-tin/3-details-notifier')
  } else {
    res.redirect('/protos/tuaad-sprint-3/tuaad-tin/2b-details-deceased')
  }

})
// End routes for Sprint 3 Tin prototype

module.exports = router