const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const users = require('./routes/users');

const app = express();
const reset = require("./routes/resetRoute");
app.use("/api/reset", reset);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors())

const db = require('./config/keys').mongoURI

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB is Connected'))
      .catch(err => console.log(err))

// initialize passport for the protected routes
app.use(passport.initialize())

// require the passport that is set up in the config file
require('./config/passport')(passport)

app.use('/api/users', users);

// server static assets if in prduction
if(process.env.NODE_ENV === 'production'){

  // set static folder
  app.use(express.static('client/build'))

  // create route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
})