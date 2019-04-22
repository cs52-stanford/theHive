
const profilesList = [
  {
    city: New York,
    state: New York,
    longitude: 40.7127837,
    latitude: -74.0059413,
    keywords: "angry", "human rights", "separation",
    positive: false,
    hashtags: "#RefugeesWelcome", "@HelpRefugees",
    influencers: "@Redhourben",
  },
  {
    city: Los Angeles,
    state: California,
    longitude: 34.0522342,
    latitude: -118.2436849,
    keywords: "hopeful", "welcome", "Yemen",
    positive: false,
    hashtags: "#RefugeesWelcome", "#HelpRefugees",
    influencers: "@TheRealAlekWek",
  },
  {
    city: Chicago,
    state: Illinois,
    longitude: 41.8781136,
    latitude: -87.6297982,
    keywords: "grateful", "Syria", "Somali",
    positive: true,
    hashtags: "#RefugeesWelcome", "#HelpRefugees",
    influencers: "@KristinDavis",
  },
  {
    city: Houston,
    state: Texas,
    longitude: 29.7604267,
    latitude:  -95.3698028,
    keywords: "horrible", "Rohingya", "injustice"
    positive: true,
    hashtags: "#RefugeesWelcome", "#HelpRefugees",
    influencers: "@neilhimself",
  },
  {
    city: Philadelphia,
    state: Pennsylvania,
    longitude: 39.9525839,
    latitude:  -75.1652215,
    keywords: "horrible", "Rohingya", "injustice"
    positive: false,
    hashtags: "#RefugeesWelcome", "#HelpRefugees",
    influencers: "@BH_officiel",
  },
  {
    city: Phoenix,
    state: Arizona,
    longitude: 33.4483771,
    latitude:  -112.0740373,
    keywords: "Manila", "displacement", "shelter"
    positive: false,
    hashtags: "#RefugeesWelcome", "#HelpRefugees",
    influencers: "@atomaraullo",
  },
]

// City data drawn from: https://public.opendatasoft.com/explore/dataset/1000-largest-us-cities-by-population-with-geographic-coordinates/table/?sort=-rank

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
