const readline = require('readline');
const fetch = require('node-fetch');
const axios = require('axios');

let boardSize;

const PROXY_API = 'https://localhost:5000'

async function main() {

  console.log('Creating board...');
  await axios({
    method: 'post',
    url: PROXY_API + '/new'
  })
    .then(response => {
      if (response.status >= 200) {
        console.log('ok');
      }
    })
    .catch(error => {
      if (error.response.status === 400) {
        console.log('error');
      } else if (error.response.status === 404) {
        console.log('error');
      } else {
        console.log('error');
      }
    });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter the board size: ', (answer) => {
  console.log(answer);
  boardSize = answer;
  rl.close();
});

main();
