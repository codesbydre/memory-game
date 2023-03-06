let score = 0;
const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let firstCard, secondCard;
//wait for cards to finish unflipping by locking board
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  //disable card double click match
  if (this === firstCard) return;
  //this = .card in the function
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    //second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }
}

let matchedCards = 0;

function checkForMatch() {
  if (firstCard.dataset.pokemon === secondCard.dataset.pokemon) {
    disableCards();
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    matchedCards += 2;
    if (matchedCards === cards.length) {
      alert("You win!");
    }
  } else {
    setTimeout(() => {
      firstCard.classList.add("shake");
      secondCard.classList.add("shake");
    }, 700);
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  //do setTimeout so there's enough time to see flipping
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard.classList.remove("shake");
    secondCard.classList.remove("shake");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//generate random number to assign to each card and rearrange
//make it an immediately invoked function expression (IIFE) to execute right away before player starts matching
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

//listen for click event and execute flipCard function
cards.forEach((card) => card.addEventListener("click", flipCard));
