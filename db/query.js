const db = require('./db.js');
const uuid = require('uuid/v4');

const getAllEvents = () => {
  const query = {
    name: 'getAllEvents',
    text: `SELECT e.name, e.experience_api_id e.description, e.url, e.img, e.venue, e.location, e.time_start, 
            e.time_end, e.price_min, e.price_max, c.name AS category FROM experiences e 
            LEFT OUTER JOIN categories c ON e.category_id=c.id`,
    values: []
  };

  return db.query(query);
};

const getAllEventsULTRAMODE = id => {
  const query = {
    text: `SELECT e.name, e.experience_api_id, e.description, e.url, e.img, e.venue, e.location, e.time_start,
    e.time_end, e.price_min, e.price_max, c.name AS category
  FROM experiences e
    LEFT OUTER JOIN categories c ON e.category_id=c.id
  WHERE e.category_id!= ALL(SELECT id
    FROM categories
    WHERE id= 
      ANY(SELECT category_id
    FROM users_categories
    WHERE user_id=$1 AND preferred=false))
    AND not exists 
      (select 1
    from unavailable u
    where u.time_start <= e.time_start
      AND u.time_end >= e.time_start AND user_id=$1  AND u.recurring!=true LIMIT 1)
  ORDER BY e.category_id
  = ANY
  (SELECT id
  FROM categories
  WHERE id= 
      ANY(SELECT category_id
  FROM users_categories
  WHERE user_id=$1 AND preferred=true))
  DESC;`,
    values: [id]
  };

  return db.query(query);
};

const getAllCategories = () => {
  const query = {
    name: 'Categories',
    text: 'SELECT name FROM Categories',
    values: []
  };

  return db.query(query);
};

const addNewCategory = category => {
  const query = {
    name: 'addNewCategory',
    text:
      'INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
    values: [category]
  };

  return db.query(query);
};

const getUserCategories = user_id => {
  const query = {
    name: 'getUserCategories',
    text:
      'SELECT uc.id, c.name, uc.preferred FROM users_categories uc LEFT OUTER JOIN categories c ON uc.category_id=c.id WHERE user_id=$1',
    values: [user_id]
  };

  return db.query(query);
};

const addUserCategoryPreference = ({ user_id, category, preferred }) => {
  const query = {
    name: 'addNewUserCategoryPreference',
    text: `INSERT INTO users_categories (user_id, category_id, preferred) 
    VALUES ($1, (SELECT id FROM categories WHERE name=$2), $3)`,
    values: [user_id, category, preferred]
  };

  return db.query(query);
};

const changeUserCategoryPreference = ({ id, preferred }) => {
  const query = {
    name: 'changeUserCategoryPreference',
    text: 'UPDATE users_categories SET preferred=$2 WHERE id=$1',
    values: [id, preferred]
  };

  return db.query(query);
};

const deleteUserCategoryPreference = id => {
  const query = {
    name: 'deleteUserCategoryPreference',
    text: 'DELETE FROM users_categories WHERE id=$1',
    values: [id]
  };

  return db.query(query);
};

const addNewAPISource = api => {
  const query = {
    name: 'addNewAPISource',
    text: 'INSERT INTO api (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
    values: [api]
  };

  return db.query(query);
};

const addEvent = ({
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
}) => {
  const query = {
    name: 'addEvent',
    text: `INSERT INTO experiences (name, source_api_id, experience_api_id, description, url, img, venue, location, time_start, time_end, price_min, price_max, category_id) VALUES ($1, (SELECT id FROM api WHERE name=$2), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, (SELECT id FROM categories WHERE name=$13)) ON CONFLICT (experience_api_id) DO NOTHING`,
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

const addNewUser = ({ id, first_name, last_name, email, avatar_url }) => {
  const query = {
    text:
      'INSERT INTO users (id, first_name, last_name, email, avatar_url) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING',
    values: [id, first_name, last_name, email, avatar_url]
  };

  return db.query(query);
};

const getUserData = id => {
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id]
  };

  return db.query(query);
};

const getUserCategoryPreferences = (id, preferred) => {
  const query = {
    text:
      'SELECT c.name FROM users_categories uc INNER JOIN categories c ON uc.category_id=c.id WHERE uc.user_id = $1 AND uc.preferred=$2',
    values: [id, preferred]
  };

  return db.query(query);
};

const addUserExperience = (user_id, experience_id) => {
  experience_id = parseInt(experience_id);
  const query = {
    name: 'addUserExperience',
    text:
      'INSERT INTO users_experiences (user_id, experience_id) VALUES ($1, $2)',
    values: [user_id, experience_id]
  };

  return db.query(query);
};

const addNewUnavailable = data => {
  const time_start = data.start.dateTime;
  const time_end = data.end.dateTime;
  const { user_id } = data;
  const item_id = data.id;

  const query = {
    name: 'addNewUnavailable',
    text:
      'INSERT INTO unavailable (time_start, time_end, user_id, item_id) VALUES ($1, $2, $3, $4) ON CONFLICT (item_id) DO NOTHING',
    values: [time_start, time_end, user_id, item_id]
  };

  return db.query(query);
};

const getUserUnavailable = id => {
  const query = {
    name: 'getUserUnavailable',
    text: 'SELECT * FROM unavailable WHERE user_id=$1',
    values: [id]
  };

  return db.query(query);
};

const addRecurringUnavailable = (user_id, name, time_start, time_end) => {
  const query = {
    name: 'addRecurringUnavailable',
    text:
      'INSERT INTO unavailable (user_id, name, time_start, time_end, item_id, recurring) VALUES ($1, $2, $3, $4, $5, $6)',
    values: [user_id, name, time_start, time_end, uuid(), true]
  };

  return db.query(query);
};

const deleteRecurringUnavailable = item_id => {
  const query = {
    name: 'deleteRecurringUnavailable',
    text: 'DELETE FROM unavailable WHERE item_id=$1',
    values: [item_id]
  };

  db.query(query);
};

const deleteOldExperiences = () => {
  const query = {
    name: 'deleteOldExperiences',
    text: 'DELETE FROM experiences WHERE time_start < NOW()',
    values: []
  };

  return db.query(query);
};

const deleteOldUnavailable = () => {
  const query = {
    name: 'deleteOldUnavailable',
    text:
      'DELETE FROM unavailable WHERE time_start < NOW() AND recurring IS NULL',
    values: []
  };

  return db.query(query);
};

module.exports = {
  getAllEvents,
  getAllCategories,
  addEvent,
  addNewCategory,
  addNewAPISource,
  addNewUser,
  getUserData,
  addNewUnavailable,
  getUserCategories,
  changeUserCategoryPreference,
  addUserCategoryPreference,
  deleteUserCategoryPreference,
  deleteOldExperiences,
  deleteOldUnavailable,
  getUserUnavailable,
  addUserExperience,
  getAllEventsULTRAMODE,
  addRecurringUnavailable,
  deleteRecurringUnavailable
};
