<p align="center">
  <img src="https://github.com/cs52-2019/theHive/blob/master/Hive_PrimaryOneColor_redo.png" alt="The Hive"/>
</p>

# The Hive
The Hive is a special projects unit of USA for UNHCR, the UN Refugee Agencency. They are a team of digital and data strategists who find creative ways of addressing the global refugee crisis. One key area of focus for the Hive is to identify strategies to increase donations. This includes increasing donor engagement and shifting the conversation around refugees in the US.

# The Challenge
Improve The Hive’s donor engagement and fundraising efficacy via social media analysis to aid in their marketing strategy development. This is best achieved in a few ways: by identifying social media “influencers”, recognizing trends in donor sentiment by geographical region, examining word usage and effectiveness in donor appeal and retention, and locating region specific refugee-related news stories.

# Our solution
Our team has had extensive conversations with the staff at Hive, including their communications team. Through these conversations, we agreed to create the following tools which can help to increase donor engagement. These tools have been be combined into a dashboard for The Hive to be able to access them easily.
* Twitter influencer tool, with geo-location - identifies Twitter users in specific regions of the US whose tweets in relation to refugees are widely retweeted or replied to.
* News aggregator - identifies refugee-related news items, especially in local news, that The Hive might not otherwise be aware of.
* Word chart - shows the frequently occurring words in social media and news items relating to refugees.

# Our Live Demo

![](compare.gif)
![](search.gif)
![](sentimentdetail.gif)

## To use our app
npm install --save prop-types
npm install --save google-map-react
npm install --save react-controllables
npm install @babel/plugin-proposal-decorators
npm install --save react-splitter-layout
npm install --save styled-components
npm install --save react-instantsearch-dom


# Who We Are
Member | Email | Bio
--- | --- | ---
JK Hunt | jkhunt@stanford.edu | JK is an undergraduate student from London at Stanford studying Computer Science. He is interested in the intersection between social good and computer science, in particular machine learning and natural language processing.
Pamela Tham | pamtham@stanford.edu | Pamela is a student at the Graduate School of Education at Stanford. She is interested in creating and developing mastery in tools that support organizational improvement and better student outcomes. She has worked as an elementary school teacher and a civil servant in Singapore's Ministry of Education and Ministry of Finance, and is excited about how technology can help to improve access and equity in education.  
Jessica Chen | jchens@stanford.edu | Jessica is ...
Sasankh Munukutla | sasankh@stanford.edu | Sasankh is an undergraduate student at Stanford studying Computer Science from Singapore. He is passionate about fusing technology and social impact. His past experience includes social service, software and hardware projects and military leadership. With an interest in NLP and broadening perspectives, he is excited about how this project can change the conversation around the refugee crisis.
Mustafa Khan | mkhan7@stanford.edu | Mustafa is an undergraduate Symbolic Systems major at Stanford from Lahore, Pakistan, concentrating in Artificial Intelligence. He has a background in social entrepreneurship and looks to delve into the intersection of technology and social impact. He is excited to launch this project to the benefit of changing the conversation about refugees.

# Our Development Timeline
Week | Milestone | Details
--- | --- | ---
2 | |
3 | |
4 | |
5 | |
6 | |
7 | |
8 | |
9 | |
10 | |


Thank you to:
* The Hive: Nicole Smith
* CS + SG: Tess Rinaldo and Michelle Julia

# Influencers identified using these criteria in "Search a better world" Hackathon:
Who are major Twitter Influencers regarding Refugees?

Influencer score (Raw) =

	[Followers] * [Tweets] * [Retweets] * [Favorites]

Power BI formula =
original_tweets[Followers]*original_tweets[Tweets]*[retweet_count]*[favorite_count]/10^10

Influencer score (Weighted) =

( ( ([Retweets] *0.7) ^2 +([Favorites]*0.3)^2 ) / [Tweets] ) * Log([Followers])^3

Power BI formula =
CALCULATE(divide((sum(original_tweets[retweet_count])*.7)^2+(sum(original_tweets[favorite_count])*.3)^2,sum(original_tweets[Tweets]))*[Log of Followers]^3/10^9,ALLEXCEPT(original_tweets,original_tweets[user.screen_name]))


# Search terms used by "Search a better world" hackathon:

@Refugees
@UNRefugeeAgency
asylum
asylumseeker
immigrants
migrants
refugee
RefugeesWelcome
rohingya
rohingyarefugees
syrianrefugee
syrianrefugees
TEDxKakumaCamp
unhcr
USA
withrefugees


This list has a general positive word association with refugees and may (likely) excludes negative contributors that we want to focus on.

# Additional search terms recommended by "Search a better world" hackathon:

Recommend repeat exercise using “wider net” of terms
Following list sample, not inclusive
Assimilation
Assisted Voluntary Return
Border management
Brain drain
Brain gain
Capacity building
Circular migration
Country of origin
Emigration
Facilitated migration
Forced migration
Freedom of movement
Immigration
Internally displaced person
International minimum standards
Irregular migration
Labour migration
Migration
Migration management
Naturalization
Orderly migration
Push-pull factors
Receiving country
Repatriation
Remittances
Resettlement
Smuggling
Stateless person
Technical cooperation
Trafficking in persons
Xenophobia
Alien
Illegal Immigrant
Illegals
Undocumented
Caravan
UNHCR
UN Refugees
ICE
deportation
border wall
illegal border crossing
