const express = require("express");
const cors = require("cors");
const app = express();

const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "used_cars"  // Cambiada a la base de datos "viajes"
});

app.use(cors());
app.use(express.json());

app.post("/usuarios/login", (req, res) => {
    const { email, pass } = req.body;

    const query = `
        SELECT usuario_id FROM usuarios
        WHERE (administrador = 0 AND email = ? AND pass = ?)
            OR (administrador = 1 AND email = ? AND pass = ?)
    `;

    connection.query(query, [email, pass, email, pass], (error, results) => {
        if (error) {
            console.error("Error en la consulta de inicio de sesión:", error);
            res.status(500).send("Error en el servidor.");
            return;
        }

        if (results.length === 0) {
            res.send(undefined);
        } else {
            res.send(true);
        }
    });
});