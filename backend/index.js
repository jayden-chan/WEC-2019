/**
 * WEC 2019 REST Server Code
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
const Board = require('./board.js');

const port = process.env.PORT || 5000;

const app = express();

let board;

app.use(bodyParser.json());

app.get('/', (req, res) =>  {
  res.send('Hello World!');
});

app.post('/new', (req, res) => {
  if (req.body.size === null) {
    res.status(400).send('need board size');
  }

  board = new Board(req.body.size);
  board.genBasins();
  res.status(200).send(JSON.stringify(board));
});

app.get('/board', (req, res) => {
  if (board instanceof Board) {
    res.status(200).send(JSON.stringify(board));
  } else {
    res.status(400).send('Board not created yet');
  }
});

app.post('/click', (req, res) => {
  if (req.body.x === null || req.body.y === null) {
    res.status(400).send('Missing x or y component');
  } else {
    const result = board.click(req.body.x, req.body.y);
    if (result) {
      res.status(200).send('OK');
    } else {
      res.status(403).send('Hit a basin');
    }
  }
});

app.listen(port, () => console.log(`WEC 2019 server app Listening on port ${port}!`));
