const connection = require("./conexion");

const obtenerUsuario = async (req, res) => {
  if (!req.session.usuario) {
    res.status(400).send("No Autorizado");
    return;
  }
  // req = peticion, res = respuesta
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios`"
    );
    res.status(200).json(results);

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

const eliminarUsuario = async (req, res) => {
  if (!req.session.usuario) {
    res.status(400).send("No Autorizado");
    return;
  }
  const datos = req.query;
  // req = peticion, res = respuesta
  try {
    const [results, fields] = await connection.query(
      "DELETE FROM usuarios WHERE `usuarios`.`id` = ?",
      [datos.id]
    );
    if (results.affectedRows > 0) {
      res.status(200).send("Usuario eliminado correctamente");
    } else {
      res.status(401).send("Usuario No se pudo eliminar");
    }

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  obtenerUsuario,
  eliminarUsuario,
};
