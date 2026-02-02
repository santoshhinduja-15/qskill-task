// DOM elements
const downloadBtn = document.getElementById("downloadBtn");
const songUrlInput = document.getElementById("songUrl");
const alertBox = document.getElementById("alertBox");

const resultDiv = document.getElementById("result");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const downloadLink = document.getElementById("downloadLink");
const coverImage = document.getElementById("coverImage");

// Bootstrap alert
function showAlert(message, type) {
  alertBox.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
}

// Download button click
downloadBtn.addEventListener("click", function () {
  const songUrl = songUrlInput.value.trim();

  // Validation
  if (!songUrl) {
    showAlert("Please paste a Spotify song link", "danger");
    return;
  }

  // Loading state
  downloadBtn.innerText = "Fetching...";
  downloadBtn.disabled = true;

  // Correct GET endpoint with query param
  const endpoint =
    "https://spotify-downloader9.p.rapidapi.com/downloadSong?songId=" +
    encodeURIComponent(songUrl);

  fetch(endpoint, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "04bd44ae9fmsha48140a8b248297p1b36fbjsndec94a820309",
      "X-RapidAPI-Host": "spotify-downloader9.p.rapidapi.com"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data); // optional debug

      if (!data.success) {
        showAlert("Failed to fetch song details", "danger");
        return;
      }

      // Show result
      resultDiv.classList.remove("d-none");

      // Map API response
      songTitle.innerText = data.data.title;
      songArtist.innerText =
        `${data.data.artist} • ${data.data.album}`;
      coverImage.src = data.data.cover;
      downloadLink.href = data.data.downloadLink;

      showAlert("Song ready for download!", "success");
    })
    .catch(() => {
      showAlert("Something went wrong. Please try again.", "danger");
    })
    .finally(() => {
      downloadBtn.innerText = "Download";
      downloadBtn.disabled = false;
    });
});
