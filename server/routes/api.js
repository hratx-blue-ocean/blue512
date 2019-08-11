const router = require('express').Router();
const query = require('../../db/query.js')
// const ticketMaster = require('../sample.json');

router.get('/getAllEvents', (req, res) => {
    query.getAllEvents()
    .then(response => {
        res.json({events : response.rows});
    })
    .catch(console.log)
})

module.exports = router;