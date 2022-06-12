var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');




//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []



var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var stickersRouter = require('./routes/stickers');
var categoriesRouter = require('./routes/categories');
var languagesRouter = require('./routes/languages');


var app = express();

app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});




app.use('/', indexRouter);
app.use('/stickers', stickersRouter);
app.use('/categories', categoriesRouter);
app.use("/api", apiRouter);
app.use("/languages", languagesRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },

  credentials: true,
}


app.use(cors(corsOptions))


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/aa',(req,res)=>{
  res.send("welcom to api")
})

app.get('/login', (req, res) => {

  res.json(process.env.USERNAME)

})

module.exports = app;
