const db = require('./db.js');

  /**
 * @param {String} name - The screen name of the user.
 */
const test = (name) => {
    const query =  {
        name : 'test',
        text : 'SELECT * FROM test WHERE name = $1',
        values : [name]
    };

    return db.query(query);
}

module.exports = {
    test
}


