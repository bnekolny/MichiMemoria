const apiData = [
   {
       "id": "18t",
       "url": "https://cdn2.thecatapi.com/images/18t.gif",
       "width": 307,
       "height": 139
   },
   {
       "id": "34j",
       "url": "https://cdn2.thecatapi.com/images/34j.gif",
       "width": 245,
       "height": 138
   },
   {
       "id": "3k4",
       "url": "https://cdn2.thecatapi.com/images/3k4.gif",
       "width": 250,
       "height": 164
   },
   {
       "id": "3k7",
       "url": "https://cdn2.thecatapi.com/images/3k7.gif",
       "width": 350,
       "height": 263
   },
   {
       "id": "3oe",
       "url": "https://cdn2.thecatapi.com/images/3oe.gif",
       "width": 500,
       "height": 281
   },
   {
       "id": "48r",
       "url": "https://cdn2.thecatapi.com/images/48r.gif",
       "width": 500,
       "height": 281
   },
   {
       "id": "4g8",
       "url": "https://cdn2.thecatapi.com/images/4g8.gif",
       "width": 492,
       "height": 236
   },
   {
       "id": "4he",
       "url": "https://cdn2.thecatapi.com/images/4he.gif",
       "width": 400,
       "height": 304
   },
   {
       "id": "67o",
       "url": "https://cdn2.thecatapi.com/images/67o.gif",
       "width": 500,
       "height": 281
   },
   {
       "id": "80f",
       "url": "https://cdn2.thecatapi.com/images/80f.gif",
       "width": 388,
       "height": 306
   }
]


class MemoryGame {

   gameStatus = "in progress";
   foundMatches = 0;

   constructor(apiData) {
      this.dataArray = apiData;
      this.totalPairs = apiData.length;
      this.totalCards = apiData.length *2;
      this.gameBoard = this.createGameBoard(this.dataArray);
      this.userFeedback = this.createUserFeedback(this.totalCards);
   }
   
   createGameBoard(arr) {
      let duplicatedElements = []   
   
      for (let i = 0 ; i < arr.length; i++) {
         duplicatedElements.push(arr[i])
      }
   
      for (let j = 0; j < arr.length; j++) {
         duplicatedElements.splice(
            Math.floor(Math.random() * duplicatedElements.length +1), 
            0,
            arr[j])
      }
      return duplicatedElements
   }

   createUserFeedback(totalCards) {
      let divisors = []
      for (let i = 0; i < totalCards; i++) {
         divisors.push("***")
      }
      return divisors
   }

   findMatch(num1, num2) { 
      console.log("first guess:", this.gameBoard[num1].id, num1)  
      console.log("second guess:", this.gameBoard[num2].id, num2)  
      if (this.gameBoard[num1].id === this.gameBoard[num2].id) {
         this.userFeedback[num1] = this.gameBoard[num1].id
         this.userFeedback[num2] = this.gameBoard[num2].id
         this.foundMatches++
      }
      return this.userFeedback
   }
}



let currentGame;

function createNewGame() {
   const newGame = new MemoryGame(apiData)

   for (let i = 0; i < newGame.totalCards; i++) {

      const newDiv = document.createElement("div");
      newDiv.setAttribute('id', `container-card${i}`);
      newDiv.setAttribute('class', `card-containers`);
      document.getElementById("gameBoard").appendChild(newDiv);

      const newImg = document.createElement("img");
      newImg.setAttribute('id', `card-image${i}`);
      newImg.setAttribute('class', `card-image`);
      newImg.setAttribute('src', 'bocaditos-black-logo.svg');
      newImg.setAttribute('role', `button`);
      newImg.setAttribute('onclick', `showCard(${i})`);
      document.getElementById(`container-card${i}`).appendChild(newImg);
   }
   currentGame = newGame
}

let shownCard1;
let shownCard2;

function showCard(num){   
   const currentCard = document.getElementById(`card-image${num}`)
   currentCard.src = currentGame.gameBoard[num].url

   if (shownCard1 === undefined) {
      shownCard1 = currentCard
   } else (
      shownCard2 = currentCard
   )


   if (shownCard1 !== undefined && shownCard2 !== undefined) {

      if (shownCard1.src === shownCard2.src) {

         shownCard1.removeAttribute("onclick")
         shownCard2.removeAttribute("onclick")

         shownCard1.style.cursor = "auto"
         shownCard2.style.cursor = "auto"

         shownCard1 = undefined
         shownCard2 = undefined

         currentGame.foundMatches++
         console.log(currentGame.foundMatches)

      } else {

         // NEED TO DO THIS WITH A PROMISE
         setTimeout(function() {
            shownCard1.src = 'bocaditos-black-logo.svg'
            shownCard2.src = 'bocaditos-black-logo.svg'
         },1500)

         setTimeout(function() {
            shownCard1 = undefined
            shownCard2 = undefined
         },3000)
      }
   }
}


// let kitties = []

// async function requestRandomKitties(num) {
//    const request = await fetch(`https://api.thecatapi.com/v1/images/search?mime_types=gif&size=full&limit=${num}`);
//    const data = await request.json();
//    return data;
// }

// requestRandomKitties(10).then(data => {
//    cards = data.length;
//    for (let i = 0; i < data.length; i++){
//       kitties.push(data[i])
//    }
// });
// console.log(Math.floor(Math.random()*5))
// 0 - 4
// console.log(Math.floor(Math.random()*6))
// 2 - 5




