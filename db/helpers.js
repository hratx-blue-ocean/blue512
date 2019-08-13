const _getDate = () => {
  let currentDate = new Date();
  let futureDate = new Date();

  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();

  futureDate.setDate(futureDate.getDate() + 3);
  let futureDay = futureDate.getDate();
  let futureMonth = futureDate.getMonth() + 1;
  let futureYear = futureDate.getFullYear();

  let dates = {
    currentDateStr:
      currentYear + "-" + currentMonth + "-" + currentDay + "T00:00:00Z",
    futureDateStr:
      futureYear + "-" + futureMonth + "-" + futureDay + "T00:00:00Z"
  };

  return dates;
};

module.exports = { _getDate };
