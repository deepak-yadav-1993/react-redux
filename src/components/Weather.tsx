import React, { useState, useEffect, useRef } from 'react';
import { WeatherApi, restCall } from '../shared/ApiCallService';
import { transformErrorMessage } from './ErrorComponent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { firstCharacterToUpperCase } from '../shared/Utils';

const ICONS = Object.freeze({
  CLEAR_DAY: 'clear-day.svg',
  CLEAR_NIGHT: 'clear-night.svg',
  CLOUDS: 'cloudy.svg',
  DRIZZLE: 'rain.svg',
  FOG: 'fog.svg',
  MIST: 'mist.svg',
  RAIN: 'rain.svg',
  SNOW: 'snow.svg',
  THUNDERSTORM: 'thunderstorms.svg',
  TORNADO: 'tornado.svg'
});

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherApp = (props: any) => {
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState<any>({});
  const [newEntry, setNewEntry] = useState('');
  const weatherApi = new WeatherApi(WEATHER_API_KEY);

  const { loadingStart, loadingEnd, errorOccured } = props;

  const handleSubmitClick = async () => {
    setNewEntry(input.toLocaleLowerCase());
    if (input.toLocaleLowerCase() !== newEntry) {
      loadingStart();
      const [res, err] = await restCall(weatherApi.getWeather, {
        city: input
      });
      if (res) {
        // console.log(res.data);
        setWeatherData(res.data);
        loadingEnd();
      } else {
        errorOccured(transformErrorMessage(err));
        loadingEnd();
      }
    }
  };

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
    e.stopPropagation();
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' || e.keyCode === 13) handleSubmitClick();
    e.stopPropagation();
  };

  const renderWeather = () => {
    if (weatherData?.weather) {
      const firstResponse = weatherData?.weather?.[0] ?? [];
      // console.log(weatherData);
      const [, icon] = Object.entries(ICONS).filter(
        ([key, value]) => key === firstResponse?.main.toUpperCase()
      )?.[0] ?? ['DEFAULT', 'clear-day.svg']; // Providing fallback value
      return (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/weatherIcons/${icon}`}
            width={175}
            height={175}
          />
        </div>
      );
    }
  };
  const transformWeatherData = (data: any) => {
    return Object.entries(data).map(([key, value]) => {
      const updatedKey = key.replace('_', ' ');
      return [firstCharacterToUpperCase(updatedKey), value];
    });
  };

  const renderWeatherInfo = () => {
    if (weatherData?.main && weatherData?.weather) {
      const data = transformWeatherData(weatherData?.main);
      const { main: weatherString, description } =
        weatherData?.weather?.[0] ?? [];
      return (
        <div className="weather-info">
          <p>{`Summary for ${weatherData?.name}: ${weatherString} (${description}) `}</p>
          {data.map(([infoKey, value]) => (
            <p key={`${infoKey}-${value}`}>{`${infoKey} : ${value}`}</p>
          ))}
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  };

  return (
    <div style={{ color: 'white' }}>
      <React.Fragment>
        <div>
          <TextField
            value={input}
            autoComplete="off"
            id="standard-search"
            label="City"
            type="search"
            className={'customInput'}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div>
          <Button
            style={{ marginTop: '3vh' }}
            variant="outlined"
            onClick={handleSubmitClick}
            className={'customButton'}
          >
            Search
          </Button>
        </div>
      </React.Fragment>
      {renderWeather()}
      {renderWeatherInfo()}
    </div>
  );
};

export default WeatherApp;
