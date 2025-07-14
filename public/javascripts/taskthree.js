import storeSubject from '/utils/subject_storage.js'
import store from '/utils/apple_storage.js'
import {
  apple_instructions,
  bird_instructions
} from '/instructions/task3/instructions.js'
//import the data storing script
import {
  postData,
  getData,
  putData
} from '/utils/data.js'
//get the current data stored, unpack it as object
const {
  data
} = store.getState();
//check the timezone
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//this is for testing purpose only
// const timezone = "Europe/Berlin"
//create an empty object to store the new experiment data
let experiment = {};
let sessionData = {};
let currentSubject = {};
let currentSubjectID;

const urlParams = new URLSearchParams(window.location.search);
const subjectNumParam = urlParams.get('subject');
const ageGroupParam = urlParams.get('age');
const id = urlParams.get('id');
let subjects = [];
let subjectNum;
let ageGroup;
let gameOn = false;
let gameOrder = [];
let gameIndex = 0;
const $instructionScreen = document.querySelector("#instructionContainer");
let apple_instructionPages = [];
let bird_instructionPages = [];
let apple_instTexts = [];
let bird_instTexts = [];
let appleNextBtns = [];
let birdNextBtns = [];
const pathToSlides = "/instructions/task3/"
let ruFinishedOn = false;
let ruFinishedClicked = false;

document.querySelector('.thanks-img').style.display = "none";
document.querySelector('.thanks-img').style.opacity = 0;

//first thing first,
//set up instructions
// setUpInstruction(apple_instructions);
// setUpInstruction(bird_instructions);

function showInstruction() {

  //if there's a canvas
  if (document.querySelector('canvas')) {
    fadeOut(document.querySelector('canvas'));
  }

  if (gameOrder[gameIndex] == "sunLeft" || gameOrder[gameIndex] == "sunRight") {
    for (let i = 0; i < apple_instructionPages.length; i++) {
      $instructionScreen.appendChild(apple_instructionPages[i]);
    }
    apple_instructionPages[0].style.display = "block";
    if (apple_instTexts.length > 0) {
      fadeIn(apple_instTexts[0], 0);
      fadeIn(appleNextBtns[0], 1, enableNextButton);
    }

  } else {
    for (let i = 0; i < bird_instructionPages.length; i++) {
      $instructionScreen.appendChild(bird_instructionPages[i]);
    }
    bird_instructionPages[0].style.display = "block";
    if (bird_instTexts.length > 0) {
      fadeIn(bird_instTexts[0], 0);
      fadeIn(birdNextBtns[0], 1, enableNextButton);
    }
  }

  fadeIn($instructionScreen, 0, null);
  // const instTexts = document.querySelectorAll('.instruction');
  // const nextBtns = document.querySelectorAll('div.nextBtn');

}

function enableNextButton(elem) {
  elem.style.pointerEvents = "auto";
}

// function showInstruction() {
//   if (gameOrder[gameIndex] == "apple") {
//     $instructionMsg.innerHTML = "This is the instruction for the apple game";
//   } else {
//     $instructionMsg.innerHTML = "This is the instruction for the birds game";
//   }
//   // const instruction = select('#instruction');
//   // if(instruction.hasClass('hidden'))
//   //   instruction.removeClass('hidden');
//   document.querySelector('#instruction').style.display = "flex";
// }

function setUpInstruction(arr) {
  let instructionPages = [];
  let instTexts = [];
  let nextBtns = [];

  for (let i = 0; i < arr.length; i++) {
    const inst = arr[i];
    let $instruction = document.createElement("div");
    $instruction.classList.add('instructionWrapper');
    // $instructionScreen.appendChild($instruction)
    if (inst.background != null && inst.isVideo != 1) {
      $instruction.innerHTML += `<img src=${pathToSlides+inst.background}>`;
    }
    if (inst.bgColor != null) {
      $instruction.style.backgroundColor = inst.bgColor;
    }
    if (inst.text != null) {
      let instructionText = document.createElement('div');
      instructionText.classList.add('instruction');
      instructionText.innerHTML = inst.text.en;
      $instruction.appendChild(instructionText);

      if (inst.x != null && inst.y != null && inst.textAlign != null) {
        if (i == arr.length - 1) {
          //last slide apply transform
          instructionText.style.transform = "translate(-50%, 0)";
          instructionText.style.left = inst.x;
        } else {
          instructionText.style.right = inst.x;
        }
        instructionText.style.top = inst.y;
        instructionText.style.textAlign = inst.textAlign;
      }


      instTexts.push(instructionText);
      // $instruction.innerHTML += `<div class="instruction">${inst.text.en}</div>`;
    }
    //not the last screen, so put the next button
    let nextBtn = document.createElement('div');
    if (i < arr.length - 1) {
      // $instruction.innerHTML += `<div class="nextBtn"></div>`;
      nextBtn.classList.add('nextBtn');
    } else {
      //it's the last screen - put startGameButton
      nextBtn.classList.add('startGameButton');
      nextBtn.innerHTML = "Start Game"
      nextBtn.id = "startGameBtn"
      if(currentSubject != null && currentSubject.lang=="de"){
        nextBtn.innerHTML = "Spiel starten"
      }
    }
    $instruction.appendChild(nextBtn);
    nextBtns.push(nextBtn);
    instructionPages.push($instruction);
  }
  // const nextBtns = document.querySelectorAll('div.nextBtn');
  // const instTexts = document.querySelectorAll('div.instruction');
  //now set up buttons
  for (let i = 0; i < nextBtns.length; i++) {
    nextBtns[i].addEventListener('click', function() {
      this.pointerEvents = "none";
      //if it's not the last screen button
      if (i < nextBtns.length - 1) {
        let delay = parseInt(arr[i + 1].textDelay);
        fadeIn(instructionPages[i + 1]);
        fadeIn(instTexts[i + 1], delay);
        fadeIn(nextBtns[i + 1], delay + 1, enableNextButton);
        fadeOutDelay(instructionPages[i], delay, true);
      } else {
        //it's the last slide
        //the button should trigger start game
        fadeOutDelay(instructionPages[i], 0, true);
        startTask();
      }
    })
  }
  //once all set, hide all
  for (let i = 0; i < instructionPages.length; i++) {
    instructionPages[i].style.display = "none";
  }

  if (arr[0].mode == "apple") {
    apple_instructionPages = instructionPages;
    apple_instTexts = instTexts;
    appleNextBtns = nextBtns;
  } else {
    bird_instructionPages = instructionPages;
    bird_instTexts = instTexts;
    birdNextBtns = nextBtns;
  }
}

// fetch the subjectNumbers collection
async function fetchSubject() {
  let subjectDatabaseURL = "/subjects";
  if(timezone != "America/New_York"){
    subjectDatabaseURL = "/subjectsBerlin";
    console.log("connect to "+subjectDatabaseURL);
  }
  let response = await fetch(subjectDatabaseURL);
  // let response = await fetch('/subjects');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function fetchSubjectById() {
  let singleSubDatabaseURL = "/single_subject/";
  if(timezone != "America/New_York"){
    singleSubDatabaseURL = "/single_subjectBerlin/";
  }
  let response = await fetch(singleSubDatabaseURL+id);
  // let response = await fetch('/single_subject/' + id);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

fetchSubjectById().then((data) => {
    
    //now do something with it
    subjectNum = parseInt(subjectNumParam);
    ageGroup = parseInt(ageGroupParam);
    currentSubject = data.experiment;
    console.log(currentSubject.lang);
    setUpInstruction(apple_instructions);
    setUpInstruction(bird_instructions);
    //swap out all the instruction if this is german
    if (currentSubject.lang == "de") {
      //say german
      for (let i = 0; i < apple_instTexts.length; i++) {
        if (apple_instructions[i].text.de != null) {
          apple_instTexts[i].innerHTML = apple_instructions[i].text.de;
        }
      }

      for (let i = 0; i < bird_instTexts.length; i++) {
        if (bird_instructions[i].text.de != null) {
          bird_instTexts[i].innerHTML = bird_instructions[i].text.de;
        }
      }

      // // document.querySelector('#startGameBtn').innerHTML = "Spiel starten"
      // if(document.querySelector('#startGameBtn')!= null){
      //   document.querySelector('#startGameBtn').innerHTML = "Spiel starten"
      // }
      document.querySelector('#ruFinishedBtn').innerHTML = "Spiel beenden"
      document.querySelector('.thanks-img').classList.add('thanks-de');
      // document.querySelector('#thanks-msg').innerHTML = "Vielen Dank für Ihre Teilnahme"
    }
    //set the game order based on the subjecNum
// subject 1. apple first, birds second. sun left, cloud left.
// subject 2. apple first, birds second. sun right, cloud left.
// subject 3. apple first, birds second. sun left, cloud right.
// subject 4. apple first, birds second. sun right, cloud right.
// subject 5. birds first, apples second. sun left, cloud left.
// subject 6. birds first, apples second. sun right, cloud left.
// subject 7. birds first, apples second. sun left, cloud right.
// subject 8. birds first, apples second. sun right, cloud right.
    if (subjectNum % 8 == 1) {
      gameOrder = ["sunLeft", "cloudLeft"];
    } else if(subjectNum % 8 == 2) {
      gameOrder = ["sunRight", "cloudLeft"];
    } else if(subjectNum % 8 == 3) {
      gameOrder = ["sunLeft", "cloudRight"];
    } else if(subjectNum % 8 == 4) {
      gameOrder = ["sunRight", "cloudRight"];
    } else if(subjectNum % 8 == 5) {
      gameOrder = ["cloudLeft", "sunLeft"];
    } else if(subjectNum % 8 == 6) {
      gameOrder = ["cloudLeft", "sunRight"];
    } else if(subjectNum % 8 == 7) {
      gameOrder = ["cloudRight", "sunLeft"];
    } else if(subjectNum % 8 == 0) {
      gameOrder = ["cloudRight", "sunRight"];
    } 
    //but for now just set it as the first one
    // document.querySelector('#startBtn').addEventListener('touchstart', startTask);
    //show instruction
    showInstruction();
  })
  .catch((e) =>
    console.log(e)
  );

function startTask() {
  gameOn = true;
  fadeIn(document.querySelector('canvas'));
  fadeOut(document.querySelector('#instructionContainer'));
  // document.querySelector('canvas').style.display = "block";
  // document.querySelector('#instructionContainer').style.display = "none";
  //decide which game to present
  gameMode = gameOrder[gameIndex];
  initGame(gameMode);
  // if (gameMode == 'birds') {
  //   initGame('birds');
  // } else {
  //   initGame('sunLeft');
  // }
}


let myObjectNum = 10;
let myObjectSize = 80;

let myObjectX = [];
let myObjectY = [];
let myObjects = [];

let apples = [];
let birds = [];
let overMyObject = [];
// let locked = [];
let xOffset = [];
let yOffset = [];

let isMoving = [];
let hasMoved = [];
let noMoreMove = [];

let onTree = [];

let orderCounter = 1;
let myOrder = [];

let apple;
let apple_shadow;
let bird;
let bird_shadow;
let bg_sky;
let bg_sun_left;
let bg_sun_right;
let bg_menu;
let sun;
let cloud;

let tree;
let object;
let object_shadow;

let showOrderNumbers = false;
let showThanks = false;

let myDay;
let myMonth;
let myYear;
let myHour;
let myMinutes;
let mySeconds;
let dateAndTimeStarted;
let timeTaken;

let myTime = {
  startTime: 0,
  endTIme: 0
};

let myCanvas;

let gameMode = "menu";
let instructionDiv;
// let instructionMsg;
let startBtn;

window.preload = function() {
  // preload() runs once
  // apple = loadImage("/images/apples/apple.png");
  // apple_shadow = loadImage("/images/apples/apple_shadow.png");
  apple = loadImage("/images/apples/apple_small.png");
  apple_shadow = loadImage("/images/apples/apple_small_shadowRotated.png");

  bg_sky = loadImage("/images/apples/tree.png");
  bg_sun_left = loadImage("/images/apples/tree.png");
  bg_sun_right = loadImage("/images/apples/tree.png");

  bird = loadImage("/images/apples/bird_small.png");
  bird_shadow = loadImage("/images/apples/bird_small_shadow2.png");

  bg_menu = loadImage("/images/apples/tree.png");
  sun = loadImage("/images/apples/sun.png");
  cloud = loadImage("/images/apples/cloud_150h.png");
}

let ruFinishedBtn;

window.setup = function() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  myObjectSize = windowWidth / myObjectNum;
  textSize(myObjectSize / 3);
  //make an instruction screen
  // instructionDiv = select('#instruction');
  // instructionMsg = select('#instructionMsg');
  ruFinishedBtn = select("#ruFinishedBtn");
  ruFinishedBtn.addClass('hidden');
}

window.draw = function() {
  if (gameOn) {
    if (gameMode != 'menu') {
      background(220);
      //draw the background
      image(tree, 0, 0, width, height);
      //if the game mode is one of the apples then draw the sun
      if (gameMode == 'sunLeft') {
        image(sun, 325, 15);
      } else if (gameMode == 'sunRight') {
        image(sun, 880, 15);
      } else if (gameMode == 'cloudLeft') {
        image(cloud, 300, 50);
      } else if(gameMode == 'cloudRight'){
        image(cloud, 900, 50);
      }

      drawObjects();
      if (showOrderNumbers) {
        fill(230);
        textSize(myObjectSize / 3);
        text(dateAndTimeStarted + "\nTime Taken: " + round(timeTaken) + " secs", 40, windowHeight - myObjectSize);
        ellipseMode(CORNER);
        ellipse(width - myObjectSize, height - myObjectSize, myObjectSize / 2, myObjectSize / 2);
      }
    }
  }
}


function initGame(mode) {
  removeElements();
  gameMode = mode;
  bigReset(gameMode);
  console.log('load the game with the mode: ' + mode);
}

function bigReset(mode) {
  switch (mode) {
    case "sunLeft":
      tree = bg_sun_left;
      object = apple;
      object_shadow = apple_shadow;
      break;
    case "sunRight":
      tree = bg_sun_right;
      object = apple;
      object_shadow = apple_shadow;
      break;
    case "cloudLeft":
      tree = bg_sky;
      object = bird;
      object_shadow = bird_shadow;
      break;
    case "cloudRight":
      tree = bg_sky;
      object = bird;
      object_shadow = bird_shadow;
      break;
    default:
      tree = bg_sun_left;
      object = apple;
      object_shadow = apple_shadow;
  }

  for (let i = 0; i < myObjectNum; i++) {
    console.log(myObjectSize, windowHeight);
    myObjects[i] = {};
    myObjects[i].x = i * myObjectSize;
    myObjects[i].y = windowHeight - myObjectSize;
    // myObjects[i].y = windowHeight - myObjectSize * 1.3;

    // myObjectX[i] = i * myObjectSize;
    // myObjectY[i] = windowHeight - myObjectSize * 1.3;
    //console.log(gameMode + i + ": " + myObjects[i].x + ", " + myObjects[i].y);

    overMyObject[i] = false;
    xOffset[i] = 0.0;
    yOffset[i] = 0.0;

    isMoving[i] = false;
    hasMoved[i] = false;
    noMoreMove[i] = false;
    onTree[i] = false;
    myOrder[i] = myObjectNum;
  }
  orderCounter = 1;
  showOrderNumbers = false;
  showThanks = false;
  setMyDate();
  ruFinishedOn = false;
  ruFinishedClicked = false;
  console.log("RESET");
}

function drawObjects() {
  for (let i = 0; i < myObjectNum; i++) {
    if (noMoreMove[i]) {
      image(object, myObjects[i].x, myObjects[i].y, myObjectSize, myObjectSize);
      // image(object, myObjectX[i], myObjectY[i], myObjectSize, myObjectSize);
    } else {
      image(object_shadow, myObjects[i].x, myObjects[i].y, myObjectSize, myObjectSize);
      // image(object_shadow, myObjectX[i], myObjectY[i], myObjectSize, myObjectSize);
    }
    noFill();
    //rect(myObjectX[i], myObjectY[i], myObjectSize, myObjectSize);

    if (showOrderNumbers) {
      textSize(myObjectSize / 1.4);
      fill(0);
      // text(myOrder[i], myObjectX[i] + 2 + myObjectSize * .35, myObjectY[i] + 3 + myObjectSize * .8);
      text(myOrder[i], myObjects[i].x + 2 + myObjectSize * .35, myObjects[i].y + 3 + myObjectSize * .8);
      textSize(myObjectSize / 1.45);
      fill(220, 220, 255);
      text(myOrder[i], myObjects[i].x + myObjectSize * .35, myObjects[i].y + myObjectSize * .8);
      // text(myOrder[i], myObjectX[i] + myObjectSize * .35, myObjectY[i] + myObjectSize * .8);
    }

    if (showThanks) {
      textSize(myObjectSize / 1.4);
      fill(0);
      text("Thanks!");
    }
  }
}

function setMyDate() {
  myDay = nf(day(), 2);
  myMonth = nf(month(), 2);
  myYear = year();
  myHour = nf(hour(), 2);
  myMinutes = nf(minute(), 2);
  mySeconds = nf(second(), 2);
  dateAndTimeStarted =
    myMonth +
    "/" +
    myDay +
    "/" +
    myYear +
    " " +
    myHour +
    ":" +
    myMinutes +
    ":" +
    mySeconds;

  myTime.startTime = millis();
  myTime.endTime = 0;
}

function checkOnTree() {
  if (!gameOn)
    return;
  for (let i = 0; i < myObjectNum; i++) {
    // if (myObjectY[i] < height * 0.57) {
    if (myObjects[i].y < height * 0.57) {
      onTree[i] = true;
    } else {
      onTree[i] = false;
    }
  }
}

function checkTouchOver() {
  if (!gameOn)
    return;

  for (let i = 0; i < myObjectNum; i++) {
    // if (
    //   mouseX > myObjectX[i] &&
    //   mouseX < myObjectX[i] + myObjectSize &&
    //   mouseY > myObjectY[i] &&
    //   mouseY < myObjectY[i] + myObjectSize
    // ) {
    //   overMyObject[i] = true;
    // } else {
    //   overMyObject[i] = false;
    // }
    if (
      mouseX > myObjects[i].x &&
      mouseX < myObjects[i].x + myObjectSize &&
      mouseY > myObjects[i].y &&
      mouseY < myObjects[i].y + myObjectSize
    ) {
      overMyObject[i] = true;
    } else {
      overMyObject[i] = false;
    }
  }
}

window.touchStarted = function() {
  checkTouchOver();
  checkOnTree();

  if (myObjects.length < 1 || !gameOn)
    return;

  // for (let i = 0; i < myObjectNum; i++) {
  //   if (overMyObject[i]) {
  //     // console.log("hey it's over apple :" + i);
  //   }
  // }

  for (let i = 0; i < myObjectNum; i++) {
    if (overMyObject[i] && !noMoreMove[i]) {
      for (let j = 0; j < myObjectNum; j++) {
        if (hasMoved[j] && !overMyObject[j] && onTree[j]) {
          noMoreMove[j] = true;
          hasMoved[j] = false;
          myOrder[j] = orderCounter;
          orderCounter++;
        }
      }
    }

    if (overMyObject[i] && !noMoreMove[i]) {
      isMoving[i] = true;
    }
    xOffset[i] = mouseX - myObjects[i].x;
    yOffset[i] = mouseY - myObjects[i].y;
  }

  // console.log("order counter: " + orderCounter);

  if (orderCounter == myObjectNum && mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    showOrderNumbers = !showOrderNumbers;
    // // for (let i = 0; i < myObjectNum; i++) {
    // //   hasMoved[j] = false;
    // //   noMoreMove[i] = false;
    // // }
    //
    // //game is all finished
    // //record the end time
    // //check if the end time has already been set
    // if (myTime.endTime == 0) {
    //   myTime.endTime = millis();
    //   console.log("end time: "+myTime.endTime);
    //   timeTaken = (myTime.endTime - myTime.startTime) * .001;
    // }
  }


  if (showOrderNumbers && mouseX < width && mouseX > width - myObjectSize && mouseY < height && mouseY > height - myObjectSize) {
    saveCanvas(myCanvas, dateAndTimeStarted + ".jpg");
    // bigReset();
    // setUpStartMenu();
  }

  //check if the game is finished
  if (orderCounter == myObjectNum && gameOn) {

    //show are you finished screen
    if (ruFinishedBtn.hasClass('hidden') && !ruFinishedOn) {
      setTimeout(ruFinished, 3000);
      ruFinishedOn = true;
    }
  }

  return false;
}



function ruFinished() {
  console.log("show r u finished button")
  fadeIn(document.querySelector("#ruFinishedBtn"), 0, enableNextButton);
  // btn_sunLeft.position(width*.3, height*.2);
  ruFinishedBtn.touchEnded(() => {
    console.log("button clicked");
    ruFinishedBtn.hide();
    if(ruFinishedClicked==true){
      console.log("button clicked already don't do anything");
      return;
    }
    //turn off the game
    gameOn = false;
    ruFinishedClicked = true;
    //decide if this task has been done
    //calculate the time
    if (myTime.endTime == 0) {
      myTime.endTime = millis();
      // console.log("end time: "+myTime.endTime);
      timeTaken = (myTime.endTime - myTime.startTime) * .001;
    }
    if (gameIndex > 0) {
      //all two tasks are finished
      //wrap it up
      //save the game data
      if (gameMode == "cloudLeft" || gameMode == "cloudRight") {
        //if the current game mode was birds then package the current data before loading the new one
        for (let i = 0; i < myObjects.length; i++) {
          birds[i] = {
            x: myObjects[i].x,
            y: myObjects[i].y,
            order: myOrder[i] + 1,
            originalOrder: i + 1
          };
        }
        sessionData.birds = {
          position: birds,
          startTime: dateAndTimeStarted,
          timeTaken: round(timeTaken)
        }
      } else {
        // the current game is apples
        // apple game has been finished
        for (let i = 0; i < myObjects.length; i++) {
          apples[i] = {
            x: myObjects[i].x,
            y: myObjects[i].y,
            order: myOrder[i] + 1,
            originalOrder: i + 1
          };
        }
        sessionData.apples = {
          position: apples,
          startTime: dateAndTimeStarted,
          timeTaken: round(timeTaken)
        }
      }
      finishGame();
    } else {
      //only the first game is finished
      //restart the game with the next mode
      //save the data
      if (gameMode == "cloudLeft" || gameMode == "cloudRight") {
        //if the current game mode was birds then package the current data before loading the new one
        for (let i = 0; i < myObjects.length; i++) {
          birds[i] = {
            x: myObjects[i].x,
            y: myObjects[i].y,
            order: myOrder[i] + 1,
            originalOrder: i + 1
          };
        }
        sessionData.birds = {
          position: birds,
          startTime: dateAndTimeStarted,
          timeTaken: round(timeTaken)
        }
      } else {
        // the current game is apples
        // apple game has been finished
        for (let i = 0; i < myObjects.length; i++) {
          apples[i] = {
            x: myObjects[i].x,
            y: myObjects[i].y,
            order: myOrder[i] + 1,
            originalOrder: i + 1
          };
        }
        sessionData.apples = {
          position: apples,
          startTime: dateAndTimeStarted,
          timeTaken: round(timeTaken)
        }
      }
      orderCounter = 0;
      //increment the gameIndex
      gameIndex++;
      showInstruction();
    }
    //hide the button
    // fadeOut(document.querySelector("#ruFinishedBtn"),0.5, true);
  });
}



function finishGame() {
  let updateDataType = "UPDATE_DATA";
  let addDataType = "ADD_DATA";
  if(timezone != "America/New_York"){
      updateDataType = "UPDATE_DATA_BERLIN";
      addDataType = "ADD_DATA_BERLIN";
  }
  const thanks = document.querySelector(".thanks-img");
  // thanks.removeClass("hidden");
  fadeInThanks(thanks, 1, 1);
  //turn off the game
  gameOn = false;
  //post the sessionData to the database
  //update the subject data
  currentSubject.tasks.three = 1;
  experiment.id = id;
  experiment.experiment = currentSubject;
  //update the database
  storeSubject.dispatch({
    type: updateDataType,
    payload: {
      data: experiment
    }
  });
  //package the data
  sessionData.subject = experiment;
  sessionData.gameOrder = gameOrder;
  //then store it to the storage which will post it to the database
  store.dispatch({
    type: addDataType,
    payload: {
      data: sessionData
    }
  });

  setTimeout(function() {
    window.location.href = "/" + "?subject=" + currentSubject.subjectNum + "&id=" + experiment.id + "&age=" + currentSubject.age.year;
  }, 6000);
}

window.touchMoved = function() {
  if (myObjects.length < 1 || !gameOn)
    return;
  for (let i = myObjectNum - 1; i >= 0; i--) {
    if (!noMoreMove[i] && isMoving[i]) {
      myObjects[i].x = mouseX - xOffset[i];
      myObjects[i].y = mouseY - yOffset[i];
      //check the boundary
    const boundary = {left:-31, right: 1255, top: -25, bottom: 888};
    if(myObjects[i].x < boundary.left){
      // console.log('hello too left');
      myObjects[i].x = boundary.left;
    } else if(myObjects[i].x > boundary.right){
      // console.log('hello too right');
      myObjects[i].x = boundary.right;
    }

    if(myObjects[i].y < boundary.top){
      myObjects[i].y = boundary.top;
    } else if(myObjects[i].y > boundary.bottom){
      myObjects[i].y = boundary.bottom;
    }
      break;
    }
  }
  
  return false;
}

window.touchEnded = function() {
  if (myObjects.length < 1 || !gameOn)
    return;
  for (let i = 0; i < myObjectNum; i++) {
    //check the boundary
    const boundary = {left:-31, right: 1255, top: -25, bottom: 888};
    if(myObjects[i].x < boundary.left){
      // console.log('hello too left');
      myObjects[i].x = boundary.left;
    } else if(myObjects[i].x > boundary.right){
      // console.log('hello too right');
      myObjects[i].x = boundary.right;
    }

    if(myObjects[i].y < boundary.top){
      myObjects[i].y = boundary.top;
    } else if(myObjects[i].y > boundary.bottom){
      myObjects[i].y = boundary.bottom;
    }
    //   myObjects[i].x == myObjectSize/2 - xOffset[i];
    // } else if(mouseX > width - myObjectSize/2){
    //   myObjects[i].x == width - myObjectSize/2 - xOffset[i];
    // }
    if (isMoving[i]) {
      isMoving[i] = false;
      hasMoved[i] = true;
    }
  }
  console.log("touch ended");
  // return false;
}

window.mouseClicked = function() {
  // console.log("mouse clicked");
  return false;
}


function fadeIn(elem, delay, func = null) {
  elem.style.display = "block";
  elem.style.opacity = 0;
  gsap.to(elem, {
    duration: 1,
    ease: "power1.inOut",
    opacity: 1,
    delay: delay,
    onComplete: func,
    onCompleteParams: [elem]
  });
}

function fadeInThanks(elem, duration, delay, display = "block") {
  elem.style.display = display;
  //elem.style.opacity = 0;
  gsap.to(elem, {
    duration: duration,
    ease: "power1.inOut",
    opacity: 1,
    y: 300,
    scale: 1.1,
    transformOrigin: "center center",
    delay: delay
  });
}

function fadeOut(elem, duration, hide) {
  gsap.to(elem, {
    duration: duration,
    ease: "power1.inOut",
    opacity: 0,
    onComplete: hide ? hideElem : null,
    onCompleteParams: [elem]
  });
}

function fadeOutDelay(elem, delay, hide) {
  gsap.to(elem, {
    duration: 1,
    delay: delay,
    ease: "power1.inOut",
    opacity: 0,
    onComplete: hide ? hideElem : null,
    onCompleteParams: [elem]
  });
}

function hideElem(elem) {
  elem.style.display = "none";
}
