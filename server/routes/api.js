const router = require("express").Router();
const query = require("../../db/query.js");

/**
 * @param {String} req.params.token Returns events that fit specificed users avilability and preferences. Accepted values (Google OAuth token)
 * @param {String} req.params.day Returns only events for a specific day. Accepted values (today, tomorrow, tomorrow++)
 * @param {Number} req.params.limit Returns only a specific number of events. Accepted values (1-100)
 */
router.get("/getEvents", (req, res) => {
  query
    .getAllEvents()
    .then(response => {
      res.json({ events: response.rows });
    })
    .catch(console.log);
});

module.exports = router;
