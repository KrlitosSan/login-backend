const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const session = require("express-session");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const login = require("./login");
const registro = require("./registro");
const { obtenerUsuario, eliminarUsuario } = require("./usuarios");
const validar = require("./validar");
const saltRounds = 10;
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5174",
  })
);
app.use(
  session({
    secret: "secretkljsdfsadñjflsk",
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/login", login);

app.get("/validar", validar);

app.get("/registro", registro);

app.get("/usuarios", obtenerUsuario);

app.delete("/usuarios", eliminarUsuario);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
