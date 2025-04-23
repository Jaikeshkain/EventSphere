var mongoose = require("mongoose");
var pool = () => {
  mongoose.Promise = global.Promise;

  mongoose.connect("mongodb+srv://hjoy118181689:7F8cuofPecjq2YuL@fullstack-blog.h3ljh9t.mongodb.net/fullstack-blog?retryWrites=true&w=majority&appName=Fullstack-Blog");

  mongoose.connection
    .once("open", () => console.log("MongoDb Running"))
    .on("error", (err) => console.log(err));
};

module.exports = pool;
