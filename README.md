# 🎵 TuneSmith

**TuneSmith** is a full-stack web application that automatically adds songs from selected artists directly to your Spotify playlists.  
It eliminates manual searching by automating playlist curation using the Spotify Web API.

---

## 🚀 Features

- Add songs from one or multiple artists to a Spotify playlist
- Uses official Spotify Web API (safe & compliant)
- Clean backend architecture (Node.js + Express)
- Modern frontend using React
- Scalable service-based design
- Built for learning, automation, and real-world use

---

## 🛠️ Tech Stack

### Frontend
- React
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- Spotify Web API
- Axios
- dotenv
- CORS

---

## 🧱 Project Structure
TuneSmith/
│
├── backend/
│ ├── src/
│ │ ├── index.js
│ │ ├── routes/
│ │ │ └── spotifyRoutes.js
│ │ ├── services/
│ │ │ └── spotifyService.js
│ │ └── config/
│ │ └── spotifyAuth.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── components/
│ │ └── services/
│ ├── public/
│ └── package.json
│
└── README.md


---

## ⚙️ Setup Instructions

### Backend Setup

```bash
cd backend
npm install

## Create a .env file inside the backend directory:

SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:5000/callback


