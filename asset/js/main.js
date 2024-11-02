const tracks = [
  {
    title: "2 Faced",
    artist: "remix",
    src: "music/2 Faced .mp3",
    img: "asset/img/1.jpeg",
  },
  {
    title: "Criminal",
    artist: "(feat. QP)",
    src: "music/Criminal (feat. QP).mp3",
    img: "asset/img/2.jpeg",
  },
  {
    title: "Black Cotton_Dead Wrong",
    artist: "DarK Boy remix",
    src: "music/Black Cotton_Dead Wrong (DarK Boy remix).mp3",
    img: "asset/img/3.jpeg",
  },
  {
    title: "Disfruto",
    artist: "Audioiko Remix",
    src: "music/Disfruto (Audioiko Remix).mp3",
    img: "asset/img/4.jpeg",
  },
  {
    title: "DRIPPING IN FINESSE",
    artist: "FINESSE Remix",
    src: "music/DRIPPING IN FINESSE.mp3",
    img: "asset/img/5.jpeg",
  },
  {
    title: "Fat_Joe",
    artist: "Remy Ma All The Way Up ft French",
    src: "music/Fat_Joe,_Remy_Ma_All_The_Way_Up_ft_French_Montana_Fvego_x_Om.mp3",
    img: "asset/img/h1.jpeg",
  },
  {
    title: "F_ Em All",
    artist: "(Remix)",
    src: "music/F_ Em All (Remix).mp3",
    img: "asset/img/h2.jpeg",
  },
  {
    title: "G-Unit",
    artist: "Poppin  Them Thangs",
    src: "music/G-Unit - Poppin  Them Thangs.mp3",
    img: "asset/img/h3.jpeg",
  },
  {
    title: "Hdmi",
    artist: "(PXVL Remix)",
    src: "music/Hdmi (PXVL Remix).mp3",
    img: "asset/img/h4.jpeg",
  },
  {
    title: "Hell Raiser",
    artist: "2pac Remix",
    src: "music/Hell Raiser_ Remix (2).mp3",
    img: "asset/img/h5.jpeg",
  },
  {
    title: "Hey Sexy Lady",
    artist: "(feat. Brian & Tony Gold)",
    src: "music/Hey Sexy Lady (feat. Brian & Tony Gold).mp3",
    img: "asset/img/t1t1.jpeg",
  },
  {
    title: "I Maintain",
    artist: "Remix",
    src: "music/I Maintain_ Remix.mp3",
    img: "asset/img/t2t1.jpeg",
  },
  {
    title: "Mad Mad World",
    artist: "(feat. Sizzla Kalonji & Collie Buddz)",
    src: "music/Mad Mad World (feat. Sizzla Kalonji & Collie Buddz).mp3",
    img: "asset/img/t3t1.jpeg",
  },
  {
    title: "MyOwnPersonalHell",
    artist: "Remix",
    src: "music/MyOwnPersonalHell.mp3",
    img: "asset/img/t4t1.jpeg",
  },
  {
    title: "Pistol To My Head",
    artist: "2pac Remix",
    src: "music/Pistol To My Head_  Remix.mp3",
    img: "asset/img/t5t1.jpeg",
  },
  {
    title: "Ratatat",
    artist: "Remix",
    src: "music/Ratatat.mp3",
    img: "asset/img/img1.jpg",
  },
  {
    title: "Stan ",
    artist: "(feat. Dido)",
    src: "music/Stan (feat. Dido).mp3",
    img: "asset/img/img2.jpeg",
  },
  {
    title: "Warrior",
    artist: "Eminem",
    src: "music/Warrior.mp3",
    img: "asset/img/img3.jpeg",
  },
  {
    title: "Waste",
    artist: "(Ghost Edit)",
    src: "music/Waste (Ghost Edit).mp3",
    img: "asset/img/img4.jpeg",
  },
  {
    title: "West Coast",
    artist: "Remix",
    src: "music/West Coast (1).mp3",
    img: "asset/img/img5.jpeg",
  },
  // Add more tracks as needed
];

let currentTrackIndex = 0;
let audio = new Audio(tracks[currentTrackIndex].src);
let isPlaying = false;
audio.volume = 0.5; // Set initial volume
const recentTracks = []; // Array to store recent track indices

// Get references to DOM elements
const playButton = document.querySelector(".ri-play-circle-fill");
const pauseButton = document.querySelector(".ri-pause-circle-fill");
const nextButton = document.querySelector(".ri-skip-forward-fill");
const prevButton = document.querySelector(".ri-skip-back-fill");
const trackDisplay = document.querySelector(".show_trak div h6");
const artistDisplay = document.querySelector(".show_trak div span");
const imgDisplay = document.querySelector(".show_trak figure img");
const startTimeDisplay = document.querySelector(".start");
const progressBar = document.querySelector(".l");
const endTimeDisplay = document.querySelector(".end");
const progressIndicator = document.querySelector(".leaver i");
const progressLeaver = document.querySelector(".leaver");
const volumeBar = document.querySelector(".setting_trak .l "); // Volume bar
const volumeLeaver = document.querySelector(".setting_trak .leaver i "); // Lever for volume control
const volumeLeaverM = document.querySelector(".setting_trak .leaver");
const muteIcon = document.querySelector("span .ri-volume-mute-line"); // Mute icon
const volumeDownIcon = document.querySelector("span .ri-volume-down-line"); // Low volume icon
const volumeUpIcon = document.querySelector("span .ri-volume-up-line"); // High volume icon
const musicSectionLink = document.querySelector(".activ");
const recentsSection = document.querySelector(".menubar .sec ul");
const musicSection = document.querySelector(".your-music-section");
const clickResent = document.querySelector(".main section ul ");
const playerBar = document.querySelector(".show_trak");

// Call the renderTracks function to populate the HTML
renderTracks();
renderRecentTracks();
pauseButton.classList.add("op");
updateEndTime();
playerBar.classList.add("hidden"); // Hide the player bar initially
muteIcon.classList.add("op");
volumeDownIcon.classList.add("op");

// Play track
playButton.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    updatePlayPauseButtons();
  }
});

// Pause track
pauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    updatePlayPauseButtons();
  }
});

// Next track
nextButton.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack();
});

// Previous track
prevButton.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack();
});

// Update start time and progress indicator as track plays
audio.addEventListener("timeupdate", () => {
  if (!isDragging) {
    // Only update when not dragging
    startTimeDisplay.textContent = formatTime(audio.currentTime);

    // Update progress indicator
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressIndicator.style.transform = `translateX(${progressPercent}%)`;
    progressLeaver.style.width = `${progressPercent}%`;
  }
});

// Make the progress bar interactive
progressBar.addEventListener("click", (event) => {
  const progressBarWidth = progressBar.offsetWidth;
  const clickPositionX = event.offsetX;
  const newTime = (clickPositionX / progressBarWidth) * audio.duration;
  audio.currentTime = newTime; // Update audio current time

  // Immediately update the display to reflect the new time
  startTimeDisplay.textContent = formatTime(audio.currentTime);
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressIndicator.style.transform = `translateX(${progressPercent}%)`;
  progressLeaver.style.width = `${progressPercent}%`;
});

// Optional: Dragging functionality for the progress indicator
let isDragging = false;

progressIndicator.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const progressBarWidth = progressBar.offsetWidth;
    const newPositionX =
      event.clientX - progressBar.getBoundingClientRect().left;
    const clampedPositionX = Math.max(
      0,
      Math.min(newPositionX, progressBarWidth)
    );
    const newTime = (clampedPositionX / progressBarWidth) * audio.duration;
    audio.currentTime = newTime; // Set audio current time

    // Update display during dragging
    startTimeDisplay.textContent = formatTime(audio.currentTime);
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressIndicator.style.transform = `translateX(${progressPercent}%)`;
    progressLeaver.style.width = `${progressPercent}%`;
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
  }
});

// Initialize volume
audio.volume = 0.5; // Set initial volume to 50%
updateVolumeLeaver(audio.volume * 100);

// Handle click on volume bar
volumeBar.addEventListener("click", (event) => {
  const volumeBarWidth = volumeBar.offsetWidth;
  const clickPositionX = event.offsetX;
  const newVolume = clickPositionX / volumeBarWidth;

  audio.volume = newVolume;
  updateVolumeLeaver(newVolume * 100);
  updateVolumeIcons(newVolume);
});

// Dragging functionality for volume control
let isDraggingVolume = false;

volumeLeaver.addEventListener("mousedown", (event) => {
  isDraggingVolume = true;
  event.preventDefault();
});

document.addEventListener("mousemove", (event) => {
  if (isDraggingVolume) {
    const volumeBarWidth = volumeBar.offsetWidth;
    const newPositionX = event.clientX - volumeBar.getBoundingClientRect().left;
    const clampedPositionX = Math.max(
      0,
      Math.min(newPositionX, volumeBarWidth)
    );
    const newVolume = clampedPositionX / volumeBarWidth;

    audio.volume = newVolume;
    updateVolumeLeaver(newVolume * 100);
    updateVolumeIcons(newVolume);
  }
});

document.addEventListener("mouseup", () => {
  if (isDraggingVolume) {
    isDraggingVolume = false;
  }
});

musicSectionLink.addEventListener("click", () => {
  // Render the "Recents" section when the user clicks on the "Music" section
  renderRecents();
});

////////////////////////////////////////////////////////////////////////////
//////////////////////////////functions/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// Function to render the tracks dynamically in each section
function renderTracks() {
  const albumSections = document.querySelectorAll(".main > section > ul");
  albumSections.forEach((albumSection) => {
    albumSection.innerHTML = "";
  });

  albumSections.forEach((albumSection, sectionIndex) => {
    const tracksPerSection = 5;
    const startIndex = sectionIndex * tracksPerSection;
    const endIndex = Math.min(startIndex + tracksPerSection, tracks.length);

    for (let i = startIndex; i < endIndex; i++) {
      const track = tracks[i];
      const trackItem = document.createElement("li");
      trackItem.innerHTML = `
        <div data-audio="${i}">
          <figure>
            <img src="${track.img}" alt="${track.title}" />
            <figcaption>
              <i class="ri-play-large-fill"></i>
            </figcaption>
          </figure>
          <h3>${track.title}</h3>
          <span>${track.artist}</span>
        </div>
      `;
      albumSection.appendChild(trackItem);

      // Click event to play the track and add to recents
      trackItem.querySelector("div").addEventListener("click", () => {
        currentTrackIndex = i;
        loadTrack();
        addToRecents(i); // Add track to "Recents"
      });
    }
  });
}

// Function to add track to "Recents" section
function addToRecents(index) {
  // Check if the track is already in recents, if so, remove it (to avoid duplicates and reorder)
  const existingIndex = recentTracks.indexOf(index);
  if (existingIndex > -1) {
    recentTracks.splice(existingIndex, 1); // Remove existing occurrence
  }

  recentTracks.unshift(index); // Add the new track to the beginning

  renderRecentTracks(); // Refresh the "Recents" section
}

// Function to render recent tracks in the "Recents" section
function renderRecentTracks() {
  recentsSection.innerHTML = ""; // Clear existing tracks
  recentTracks.forEach((index) => {
    const track = tracks[index];
    const trackItem = document.createElement("li");
    trackItem.innerHTML = `
      <figure>
        <img src="${track.img}" alt="${track.title}" />
      </figure>
      <div>
        <h6>${track.title}</h6>
        <span>${track.artist}</span>
      </div>
      <div class="fade" data-index="${index}">
        <i class="ri-play-large-fill"></i>
      </div>
    `;
    trackItem.querySelector(".fade").addEventListener("click", () => {
      playTrack(index);
    });
    recentsSection.appendChild(trackItem);
  });
}

// Function to show the player bar when a track is played
function showPlayerBar() {
  playerBar.classList.remove("hidden"); // Remove the hidden class to show the player bar
}

// Play track function
function playTrack(index) {
  if (isPlaying) {
    audio.pause(); // Pause current track if it's playing
  }
  currentTrackIndex = index;
  audio.src = tracks[currentTrackIndex].src;
  audio.play();
  isPlaying = true;
  updateTrackDisplay(); // Update track display
}

// Load the track and update UI
function loadTrack() {
  audio.src = tracks[currentTrackIndex].src;
  audio.currentTime = 0; // Reset time to start of the new track
  audio.play();
  isPlaying = true;
  updatePlayPauseButtons();
  updateTrackDisplay();
  updateEndTime();
  showPlayerBar();
}

// Update track display with current track info
function updateTrackDisplay() {
  trackDisplay.textContent = tracks[currentTrackIndex].title;
  artistDisplay.textContent = tracks[currentTrackIndex].artist;
  imgDisplay.src = tracks[currentTrackIndex].img;
}

function updatePlayPauseButtons() {
  if (isPlaying) {
    playButton.classList.add("op");
    pauseButton.classList.remove("op"); // Show pause button, hide play button
  } else {
    pauseButton.classList.add("op");
    playButton.classList.remove("op"); // Show play button, hide pause button
  }
}

function updateTrackDisplay() {
  trackDisplay.textContent = tracks[currentTrackIndex].title;
  artistDisplay.textContent = tracks[currentTrackIndex].artist;
  imgDisplay.src = tracks[currentTrackIndex].img;
}

// Format time in mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
}

// Update end time when track loads
function updateEndTime() {
  audio.addEventListener("loadedmetadata", () => {
    endTimeDisplay.textContent = formatTime(audio.duration);
  });
}

// Update volume icons based on volume level
function updateVolumeIcons(volume) {
  if (volume === 0) {
    muteIcon.classList.remove("op");
    volumeDownIcon.classList.add("op");
    volumeUpIcon.classList.add("op");
  } else if (volume > 0 && volume <= 0.5) {
    muteIcon.classList.add("op");
    volumeDownIcon.classList.remove("op");
    volumeUpIcon.classList.add("op");
  } else {
    muteIcon.classList.add("op");
    volumeDownIcon.classList.add("op");
    volumeUpIcon.classList.remove("op");
  }
}

// Volume lever display based on volume percentage
function updateVolumeLeaver(volumePercent) {
  volumeLeaver.style.transform = `translateX(${volumePercent}%)`;
  volumeLeaverM.style.width = `${volumePercent}%`;
}
