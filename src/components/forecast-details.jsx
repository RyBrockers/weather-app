import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../styles/forecast-details.scss';
import '../styles/wind-icons.scss';

const ForecastDetails = props => (
  <div className="forecast-details">
    <h2 className="forecast-details__date">
      {moment(props.forecast.date).format('ddd Do MMM')}
    </h2>
    <div className="forecast-details__detail">
      <span className="forecast-details__detail__label">
        Max Temperature:
      </span>
      <span className="forecast-details__detail__value">
        {props.forecast.temperature.max}&#176;c
      </span>
    </div>
    <div className="forecast-details__detail">
      <span className="forecast-details__detail__label">
        Min Temperature:
      </span>
      <span className="forecast-details__detail__value">
        {props.forecast.temperature.min}&#176;c
      </span>
    </div>
    <div className="forecast-details__detail">
      <span className="forecast-details__detail__label">
        Humidity:
      </span>
      <span className="forecast-details__detail__value">
        {props.forecast.humidity}%
      </span>
    </div>
    <div className="forecast-details__detail">
      <span className="forecast-details__detail__label">
        Wind:
      </span>
      <span className="forecast-details__detail__value">
        {props.forecast.wind.speed}mph <i className={`wi wi-towards-${props.forecast.wind.direction}`} />
      </span>
    </div>
  </div>
);

ForecastDetails.propTypes = {
  forecast: PropTypes.shape().isRequired,
};

export default ForecastDetails;
