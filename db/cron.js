const db = require('./db.js');
const TicketMaster = require('./ticketMaster.js');

const saveTicketMasterData = () => {
    TicketMaster.getData()
    .then(data => {
        // write query to save to database
    });

}