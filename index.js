const music = document.querySelector("audio");

const img = document.querySelector("img");

const play = document.getElementById("play");

const artist = document.getElementById("artist"); 
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

// array of the songs and its property
const songs = [
{
    name : "nishu-2",
    title : "vikash dholakiya",
    artist : "Viksh tandola",
    img : "nishu-2"
},
{
    name : "nishu-1",
    title : "vikash dholakiya",
    artist : "Viksh tandola",
    img : "nishu"
},
{
    name : "nishu-3bum_bhole_bum_bhole_ke_masti_main_hum",
    title : "Lotus lane",
    artist : "mera beta pushkar ",
    img : "nishu"

},

{
    name : "nishu-5Daler_Mehndi_-_Tunak_Tunak_Tun",
    title : "Lotus lane",
    artist : "vikash tandola",
    img : "nishu"

},

{
    name : "nishu-7Chhuiri_Tora_Pen_Debaw_Padhela_Lalten_New_Hard_Mix_Dj_Roshan_MP3_Link_description",
    title : "Lotus lane",
    artist : "mera beta pushkar ",
    img : "nishu"

},

{
    name : "nishu-9Chandi_jaisa_rang_hai_tera___YouTube",
    title : "Lotus lane",
    artist : "vikash tandola",
    img : "nishu"

},

];

let isPlaying = false;
//this is for the play .(animation is also not working look to this )
const playMusic = () =>
{
    isPlaying = true ;
    music.play();
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
}

//this is for the plause.
const pauseMusic = () =>
{
    isPlaying = false ;
    music.pause();
    play.classList.replace("fa-pause","fa-play");
    img.classList.remove("anime");//this is also not working.
}

//we are going to call this function at instant when play button will be clicked 
play.addEventListener("click" , () =>
{
    isPlaying ? pauseMusic() : playMusic();
})

//when we go on the next song then all the propoerty got changed artist name song name and the song offcourse .

//we have stored the song information in the array so we can acess the property using the array index 
let songindex = 0;

const loadSong = (songs) =>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src="music/" + songs.name + ".mp3";
  //  music.src = `music${songs.name}.mp3`;// another way of adding the music 
  //we can use according to our cnovienience.
    img.src = "img/" + songs.img + ".jpg";//source of the image . 
}

loadSong(songs[songindex]);//caLLING THIS FUNCTION 

//progress js work
let progress = document.getElementById('progress');
let  total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_duration");
const progress_div =document.getElementById("progress_div");
//mkae sur that all
//the element we have imported using the id are correct .
//currentTine is the current time 
//total_duration is the total length of the song .

music.addEventListener('timeupdate',(event) =>
{
    console.log(event);
    const {currentTime , duration} = event.srcElement;//why it is appearing in 
    //like this .
    // console.log(currentTime);
    // console.log(total_duration);
    
    let progress_time = (currentTime / duration)*100;
    progress.style.width = `${progress_time}%`;
    // console.log(progress_time);
   
    //calculating time in min:sec format for the currentTime  of song 
    let minute_duration = currentTime / 60;
    let second_duration = currentTime % 60;
    // console.log(minute_duration);
    // console.log(second_duration);

    
    //continue fron here .
    if(minute_duration < 10 && second_duration < 10)
    {
        current_time.textContent = `0${Math.floor(minute_duration)}:0${Math.floor(second_duration)}`;
    }
    else if(minute_duration < 10)
    {
        current_time.textContent = `0${Math.floor(minute_duration)}:${Math.floor(second_duration)}`;
    }
    else if(second_duration < 10 )
    {
        current_time.textContent = `${Math.floor(minute_duration)}:0${Math.floor(second_duration)}`;
    }
    else{
    current_time.textContent = `${Math.floor(minute_duration)}:${Math.floor(second_duration)}`;//there is error in this line .
    }

    //calculating time in min:sec format for the duration of song 
    //the time that has been printed in are floating value we have to take the floor then it will work fine.
    let total_min = duration / 60;
    let total_sec = duration % 60;
    total_duration.textContent = `${Math.floor(total_min)}:${Math.floor(total_sec)}`;

    //setting the printing fo time in 00:00 format


    // i think this code might be optimised using the ternay operator .
    if(total_min < 10 && total_sec < 10)
    {
        total_duration.textContent = `0${Math.floor(total_min)}:0${Math.floor(total_sec)}`;
    }
    else if(minute_duration < 10)
    {
        total_duration.textContent = `0${Math.floor(total_min)}:${Math.floor(total_sec)}`;
    }
    else if(second_duration < 10 )
    {
        total_duration.textContent = `${Math.floor(total_min)}:0${Math.floor(total_sec)}`;
    }
    else{
    current_time.textContent = `${Math.floor(minute_duration)}:${Math.floor(second_duration)}`;//there is error in this line .
    }
});

//end of the  timeupdate

//progress onclick functionalities(when we will click anywhere on the progress bar then it will start running the song from 
// there )
//but it is not working 

progress_div.addEventListener("click",(event) =>{
    const {duration} = music;//duration of the music
    let move_progress = (event.offsetX / event.srcElement.currentWidth)*duration;
    console.log("value of the event.offsetXt is ")
    // console.log(event);
    console.log(event.offsetX);

    console.log("value of the event.srcElement is ");

    console.log(event.srcElement);

    console.log("value of the event.srcElement is ");

    
    console.log("value of the event.srcElement.currentWidth is ");

    console.log(event.srcElement.currentWidth);

    console.log("value of the duration is ");
    console.log(duration);




    let seekto = move_progress;
    if (!isFinite(seekto)) {
        console.log("value of seek to is ");
        console.log(seekto);
        music.currentTime = seekto;
    }
//    music.currentTime = move_progress;
    // length.currentTime = move_progress;
   
    console.log(move_progress);
})


const nextSong = () =>{
    songindex = (songindex + 1) % songs.length;
    loadSong(songs[songindex]);  
    //isPlaying ? pauseMusic() : playMusic();
    playMusic();
    music.addEventListener("ended",nextSong);
}

const prevSong = () =>{
    songindex = (songindex - 1 + songs.length) % songs.length;
    loadSong(songs[songindex]);
    //isPlaying ? pauseMusic() : playMusic();
    playMusic();
    music.addEventListener("ended",nextSong);
   //i have commented out the above line bcz we alway
}

//music.addEventListener("ended",nextSong);//my animation is not working perfectly

next.addEventListener("click",nextSong);
prev.addEventListener("click" , prevSong);
music.addEventListener("ended",nextSong);

//it is not working (discuss with the friend or google but i dont think that we can do google bcz i would not be able raise a question until i will show my code . )
//my animation is not working perfectly
//this statement ans the above if else statement is same .
/*
next.addEventListener("click",nextSong)
{
  playMusic();
}
prev.addEventListener("click" , prevSong)
{
    playMusic();

}
*/
