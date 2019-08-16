const _getDate = () => {
  let currentDate = new Date();
  let futureDate = new Date();

  let currentDay = currentDate
    .getDate()
    .toString()
    .padStart(2, 0);
  let currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, 0);
  let currentYear = currentDate.getFullYear();

  futureDate.setDate(futureDate.getDate() + 3);
  let futureDay = futureDate
    .getDate()
    .toString()
    .padStart(2, 0);
  let futureMonth = (futureDate.getMonth() + 1).toString().padStart(2, 0);
  let futureYear = futureDate.getFullYear();

  let dates = {
    currentDateStr:
      currentYear + "-" + currentMonth + "-" + currentDay + "T00:00:00Z",
    futureDateStr:
      futureYear + "-" + futureMonth + "-" + futureDay + "T00:00:00Z"
  };

  return dates;
};

const _categorize = category => {
  if (category === "Music" || category === "concerts") {
    category = "Music";
  } else if (
    category === "Arts & Theatre" ||
    category === "Arts" ||
    category === "performing-arts"
  ) {
    category = "Arts & Theatre";
  } else if (category === "Sports & Fitness" || category === "Sports") {
    category = "Sports & Fitness";
  } else if (category === "Other" || category === "undefined") {
    category = "Other";
  } else if (category === "Community" || category === "community") {
    cateogry = "Community";
  }

  return category;
};

module.exports = { _getDate, _categorize };
