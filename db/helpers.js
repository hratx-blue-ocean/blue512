const googleImages = require('google-images');
const google = require('google-parser');

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
      currentYear + '-' + currentMonth + '-' + currentDay + 'T00:00:00Z',
    futureDateStr:
      futureYear + '-' + futureMonth + '-' + futureDay + 'T00:00:00Z'
  };

  return dates;
};

const _categorize = category => {
  if (category === 'Music' || category === 'concerts') {
    category = 'Music';
  } else if (
    category === 'Arts & Theatre' ||
    category === 'Arts' ||
    category === 'performing-arts'
  ) {
    category = 'Arts & Theatre';
  } else if (category === 'Sports & Fitness' || category === 'Sports') {
    category = 'Sports & Fitness';
  } else if (category === 'Other' || category === 'undefined') {
    category = 'Other';
  } else if (category === 'Community' || category === 'community') {
    category = 'Community';
  }

  return category;
};

const _findImage = async (term, category, location, venue) => {
  const client = new googleImages(process.env.GG_CX, process.env.GG_API_KEY);
  let newSearch = `${term} ${venue} ${category}`;
  if (category === 'concerts' || category === 'performing-arts') {
    newSearch = `${term} ${location} ${venue}`;
  }

  let getRidOfSymbols = newSearch.replace(/[^A-Za-z]/g, ' ');
  let condensedSearch = getRidOfSymbols;
  let image = '';

  let results = await google.jpg(newSearch);

  for (let i = 0; i <= Math.floor(results.length / 2); i++) {
    if (
      !results[i].img.includes('evbuc') &&
      results[i].img !== undefined &&
      !results[i].img.includes('video') &&
      !results[i].img.includes('zoogletools') &&
      !results[i].img.includes('fbsbx.com') &&
      !results[i].img.includes('wixmp.com') &&
      !results[i].img.includes('thedailybeast.com') &&
      !results[i].img.includes('cloudinary.com') &&
      !results[i].img.includes('gannett-cdn.com')
    ) {
      image = results[i].img;
      break;
    }
  }

  if (image === '') {
    let otherResults = await client
      .search(condensedSearch)
      .then(images => {
        for (let i = 0; i < 5; i++) {
          if (
            !images[i].url.includes('evbuc') &&
            images[i].url !== undefined &&
            !images[i].url.includes('video') &&
            !images[i].url.includes('zoogletools') &&
            !images[i].url.includes('fbsbx.com') &&
            images[i].url.includes('wixmp.com') &&
            images[i].url.includes('thedailybeast.com') &&
            !images[i].url.includes('cloudinary.com') &&
            !images[i].url.includes('gannett-cdn.com')
          ) {
            return images[i].url;
          }
        }
      })
      .catch(err => {
        deleteObj.push(term);
        return null;
      });
    return otherResults;
  }
  return image;
};

module.exports = { _getDate, _categorize, _findImage };
