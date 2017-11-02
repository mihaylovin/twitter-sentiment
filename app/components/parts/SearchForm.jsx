var React = require('react');
var ReactDOM = require('react-dom');
const store = require('../store');

class SearchForm extends React.Component {
  search() {
    var keyword = ReactDOM.findDOMNode(this.refs.keyword).value;
    var initTimestamp = new Date().getTime();
    store.put("search", keyword);
    this.props.emit('search', { keyword: keyword });
    this.props.initTimestamp({ initTimestamp: initTimestamp });
  }

  render() {
    return (
      <div id="search-bar">
          <form className="input-group" action="javascript:void(0)" onSubmit={ this.search.bind(this) }>
            <input id="search" ref="keyword" type="search" placeholder="Enter Brand or Keyword"
                    autoFocus="autofocus" className="form-control" />
            <span className="input-group-btn">
              <button id="submit" className="btn btn-default" type="button" onClick= { this.search.bind(this) }>Search</button>
            </span>
          </form>
      </div>
    );
  }
}

module.exports = SearchForm;
