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

app.post("/usuarios/create", (req, res) => {
    const { email, pass } = req.body;

    // Check if the email already exists
    const checkEmailQuery = "SELECT COUNT(*) as count FROM usuarios WHERE email = ?";
    
    connection.query(checkEmailQuery, [email], (error, result) => {
        if (error) {
            console.error("Error al verificar el correo:", error);
            res.status(500).send("Error en el servidor.");
            return;
        }

        const userCount = result[0].count;

        if (userCount > 0) {
            // Email already exists, return an error
            res.status(400).send("El correo electrónico ya está en uso.");
            return;
        }

        // Email is unique, proceed with user creation
        const insertUserQuery = "INSERT INTO usuarios (email, pass, administrador) VALUES (?, ?, 0)";

        connection.query(insertUserQuery, [email, pass], (error, userResult) => {
            if (error) {
                console.error("Error al crear usuario:", error);
                res.status(500).send("Error en el servidor.");
                return;
            }

            const userId = userResult.insertId;

            const insertPermissionsQuery = "INSERT INTO permisosusuario (usuario_id, permiso_id) VALUES (?, 2)";

            connection.query(insertPermissionsQuery, [userId], (error) => {
                if (error) {
                    console.error("Error al asignar permisos al usuario:", error);
                    res.status(500).send("Error en el servidor.");
                    return;
                }

                res.send(true);
            });
        });
    });
});
