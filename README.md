# 🎮  Spotify Arcade

Spotify Arcade is a full-stack web application that features interactive mini-games based on real-time Spotify data. Users authenticate with their Spotify accounts via OAuth2 and then play music-themed games where their choices are driven by dynamic Spotify artist and track data.

The purpose of the project was to learn and demonstrate API integration, user session management, data modeling, and scalable deployment. The application was developed using a structured development process inspired by the Unified Process and Scrum.

## ⚠️ Warning

As of November 2024, the application used endpoints that has been deprecated in the Spotify Web API. Read more about it here:

[Spotify Source](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api)

Affected endpoints that the Spotify Arcade used:

- Recommendations

---

## Demo

[Demo](https://youtu.be/jjbUTk7D-O0)

## 🎮 Game Modes

### 1. **Higher or Lower**
Guess whether a second artist has more or fewer followers than the first.  
Correct answers earn points and track high scores.

### 2. **Guess the Song**
Listen to a preview of a song and guess the title.
Correct answers earn points and track high scores.

---

## ⚙️ Tech Stack

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [InversifyJS](https://inversify.io/) (Dependency Injection)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk)
- [OAuth 2.0](https://oauth.net/2/)
- [Jest](https://jestjs.io/) (testing)

### Frontend
- [EJS](https://ejs.co/) (HTML templating)
- HTML / CSS / JavaScript

### DevOps
- [pm2](https://pm2.keymetrics.io/) (process manager)
- [Nginx](https://nginx.org/en/) (reverse proxy)
- Deployed on a cscloud school server (No longer available)

---

## 🧪 Testing

Jest unit testing can be found in the `/test` folder at the root of the project.

All comprehensive testing results are located in the `docs/testning` folder. This includes:

- Test specification
- Test reports
- Manual test protocols

## 📚 Documentation

This project was originally documented in GitLab. Documentation from the GitLab wiki is moved into the docs/ folder.

## ⚠️ Known Limitations

Need to setup developer access, guides and instructions can be found here: [Spotify Web API getting started](https://developer.spotify.com/documentation/web-api/tutorials/getting-started)

Dependent on Spotify Web API and Web Playback SDK being up and running.

Rate limits in development mode can delay API requests significantly

(As of 2024 nov) Due to Spotify API limitations, the application no longer works and needs updating.