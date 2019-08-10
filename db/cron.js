const { getAllCategories, addEvent, addCategory, getAllAPISources } = require("./query.js");
const TicketMaster = require("./ticketMaster.js");

const saveTicketMasterData = () => {
  return getAllCategories()
    .then(data => data.rows)
    .then(rows => rows.map(row => row.name))
    .then(categories => {
			return getAllAPISources()
			.then(sources => {
				TicketMaster.getData().then(events => {
					return events.forEach(async event => {
						let source_API_ID = sources.rows.findIndex(row => row.name === event.source_API);
						source_API_ID = source_API_ID === -1 ? null : source_API_ID + 1
							event.source_API = source_API_ID;
							return await addEvent(event).catch(console.log);
					});
				})
			})
		})
};

saveTicketMasterData()
  .then(console.log)
  .catch(console.log);
