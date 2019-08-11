const db = require("./db.js");

/**
 * @param {String} name - The screen name of the user.
 */
const getAllEvents = () => {
  const query = {
    name: "test",
    text: `SELECT e.name, e.description, e.url, e.img, e.venue, e.location, e.time_start, 
            e.time_end, e.price_min, e.price_max, c.name AS category FROM experiences e 
            LEFT OUTER JOIN categories c ON e.category_id=c.id`,
    values: []
  };

  return db.query(query);
};

const getAllCategories = () => {
  const query = {
    name: "Categories",
    text: "SELECT * FROM Categories",
    values: []
  };

  return db.query(query);
};

const getAllAPISources = () => {
  const query = {
    name: "APISources",
    text: "SELECT * FROM api",
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

const addNewAPISource = source => {
  const query = {
    name: "addNewAPISource",
    text: "INSERT INTO api (name) VALUES ($1) ON CONFLICT (name) DO NOTHING",
    values: [source]
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
    text:
      "INSERT INTO experiences (name, source_api_id, experience_api_id, description, url, img, venue, location, time_start, time_end, price_min, price_max, category_id) VALUES ($1, (SELECT id FROM api WHERE name=$2), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, (SELECT id FROM categories WHERE name=$13))",
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

module.exports = {
  getAllEvents,
  getAllCategories,
  addEvent,
  addNewCategory,
  addNewAPISource,
  getAllAPISources
};
