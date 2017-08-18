let express = require('express');
let mongoose = require('mongoose');
let MongoClient = require('mongodb').MongoClient;

let dburl = 'mongodb://joel:$password@ds135963.mlab.com:35963/personal_website';

let router = express.Router();

// Route handlers
// GET '/' homepage
router.get('/', (req, res) => {
    res.render('index', {
        title : 'Joel Wilson'
    });
});

// GET '/portolio'
router.get('/portfolio', (req, res) => {
    res.render('portfolio', {
        title: 'Portfolio - Joel Wilson'
    });
});

// GET '/about'
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About - Joel Wilson'
    });
});

// GET '/resume'
router.get('/resume', (req, res) => {
    res.render('resume', {
        title: 'Resume - Joel Wilson'
    });
});

// GET '/contact
router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact - Joel Wilson'
    });
});

// mongoose message model
  let Message = mongoose.model('Message', {
       firstname : String,
       lastname : String,
       email : String,
       message : String,
       date : Date
   });

// route handler for /contact ajax post request
router.post('/contact', (req, res, next) => {
    //delete mongoose.connection.models['Message'];

    mongoose.connect(dburl, {
        useMongoClient : true
    });

    // use current date 
    let date = Date.now();

   let message = new Message({
       firstname : req.body.firstname,
       lastname : req.body.lastname,
       email : req.body.email,
       message : req.body.message,
       date : date
   });

   // save the message
   message.save((err) => {
       if (err) {
           console.log(err);
           res.sendStatus(500);
       } else {
           res.sendStatus(200);
       }
   })
});



module.exports = router;