/**
 * WEC 2019 REST Server Code
 * UVic Team A
 *
 * @author Jayden Chan <jaydencn7@gmail.com>
 * @author Cobey Hollier
 * @author Kahvi Patel
 * @author Ahnaf Ahmed
 *
 * @version 1.0.0
 */

'use latest';
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const app = express();

let board;

app.use(bodyParser.json());

app.get('/', (req, res) =>  {
  res.send('Hello World!');
});

app.get('/new' (req, res) => {
  if (req.body.size === null) {
    res.code(400).send('need board size');
  }

  board = Board(req.body.size);
  res.code(200).send(JSON.stringify(board));
});

app.get('/board' (req, res) => {
  if (board instanceof Board) {
    res.code(200).send(JSON.stringify(board));
  } else {
    res.status(400).send('Board not created yet');
  }
});

app.listen(port, () => console.log(`WEC 2019 server app Listening on port ${port}!`));
