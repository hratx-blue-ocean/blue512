const router = require('express').Router();
const query = require('../../db/query.js');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const moment = require('moment');

/**
 * @param {String} req.params.ID Returns events that fit specificed users avilability and preferences. Accepted values (Google OAuth ID)
 * @param {String} req.params.day Returns only events for a specific day. Accepted values (today, tomorrow, tomorrow++)
 * @param {Number} req.params.limit Returns only a specific number of events. Accepted values (1-100)
 */
router.get('/events', (req, res) => {
  query
    .getAllEvents()
    .then(response => {
      res.json({ events: response.rows });
    })
    .catch(console.log);
});

router.post('/events', (req, res) => {
  const { calendar_items } = req.body;
  verify(req.body.token)
    .then(userData => {
      addNewCategoriesAndAvailabilityToDatabase(userData, calendar_items)
        .then(_ => query.getAllEventsULTRAMODE(userData.id))
        .then(({ rows }) => res.json({ userInfo: userData, events: rows }));
    })
    .catch(err => {
      console.log('CAUTION: ', err);
      query
        .getAllEvents()
        .then(response => {
          res.json({ events: response.rows });
        })
        .catch(console.log);
    });
});

router.get('/categories', async (req, res) => {
  const { token } = req.query;
  verifyTokenAndSendUserCategories(token, res);
});

router.post('/categories', async (req, res) => {
  const { category, token, id, preferred } = req.body;
  if (id) {
    if (preferred === null) {
      query
        .deleteUserCategoryPreference(id)
        .then(_ => {
          verifyTokenAndSendUserCategories(token, res);
        })
        .catch(_ => {
          verifyTokenAndSendUserCategories(token, res);
        });
    } else {
      query
        .changeUserCategoryPreference({ id, category, preferred })
        .then(_ => {
          verifyTokenAndSendUserCategories(token, res);
        })
        .catch(_ => {
          verifyTokenAndSendUserCategories(token, res);
        });
    }
  } else {
    verify(token)
      .then(({ id }) => {
        query
          .addUserCategoryPreference({ user_id: id, category, preferred })
          .then(_ => {
            verifyTokenAndSendUserCategories(token, res);
          })
          .catch(_ => {
            verifyTokenAndSendUserCategories(token, res);
          });
      })
      .catch(console.log);
  }
});

router.get('/unavailable', (req, res) => {
  const { token } = req.query;
  verify(token).then(({ id }) => {
    query
      .getUserUnavailable(id)
      .then(({ rows }) => res.json(rows))
      .catch(_ => res.sendStatus(500));
  });
});

router.post('/unavailable', (req, res) => {
  const { token, name, time_start, time_end } = req.body;
  verify(token)
    .then(({ id }) =>
      query.addRecurringUnavailable(id, name, time_start, time_end)
    )
    .then(_ => res.sendStatus(202))
    .catch(_ => res.sendStatus(500));
});

router.delete('/unavailable', (req, res) => {
  const { item_id, token } = req.query;
  verify(token)
    .then(_ => query.deleteRecurringUnavailable(item_id))
    .then(_ => res.sendStatus(201))
    .catch(_ => res.sendStatus(500));
});

//Google Auth helper function
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  const id = payload['sub'];
  const email = payload['email'];
  const first_name = payload['given_name'];
  const last_name = payload['family_name'];
  const avatar_url = payload['picture'];
  return { id, email, first_name, last_name, avatar_url };
}

function addNewCategoriesAndAvailabilityToDatabase(userData, calendar_items) {
  return query.addNewUser(userData).then(_ => {
    let queries = calendar_items.map(item => {
      return query.addNewUnavailable({ user_id: userData.id, ...item });
    });
    return Promise.all(queries);
  });
}

async function verifyTokenAndSendUserCategories(token, res) {
  const categories = await query
    .getAllCategories()
    .then(({ rows }) => rows.map(category => category.name));
  if (!token) {
    res.send({ categories });
  } else {
    verify(token)
      .then(({ id }) => {
        query
          .getUserCategories(id)
          .then(({ rows }) => res.send({ categories, userPreferences: rows }));
      })
      .catch(_ => {
        res.send({ categories });
      });
  }
}

module.exports = router;
