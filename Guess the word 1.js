//Word and Hints Object
const options = {
    ambar: "How do you say 'ámbar' in English??",
    yellow: "How do you say 'amarillo' in English??",
    aquamarine: "How do you say 'aguamarina' in English??",
    amethyst: "How do you say 'amatista' in English??",
    jetblack: "How do you say 'azabache' in English??",
    blue: "How do you say 'azul' in English??",
    beige: "How do you say 'beige' in English??",
    wite: "How do you say 'blanco' in English??",
    charcoal: "How do you say 'carbon' in English??",
    crimsom: "How do you say 'carmesi' in English??",
    carmine: "How do you say 'carmin' in English??",
    skyblue: "How do you say 'celeste' in English??",
    cyan: "How do you say 'cian' in English??",
    copper: "How do you say 'cobre' in English??",
    golden: "How do you say 'dorado' in English??",
    emerald: "How do you say 'esmeralda' in English??",
    fuchsia: "How do you say 'fucsia' in English??",
    gray: "How do you say 'gris' in English??",
    bone: "How do you say 'hueso' in English??",
    indigo: "How do you say 'indigo' in English??",
    jasmine: "How do you say 'jazmin' in English??",
    jade: "How do you say 'jade' in English??",
    khaki: "How do you say 'caqui' in English??",
    lavender: "How do you say 'lavanda' in English??",
    lilac: "How do you say 'lila' in English??",
    lime: "How do you say 'lima' in English??",
    magenta: "How do you say 'magenta' in English??",
    malva: "How do you say 'mauve' in English??",
    ivory: "How do you say 'marfil' in English??",
    mint: "How do you say 'menta' in English??",
    mustard: "How do you say 'mostaza' in English??",
    orange: "How do you say 'naranja' in English??",
    black: "How do you say 'negro' in English??",
    ocher: "How do you say 'ocre' in English??",
    gold: "How do you say 'oro' in English??",
    olive: "How do you say 'oliva' in English??",
    pistachio: "How do you say 'pistacho' in English??",
    silver: "How do you say 'plata' in English??",
    purple: "How do you say 'purpura' in English??",
    red: "How do you say 'rojo' in English??",
    pink: "How do you say 'rosa' in English??",
    ruby: "How do you say 'rubi' in English??",
    salmon: "How do you say 'salmon' in English??",
    turquoise: "How do you say 'turquesa' in English??",
    grape: "How do you say 'uva' in English??",
    green: "How do you say 'verde' in English??",
    wine: "How do you say 'vino' in English??",
    watermelon: "How do you say 'sandia' in English??",
    violet: "How do you say 'violeta' in English??",
    sapphire: "How do you say 'zafiro' in English??",
  };
  
  //Initial References
  const message = document.getElementById("message");
  const hintRef = document.querySelector(".hint-ref");
  const controls = document.querySelector(".controls-container");
  const startBtn = document.getElementById("start");
  const letterContainer = document.getElementById("letter-container");
  const userInpSection = document.getElementById("user-input-section");
  const resultText = document.getElementById("result");
  const word = document.getElementById("word");
  const words = Object.keys(options);
  let randomWord = "",
    randomHint = "";
  let winCount = 0,
    lossCount = 0;
  
  //Generate random value
  const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
  
  //Block all the buttons
  const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
  };
  
  //Start Game
  startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
  });
  
  //Stop Game
  const stopGame = () => {
    controls.classList.remove("hide");
  };
  
  //Generate Word Function
  const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint">
    <span>Hint: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
      displayItem += '<span class="inputSpace">_ </span>';
    });
  
    //Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
  };
  
  //Initial Function
  const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
  
    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
  
      //Number to ASCII[A-Z]
      button.innerText = String.fromCharCode(i);
  
      //Character button onclick
      button.addEventListener("click", () => {
        message.innerText = `Correct Letter`;
        message.style.color = "#008000";
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
  
        //If array contains clicked value replace the matched Dash with Letter
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            //If character in array is same as clicked button
            if (char === button.innerText) {
              button.classList.add("correct");
              //Replace dash with letter
              inputSpace[index].innerText = char;
              //increment counter
              winCount += 1;
              //If winCount equals word length
              if (winCount == charArray.length) {
                resultText.innerHTML = "You Won";
                startBtn.innerText = "Next";
                //block all buttons
                blocker();
              }
            }
          });
        } else {
          //lose count
          button.classList.add("incorrect");
          lossCount -= 1;
          document.getElementById(
            "chanceCount"
          ).innerText = `Chances Left: ${lossCount}`;
          message.innerText = `Incorrect Letter`;
          message.style.color = "#ff0000";
          if (lossCount == 0) {
            word.innerHTML = `The word was: <span>${randomWord}</span>`;
            resultText.innerHTML = "Game Over";
            blocker();
          }
        }
  
        //Disable clicked buttons
        button.disabled = true;
      });
  
      //Append generated buttons to the letters container
      letterContainer.appendChild(button);
    }
  };
  
  window.onload = () => {
    init();
  };