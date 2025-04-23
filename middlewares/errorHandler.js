const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    error: err.message,
  });
};

module.exports=errorHandler