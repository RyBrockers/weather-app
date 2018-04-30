import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import WeatherIcon from 'react-icons-weather';
import classnames from 'classnames';

import LocationDetails from './location-details';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDate: 0,
    };

    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  handleTabSelect(event) {
    this.setState({
      selectedDate: parseInt(event.target.value, 10),
    });
  }

  render() {
    const selectedForecast = this.props.forecasts
      .find(forecast => forecast.date === this.state.selectedDate);

    const summaryClassName = date => classnames('forecast__summary', {
      'forecast__summary--selected': this.state.selectedDate === date,
    });

    return (
      <div className="forecast">
        <LocationDetails
          city={this.props.location.city}
          country={this.props.location.country}
        />
        <div className="forecast__summaries">
          {
            this.props.forecasts.map(forecast => (
              <div
                className={summaryClassName(forecast.date)}
                key={forecast.date}
              >
                <div className="forecast__summary__date">
                  <span>{moment(forecast.date).format('ddd Do MMM')}</span>
                </div>
                <div className="forecast__summary__icon">
                  <WeatherIcon name="owm" iconId={forecast.iconId} />
                </div>
                <div className="forecast__summary__temperature">
                  <span>{forecast.temperature.max}&#176;c</span>
                </div>
                <div className="forecast__summary__description">
                  <span>{forecast.description}</span>
                </div>
                <button
                  className="forecast__summary__button"
                  value={forecast.date}
                  onClick={this.handleTabSelect}
                >
                  More details
                </button>
              </div>
            ))
          }
        </div>
        {
          selectedForecast && (
          <div className="forecast__details">
            <h2 className="forecast__details__date">
              {moment(selectedForecast.date).format('ddd Do MMM')}
            </h2>
            <div className="forecast__details__detail">
              <span className="forecast__details__detail__label">
                Max Temperature:
              </span>
              <span className="forecast__details__detail__value">
                {selectedForecast.temperature.max}&#176;c
              </span>
            </div>
            <div className="forecast__details__detail">
              <span className="forecast__details__detail__label">
                Min Temperature:
              </span>
              <span className="forecast__details__detail__value">
                {selectedForecast.temperature.min}&#176;c
              </span>
            </div>
            <div className="forecast__details__detail">
              <span className="forecast__details__detail__label">
                Humidity:
              </span>
              <span className="forecast__details__detail__value">
                {selectedForecast.humidity}%
              </span>
            </div>
            <div className="forecast__details__detail">
              <span className="forecast__details__detail__label">
                Wind:
              </span>
              <span className="forecast__details__detail__value">
                {selectedForecast.wind.speed}mph <i className={`wi wi-towards-${selectedForecast.wind.direction}`} />
              </span>
            </div>
          </div>)
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
  forecasts: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number,
    temperature: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
    wind: PropTypes.shape({
      speed: PropTypes.number,
      direction: PropTypes.string,
    }),
    humidity: PropTypes.number,
    description: PropTypes.string,
    iconId: PropTypes.string,
  })),
};

App.defaultProps = {
  forecasts: [],
};

export default App;
