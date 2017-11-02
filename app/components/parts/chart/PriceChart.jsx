var React = require('react');


var Line = require('./Line.jsx');
var XYAxes = require('./XYAxes.jsx');


//LineChart Holds All Data Points and the XYAxes
var PriceChart = React.createClass({

  //Use D3 to Scale 'x' Data Points to Fit Chart Area
  //Use for Data Points and for Axis
  getXScale: function(props) {
    var xMax = props.prices[props.prices.length-1].date;

    return d3.scale.linear()
            .domain([props.prices[0].date, xMax])
            .range([0, props.width]);
  },

  //Use D3 to Scale 'y' Data Points to Fit Chart Area
  //Use for Data Points and for Axis
  getYScale: function(props) {
    var yMax = d3.max(props.prices, function(d) { return d.price });
    var yMin = d3.min(props.prices, function(d) { return d.price });

    return d3.scale.linear()
            .domain([yMin, yMax])
            .range([props.height, 0]);
  },


  pathTotal: d3.svg.line()
                    .x(function(d) {
                      return this.getXScale(this.props)(d.date);
                    })
                    .y(function(d) {
                      return this.getYScale(this.props)(d.price);
                    })
                    .interpolate("linear"),

  //Use React to Append svg Element (Usually D3 Handles This)
  render: function() {
    var xScale = this.getXScale(this.props);
    var yScale = this.getYScale(this.props);
    var pathTotal = this.pathTotal;
    var chartDisplay = {
      className: 'chart-area',
      transform: 'translate(' + this.props.margin.left + ', ' + this.props.margin.top + ')',
    };
    //{...this.props} combines all props (aka. xScale, yScale) into 'props'
    return (
      <svg className="line-chart" width={ this.props.chartWidth } height={ this.props.chartHeight }>
        <g { ...chartDisplay }>
          <XYAxes
            xScale={ xScale }
            yScale={ yScale }
            { ...this.props }
          />
          <g>
            <Line path={ pathTotal(this.props.prices) } stroke={ "black" }/>
          </g>
        </g>
      </svg>

    );
  }
});

module.exports = PriceChart;
