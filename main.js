song1="";
song2="";
song1_status="";
song2_status="";
scoreRightwrist=0;
scoreLeftwrist=0;
rightwristX=0;
rightwristY=0;
leftwristX=0;
leftwristY=0;

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function modelLoaded(){
    console.log("poseNet is intialized and starting");
}

function draw(){
    image(video,0,0,600,500);
    fill("pink");
    stroke("green");
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if(scoreRightwrist>0.2){
        circle(rightwristX,rightwristY,30);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="playing song 1 harry potter theme";
        }
    }
    if(scoreLeftwrist>0.2){
        circle(leftwristX,leftwristY,30);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="playing song 2 peter pan theme";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(4);
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        scoreRightwrist= results[0].pose.keypoints[10].score;
        scoreLeftwrist= results[0].pose.keypoints[9].score;
        rightwristX= results[0].pose.rightwrist.x;
        rightwristY= results[0].pose.rightwrist.y;
        leftwristX= results[0].pose.leftwrist.x;
        leftwristY= results[0].pose.leftwrist.y;
        console.log("rightwristX = "+rightwristX+" rightwristY = "+rightwristY);
        console.log("leftwristX = "+leftwristX+" leftwristY = "+leftwristY);
        console.log("rightwristscore = "+scoreRightwrist+" leftwristscore" + scoreLeftwrist);
    }
}