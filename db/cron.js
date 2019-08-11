const { getAllCategories, addEvent, addNewCategory, addNewAPISource, getAllAPISources } = require("./query.js");
const TicketMaster = require("./ticketMaster.js");

const saveTicketMasterData = async () => {
	const events = await TicketMaster.getData();
		return events.forEach(async event => {
			return await addNewCategory(event.category)
			.then(_ => addNewAPISource(event.source_API))
			.then(_ => addEvent(event))
			.catch(console.log);
		});
	// })
};

saveTicketMasterData()
  .then(console.log)
  .catch(console.log);
