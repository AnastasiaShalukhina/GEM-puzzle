import { sectionGameField } from "./Main.js";
import { createElement } from "./Element.js";
import { buttonShuffle } from "./Regulation.js";
import { moveCount } from "./Calculations.js";
import { watchStopWatch } from "./Calculations.js";
import { flagPlay } from "./Calculations.js";
import { modalCongratulation } from "./Header.js";
import { audio } from "./Description.js";

function createGame() {
  let blockSize;
  if (window.screen.width > 768) {
    blockSize = 100;
  } else {
    blockSize = 70;
  }

  const emptyBlock = {
    top: 3, // 0
    left: 3, // 0
  };
  // array to remember current location
  let arrBlocks = [];
  arrBlocks.push(emptyBlock);

  function moveBlock(position) {
    const currentBlock = arrBlocks[position];
    let differenceLeft = Math.abs(currentBlock.leftPosition - emptyBlock.left);
    let differenceTop = Math.abs(currentBlock.topPosition - emptyBlock.top);
    emptyBlock.top;

    if (
      (differenceLeft == 1 && differenceTop == 0) ||
      (differenceLeft == 0 && differenceTop == 1)
    ) {
      // move the block in markdown - visible move
      currentBlock.elem.style.left = `${emptyBlock.left * blockSize}px`;
      currentBlock.elem.style.top = `${emptyBlock.top * blockSize}px`;
      //////
      if (document.querySelector('input[name="audio"]:checked').value == "on") {
        audio.play();
      }

      // remember the empty coordinates
      let keepCoordinatesEmptyLeft = emptyBlock.left;
      let keepCoordinatesEmptyTop = emptyBlock.top;

      // change coordinates of empty to current
      emptyBlock.left = currentBlock.leftPosition;
      emptyBlock.top = currentBlock.topPosition;

      // change coordinates of current to previous empty
      currentBlock.leftPosition = keepCoordinatesEmptyLeft;
      currentBlock.topPosition = keepCoordinatesEmptyTop;
    } else {
      return;
    }
  }

  // creation of 15 blocks + addEL
  let movement = 0;

  for (let i = 1; i < 16; i++) {
    let block = createElement("div", "block", i, i);
    let left;
    if (i === 4 || i === 8 || i === 12) {
      left = 3;
    } else {
      left = (i % 4) - 1;
    } // left may be 0 1 2 3

    let top; // depends on the row 0.1.2.3
    if (i >= 1 && i <= 4) {
      top = 0;
    } else if (i >= 5 && i <= 8) {
      top = 1;
    } else if (i >= 9 && i <= 12) {
      top = 2;
    } else {
      top = 3;
    }

    arrBlocks.push({
      leftPosition: left,
      topPosition: top,
      elem: block,
    });

    block.style.left = `${blockSize * left}px`;
    block.style.top = `${blockSize * top}px`;
    sectionGameField.appendChild(block);

    block.addEventListener("click", () => {
      if (flagPlay) {
        moveBlock(i);
        movement++;
        displayMovement();
        isWin();
      }
    });
  }

  function displayMovement() {
    moveCount.textContent = movement;
  }
  let arrNeighbours = [];
  function findNeighbourToExchange() {
    // check how many neighbours has empty block

    let leftNeighbour = {},
      topNeighbour = {},
      rightNeighbour = {},
      downNeighbour = {};

    if (emptyBlock.left - 1 >= 0) {
      leftNeighbour.exist = true;
      leftNeighbour.leftP = emptyBlock.left - 1;
      leftNeighbour.topP = emptyBlock.top;
    } else {
      leftNeighbour.exist = false;
    }
    if (emptyBlock.top - 1 >= 0) {
      topNeighbour.exist = true;
      topNeighbour.leftP = emptyBlock.left;
      topNeighbour.topP = emptyBlock.top - 1;
    } else {
      topNeighbour.exist = false;
    }
    if (emptyBlock.left + 1 <= 3) {
      rightNeighbour.exist = true;
      rightNeighbour.leftP = emptyBlock.left + 1;
      rightNeighbour.topP = emptyBlock.top;
    } else {
      rightNeighbour.exist = false;
    }
    if (emptyBlock.top + 1 <= 3) {
      downNeighbour.exist = true;
      downNeighbour.leftP = emptyBlock.left;
      downNeighbour.topP = emptyBlock.top + 1;
    } else {
      downNeighbour.exist = false;
    }
    // find existance neighbours and take thier index for move function
    for (let i = 0; i < arrBlocks.length; i++) {
      if (
        leftNeighbour.exist &&
        arrBlocks[i].leftPosition === leftNeighbour.leftP &&
        arrBlocks[i].topPosition === leftNeighbour.topP
      ) {
        arrNeighbours.push(i);
      }
      if (
        topNeighbour.exist &&
        arrBlocks[i].leftPosition === topNeighbour.leftP &&
        arrBlocks[i].topPosition === topNeighbour.topP
      ) {
        arrNeighbours.push(i);
      }
      if (
        rightNeighbour.exist &&
        arrBlocks[i].leftPosition === rightNeighbour.leftP &&
        arrBlocks[i].topPosition === rightNeighbour.topP
      ) {
        arrNeighbours.push(i);
      }
      if (
        downNeighbour.exist &&
        arrBlocks[i].leftPosition === downNeighbour.leftP &&
        arrBlocks[i].topPosition === downNeighbour.topP
      ) {
        arrNeighbours.push(i);
      }
    }
    // console.log(arrNeighbours); // ok
    // do not forget to clear arrNeighbours after each move
    let randomNum = Math.floor(Math.random() * arrNeighbours.length);
    let randomNeighbour = arrNeighbours[randomNum];
    // console.log(randomNum); ok
    return randomNeighbour;
  }

  function shuffleBlocks() {
    for (let i = 1; i < 101; i++) {
      let neighbour = findNeighbourToExchange();
      moveBlock(neighbour);
      arrNeighbours = [];
    }
  }

  buttonShuffle.addEventListener("click", shuffleBlocks);
  buttonShuffle.addEventListener("click", () => {
    movement = 0;
    moveCount.textContent = movement;
  });

  let countMatches = 0;
  function isWin() {
    let arrBlocksinitial = [
      { left: 0, top: 0 },
      { leftPosition: 0, topPosition: 0 },
      { leftPosition: 1, topPosition: 0 },
      { leftPosition: 2, topPosition: 0 },
      { leftPosition: 3, topPosition: 0 },
      { leftPosition: 0, topPosition: 1 },
      { leftPosition: 1, topPosition: 1 },
      { leftPosition: 2, topPosition: 1 },
      { leftPosition: 3, topPosition: 1 },
      { leftPosition: 0, topPosition: 2 },
      { leftPosition: 1, topPosition: 2 },
      { leftPosition: 2, topPosition: 2 },
      { leftPosition: 3, topPosition: 2 },
      { leftPosition: 0, topPosition: 3 },
      { leftPosition: 1, topPosition: 3 },
      { leftPosition: 2, topPosition: 3 },
    ];

    for (let i = 1; i < arrBlocks.length; i++) {
      if (
        arrBlocksinitial[i].leftPosition == arrBlocks[i].leftPosition &&
        arrBlocksinitial[i].topPosition === arrBlocks[i].topPosition
      ) {
        countMatches++;
      }
    }
    if (countMatches === 15) {
      showCongratulation();
      countMatches = 0;
    } else {
      countMatches = 0;
    }
  }

  function createModalCongratulation() {
    const congratulationWrapper = createElement(
      "div",
      "modal-congratulation__wrapper"
    );
    const congratulationText = createElement(
      "div",
      "modal-congratulation__text",
      `Hooray! You solved the puzzle in ${watchStopWatch.textContent} and ${moveCount.textContent} moves!`
    );
    const congratulationBtn = createElement(
      "button",
      "modal-congratulation__button",
      "Close"
    );
    congratulationWrapper.appendChild(congratulationText);
    congratulationWrapper.appendChild(congratulationBtn);
    modalCongratulation.appendChild(congratulationWrapper);

    congratulationBtn.addEventListener("click", () => {
      modalCongratulation.classList.remove("modal_visible");
      document.location.reload();
    });
  }

  function showCongratulation() {
    createModalCongratulation();
    modalCongratulation.classList.add("modal_visible");
  }
}
createGame();
export { createGame };
