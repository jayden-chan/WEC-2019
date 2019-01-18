const fetch = require('node-fetch');
const axios = require('axios');
const readline = require('readline-sync');

let boardSize = 10;
let board = [];

const PROXY_API = 'http://localhost:5000'

async function main() {
  let point = boardSize/2;
  await createBoard();
  await click(point, point);

  while (board[point][point] !== 0) {
    point += 2;
    await click(point, point);
    if (point >= boardSize-1) {
      point = 0;
    }
  }

  await step(point, point);
  await sleep(1500);
  printBoard();
}

function checkPoint(x, y) {
  if (x > boardSize-1 || y > boardSize-1) {
    return false;
  }

  if (x < 0 || y < 0) {
    return false;
  }

  return true;
}

async function step(x, y) {
  let visited = [];

  if (board[x][y] === 0) {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        let xNew = x-1+i;
        let yNew = y-1+j;

        if (!checkPoint(xNew, yNew)) {
          continue;
        }

        if (board[xNew][yNew] !== -1) {
          continue;
        }

        visited.push({x: xNew, y: yNew});
        await click(xNew, yNew);
      }
    }
  }

  visited.forEach(async (point) => {
    await step(point.x, point.y);
  });

  if (visited.length === 0) {
    for(let i = 0; i < boardSize; i++) {
      for(let j = 0; j < boardSize; j++) {
        if (board[i][j] > 0) {

          let numFree = [];

          for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
              let xNew = x-1+i;
              let yNew = y-1+j;

              if (!checkPoint(xNew, yNew)) {
                continue;
              }

              if(board[xNew][yNew] === -1) {
                numFree.push({x: xNew, y: yNew});
              }
            }
          }

          if (numFree.length === board[x][y]) {
            numFree.forEach(async (point) => {
              board[point.x][point.y] = -2;
              for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                  let xNew = x-1+i;
                  let yNew = y-1+j;

                  if (!checkPoint(xNew, yNew)) {
                    continue;
                  }

                  if (board[xNew][yNew] > 0) {
                    board[xNew][yNew] -= 1;
                  }
                }
              }
            });

            numFree.forEach(async (point) => {
              for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                  let xNew = x-1+i;
                  let yNew = y-1+j;

                  if (!checkPoint(xNew, yNew)) {
                    continue;
                  }

                  if (board[point.x][point.y] === 0) {
                    await step(point.x, point.y);
                  }
                }
              }
            });
          }
        }
      }
    }
  }
}

async function click(x, y) {
  console.log(`Clicking ${x}, ${y}`);
  const res = await fetch(PROXY_API + '/click', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x: x,
      y: y
    }),
  });

  if (res.status === 200) {
    console.log('Succeeded');
    const json = await res.json();
    board[x][y] = json.adjacent;
  } else if (res.status === 403) {
    console.log('Game over');
    process.exit(1);
  } else {
    console.log('Error with click request');
    process.exit(1);
  }
}

async function createBoard() {
  console.log(`Creating board with size ${boardSize}...`);
  const res = await fetch(PROXY_API + '/new', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      size: boardSize,
    }),
  });

  if (res.status === 200) {
    console.log('Board created');
  } else {
    console.log('Board creation failed');
    process.exit(1);
  }
    
  for(let i = 0; i < boardSize; i++) {
    board[i] = [];
    for(let j = 0; j < boardSize; j++) {
      board[i][j] = -1;
    }
  }
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function printBoard() {
  console.log('BOARD: ');
  for(let i = 0; i < boardSize; i++) {
    for(let j = 0; j < boardSize; j++) {
      if (board[i][j] === -1) {
        process.stdout.write('- ');
      } else if (board[i][j] === -2) {
        process.stdout.write('B ');
      } else {
        process.stdout.write(board[i][j] + ' ');
      }
    }
    console.log();
  }
}

main();
