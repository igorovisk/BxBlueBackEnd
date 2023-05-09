const express = require("express");
const app = express();
const routes = require("./src/routes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const { connectToDatabase } = require("./database/db");

app.use(cors({
   origin: '*'
}));

app.use(bodyParser.json());

//ROUTES
app.use("/users", routes.users);
app.use("/login", routes.auth);
app.use("/transactions", routes.transactions);
app.use("/pokemons", routes.pokemons);

//DATABASE
(async function establishDbConnectionAndListenToPort() {
   await connectToDatabase().then(() => {
      app.listen(process.env.PORT, () => {
         console.log(`Running server on port: ${process.env.PORT}...`);
      });
   });
})();
