//Require Dependencies
var express = require('express');
var https = require('https');

var Twitter = require('./Twitter');
var sentiment = require('./NodeSentiment.js');
var twitterStream = Twitter;

//Create Express Server Instance
var app = express();
var port = process.env.PORT || 4000;

//Routes and Serve Static Files
app.use(express.static(__dirname + './../app/public'));



/*
Create Server and Socket.io Instance
==================*/
var server = app.listen(port);
console.log('Server on port: %s', port);

var io = require('socket.io').listen(server);
var connections = [];

//Create socket.io Connection with Client
//All Socket Listeners Here
io.sockets.on('connection', function(socket) {

  connections.push(socket);
  console.log('%s Connected. %s sockets connected', socket.id, connections.length);

  var prevSearch = false;
  var twitterStream;

  //init price chart
  var getBitcoinPrice = function () {
    const options = {
      hostname: 'api.coinbase.com',
      path: '/v2/prices/spot?currency=EUR',
      method: 'GET'
    };

    const req = https.request(options, (res) => {
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);

    res.on('data', (d) => {
        socket.emit('price', {price: d.toString("utf-8")});
      });
    });

    req.on('error', (e) => {
      console.error(e);
    });
    req.end();
  }

  setInterval(getBitcoinPrice, 1000);

  socket.on('search', function(payload) {
    console.log('Keyword: %s', payload.keyword);

    if(prevSearch) {
      twitterStream.stop();
      console.log(prevSearch);
      console.log('stop stream');

    } else {
      prevSearch = true;
    }

    twitterStream = Twitter.stream('statuses/filter', {language: 'en', track: payload.keyword});


    var lastTimestamp = Date.now(),
        speedLimiter = 800; //800ms

    //Turn on Twitter Stream
    twitterStream.on('tweet', function(tweet) {

      if(tweet.timestamp_ms - lastTimestamp > speedLimiter) {

        lastTimestamp = Date.now();

        // Send Tweet Object to Client
        socket.emit('sendTweet', {tweet: sentiment.getSentiment(tweet, socket)});
      }
    });

    socket.once('disconnect', function() {
      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect();
      twitterStream.stop();
      console.log('Socket disconnected: %s sockets remaining', connections.length);
    });
  });

}); //END io.sockets.on
