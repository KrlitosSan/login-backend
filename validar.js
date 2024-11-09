const validar = (erq, res) => {
  if (req.session.usuario) {
    res.status(200).send("sesion validada!");
  } else {
    res.status(401).send("Sesion no validada");
  }
};
module.exports = validar;