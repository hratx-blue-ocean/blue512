const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
const expect = chai.expect;

//  APIS
const Predict = require('../../db/PredictHq');
const Ticket = require('../../db/ticketMaster');
const Event = require('../../db/eventbrite');

require('dotenv').config();

describe('expecting all APIS to return an array', () => {

  it('shoul return an array | All APIS', async () => {
    let predictAPI = await Predict.getData();
    let ticketAPI = await Ticket.getData();
    let eventAPI = await Event.getData();

    expect(predictAPI).to.be.a('array')
    expect(ticketAPI).to.be.a('array')
    expect(eventAPI).to.be.a('array')
  })

  it('should return with props required for DB | predicthq_API', async () => {
    let predictAPI = await Predict.getData();

    predictAPI.forEach(element => {
      expect(element).to.have.all.keys('name', 'event_id', 'category',
        'time_start', 'time_end', 'price_min', 'price_max', 'description', 'image',
        'location', 'source_API', 'url', 'venue');

      expect(element.name, element.event_id, element.catgeory, element.time_start, element.time_end,
        element.price_min, element.price_max, element.description, element.image, element.location,
        element.source_API, element.url, element.venue).to.not.equal(undefined)

    });
  })

  it('should return with props required for DB | ticketmaster_API', async () => {
    let ticketAPI = await Ticket.getData();

    ticketAPI.forEach(element => {
      expect(element).to.have.all.keys('name', 'event_id', 'category',
        'time_start', 'time_end', 'price_min', 'price_max', 'description', 'image',
        'location', 'source_API', 'url', 'venue');

      expect(element.name, element.event_id, element.catgeory, element.time_start, element.time_end,
        element.price_min, element.price_max, element.description, element.image, element.location,
        element.source_API, element.url, element.venue).to.not.equal(undefined)
    })
  })

  it('should return with props required for DB | eventbrite_API', async () => {
    let eventAPI = await Event.getData();

    eventAPI.forEach(element => {
      expect(element).to.have.all.keys('name', 'event_id', 'category',
        'time_start', 'time_end', 'price_min', 'price_max', 'description', 'image',
        'location', 'source_API', 'url', 'venue');

      expect(element.name, element.event_id, element.catgeory, element.time_start, element.time_end,
        element.price_min, element.price_max, element.description, element.image, element.location,
        element.source_API, element.url, element.venue).to.not.equal(undefined)
    })
  })

})

// chai.use(chaiHttp);

// const host = `http://localhost:${process.env.PORT}`;



// describe('GET', () => {
//   it('should return all events for route "/api/getEvents" with no params', () => {
//     return chai
//       .request(host)
//       .get('/api/getEvents')
//       .then(res => {
//         should.exist(res);
//         expect(res.status).to.equal(200);
//         res.body.should.be.a('object');
//       })
//       .catch(err => { throw err });
//   });
// });


