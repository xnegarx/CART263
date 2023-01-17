/**
Exercise 1
Negar Roofigari 

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


/**
Description of preload
*/
function preload() {

}

// 3x3 matrix
 let Board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]; 

let playerA = 'X';
let playerB = 'O';

// variables for keeping scores

let pAscore = 0;
let pBscore = 0;

let currentPlayer = playerA;


/**
Description of setup
*/ 

function setup() {
    createCanvas(420,420); 
}

function mousePressed() {

    console.log("hello");
    
  // currentPlayer can press any of the 6 spots on the grid
  if (currentPlayer == playerA) {
    let i = floor(mouseX / (width/3));
    let j = floor(mouseY / (height/3));
  // if the spot is open player has succesfully finished their turn. the other player is next.
    if (Board[i][j] == '') {
      Board[i][j] = playerA;
      text('Helllo im not here');
      currentPlayer = playerB; 
    } 
  } else if (currentPlayer == playerB) {
    let i = floor(mouseX / (width/3));
    let j = floor(mouseY / (height/3));
    if (Board[i][j] == '') {
        Board[i][j] = playerB;
        currentPlayer = playerA; 
    } 
  }
  
}

// any 3 Xs or Os anywhere on the grid are seen as potential wins.
function potentialWin(a, b, c) {
  return a == b && b == c && a != '';
  
}

// to see if there are any winners, we examine the potential wins.
function checkWinner() {
  let winner = null;

  // horizontal wins are the rows of the grid (3 possibilities)
  for (let i = 0; i < 3; i++) {
    if (potentialWin(Board[i][0], Board[i][1], Board[i][2])) {
      winner = Board[i][0];
    }
  }

  // Vertical wins are the columns of the grid (3 possibilities)
  for (let i = 0; i < 3; i++) {
    if (potentialWin(Board[0][i], Board[1][i], Board[2][i])) {
      winner = Board[0][i];
    }
  }

  // Diagonals of the grid (2 possibilities)
  if (potentialWin(Board[0][0], Board[1][1], Board[2][2])) {
    winner = Board[0][0];
  }
  if (potentialWin(Board[2][0], Board[1][1], Board[0][2])) {
    winner = Board[2][0];
  }

  // this variable is used for determining if the game is tied
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (Board[i][j] == '') {
        openSpots++;
      }
    }
  }
 // if there are no winners and no open spots left its a 'tie' else there is a winner.
  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}


/**
Description of draw()
*/

function draw() {
  
// keeping the score 

    fill(255, 50, 0);
    text(pAscore, 10, 400);

    fill(0, 50, 255);
    text(pBscore, 410, 400);

  

    
   //background(252, 245, 95);

// the two parallel lines
   line(width/3, 0, width/3, width);
   line((width*2)/3, 0, (width*2)/3, width);
   line(0, height/3, height, height/3);
   line(0,(height*2)/3, height, (height*2)/3);

// structure of the grid
    for (let i = 0; i<3; i++) {
        for (let j = 0; j<3; j++) {
            let x = width/3 * i + width/5;
            let y = height/3 * j + height/5;
// any of the 6 cells
            let cell= Board[i][j];
            textAlign(CENTER);
            strokeWeight(4);
            textSize(32);
// If playerA has pressed on a cell write 'X'
            if (cell == playerA) {
                fill(255, 50, 0);
                text('X', x, y);
                console.log("playerA");
          
// if playerB has pressed on a cell write 'O'
            } else if (cell == playerB) {
                fill(0, 50, 255);
                text('O', x, y);
                console.log("playerB");
        
            }


        }
        
    } 


// after conditions for a win have been saticfied in checkWinner, we will catogorize the results. 

    let result = checkWinner();  
// when a result is returned, it stops the loop and creates a new paragraph element. 
    if (result != null) {    
       
         
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
  // when the game is a tie display 'Tie!'
        if (result == 'tie') {
          resultP.html('Tie!');
  // when there is a winner display 'X wins!' or 'O wins!' 
        } else {   
          resultP.html(`${result} wins!`);
  // increase the score of the winner
  
        }
            if (result == playerA) { 
              console.log("X won");
              pAscore += 1;
            } else if (result == playerB) {  
              console.log("O won");
              pBscore += 1;
            }
        
     } 
  
}
