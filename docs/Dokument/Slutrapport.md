## Post mortem

# Spotify Arcade

Duc anh Pham

dp222ky

2024-05-31

## Abstract

This report concludes the development of the web application "Spotify Arcade". It reflects on the entire project lifecycle, from planning to execution, including the methods and technologies used. The report provides an analysis of the projects outcomes, by identifying both positive and negative experiences encountered during the different phases. The aim is to provide valuable insights for future software development processes in order to minimize setbacks and potential obstacles in similar upcoming projects.

## Background

The purpose of the project was to develop an application that could serve as a host for different types of games using the Spotify Web API. The plan was to fetch relevant information from the API that could be used for questioning in order to develop different type of guessing games. This way it would be possible to generate options that could be guessed upon. The goal was to have at least two game modes to fulfill it having multiple games in order to simulate it being an arcade, hence the name.

The result ended in a deployed version hosted on [Spotify Arcade](https://cscloud7-106.lnu.se/spotify-arcade/). This web application features authentication using [Oauth2](https://oauth.net/2/) and Spotify as the service provider. When authenticated the user can navigate the application and there are currently two games available. The first game mode is called "higher or lower" in which the user is presented two artists. The first artist will have their number of followers displayed, this it the first option. The second option will have a hidden follower amount and two buttons nearby, representing a higher or lower count. The user will then have to guess whether the second artist has a "higher" or "lower" amount of followers then the first artist. If the user would to guess correct. The user would gain a point and progress the game. The second game mode available is a "guess the song" game. This game presents the user with an image of a song. The song presented can be played and listened to, in which then the user will have to guess what song it is. Upon guessing correctly the user will gain a point. Each of these game modes also feature a point system which will record their highest of scores and store in their accounts.

From idea to final delivery, including planning, documenting and developing. There has been nearly 400 hours of work recorded during a 10 week period. During this 10 week period the project followed Linnaeus adapted version of the [Unified Process](https://www.educative.io/answers/what-is-a-unified-process-model). This is a software development framework which features different phases called, inception, elaboration, construction and transition. In the early phases, during the inception, a vision document was created to set the backbone for the project and its aspirations. In the elaboration phase, exploring and research was the main driver in order to identify whether the technologies planned made sense and could collaborate together. Then came the construction phase which featured many hours of implementing and executing the plan, which featured a lot of problem solving, testing and writing of code. Lastly the transition phase featured deploying the application and making sure it ran as expected along with finalizing all the documentation. During all these phases, some components found in [Scrum](https://www.atlassian.com/agile/scrum#:\~:text=Scrum%20is%20an%20agile%20project,values%2C%20principles%2C%20and%20practices) was also used. Each week simulated a "sprint" and was used to plan, implement and possibly test the "[items](https://www.atlassian.com/agile/scrum/backlogs#:\~:text=All%20work%20items%20should%20be,overall%20discussion%20for%20each%20iteration)" ordered in the "[product backlog](https://www.atlassian.com/agile/scrum/backlogs)".

## Technologies

* [Nginx](https://nginx.org/en/)
* [pm2](https://pm2.keymetrics.io/)
* [Mongo DB](https://www.mongodb.com/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core-high-int_prosp-brand_gic-null_emea-se_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=19635697580&adgroup=148444070129&cq_cmp=19635697580&gad_source=1&gclid=EAIaIQobChMIv4e7vPKwhgMVyhyiAx1O4Q7REAAYASAAEgJX8_D_BwE)
* [Mongoose](https://en.wikipedia.org/wiki/Mongoose\_(MongoDB))
* [Spotify Web API](https://developer.spotify.com/documentation/web-api)
* [Oauth2](https://oauth.net/2/)
* [Jest](https://jestjs.io/)
* [Express](https://expressjs.com/)
* [Node.js](https://nodejs.org/docs/latest/api/synopsis.html)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)/[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) using [EJS](https://ejs.co/)

The frontend of the Spotify Arcade was developed using HTML, CSS, Javascript to provide the user interface. The backend technologies such as Node.js, Express, MongoDB with Mongoose, and pm2 were used for server management. Jest was used as the testing framework to test the components of the application. [Here](https://gitlab.lnu.se/1dv613/student/dp222ky/project/-/wikis/Dokument/Arkitektur) you can find a more detailed view of how the architecture is linked/used.

## Positives

The best takeaway from this project is that I really experienced the importance of good planning. I learnt that it was really valuable to set up a good visualization to really plan out the work needed for the project. By working through iterations based on the sprint and product backlogs, it was really easy to always manage time and work. This way each session, I always knew what to do because there was already planned work that i could just pick up on.

Another positive takeaway was working with the Spotify API. When planning my project, I wanted to work with a public API to gain a better understanding of how to integrate and utilize external data. This experience gave me a better understanding of API integration in web applications.

I learned to implement OAuth2 authentication, allowing users to authenticate using their Spotify credentials. This also required handling access tokens and managing user sessions. Making API requests to fetch data from Spotify was another important part. Getting information about tracks, albums, artists, and playlists required a deep understanding of the API endpoints and really highlighted the importance of reading the documentation and payloads/responses you receive in order to manipulate the data. Also dealing with different error scenarios, such as rate limits, authorization failures, and network issues, taught me the importance of good error handling.

## Negatives

One of the negative things that I did during the project was underestimate the elaboration and information gathering face. By not doing proper research on the API i wanted to use, I had to make some workarounds and adapt solutions to get my desired functionallity. A hard example on this was that I made an assumption of the API offering an endpoint for random generation of songs, artists etc, it however did not.

Another negative that I did during the project was not account for time needed when things did not go as expected. Amongst of these things was working with public APIs that only gives you a certain limit of requests before hitting the rate limit. This turned out to be a major problem for me when developing. The Spotify Web API in development mode does not have an explicit number of requests that you can make documented, before hitting the rate limit. So initially when I made requests to the API I was making a ton of calls resulting in hitting the rate limit rapidly. Each time the rate limit was hit there was a 24 hour cooldown, this greatly effected my estimated time that I had planned when developing. However, this forced me to do some problem solving and workarounds in order to keep working with the application, this I found was a positive. Amongst the things that I had to do in order to combat hitting the rate limits rapidly, was to make some major refactoring and restrategize how I could get the desired outcome, by making as minimal requests as possible.

Another things that resulted in missed time estimations was the times where I needed to be absent from the project. During the project I was also working on two seperate courses at times which affected the hours i could've put into this project, which resulted in one week of absence. This however should not be an excuse, and should rather encourage better planning. In future projects it could be good to have some hours to account for setbacks, although it wont always be possible.

## Conclusion

All in all the project has been a really valuable learning experience, highlighting the importance of planning, the challenges of working with third-party APIs, and the benefits of using a structured development methodology. Despite the setbacks and the one game mode I missed to implement from my product backlog, I successfully managed to deploy a functional web application for the "Spotify Arcade" and it works as I intended. The lessons learned from this project will be very valuable for future development projects and i feel like i really enhanced my skills in many different parts of software development, including planning, executing and problem solving.