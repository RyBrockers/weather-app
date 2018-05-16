import React from 'react';
import PropTypes from 'prop-types';

import '../styles/search.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  render() {
    return (
      <div className="search-form">
        <input
          className="search-form__input"
          type="text"
          onChange={this.handleChange}
          value={this.state.searchText}
        />
        <button className="search-form__button" onClick={() => this.props.onSubmit(this.state.searchText)}>Search</button>
      </div>
    );
  }
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
