import storeSubject from '/utils/subject_storage.js'
//import the data storing script
import {
  postData,
  getData,
  putData
} from '/utils/data.js'
// import store from '/utils/subject_storage.js'

//german
const germanMsgs = {
  welcomeMsg: "Demographische Angaben",
  enterAgeSubjectMsg: "Bitte geben Sie Alter und ID des Kindes ein.",
  ageLabel: "Alter",
  yearLabel: "Jahr",
  monthLabel: "Monate",
  enterSubjectNumMsg: "ID",
  selectSubNumMsg: "Wählen Sie unten die ID aus.",
  generateNewIDButton: "Neue ID generieren?",
  checkSubjectID: "Überprüfung der ID",
  startNewTestBtn: "Eine neue Sitzung starten",
  subjectInfoLabel: "Dies ist ein neues Thema. Bitte wählen Sie das Geschlecht aus.",
  genderLabel: "Geschlecht",
  parentalConsentLabel: "Einverständniserklärung der Erziehungsberechtigten liegt vor.",
  yes: "Ja",
  no: "Nein",
  didNotMatch: "Die ausgewählte ID stimmt nicht mit unseren Daten überein, daher wurde eine neue ID erstellt. Bitte geben Sie das Geschlecht des Kindes ein.",
  tryAgain: "Diese*r Teilnehmer*in hat alle Aufgaben beendet. Eine neue Sitzung mit dem nächsten Kind beginnen.",
  male: "männlich",
  female: "weiblich",
  nonbinary: "keine Angabe",
  rabbitTaskButton: "Aufgabe 1",
  treeTaskButton: "Aufgabe 2",
  rainTaskButton: "Aufgabe 3"
}

const englishMsgs = {
  welcomeMsg: "Demographics",
  enterAgeSubjectMsg: "Please enter the age and participant number.",
  ageLabel: "Age",
  yearLabel: "Year",
  monthLabel: "Month",
  enterSubjectNumMsg: "Participant Number",
  selectSubNumMsg: "Select the participant number below",
  generateNewIDButton: "Generate New Instead?",
  checkSubjectID: "Check Participant Number",
  startNewTestBtn: "Start A New Test",
  subjectInfoLabel: "This is a new participant. Please select the gender.",
  genderLabel: "Gender",
  parentalConsentLabel: "Parental Consent Given",
  yes: "Yes",
  no: "No",
  didNotMatch: "The participant number you entered did not match our record so we generated a new one. Please select their gender.",
  tryAgain: "This participant has finished all trials. Start a new test session with the next participant.",
  male: "Male",
  female: "Female",
  nonbinary: "Prefer not to answer",
  rabbitTaskButton: "Trial 1",
  treeTaskButton: "Trial 2",
  rainTaskButton: "Trial 3"
}

//get the current data stored, unpack it as object
// const {
//   data
// } = store.getState();
//create an empty object to store the new experiment data
let experiment = {};
let sessionData = {};
let newSubject = false;
let lang = "en";

const urlParams = new URLSearchParams(window.location.search);
const subjectNumParam = urlParams.get('subject');
const ageGroupParam = urlParams.get('age');
const id = urlParams.get('id');
let subjects = [];
let ageSortedSubjects = [];
let sortedSubjectIds = [];
let newId;
let age;
let subject;
let ageRange = 30; //set it to the number that covers all the age ranges and then some.

document.body.addEventListener('touchstart', () => {
  document.activeElement.blur();
});

for (let i = 0; i < ageRange; i++) {
  ageSortedSubjects.push([]);
  sortedSubjectIds.push([]);
}

//get the reference to the HTML elements we need
const $appContainer = document.querySelector("#app-container");
const $interface = document.querySelector("#interfaceContainer");
const $inputAgeSubjectNum = document.querySelector('#inputAgeSubjectNum');
const $inputGender = document.querySelector('#inputGender');
// const $submitLanguage = document.querySelector('#submitLanguage');


const $rabbitTaskButton = document.querySelector('#TaskOneButton');
const $treeTaskButton = document.querySelector('#TaskTwoButton');
const $rainTaskButton = document.querySelector('#TaskThreeButton');

const $subjectNumOptions = document.querySelector('#subjectNumOptions');
const $ageYearOptions = document.querySelector('#ageYearOptions');
const $ageMonthOptions = document.querySelector('#ageMonthOptions');
const $genderOptions = document.querySelector('#genderOptions');
const $parentalConsentOptions = document.querySelector('#parentalConsentOptions');
let radios = document.querySelectorAll('input[type=radio][name="radio"]');
let $parentalConsentOptionRow = document.querySelector('#parentalConsentOptionRow');

//buttons
const $generateNewID = document.querySelector('#generateNewIDButton');
const $checkSubjectID = document.querySelector('#checkSubjectID');
const $startNewTest = document.querySelector('#startNewTestBtn');

const spinner = document.getElementById("spinner");

function showSpinner() {
  spinner.classList.add("show");
}

function hideSpinner(){
  spinner.classList.remove("show");
}


$rabbitTaskButton.addEventListener('click', startTheTask);
$treeTaskButton.addEventListener('click', startTheTask);
$rainTaskButton.addEventListener('click', startTheTask);

document.body.addEventListener('touchstart', () => {
  document.activeElement.blur();
});

$appContainer.addEventListener('touchstart', (e)=>{
  if (e.touches[0].clientX < 65){
    e.preventDefault();
    console.log("prevent swipe");
   } 

  // console.log(e.touches[0].clientX);
})

//check time zone;
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//this is for testing purpose only
// const timezone = "Europe/Berlin"
console.log(timezone);
let startIndex = 1;
let databaseURL = '/subjects';
if (timezone == "America/New_York") {
  //if it's new york
  startIndex = 1;
  databaseURL = '/subjects';
  console.log("connected to "+ databaseURL);
} else {
  //in germany
  startIndex = 51; 
  databaseURL = '/subjectsBerlin';
  console.log("connected to " + databaseURL);
}

showSpinner()
//start fetching the subjectNumbers collection
fetch(databaseURL)
  .then((response) => {
    console.log("fetched the "+ databaseURL);
    hideSpinner();
    response.json().then((data) => {
      for (let i in data) {
        let innerarray = [];
        for (let j in data[i]) {
          innerarray.push(data[i][j]);
        }
        // console.log(innerarray);
        // subjects.push(innerarray[1]);
        let thisSubject = innerarray[1];
        const thisSubjectId = innerarray[0];
        // console.log(thisSubjectId);
        if (thisSubject.uniqueId == null) {
          thisSubject.uniqueId = thisSubjectId;
        }
        const ageGroupIndex = parseInt(thisSubject.age.year) - 1;
        ageSortedSubjects[ageGroupIndex].push(thisSubject);
        // sortedSubjectIds[ageGroupIndex].push(thisSubjectId);
      }
      // console.log(ageSortedSubjects);
      // console.log(subjects[0]);
      //do something
      //first check if this is a redirect or not, if it's a redirect
      //then load the data on interface and
      //call checkSubjectID to load other data on the interface
      if (subjectNumParam != null && ageGroupParam != null && id != null) {
        //if this is a redirect, then it must have the subject number param and age
        //check and update the form.
        const subjectNumOptions = document.getElementById('subjectNumOptions');
        subjectNumOptions.value = subjectNumParam;
        experiment.uniqueId = id;
        document.getElementById('ageYearOptions').value = ageGroupParam;
        checkSubjectID();
        fadeInInterface($interface);
      } else {
        //if not, this is a new experiment
        fadeInInterface($interface);
        document.querySelector('#TaskTwoButton').classList.add("disabled");
        document.querySelector('#TaskThreeButton').classList.add("disabled");
        // console.log("fade in the interface");
      }
    });
  })
  .catch((err) => {
    console.log("something went wrong");
  });



//generate the subject num options
for (let i = startIndex; i < startIndex + 50; i++) {
  document.querySelector('#subjectNumOptions').innerHTML += `<option value="${i}">${i}</option>`
}
//bind the click event listeners to the buttons
// $submitLanguage.addEventListener('click', submitLanguageOption);
// function submitLanguageOption(){
//   let ele = document.getElementsByName('radio');
//   for(let i = 0; i < ele.length; i++) {
//       if(ele[i].checked)
//       lang = ele[i].value;
//   }
//   //now hide the button
//   fadeOut($submitLanguage, false);
//   //show the next section
//   fadeIn($inputAgeSubjectNum);
// }



function changeHandler(event) {
  if (this.value === 'en') {
    console.log("english");
    lang = "en";
    changeLanguage(englishMsgs);
  } else if (this.value === 'de') {
    console.log("Deutsch");
    lang = "de";
    changeLanguage(germanMsgs);
  }

}

function changeLanguage(msgs) {
  for (const key in msgs) {
    let selector = '#' + key;
    // console.log(selector, msgs[key]);
    const $msg = document.querySelector(selector);
    if($msg != null){
      $msg.innerHTML = msgs[key];
    }
    // console.log(document.querySelector(selector));
  }

  if (!newSubject) {
    let msg;
    if (lang == "en") {
      msg = "This is an existing participant. Please make sure the info below is correct.";
    } else {
      msg = "Diese ID existiert bereits. Bitte überprüfen Sie, ob die unten stehenden Angaben korrekt sind."
    }
    document.querySelector("#subjectInfoLabel").innerHTML = msg;
  }
}

Array.prototype.forEach.call(radios, function(radio) {
  radio.addEventListener('change', changeHandler);
});

$generateNewID.addEventListener('click', generateNewID);

function generateNewID() {
  let msg;
  if (lang == "en") {
      msg = "We generated a new participant number. Please select their gender.";
  } else {
      msg = "Eine neue ID wurde generiert. Bitte geben Sie das Geschlecht des Kindes ein"
  }
  document.querySelector('#subjectInfoLabel').innerHTML = msg
  //empty all the array
  subjects = [];
  ageSortedSubjects = [];
  sortedSubjectIds = [];

  //if there's any old data, wipe it
  experiment = {};

  for (let i = 0; i < ageRange; i++) {
    ageSortedSubjects.push([]);
    sortedSubjectIds.push([]);
  }

  showSpinner();
  //fetch the data again
  fetch(databaseURL)
    .then((response) => {
      hideSpinner();
      response.json().then((data) => {
        for (let i in data) {
          let innerarray = [];
          for (let j in data[i]) {
            innerarray.push(data[i][j]);
          }
          // console.log(innerarray);
          // subjects.push(innerarray[1]);
          let thisSubject = innerarray[1];
          const thisSubjectId = innerarray[0];
          // // console.log(thisSubjectId);
          // if (thisSubject.uniqueId == null) {
          //   thisSubject.uniqueId = thisSubjectId;
          // }
          const ageGroupIndex = parseInt(thisSubject.age.year) - 1;
          ageSortedSubjects[ageGroupIndex].push(thisSubject);
          // sortedSubjectIds[ageGroupIndex].push(thisSubjectId);
        }
        //done sorting
        //now generate the new id
        //get the age
        const ageGroup = parseInt(document.getElementById('ageYearOptions').value);
        const ageGroupArray = ageSortedSubjects[ageGroup-1];
        let newId = ageGroupArray.length + startIndex;

        document.querySelector('#subjectNumOptions').value = newId;
        resetAllInput();
        //disable the task two and three buttons
        document.querySelector('#TaskTwoButton').classList.add("disabled");
        document.querySelector('#TaskThreeButton').classList.add("disabled");

        if (!$checkSubjectID.classList.contains('disabled')) {
          $checkSubjectID.classList.add('disabled');
        }
        if(ageGroup > 18){
          $parentalConsentOptionRow.style.display = "none";
        } else {
          $parentalConsentOptionRow.style.display = "block";
        }
        fadeIn($inputGender);
        newSubject = true;
      })
    }).catch((err) => {console.log(err)});
  //create a new subject id;

}

function resetAllInput() {
  document.querySelector('#TaskOneButton').classList.remove("disabled");
  document.querySelector('#taskOneCheckbox').classList.remove('checked');
  document.querySelector('#TaskTwoButton').classList.remove("disabled");
  document.querySelector('#taskTwoCheckbox').classList.remove('checked');
  document.querySelector('#TaskThreeButton').classList.remove("disabled");
  document.querySelector('#taskThreeCheckbox').classList.remove('checked');
  document.querySelector('#tryAgain').style.display = "none";
  document.querySelector('#genderOptions').selectedIndex = 0;
  document.querySelector('#parentalConsentOptions').selectedIndex = 0;
  // document.querySelector('#notesInput').value = "";
}

// document.querySelector('#name').addEventListener('change', function() {
//   //if there's something in the subjectID then enable the check button
//   if (this.value > 0 && $checkSubjectID.classList.contains('disabled')) {
//     $checkSubjectID.classList.remove('disabled');
//   }
// })

document.querySelector("#ageYearOptions").addEventListener('change', function() {
  //if age options change, first reset everything
  //but hide the gender option and task buttons
  $ageMonthOptions.selectedIndex = 0;
  $generateNewID.classList.add('disabled');
  $checkSubjectID.classList.add('disabled');
  $subjectNumOptions.selectedIndex = 0;
  $subjectNumOptions.disabled = true;

  if($inputGender.style.display = "block"){
    //fadeOut($inputGender,true);
    $inputGender.style.display = "none";
  }
  if(this.value > 0 && $ageMonthOptions.value >= 0){
    $generateNewID.classList.remove('disabled');
    document.querySelector('#subjectNumOptions').disabled = false;
  }
})

document.querySelector("#ageMonthOptions").addEventListener('change', function() {

  // $ageYearOptions.selectedIndex = 0;
  $generateNewID.classList.add('disabled');
  $checkSubjectID.classList.add('disabled');
  $subjectNumOptions.selectedIndex = 0;

  if($inputGender.style.display = "block"){
    //fadeOut($inputGender,true);
    $inputGender.style.display = "none";
  }

  if(this.value >= 0 && $ageYearOptions.value > 0){
    $generateNewID.classList.remove('disabled');
    document.querySelector('#subjectNumOptions').disabled = false;
  }
})

document.querySelector("#genderOptions").addEventListener('change', function() {
  if(this.value != "null"){
    // $generateNewID.classList.remove('disabled');
    // document.querySelector('#subjectNumOptions').disabled = false;
    if(document.querySelector("#errorMsg")!=null){
      // document.querySelector('#errorMsg').style.display = "none";
      this.classList.remove('error');
      let error = document.querySelector('#errorMsg');
      error.remove();
    }
  }
})

document.querySelector("#parentalConsentOptions").addEventListener('change', function() {
  if(this.value != "null"){
    // $generateNewID.classList.remove('disabled');
    // document.querySelector('#subjectNumOptions').disabled = false;
    if(document.querySelector("#errorMsgParentalConsent")!=null){
      // document.querySelector('#errorMsg').style.display = "none";
      this.classList.remove('error');
      let error = document.querySelector('#errorMsgParentalConsent');
      error.remove();
    }
  }
})

document.querySelector('#subjectNumOptions').addEventListener('change', function() {
  //if something changes in the subjectID then enable the check button
  if (this.options[subjectNumOptions.selectedIndex].value != null) {
    if ($checkSubjectID.classList.contains('disabled')) {
      $checkSubjectID.classList.remove('disabled');
    }
    //but hide the gender option and task buttons
    if($inputGender.style.display = "block"){
      //fadeOut($inputGender,true);
      $inputGender.style.display = "none";
    }
  } else {
    if (!$checkSubjectID.classList.contains('disabled')) {
      $checkSubjectID.classList.add('disabled');
    }
  }

})

//when the checkID button is pressed
//it checks the id in the database and populate all the inputs
$checkSubjectID.addEventListener('click', checkSubjectID);
//

//no longer used//
function findSubject(n) {
  for (let i = 0; i < subjects.length; i++) {
    let subjectObj = subjects[i][1][0];
    if (subjectObj.subjectNum == subjectNum) {
      //found it
      // currentSubjectID = subjects[i][0];
      return subjectObj;
    }
  }
}
//////
function findSubjectByAge(n, age) {
  // console.log(n, age);
  const ageGroupArray = ageSortedSubjects[age - 1];

  for (let i = 0; i < ageGroupArray.length; i++) {
    let subjectObj = ageGroupArray[i];
    if (subjectObj.subjectNum == n) {
      //we found it
      return subjectObj;
    }
  }
}

function checkSubjectID() {
  // const subjectNum = document.querySelector('#name').value;
  const subjectNum = parseInt(document.getElementById('subjectNumOptions').value);
  // const ageGroup = ageYearOptions.options[ageYearOptions.selectedIndex].value;
  const ageGroup = parseInt(document.getElementById('ageYearOptions').value);

  resetAllInput();

  //now find the subject with age and subject number
  subject = findSubjectByAge(subjectNum, ageGroup);

  if (subject != null) {
    //this is not a new subject
    newSubject = false;
    if(subject.uniqueId!=null){
      experiment.uniqueId = subject.uniqueId;
    }

    if(subject.lang != null){
      if(subject.lang == "de"){
        let ele = document.getElementsByName('radio');
        changeLanguage(germanMsgs);
        lang = "de";
        ele[1].checked = true;
      }
    }

    document.getElementById('subjectNumOptions').disabled = false;
    document.querySelector('#generateNewIDButton').classList.remove('disabled');
    document.querySelector('#subjectInfoLabel').innerHTML = "This is an existing participant. Please make sure the info below is correct.";
    const ageMonthOptions = document.getElementById('ageMonthOptions');
    // ageMonthOptions.options[ageMonthOptions.selectedIndex].value = subjectObj.age.month;
    ageMonthOptions.value = subject.age.month;

    const genderOptions = document.getElementById('genderOptions');
    // genderOptions.options[genderOptions.selectedIndex].value = subjectObj.gender;
    genderOptions.value = subject.gender;

    const parentalConsentOptions = document.getElementById('parentalConsentOptions');
    // genderOptions.options[genderOptions.selectedIndex].value = subjectObj.gender;
    if(subject.parentalConsent != null){
      parentalConsentOptions.value = subject.parentalConsent;
    } else {
      parentalConsentOptions.selectedIndex = 0; 
    }
    
    //populate the notes if there's any
    // if(subject.notes != null){
    //   document.querySelector('#notesInput').value = subject.notes;
    // }
    let task = 0;
    if (subject.tasks.one == 1) {
      document.querySelector('#TaskOneButton').classList.add("disabled");
      document.querySelector('#taskOneCheckbox').classList.add('checked');
      task++;
    }
    if (subject.tasks.two == 1) {
      document.querySelector('#TaskTwoButton').classList.add("disabled");
      document.querySelector('#taskTwoCheckbox').classList.add('checked');
      task++;
    }
    if (subject.tasks.three == 1) {
      document.querySelector('#TaskThreeButton').classList.add("disabled");
      document.querySelector('#taskThreeCheckbox').classList.add('checked');
      task++;
    }

    if(task == 0){
      //no test has been done, only activate the task 1 button
      document.querySelector('#TaskTwoButton').classList.add("disabled");
      document.querySelector('#TaskThreeButton').classList.add("disabled");
    } else if(task == 1){
      //task one has been finished, activate the task 2 button but disable the three
      //document.querySelector('#TaskTwoButton').classList.remove("disabled");
      document.querySelector('#TaskThreeButton').classList.add("disabled");
    } else if(task == 2){

    }
    else if (task == 3) {
      document.querySelector('#tryAgain').style.display = "block";
      disableAllInputs();
      showNewTestButton();
    }

    // $inputGender.style.display = "block";
    if(ageGroup > 18){
      $parentalConsentOptionRow.style.display = "none";
    } else {
      $parentalConsentOptionRow.style.display = "block";
    }
    fadeIn($inputGender);
  } else {
    //this is a new subject
    newSubject = true;
    // console.log("nothing matching");
    generateNewID();
    let msg ='';
    if (lang == "en") {
      msg = "The participant number you entered did not match our record so we generated a new one. Please select their gender.";
    } else {
      msg = "Die ausgewählte ID stimmt nicht mit unseren Daten überein, daher wurde eine neue ID erstellt. Bitte geben Sie das Geschlecht des Kindes ein."
    }
    document.querySelector('#subjectInfoLabel').innerHTML = msg;
    if(ageGroup > 18){
      $parentalConsentOptionRow.style.display = "none";
    } else {
      $parentalConsentOptionRow.style.display = "block";
    }
    fadeIn($inputGender);
  }
}

function disableAllInputs() {
  $subjectNumOptions.disabled = true;
  $ageYearOptions.disabled = true;
  $ageMonthOptions.disabled = true;
  $genderOptions.disabled = true;
  $parentalConsentOptions.disabled = true;
  radios.forEach((item, i) => {
    item.disabled = true;
  });

  //buttons
  $generateNewID.classList.add('disabled');
  $checkSubjectID.classList.add('disabled');
}

function showNewTestButton(){
  $startNewTest.classList.remove('disabled');
}

$startNewTest.addEventListener('click',()=>{
  // window.location.reload(1);
  location.href = "/";
})

//bind the click event listener with the submit button
// $getUserContext.addEventListener('click', getUserContext);
//when the submit button is clicked do this
function updateSubject() {
  //get all the values from the input elements
  // const subjectNum = document.querySelector('#name').value;
  const subjectNum = document.querySelector('#subjectNumOptions').value;
  //
  const ageYearOptions = document.getElementById('ageYearOptions');
  const ageYear = ageYearOptions.options[ageYearOptions.selectedIndex].value;
  const ageMonthOptions = document.getElementById('ageMonthOptions');
  const ageMonth = ageMonthOptions.options[ageMonthOptions.selectedIndex].value;
  //
  const genderOptions = document.getElementById('genderOptions');
  // console.log(genderOptions.options)
  const gender = genderOptions.options[genderOptions.selectedIndex].value;

  const parentalConsentOptions = document.getElementById('parentalConsentOptions');
  // console.log(genderOptions.options)
  const parentalConsent = parentalConsentOptions.options[parentalConsentOptions.selectedIndex].value;
  // const notes = document.querySelector("#notesInput").value;
  //
  // const germanOn = document.querySelector('#languageToggleSwitch').checked;
  // console.log(radios.value);
  let ele = document.getElementsByName('radio');
  for(let i = 0; i < ele.length; i++) {
      if(ele[i].checked)
        lang = ele[i].value;
  }
  const language = lang;
  //get the current date and time
  const timestamp = Date.now();

  //store it in the variable experiment
  experiment.subjectNum = subjectNum;
  experiment.lang = language;
  // experiment.timeLimit = timeLimit;
  experiment.timezone = timezone;
  experiment.timestamp = timestamp;
  experiment.windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  experiment.age = {
    year: ageYear,
    month: ageMonth
  };
  experiment.tasks = {
    one: 0,
    two: 0,
    three: 0
  }

  experiment.gender = gender;
  experiment.parentalConsent = parentalConsent;
  // experiment.notes = notes;
}

function addNewSubject(e) {
  let postDataURL = "./subjects";
  if(timezone != "America/New_York"){
    postDataURL = "./subjectsBerlin";
  }

  postData(postDataURL, {
      experiment
    })
    // postData('./raindots',{data})
    .then((pdata) => {
      // console.log("here's the pdata: " + pdata.insertedId); // JSON data parsed by `response.json()` call
      //get the newly inserted id to pass as with the url
      experiment.uniqueId = pdata.insertedId;
      if (e.target.name == "one") {
        fadeOutInterface($interface, "task1");
        // location.href = "task1"+"?subject="+experiment.subjectNum;
      } else if (e.target.name == "two") {
        fadeOutInterface($interface, "task2");
        // location.href = "task2"+"?subject="+experiment.subjectNum;
      } else if (e.target.name == "three") {
        fadeOutInterface($interface, "task3");
        // location.href = "task3"+"?subject="+experiment.subjectNum;
      }
    });
}

function updateExistingSubjectInfo(){
  let data = {};
  data.id = experiment.uniqueId;
  data.experiment = experiment;
  let type = "UPDATE_DATA";
  if (timezone == "America/New_York") {
    //if it's new york
  } else {
    type = "UPDATE_DATA_BERLIN";
  }
  //update the database
  storeSubject.dispatch({
      type: type,
      payload: {
        data: data
      }
  });
}

function startTheTask(e) {
  const age = document.getElementById('')
  if(document.getElementById('genderOptions').value == "null"){
    //highlight the gender option
    console.log("check the gender:"+document.getElementById('genderOptions').value+"!!!");
    document.getElementById('genderOptions').classList.add("error");
    const genderOptionContainer = document.getElementById('genderOptionRow');
    let validationText = document.createElement('label');
    validationText.innerHTML = "Please select gender.";
    validationText.classList.add('error');
    validationText.id = "errorMsg";
    genderOptionContainer.appendChild(validationText);
    return;
  }

  if(document.getElementById('parentalConsentOptions').value == "null"){
    const age = parseInt(document.getElementById('ageYearOptions').value);
    if(age > 18)
    {
      document.getElementById('parentalConsentOptions').selectedIndex = 2;
    } else {

      //highlight the parental consent option
      // console.log("check the parental consent:"+document.getElementById('genderOptions').value+"!!!");
      document.getElementById('parentalConsentOptions').classList.add("error");
      const parentalOptionContainer = document.getElementById('parentalConsentOptionRow');
      let validationText = document.createElement('label');
      validationText.innerHTML = "Please select if the parental consent has been given.";
      validationText.classList.add('error');
      validationText.id = "errorMsgParentalConsent";
      parentalOptionContainer.appendChild(validationText);
      return;
    }
  }

  updateSubject();

  //add the new subject to the database if this subject is new
  if (newSubject) {
    addNewSubject(e);
  } else {
    if(!newSubject && subject != null){
      experiment.tasks = {
        one: subject.tasks.one,
        two: subject.tasks.two,
        three: subject.tasks.three
      }
    }
    updateExistingSubjectInfo();
    // location.
    if (e.target.name == "one") {
      fadeOutInterface($interface, "task1");
      // location.href = "task1"+"?subject="+experiment.subjectNum;
    } else if (e.target.name == "two") {
      fadeOutInterface($interface, "task2");
      // location.href = "task2"+"?subject="+experiment.subjectNum;
    } else if (e.target.name == "three") {
      fadeOutInterface($interface, "task3");
      // location.href = "task3"+"?subject="+experiment.subjectNum;
    }
  }
}

function isEmpty(obj) {
  for (var x in obj) {
    return false;
  }
  return true;
}



////////////
//some utility functions for fading in and out using Greensock animation library (GSAP)
function fadeIn(elem, duration = 1, delay = 0, display = "block") {
  elem.style.display = display;
  //elem.style.opacity = 0;
  gsap.to(elem, {
    duration: duration,
    ease: "power1.inOut",
    opacity: 1,
    delay: delay,
    onComplete: enable,
    onCompleteParams: [elem]
  });
}

function fadeInInterface(elem) {
  elem.style.visibility = "visible";
  elem.style.opacity = 0;
  gsap.to(elem, {
    duration: 1,
    ease: "power1.inOut",
    opacity: 1,
    delay: 0.5,
    onComplete: enable,
    onCompleteParams: [elem]
  });
}

function fadeOut(elem, hide, delay = 0) {
  gsap.to(elem, {
    duration: 1,
    delay: delay,
    ease: "power1.inOut",
    opacity: 0,
    onComplete: hide ? hideElem : null,
    onCompleteParams: [elem]
  });
}

function fadeOutInterface(elem, onCompleteParam, delay = 0) {
  gsap.to(elem, {
    duration: 1,
    delay: delay,
    ease: "power1.inOut",
    opacity: 0,
    onComplete: redirect,
    onCompleteParams: [onCompleteParam]
  });
}

function redirect(param) {
  // console.log(param + "?subject=" + experiment.subjectNum + "&age=" + experiment.age.year + "&id=" + experiment.uniqueId);
  location.href = param+"?subject="+experiment.subjectNum+"&age="+experiment.age.year+"&id="+experiment.uniqueId;
}

function hideElem(elem) {
  elem.style.display = "none";
}

function enable(elem) {
  elem.style.pointerEvents = "auto";
}

function mapRange(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function timeout(ms) {
  return new Promise(res => setTimeout(res, ms));
}
