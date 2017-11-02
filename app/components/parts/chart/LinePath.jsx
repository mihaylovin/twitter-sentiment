var React = require('react');
var d3 = require('d3');

var Line = require('./Line.jsx');


var LinePath = React.createClass({

  render: function() {
    var props = this.props;
    var xScale = props.xScale;
    var yScale = props.yScale;

    var pathTotal = d3.svg.line()
                      .x(function(d) {
                        return xScale(d.timeBin);
                      })
                      .y(function(d) {
                        return yScale(d.numTweets);
                      })
                      .interpolate("linear");

    var pathPositive = d3.svg.line()
                        .x(function(d) {
                          return xScale(d.timeBin);
                        })
                        .y(function(d) {
                          return yScale(d.posTweets);
                        })
                        .interpolate("cardinal");

    var pathNegative = d3.svg.line()
                        .x(function(d) {
                          return xScale(d.timeBin);
                        })
                        .y(function(d) {
                          return yScale(d.negTweets);
                        })
                        .interpolate("cardinal");

    var pathNeutral = d3.svg.line()
                        .x(function(d) {
                          return xScale(d.timeBin);
                        })
                        .y(function(d) {
                          return yScale(d.neutTweets);
                        })
                        .interpolate("cardinal");

    return (
      <g>
        <Line path={ pathTotal(this.props.binnedTweets) } stroke={ "blue" }/>

      </g>
    );
  }
});

module.exports = LinePath;
