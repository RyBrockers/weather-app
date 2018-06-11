import PropTypes from 'prop-types';

const Forecast = {
  date: PropTypes.number,
  temperature: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number,
  }),
  wind: PropTypes.shape({
    speed: PropTypes.number,
    direction: PropTypes.string,
  }),
  humidity: PropTypes.number,
  description: PropTypes.string,
  icon: PropTypes.string,
};

export default Forecast;
