import React, { useState, useEffect, useRef } from "react";
import { WeatherApi, restCall } from "../shared/ApiCallService";
import axios from "axios";

const ICONS = {
	CLEAR_DAY: "clear-day.svg",
	CLEAR_NIGHT: "clear-night.svg",
	CLOUDS: "cloudy.svg",
	DRIZZLE: "rain.svg",
	FOG: "fog.svg",
	MIST: "mist.svg",
	RAIN: "rain.svg",
	SNOW: "snow.svg",
	THUNDERSTORM: "thunderstorms.svg",
	TORNADO: "tornado.svg",
};

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherApp = () => {
	const [input, setInput] = useState("");
	const [weatherData, setWeatherData] = useState<any>({});
	const [newEntry, setNewEntry] = useState("");
	const weatherRef = useRef();
	const weatherApi = new WeatherApi(WEATHER_API_KEY);

	const handleSubmitClick = async () => {
		setNewEntry(input.toLocaleLowerCase());
		if (input.toLocaleLowerCase() !== newEntry) {
			const [res, err] = await restCall(weatherApi.getWeather, {
				city: input,
			});
			if (res) {
				console.log(res.data);
				setWeatherData(res.data);
			} else {
				// setWeatherData({});
			}
		}
	};

	const handleInputChnage = (e: any) => {
		setInput(e.target.value);
		e.stopPropagation();
	};

	const renderWeather = () => {
		if (weatherData?.weather) {
			const firstResponse = weatherData?.weather?.[0] ?? [];
			const [key, icon] = Object.entries(ICONS).filter(
				([key, value]) => key === firstResponse?.main.toUpperCase()
			)?.[0] ?? ["DEFAULT", "clear-day.svg"];
			return (
				<img
					src={`${process.env.PUBLIC_URL}/weatherIcons/${icon}`}
					width={150}
					height={150}
				/>
			);
		}
	};

	return (
		<div style={{ color: "white" }}>
			<input
				id="autocomplete"
				value={input}
				type="text"
				placeholder="City"
				title="city"
				onChange={handleInputChnage}
				onKeyPress={(e: any) => {
					if (e.key === "Enter" || e.keyCode === 13) handleSubmitClick();
				}}
			/>
			<input type="submit" value="Find" onClick={handleSubmitClick} />
			{renderWeather()}
		</div>
	);
};

export default WeatherApp;
