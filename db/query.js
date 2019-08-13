const db = require("./db.js");

const getAllEvents = () => {
  const query = {
    name: "getAllEvents",
    text: `SELECT e.name, e.description, e.url, e.img, e.venue, e.location, e.time_start, 
            e.time_end, e.price_min, e.price_max, c.name AS category FROM experiences e 
            LEFT OUTER JOIN categories c ON e.category_id=c.id`,
    values: []
  };

  return db.query(query);
};

const getAllEventsExcludingCategories = arrayOfCategories => {
  const buildConditional = length => {
    let str = "";
    if (!length) {
      return str;
    }
    str += "WHERE ";
    let i = 1;
    while (i <= length) {
      str += `c.name != $${i}`;
      if (i < length) {
        str += ` AND `;
      }
      i++;
    }
    return str;
  };

  const conditionalString = buildConditional(arrayOfCategories.length);

  const query = {
    text: `SELECT e.name, e.description, e.url, e.img, e.venue, e.location, e.time_start, 
              e.time_end, e.price_min, e.price_max, c.name AS category FROM experiences e 
              LEFT OUTER JOIN categories c ON e.category_id=c.id ${conditionalString}`,
    values: [...arrayOfCategories]
  };

  return db.query(query);
};

const getAllCategories = () => {
  const query = {
    name: "Categories",
    text: "SELECT name FROM Categories",
    values: []
  };

  return db.query(query);
};

const addNewCategory = category => {
  const query = {
    name: "addNewCategory",
    text:
      "INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
    values: [category]
  };

  return db.query(query);
};

const getUserCategoryPreferences = user_id => {
  const query = {
    name: "getUserCategoryPreferences",
    text:
      "SELECT c.name, uc.preferred FROM users_categories uc LEFT OUTER JOIN categories c ON uc.category_id=c.id WHERE user_id=$1",
    values: [user_id]
  };

  return db.query(query);
};

const changeUserCategoryPreference = data => {
  const { user_id, category, preferred } = data;
  const query = {
    name: "changeUserCategoryPreference",
    text:
      "INSERT INTO users_categories (user_id, category_id, preferred) VALUES ($1, (SELECT id FROM categories WHERE name=$2), $3)",
    values: [user_id, category, preferred]
  };

  return db.query(query);
};

const addNewAPISource = api => {
  const query = {
    name: "addNewAPISource",
    text: "INSERT INTO api (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
    values: [api]
  };

  return db.query(query);
};

const addEvent = event => {
  const {
    name,
    source_API,
    event_id,
    description,
    url,
    image,
    venue,
    location,
    time_start,
    time_end,
    price_min,
    price_max,
    category
  } = event;
  const query = {
    name: "addEvent",
    text: `INSERT INTO experiences (name, source_api_id, 
       experience_api_id, description, url, img, venue, 
       location, time_start, time_end, price_min, price_max, category_id) 
       VALUES ($1, (SELECT id FROM api WHERE name=$2), 
       $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 
      (SELECT id FROM categories WHERE name=$13))
      ON CONFLICT (experience_api_id) DO NOTHING`,
    values: [
      name,
      source_API,
      event_id,
      description,
      url,
      image,
      venue,
      location,
      time_start,
      time_end,
      price_min,
      price_max,
      category
    ]
  };

  return db.query(query);
};

const addNewUser = data => {
  const { id, first_name, last_name, email, avatar_url } = data;
  const query = {
    text:
      "INSERT INTO users (id, first_name, last_name, email, avatar_url) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING",
    values: [id, first_name, last_name, email, avatar_url]
  };

  return db.query(query);
};

const getUserData = id => {
  const query = {
    text: "SELECT * FROM users WHERE id = $1",
    values: [id]
  };

  return db.query(query);
};

// const getUserPreferences = id => {
//   const query = {
//     text:
//       "SELECT c.name FROM users_categories uc INNER JOIN categories c ON uc.category_id=c.id WHERE uc.user_id = $1",
//     values: [id]
//   };

//   return db.query(query);
// };
const addNewUnavailable = data => {
  const time_start = data.start.dateTime;
  const time_end = data.end.dateTime;
  const { user_id } = data;
  const item_id = data.id;

  const query = {
    text:
      "INSERT INTO unavailable (time_start, time_end, user_id, item_id) VALUES ($1, $2, $3, $4) ON CONFLICT (item_id) DO NOTHING",
    values: [time_start, time_end, user_id, item_id]
  };

  return db.query(query);
};

module.exports = {
  getAllEvents,
  getAllEventsExcludingCategories,
  getAllCategories,
  addEvent,
  addNewCategory,
  addNewAPISource,
  addNewUser,
  getUserData,
  addNewUnavailable,
  getUserCategoryPreferences
};
