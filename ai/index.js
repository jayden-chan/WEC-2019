const fetch = require('node-fetch');
const axios = require('axios');
const readline = require('readline-sync');

let boardSize = 10;

const PROXY_API = 'http://localhost:5000'

async function main() {
  createBoard();
}

async function createBoard() {
  console.log(`Creating board with size ${boardSize}...`);
  await fetch(PROXY_API + '/new', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      size: boardSize,
    }),
  })
    .then(res => {
      if (res.status === 200) {
        console.log('Board created');
      } else {
        console.log('Board creation failed');
        process.exit(1);
      }
    });
}

async function click(x, y) {
  await fetch(PROXY_API + '/click', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x: x,
      y: y
    }),
  })
    .then(res => {
      if (res.status === 200) {
        console.log('Click succeeded');
      } else if (res.status === 403) {
        console.log('Game over');
        process.exit(1);
      } else {
        console.log('Error with click request');
        process.exit(1);
      }
    });
}

main();
