module.exports = (err, _, res) => {
  res.status(500).send(err.message);
};
