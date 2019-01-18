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

app.use(bodyParser.json());

app.get('/', (req, res) =>  {
  res.send('Hello World!');
});

app.listen(port, () => console.log(`WEC 2019 server app Listening on port ${port}!`));
