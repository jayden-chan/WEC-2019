# Design Doc
We chose to use create a webapp with React due to it being faster to develop in and we used github for collaboration so we could work concurrently on different sections of the code.

We split into one person setting up the back end and the rest setting up the boilerplate for the frontend and trying to come up with a solution. Those of us that were working on the frontend found it difficult to setup the board so we switched to working on the backend and our experienced team member working on the frontend, while the rest looking through the backend code and fixed any issues we could find.

We completed working on the backend first, with the backend doing the bulk of the logic for the program. The backend creates two different boards, one filled solely with 1's for the basins or 0's for other tiles and another board filled with numbers that refer to the number of basins around a certain spot.

Whenever the user clicks on a tile the frontend makes a backend api call to check if a basin was clicked or to send back the number of basins around that specified tile.

When a basin is hit, the frontend prevents any further clicks and the game ends. Once the game ends the user is able to start a new game or change the board size.


For the AI we initially tried to use Go but settled on node because of time constraints. The AI works by testing out the middle tile and if it's 0 then click all it's surrounding tiles recursively clicking if a zero is revealed. If a zero is not revealed or a number is revealed in the middle spot a new random spot is clicked. As the AI runs it prints the current revealed board to the console
