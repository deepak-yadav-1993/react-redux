import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { WeatherApi, restCall } from '../shared/ApiCallService';
import { transformErrorMessage } from './ErrorComponent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { firstCharacterToUpperCase } from '../shared/Utils';
import { errorOcurred } from '../redux/reducers/errorSlice';
import { useDispatch } from 'react-redux';

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

const WeatherApp = () => {
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState<any>({});
  const [newEntry, setNewEntry] = useState('');
  const dispatch = useDispatch();
  const weatherApi = new WeatherApi(WEATHER_API_KEY);

  const handleSubmitClick = async () => {
    setNewEntry(input.toLocaleLowerCase());
    const weatherFnCall = () => weatherApi.getWeather({ city: input });
    if (input.toLocaleLowerCase() !== newEntry) {
      const [res, err] = (await restCall(weatherFnCall)) as unknown as any;
      if (res) {
        // console.log(res.data);
        setWeatherData(res.data);
      } else {
        dispatch(errorOcurred(transformErrorMessage(err)?.message));
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    e.stopPropagation();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.keyCode === 13) handleSubmitClick();
    e.stopPropagation();
  };

  const renderWeather = () => {
    if (weatherData?.weather) {
      const firstResponse = weatherData?.weather?.[0] ?? [];
      // console.log(weatherData);
      const [, icon] = Object.entries(ICONS).filter(
        ([key, _value]) => key === firstResponse?.main.toUpperCase()
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
      return null;
    }
  };

  return (
    <div style={{ color: 'white' }}>
      <>
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
      </>
      {renderWeather()}
      {renderWeatherInfo()}
    </div>
  );
};

export default WeatherApp;
