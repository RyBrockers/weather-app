import React from 'react';
import axios from 'axios';

import LocationDetails from './location-details';
import ForecastSummaries from './forecast-summaries';
import ForecastDetails from './forecast-details';
import Search from './search';

import '../styles/app.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedDate: 0,
      forecasts: [],
      location: {
        city: '',
        country: '',
      },
    };

    this.handleForecastSelect = this.handleForecastSelect.bind(this);
    this.requestData = this.requestData.bind(this);
  }

  componentDidMount() {
    this.requestData();
  }

  requestData(city) {
    axios.get('https://mcr-codes-weather.herokuapp.com/forecast', {
      params: { city },
    })
      .then((response) => {
        this.setState({
          forecasts: response.data.forecasts,
          location: {
            city: response.data.location.city,
            country: response.data.location.country,
          },
        });
      });
  }

  handleForecastSelect(event) {
    this.setState({
      selectedDate: parseInt(event.target.value, 10),
    });
  }

  render() {
    const selectedForecast = this.state.forecasts
      .find(forecast => forecast.date === this.state.selectedDate);

    return (
      <div className="forecast">
        <LocationDetails
          city={this.state.location.city}
          country={this.state.location.country}
        />
        <Search onSubmit={this.requestData} />
        <ForecastSummaries
          forecasts={this.state.forecasts}
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

export default App;
