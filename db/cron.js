const { addEvent, addNewCategory, addNewAPISource } = require("./query.js");
const TicketMaster = require("./ticketMaster.js");
const CronJob = require("cron").CronJob;

const saveTicketMasterData = async () => {
  const events = await TicketMaster.getData();
  return events.forEach(async event => {
    return await addNewCategory(event.category)
      .then(_ => addNewAPISource(event.source_API))
      .then(_ => addEvent(event))
      .catch(console.log);
  });
};

const atMidnightEveryDay = new CronJob("0 0 0 * * *", () => {
  saveTicketMasterData()
    .then(console.log)
    .catch(console.log);
});

module.export = {
  atMidnightEveryDay
};
