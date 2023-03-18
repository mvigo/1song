// Replace this with your own Spotify Client ID
const clientId = "fc48c3e015e04fc9b8ff438e4838244d";
const playlistId = "6MlFZUBSYEQvM0gnqiDMpa?si=bde24c72cc384221";
let accessToken = "";

async function getAccessToken() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(window.location.origin)}&scope=playlist-read-private`;

  if (window.location.hash) {
    const tokenMatch = window.location.hash.match(/#access_token=([^&]*)/);
    accessToken = tokenMatch ? tokenMatch[1] : "";
  } else {
    window.location.href = authUrl;
  }
}

async function getPlaylistTracks() {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  return data.items;
}

async function playRandomSong() {
  const playlistTracks = await getPlaylistTracks();
  const randomTrack = playlistTracks[Math.floor(Math.random() * playlistTracks.length)];
  const trackUrl = randomTrack.track.external_urls.spotify;

  const spotifyPlayer = document.getElementById("spotifyPlayer");
  spotifyPlayer.href = trackUrl;
  spotifyPlayer.click();
}

document.addEventListener("DOMContentLoaded", function () {
  getAccessToken();

  const magicButton = document.getElementById("magicButton");
  magicButton.addEventListener("click", function () {
    playRandomSong();
  });
});
