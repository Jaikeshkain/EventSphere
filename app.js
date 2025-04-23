require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//pool
const pool = require("./routes/pool");
pool();

//!connect-mongo
const MongoStore = require("connect-mongo");
//!session
const session = require("express-session");

// var indexRouter = require('./routes/index');
var homeRouter = require("./routes/home");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//!passport
const passport = require("passport");
const passportConfig = require("./configs/Passport");
const errorHandler = require("./middlewares/errorHandler");

//?session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://hjoy118181689:7F8cuofPecjq2YuL@fullstack-blog.h3ljh9t.mongodb.net/fullstack-blog?retryWrites=true&w=majority&appName=Fullstack-Blog",
    }),
  })
);
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// 🔧 Add this before any routes or error handlers
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// app.use('/', indexRouter);
app.use("/", homeRouter);
app.use("/auth", userRouter);
app.use("/posts", postsRouter);

//!Error Handler
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
