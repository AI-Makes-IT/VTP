const express = require('express');
const figlet = require('figlet');
const app = express();

app.get('/', (req, res) => {
  figlet.text('Hello World!', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
