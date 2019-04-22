
const profilesList = [
  {
    city: asd,
    state: asd,
    longitude: 25,
    latitude: -26,
    sentiment: 0.25,
    postive: true,
  },

]

const profiles = {
  'los_tolucas': profilesList[0],
  'capelos_barbecue': profilesList[1],
  'twister': profilesList[2],
  'i_love_cheesesteak': profilesList[3],
  'the_waffle_roost': profilesList[4],
  'oaxacan_kitchen_mobile': profilesList[5],
  'akita_gourmet': profilesList[6],
  'sanjeet_food_truck': profilesList[7],

  random: () => {
    return profilesList[Math.floor(Math.random() * 8)]
  }

}

export default profiles
export {profilesList};
