const router = require('express').Router();
const ticketMaster = require('../sample.json');
console.log(ticketMaster);

router.get('/', (req, res) => {
    res.json(ticketMaster._embedded)
})

module.exports = router;