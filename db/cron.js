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
						console.log(sources.rows.findIndex(row => row.name === event.source_API));
						if (categories.includes(event.category)) {
							event.category = categories.indexOf(event.category);
							event.source_API = sources.rows.findIndex(row => row.name === event.source_API) + 1;
							return await addEvent(event);
						} else {
							return addCategory(event.category)
							.then(async _ => {
								event.category = categories.length;
								event.source_API = sources.rows.findIndex(row => row.name === event.source_API) + 1;
								await addEvent(event);
							})
						}
					});
				});
			})
    });
};

saveTicketMasterData()
  .then(console.log)
  .catch(console.log);
