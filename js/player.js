const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");
const trackRange = document.querySelector("#track-range");
const previous_song = document.querySelector("#backward");
const play_Pause = document.querySelector("#playPause");
const next_song = document.querySelector("#forward");
const muteShow = document.querySelector(".mute");
const trackImage = document.querySelector("#track-image");

let isPlaying = false;
let isMuted = true;
let index = 0;
let timer;
let track = document.createElement("audio");

let songs = [
  {
    track_name: "Hard Feelings",
    track_artist: "Lorde",
    path: "./music/hard-feelings.mp3",
    album: "./music/lorde.jpg",
  },
  {
    track_name: "No Time To Die",
    track_artist: "Billie Eilish",
    path: "./music/no-time-to-die.mp3",
    album: "./music/billie.jpg",
  },
  {
    track_name: "Daddy Issues",
    track_artist: "The Neighbourhood",
    path: "./music/daddy-issues.mp3",
    album: "./music/neighbourhood.jpg",
  },
];

function loadTrack(index) {
  clearInterval(timer);
  resetSlider();
  track.src = songs[index].path;
  trackName.innerHTML = songs[index].track_name;
  trackArtist.innerHTML = songs[index].track_artist;
  trackImage.src = songs[index].album;
  track.load();
  timer = setInterval(rangeSlider, 1000);
}

loadTrack(index);

function mute() {
  if (isMuted == true) {
    Muted();
  } else {
    unMute();
  }
}

function Muted() {
  track.volume = 0;
  isMuted = false;
  console.warn("muted");
  document.getElementById("mute").innerHTML =
    '<i class="fas fa-volume-up"></i>';
}

function unMute() {
  track.volume = 1;
  isMuted = true;
  console.warn("unmuted");
  document.getElementById("mute").innerHTML =
    '<i class="fas fa-volume-mute"></i>';
}

function resetSlider() {
  trackRange.value = 0;
}

function playPause() {
  if (isPlaying == false) {
    playsong();
  } else {
    pausesong();
  }
}

// play song
function playsong() {
  track.play();
  isPlaying = true;
  play_Pause.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  document.querySelector("img").classList.add("animation");
}

//pause song
function pausesong() {
  track.pause();
  isPlaying = false;
  play_Pause.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  document.querySelector("img").classList.remove("animation");
}

// next song
function next() {
  if (index < songs.length - 1) {
    index += 1;
    loadTrack(index);
    playsong();
  } else {
    index = 0;
    loadTrack(index);
    playsong();
  }
}

// previous song
function previous() {
  if (index > 0) {
    index -= 1;
    loadTrack(index);
    playsong();
  } else {
    index = songs.length;
    loadTrack(index);
    playsong();
  }
}

// change slider position
function change_duration() {
  slider_position = track.duration * (trackRange.value / 100);
  track.currentTime = slider_position;
}

function rangeSlider() {
  let position = 0;

  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    trackRange.value = position;
  }

  // function will run when the song is over
  if (track.ended) {
    play_Pause.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    index += 1;
    loadTrack(index);
    playsong();
  }
}
