const router = require("express").Router();
const query = require("../../db/query.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @param {String} req.params.ID Returns events that fit specificed users avilability and preferences. Accepted values (Google OAuth ID)
 * @param {String} req.params.day Returns only events for a specific day. Accepted values (today, tomorrow, tomorrow++)
 * @param {Number} req.params.limit Returns only a specific number of events. Accepted values (1-100)
 */
router.get("/events", (req, res) => {
  query
    .getAllEvents()
    .then(response => {
      res.json({ events: response.rows });
    })
    .catch(console.log);
});

router.post("/events", (req, res) => {
  verify(req.body.token)
    .then(data => {
      query
        .addNewUser(data)
        .then(_ => {
          let queries = req.body.calendar_items.map(item => {
            return query.addNewUnavailable({ user_id: data.id, ...item });
          });
          return Promise.all(queries);
        })
        .then(_ => query.getUserPreferences(data.id))
        .then(data => {
          const categories = data.rows.map(row => row.name);
          return query.getAllEventsExcludingCategories(categories);
        })
        .then(response => {
          res.json({ userInfo: data, events: response.rows });
        });
    })
    .catch(err => {
      console.log("CAUTION: ", err);
      query
        .getAllEvents()
        .then(response => {
          res.json({ events: response.rows });
        })
        .catch(console.log);
    });
});

router.get("/categories", async (req, res) => {
  const categories = await query
    .getAllCategories()
    .then(({ rows }) => rows.map(category => category.name));
  const { token } = req.body;
  if (!token) {
    res.send({ categories });
  } else {
    verify(token)
      .then(user => {
        query
          .getUserCategoryPreferences(user.id)
          .then(({ rows }) => res.send({ categories, userPreferences: rows }));
      })
      .catch(console.log);
  }
});

//Google Auth helper function
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  const id = payload["sub"];
  const email = payload["email"];
  const first_name = payload["given_name"];
  const last_name = payload["family_name"];
  const avatar_url = payload["picture"];
  return { id, email, first_name, last_name, avatar_url };
}

module.exports = router;
