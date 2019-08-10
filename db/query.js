const db = require('./db.js');

  /**
 * @param {String} name - The screen name of the user.
 */
const getAllEvents = () => {
    const query =  {
        name : 'test',
        text : 'SELECT * FROM experiences',
        values : []
    };

    return db.query(query);
}

const getAllCategories = () => {
    const query = {
        name : 'Categories',
        text : 'SELECT * FROM Categories',
        values : []
    }

    return db.query(query);
}

const getAllAPISources = () => {
    const query = {
        name : 'APISources',
        text : 'SELECT * FROM api',
        values : []
    }

    return db.query(query);
}

const addCategory = (category) => {
    const query = {
        name : 'addCategory',
        text : 'INSERT INTO categories (name) VALUES ($1)',
        values : [category]
    }

    return db.query(query);
}

const addEvent = (event) => {
    const { name, source_API, event_id, description, url, image, venue, location, time_start, time_end, price_min, price_max, category } = event;
    const query = {
        name : 'addEvent',
        text : 'INSERT INTO experiences (name, source_api_id, experience_api_id, description, url, img, venue, location, time_start, time_end, price_min, price_max, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
        values : [name, source_API, event_id, description, url, image, venue, location, time_start, time_end, price_min, price_max, category]
    }

    return db.query(query);
}

module.exports = {
    getAllEvents,
    getAllCategories,
    addEvent,
    addCategory,
    getAllAPISources
}