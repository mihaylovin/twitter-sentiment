# twitter-sentiment

This is a fork of the original project by **duncanleung**

_There is a daily limit on the number of Twitter Stream API requests. **Please don't leave the app running continually.**_
>_If no Tweets show up, it's because the daily limit has already been reached. Please try again the next day._

>_Or, you can also download the repo and run it on your own server with your own Twitter Stream API keys =)_

####About
Twitterment (Twitter Sentiment) Is a real-time Twitter sentiment dashboard that analyzes and graphs the sentiment of a tracked keyword.

Tech Stack:
- Socket.io
- React.js
- D3.js


####Summary
Twitterment listens to the Twitter Streaming API for the searched keyword. Received Tweets are analyzed with an [AFINN-based sentiment analysis npm module](https://github.com/thisandagain/sentiment), and the analyzed Tweet object is sent to the client.

Node.js (Express) and Socket.io is used on the backend to achieve real-time client-server updates when new tweets are received on the server. React.js is used as the view layer to manage DOM rendering of new Tweets in real-time with a reusable React TweetCard.jsx component. D3.js is used to render each sentiment analyzed Tweet onto a line graph to show the sentiment trend since the search started.

Regarding D3 and React integration, Twitterment uses React to handle DOM manipulations for plotting Data Points (DataPoints.jsx) and Line Paths (LinePath.jsx) for the line graph. This decision was made since React already knows when to rerender the graph when new tweets are received and the tweet counts are updated in the app.

####Built With the Following Technologies:
- Node (Express)
- Socket.io
- React.js
- D3.js
- Sass
- Twitter Streaming API
- Babel
- Webpack
