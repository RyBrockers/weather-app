import React from 'react';
import PropTypes from 'prop-types';
import WeatherIcon from 'react-icons-weather';
import classnames from 'classnames';
import moment from 'moment';

import '../styles/forecast-summary.scss';

const summaryClassName = selected => classnames('forecast-summary', {
  'forecast-summary--selected': selected,
});

const ForecastSummary = props => (
  <div className={summaryClassName(props.selected)}>
    <div className="forecast-summary__date">
      <span>{moment(props.date).format('ddd Do MMM')}</span>
    </div>
    <div className="forecast-summary__icon">
      <WeatherIcon name="owm" iconId={props.icon} />
    </div>
    <div className="forecast-summary__temperature">
      <span>{props.temperature}&#176;c</span>
    </div>
    <div className="forecast-summary__description">
      <span>{props.description}</span>
    </div>
    <button
      className="forecast-summary__button"
      value={props.date}
      onClick={props.onSelect}
    >
      More details
    </button>
  </div>
);

ForecastSummary.propTypes = {
  date: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  temperature: PropTypes.number.isRequired,
};

ForecastSummary.defaultProps = {
  selected: false,
};

export default ForecastSummary;
