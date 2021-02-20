module.exports = (app) => {
  app.get("/api/users/:id", (req, res) => {
    const filtro = req.query.filtro;
    return res.status(404).send(false);
  });
};
