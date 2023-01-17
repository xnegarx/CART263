# Template p5 project

This is the README file for the entire project. For more official projects you should write information here about the nature of the project, your name, any special explanations of how the project works, etc.

# Exercise 1
## CART 263
## Negar Roofigari

Tic-tac-toe is a simple strategy game played on a 3x3 grid, and each square on the grid can be marked with either an "X" or an "O".  The game can be played by two players. Players take turns marking a square. The first player to get three of their symbols in a row wins. If all the squares are filled and no one has three symbols in a row, the game is a draw. The game is simple but requires strategy and planning to win.

 **Winning condition**: The objective of the game is to get three of your symbols in a row, either horizontally, vertically, or diagonally.

(i,j)

horizontal: (0,0),(0,1),(0,2) / (1,0),(1,1),(1,2) / (2,0),(2,1),(2,2)
vertical: (0,0),(1,0),(2,0) / (0,1),(1,1),(2,1) / (0,2),(1,2),(2,2)
diagonal: (0,0),(1,1),(2,2) / (2,0),(1,1),(0,2)

A set of 3 Xs or Os in any of these sequences constitutes a win.

**Tie condition**: No winners and no open spots left.
