const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const queries = require("../../db/query.js");
const { Client } = require('pg');
require('dotenv').config();

const {DB_USERNAME, DB_HOSTNAME, DB_DATABASE, DB_PASSWORD, DB_PORT} = process.env;

const db = new Client({
  user: DB_USERNAME,
  host: DB_HOSTNAME,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
})


before(() => {
  return db.connect();
});

describe("Database", () => {
  it("should connect to the database", () => {
    db.query("SELECT NOW()", (err, res) => {
      should.exist(res);
      should.not.exist(err);
    });
  });

  const tables = [
    "experiences",
    "api",
    "categories",
    "users",
    "sessions",
    "unavailable",
    "users_experiences",
    "users_categories"
  ];
  tables.forEach(table => {
    it(`should have access to table: ${table}`, async () => {
      const result = await db.query(`SELECT COUNT(*) FROM ${table}`);
      should.exist(result);
    });
  });

  it("should return events with correct fields : getAllEvents", async () => {
    const results = await queries.getAllEvents();
    should.exist(results);
    expect(results.rows).to.be.an("array");
    results.rows.forEach(result => {
      should.exist(result.name);
      should.exist(result.url);
      should.exist(result.img);
      should.exist(result.location);
      should.exist(result.venue);
      should.exist(result.time_start);
      should.exist(result.category);
      expect(result.description).to.not.equal(undefined);
      expect(result.time_end).to.not.equal(undefined);
      expect(result.price_min).to.not.equal(undefined);
      expect(result.price_max).to.not.equal(undefined);
    });
  });

  it("should return events while excluding specific categories : getAllEventsExludingCategories", async () => {
    const noMusic = await queries.getAllEventsExcludingCategories(["Music"]);
    noMusic.rows.forEach(result => {
      expect(result.category).to.not.equal("Music");
    });
    const noSportsAndMusic = await queries.getAllEventsExcludingCategories([
      "Sports",
      "Music"
    ]);
    noSportsAndMusic.rows.forEach(result => {
      expect(result.category).to.not.equal("Sports");
      expect(result.category).to.not.equal("Music");
    });
  });
});

after(() => {
  return db.end();
})