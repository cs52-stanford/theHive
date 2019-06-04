import React from "react";

// for everything inside data
const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (marker, influence) => {
  return {
    handle: marker['Handle'],
    influence: influence,
    user: marker.['User'],
    followers: marker['Followers'],
    influencerScore: marker['Influencer-Score'],
    location: marker['User location'],
    lat: marker['Latitude'],
    lng: marker['Longitude'],
};

export function makeData(len = 5553) {
  var finalData;
  fetch('https://us-central1-angelic-artwork-220408.cloudfunctions.net/get-influencers', {
    method: 'GET',
    mode: 'cors',
  })
    .then(r => r.json())
    .then(function(data) {
      console.log('returned data from makeData: ', data);
      finalData = data.star;
    })
    .catch(function(error) {
      console.log(error);
      return ("error");
    });

  // for (var marker in finalData) {
  //   if (p.hasOwnProperty(key)) {
  //       console.log(key + " -> " + p[key]);
  //   }
  // }

  return (finalData.properties).map(obj, index => {
    return {
      ...newPerson(obj, "star"),
    };
  });
}
