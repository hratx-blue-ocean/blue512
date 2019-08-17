const {
  addEvent,
  addNewCategory,
  addNewAPISource,
  deleteOldExperiences,
  deleteOldUnavailable
} = require('./query.js');
const TicketMaster = require('./ticketMaster.js');
const EventBrite = require('./eventbrite.js');
const PredictHQ = require('./PredictHq.js');
const CronJob = require('cron').CronJob;

const saveTicketMasterData = async () => {
  const events = await TicketMaster.getData();
  return events.forEach(async event => {
    return await addNewCategory(event.category)
      .then(_ => addNewAPISource(event.source_API))
      .then(_ => addEvent(event))
      .catch(console.log);
  });
};

const saveEventBriteData = async () => {
  const events = await EventBrite.getData();
  return events.forEach(async event => {
    return await addNewCategory(event.category)
      .then(_ => addNewAPISource(event.source_API))
      .then(_ => addEvent(event))
      .catch(console.log);
  });
};

const savePredictHQData = async () => {
  const events = await PredictHQ.getData();
  return events.forEach(async event => {
    return await addNewCategory(event.category)
      .then(_ => addNewAPISource(event.source_API))
      .then(_ => addEvent(event))
      .catch(console.log);
  });
};

const atMidnightEveryDay = new CronJob('0 0 0 * * *', () => {
  saveTicketMasterData()
    .then(console.log)
    .catch(console.log);

  saveEventBriteData()
    .then(console.log)
    .catch(console.log);

  savePredictHQData()
    .then(console.log)
    .catch(console.log);
});

const everyTenMinutes = new CronJob('0 */10 * * * *', () => {
  deleteOldExperiences()
    .then(console.log)
    .catch(console.log);

  deleteOldUnavailable()
    .then(console.log)
    .catch(console.log);
});

saveTicketMasterData()
.then(console.log)
.catch(console.log);

saveEventBriteData()
.then(console.log)
.catch(console.log);

savePredictHQData()
.then(console.log)
.catch(console.log);

module.exports = {
  atMidnightEveryDay,
  everyTenMinutes
};
