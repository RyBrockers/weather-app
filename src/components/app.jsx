import React from 'react';
import PropTypes from 'prop-types';

import LocationDetails from './location-details';
import ForecastSummaries from './forecast-summaries';
import ForecastDetails from './forecast-details';

import '../styles/app.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDate: 0,
    };

    this.handleForecastSelect = this.handleForecastSelect.bind(this);
  }

  handleForecastSelect(event) {
    this.setState({
      selectedDate: parseInt(event.target.value, 10),
    });
  }

  render() {
    const selectedForecast = this.props.forecasts
      .find(forecast => forecast.date === this.state.selectedDate);

    return (
      <div className="forecast">
        <LocationDetails
          city={this.props.location.city}
          country={this.props.location.country}
        />
        <ForecastSummaries
          forecasts={this.props.forecasts}
          onForecastSelect={this.handleForecastSelect}
          selectedDate={this.state.selectedDate}
        />
        {
          selectedForecast && <ForecastDetails forecast={selectedForecast} />
        }
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
  forecasts: PropTypes.arrayOf(PropTypes.shape()),
};

App.defaultProps = {
  forecasts: [],
};

export default App;
