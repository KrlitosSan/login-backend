const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2/promise");
const cors = require("cors");
const session = require("express-session");
app.use(cors({
    credentials: true,
    origin: "http://localhost:5174",
}));
app.use(session({
    secret: "secretkljsdfsadñjflsk",
}))
// Create the connection to database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "loginexpress",
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/login", async (req, res) => {
    const datos = req.query; // req = peticion, res = respuesta
    try {
        const [results, fields] = await connection.query(
            "SELECT * FROM usuarios WHERE usuario = ? AND `clave` = ?",
            [datos.usuario, datos.clave]
        );
        if (results.length > 0) {
            req.session.usuario = datos.usuario;
            res.status(200).send("Bienvenido!");
        } else {
            res.status(401).send("Usuario o clave incorrectos");
        }

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }
});

app.get("/validar", (req, res) => {
    if (req.session.usuario) {    
        res.status(200).send("sesion validada!");
    } else {
        res.status(401).send("Sesion no validada");
    }
});
    


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
