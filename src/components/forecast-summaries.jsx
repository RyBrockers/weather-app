import React from 'react';
import PropTypes from 'prop-types';

import ForecastSummary from './forecast-summary';

import '../styles/forecast-summaries.scss';

const ForecastSummaries = props => (
  <div className="forecast-summaries">
    {
      props.forecasts.map(forecast => (
        <ForecastSummary
          key={forecast.date}
          date={forecast.date}
          description={forecast.description}
          icon={forecast.icon}
          onSelect={props.onForecastSelect}
          selected={forecast.date === props.selectedDate}
          temperature={forecast.temperature.max}
        />
      ))
    }
  </div>
);

ForecastSummaries.propTypes = {
  forecasts: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number,
    description: PropTypes.string,
    icon: PropTypes.string,
    temperature: PropTypes.shape({
      max: PropTypes.number,
    }),
  })).isRequired,
  onForecastSelect: PropTypes.func.isRequired,
  selectedDate: PropTypes.number.isRequired,
};

export default ForecastSummaries;
