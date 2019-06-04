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
  marker.influence = influence;
  return marker;
};

export function makeData() {
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
