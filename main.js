// 랜덤번호 지정
// 유저가 번호 입력함, 유저가 랜덤버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다
// 랜덤번호가 < 유저번호  down
// 랜덤번호가 > 유저번호 up
// reset 버튼 누르면 게임 리셋
// 5번의 기회 다쓰면 게임종료 ( 더이상 추축 불가, disabled)
// 유저가 1~100 밖의 숫자를 쓰면 알려줌 (기회 깎지않음)
// 유저가 썼던 숫자 재입력시 알려줌 (기회 깎지않음)

let computerNumber = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.querySelector(".button-reset");
let userInput = document.querySelector("#user-input");
let resultAreaImg = document.querySelector(".main-img");
let resultText = document.querySelector(".result-text");
let chanceArea = document.getElementById("chance-area");
let gameOver = false;
let chances = 5; 
let userValueList = []; 

chanceArea.innerHTML = `남은 기회:${chances}`;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", focusInput);

function pickRandomNumber() {


  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNumber);
}

function play() {
  const userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "1~100 숫자 안넣으면 한잔";

    return;
  }

  if (userValueList.includes(userValue)) {
    resultText.textContent = "이미 사용 했던 숫자입니다. 취했어?";

    return;
  }

  chances --;
  chanceArea.innerHTML = `남은 기회:${chances}`;
  userValueList.push(userValue);
  if (userValue < computerNumber) {
    resultAreaImg.src =
      "https://cdn.pixabay.com/animation/2022/10/26/02/47/02-47-00-744_512.gif";
    resultText.textContent = "UpUp!";
  } else if (userValue > computerNumber) {
    resultAreaImg.src = "https://media3.giphy.com/media/3ohhwH6yMO7ED5xc7S/giphy.gif";
    resultText.textContent = "Down!";
  } else {
    resultAreaImg.src = "https://j.gifs.com/mQ5Mgr.gif"
      ;
    resultText.textContent = "정답!";
    gameOver = true;
  }

  if (chances == 0) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function focusInput() {
  userInput.value = "";
}

function reset() {
  pickRandomNumber();
  userInput.value = "";
  resultAreaImg.src = "https://media.tenor.com/XIer_fPZ3rUAAAAM/cheers-gif-happy-birthday.gif"
    ;
  resultText.textContent = "못맞추면 바로 한잔🍻";
  gameOver = false;
  playButton.disabled = false;
  chances = 5;
  chanceArea.innerHTML = `남은 기회:${chances}`;
  userValueList = [];
}

pickRandomNumber();