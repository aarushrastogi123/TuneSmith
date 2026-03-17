import { useState, useEffect } from "react";

function App() {
  const [artists, setArtists] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // 🔥 Check login status when app loads
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/spotify/status");
        const data = await res.json();
        setLoggedIn(data.loggedIn);
      } catch (err) {
        console.error("Login check failed");
      }
    };

    checkLogin();
  }, []);

  // 🔥 Redirect to Spotify login
  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/api/spotify/login";
  };

  // 🔥 Add songs handler
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/spotify/add-songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          artists: artists.split(",").map(a => a.trim()),
          playlistId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>TuneSmith 🎧</h1>

        {!loggedIn ? (
          <>
            <p style={styles.subtitle}>
              Login with Spotify to continue
            </p>
            <button style={styles.button} onClick={handleLogin}>
              Login with Spotify
            </button>
          </>
        ) : (
          <>
            <input
              style={styles.input}
              placeholder="Artists (comma separated)"
              value={artists}
              onChange={(e) => setArtists(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Playlist ID"
              value={playlistId}
              onChange={(e) => setPlaylistId(e.target.value)}
            />

            <button
              style={styles.button}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Songs"}
            </button>

            {result && (
              <p style={styles.success}>
                ✅ Added {result.addedTracks} tracks successfully
              </p>
            )}

            {error && (
              <p style={styles.error}>
                ❌ {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#121212",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "12px",
    width: "360px",
    color: "#fff",
    textAlign: "center"
  },
  title: {
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "none"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1DB954",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  success: {
    marginTop: "15px",
    color: "#1DB954"
  },
  error: {
    marginTop: "15px",
    color: "#ff4d4d"
  }
};

export default App;