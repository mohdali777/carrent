const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const mongoose = require("./db/connect");
const addmin = require("./routes/admin")
const userauth = require("./routes/user");
const nocache = require('nocache')
const session = require("express-session")

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(nocache())
app.use(session({
  secret: 'your_secret_key',
  resave: false, 
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 60 * 60, 
      
  },
}));


app.use("/", userauth);
app.use("/admin",addmin)

mongoose()
  .catch(err => console.log(err));

  // port server
app.listen(PORT, () => {
  console.log(`Server running successfully on http://localhost:${PORT}`);
});
