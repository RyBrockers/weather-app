import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { Route } from 'react-router-dom';

import LocationDetails from './location-details';
import ForecastSummaries from './forecast-summaries';
import ForecastDetails from './forecast-details';
import Search from './search';

import '../styles/app.scss';

const NotFound = () => <h1>Not Found</h1>;

const Err = () => <h1>Something Went Wrong :(</h1>;

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
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    const city = query.city || null;
    this.requestData(city);
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
        if (city) {
          this.props.history
            .replace(`/?city=${city}`);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.props.history.push('/not-found');
        } else {
          this.props.history.push('/error');
        }
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
        <Route exact path="/not-found" component={NotFound} />
        <Route exact path="/error" component={Err} />
      </div>
    );
  }
}

export default App;
