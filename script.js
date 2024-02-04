console.log("Welcome to Spotify");

//initialise the variables
let song_index=0;
let audio_element=new Audio('songs/1.mp3');
let master_play=document.getElementById('master_play');
let my_progress_bar=document.getElementById('my_progress_bar');
let gif=document.getElementById('gif');
let master_song_name=document.getElementById('master_song_name');
let song_items=Array.from(document.getElementsByClassName("song_item"));

let songs=[
    {song_name: "Tum Prem Ho ❤ (Love Mashup)", file_path:"songs/1.mp3", cover_path: "covers/1.png"},
    {song_name: "OONCHI OONCHI DEEWAREIN: Yaariyan 2", file_path:"songs/2.mp3", cover_path: "covers/2.png"},
    {song_name: "Abhi Na Jao Chhod Kar | Audio Song", file_path:"songs/3.mp3", cover_path: "covers/3.png"},
    {song_name: "TERE HAWALE | (Slowed+Reverb)", file_path:"songs/4.mp3", cover_path: "covers/4.png"},
    {song_name: "Ek Phool X I Like Me Better (Love Mashup)", file_path:"songs/5.mp3", cover_path: "covers/5.png"},
    {song_name: "Saudebaazi [Lofi + Slowed + Reverb]", file_path:"songs/6.mp3", cover_path: "covers/6.png"},
]

song_items.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].cover_path;
    element.getElementsByClassName("song_name")[0].innerText=songs[i].song_name;
})

//audio_element.play();

//handle play/pause click
master_play.addEventListener('click',()=>{
    if(audio_element.paused || audio_element.currentTime<=0){
        audio_element.play();
        master_play.classList.remove('fa-circle-play');
        master_play.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audio_element.pause();
        master_play.classList.remove('fa-circle-pause');
        master_play.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//listen to events
audio_element.addEventListener("timeupdate",()=>{
    // update seekbar
    progress = parseInt((audio_element.currentTime/audio_element.duration)*100);
    my_progress_bar.value=progress;
})

my_progress_bar.addEventListener("change",()=>{
    audio_element.currentTime=my_progress_bar.value*audio_element.duration/100;
})

const make_all_plays=()=>{
    Array.from(document.getElementsByClassName('song_item_play')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName("song_item_play")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        make_all_plays();
        song_index=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audio_element.src=`songs/${song_index+1}.mp3`;
        master_song_name.innerText=songs[song_index].song_name;
        audio_element.currentTime=0;
        audio_element.play();
        gif.style.opacity=1;
        master_play.classList.remove('fa-circle-play');
        master_play.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    // song_index+=1;
    if (song_index>=5){
        song_index=0
    }
    else{
        song_index+=1;
    }
    audio_element.src=`songs/${song_index+1}.mp3`;
    master_song_name.innerText=songs[song_index].song_name;
    audio_element.currentTime=0;
    audio_element.play();
    master_play.classList.remove('fa-circle-play');
    master_play.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    // song_index-=1;
    if (song_index<=0){
        song_index=0
    }
    else{
        song_index-=1;
    }
    audio_element.src=`songs/${song_index+1}.mp3`;
    master_song_name.innerText=songs[song_index].song_name;
    audio_element.currentTime=0;
    audio_element.play();
    master_play.classList.remove('fa-circle-play');
    master_play.classList.add('fa-circle-pause');
})