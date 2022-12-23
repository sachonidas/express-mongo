const express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');
mongoose
    .connect(
        'mongodb://localhost:27017/tvshows',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log("errorErrorError"));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
const models     = require('./models/tvshow')(app, mongoose);
const TVShowCtrl = require('./controllers/tvshows');

// Example Route
const router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);

// API routes
const tvshows = express.Router();

tvshows.route('/tvshows')
    .get(TVShowCtrl.findAllTVShows)
    .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
    .get(TVShowCtrl.findById)
    .put(TVShowCtrl.updateTVShow)
    .delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);

// Start server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});