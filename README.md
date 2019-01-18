# WEC-2019
WEC 2019 Programming Competition Code

Team the WAG

We chose to use create a webapp with React due to it being faster to develop in and we used github for collaboration so we could work concurrently on different sections of the code.

We split into one person setting up the back end and the rest setting up the boilerplate for the frontend and trying to come up with a solution. Those of us that were working on the frontend found it difficult to setup the board so we switched to working on the backend and our experienced team member working on the frontend, while the rest looking through the backend code and fixed any issues we could find.

We completed working on the backend first, with the backend doing the bulk of the logic for the program. The backend creates two different boards, one made filled solely with 1's for the basins and another board filled with numbers that refer to the number of basins around a certain spot.

Whenever the user clicks on a tile the frontend makes a backend api call to check if a basin was clicked or to send back the number of basins around that specified tile.

When a basin is hit, the frontend prevents any further clicks and the game ends.

## Progress
- [x] Level 1
- [x] Level 2
- [x] Level 3A
- [x] Level 3B
- [ ] Level 4
