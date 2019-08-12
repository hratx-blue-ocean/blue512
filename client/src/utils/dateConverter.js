import React from 'react';

export default function convertDate (data) {
  
  let result;
  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
  ];

  // data: 2018-07-26T21:05:18.226Z

  let ymdArr  = data.slice(0, 10).split('-') // ['2018', '07', '26']

  const month = months[Number(ymdArr[1])-1]; // Jul
  const day   = Number(ymdArr[2]);           // 26
  const year  = Number(ymdArr[0]);           // 2018

  result = `${month} ${day}, ${year}`;       // Jul 26, 2018
  return result;
}