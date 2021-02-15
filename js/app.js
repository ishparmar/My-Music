var audio, playbtn, title, poster, artists, mutebtn, seekslider,
    volumeslider, seeking = false,
    seekto,
    curtimetext, durtimetext, playlist_status,
    dir, playlist, ext, agent, playlist_artist, repeat, randomSong;

//Initialization Of Array of Music, Title , Poster Image , Artists
dir = "music/";
playlist = ["Cartoon-On-&-On", "Elektronomia", "Johnning", "Popsicle", "Fearless"];
title = ["Cartoon - On & On", "Elektronomia", "Janji-Heroes Tonight", "Popsicle", "Lost Sky-Fearless"];
poster = ["images/ncs1.jpeg", "images/ncs2.jpg", "images/ncs3.jpg", "images/ncs4.jpg", "images/ncs5.jpg"];
artists = ["(feat. Daniel Levi) [NCS Release]", "Elektronomia-Sky High [NCS Release]", "(feat. Johnning) [NCS Release]", "LFZ - [NCS Release]", "(feat. Chris Linton) [NCS Release]"];
playlist_index = 0;

//Used to run on every browser
ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
    ext = ".ogg";
}

// Set object references
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");

playlist_index = 0;
//audio object
audio = new Audio();
audio.src = dir + playlist[0] + ext; //music/musicname.mp3
audio.loop = false;

//first song title and artist
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

//add event handling
playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
mutebtn.addEventListener("click", mute);
seekslider.addEventListener("mousedown", function(event) {
    seeking = true;
    seek(event);
});
seekslider.addEventListener("mousemove", function(event) { seek(event); });
seekslider.addEventListener("mouseup", function() { seeking = false; });
volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", function() { seektimeupdate(); });
audio.addEventListener("ended", function() { switchTrack(); });
repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);

//functions
function fetchMusicDetails() {
    //poster image, pause/play image
    $("#playpausebtn img").attr("src", "Images/pause-red.png");
    $("bgImage").attr("src", poster[playlist_index]);
    $("image").attr("src", poster[playlist_index]);

    //title and artist
    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    //Audio
    audio.src = dir + playlist[playlist_index] + ext;
    audio.play();

}

function playPause() {
    if (audio.paused) {
        audio.play();
        $("#playpausebtn img").attr("src", "images/pause-red.png");
    } else {
        audio.pause();
        $("#playpausebtn img").attr("src", "images/play-red.png");
    }
}