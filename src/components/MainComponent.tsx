import React from "react";
import GoogleAuthComponent from "./GoogleAuth";
import BarChart from "./BarChart";
import Weather from "./Weather";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import {
	BottomNavigation,
	BottomNavigationAction,
	Container,
} from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import ErrorComponent from "./ErrorComponent";
import {
	onLoginSuccess,
	onLogoutSuccess,
	onLoadingStart,
	onLoadingEnd,
	onErrorOccured,
	onNavigationToggle,
} from "../redux/ActionCreaters";

const mapStateToProps = ({ appState }: any) => {
	return {
		...appState,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onLoginSuccess: (userdata: Object) => dispatch(onLoginSuccess(userdata)),
		onLogoutSuccess: () => dispatch(onLogoutSuccess()),
		onLoadingStart: () => dispatch(onLoadingStart()),
		onLoadingEnd: () => dispatch(onLoadingEnd()),
		onErrorOccured: (error: any) => dispatch(onErrorOccured(error)),
		onNavigationToggle: (navItem: string) =>
			dispatch(onNavigationToggle(navItem)),
	};
};

const defaultElements = {
	CONTAINER_CLASS: "component main",
	CONTENT_CLASS: "content-section",
	NAVIGATION_CLASS: "nav-section",
	COLOR_GROUP: "generic-color",
	ICON_STYLE: {
		COLOR: "white",
	},
};

class MainComponent extends React.Component<any, any> {
	renderLoading = () => {
		return this.props.isLoading ? (
			<div className="loading-container">
				<LinearProgress color="secondary" style={{ height: "4px" }} />
			</div>
		) : (
			<div
				style={{
					height: "2vh",
				}}
			/>
		);
	};

	renderOverlay = () => {
		return this.props.isLoading ? (
			<div className="error-container">
				<div id="overlay" />
			</div>
		) : (
			<React.Fragment />
		);
	};

	renderError = () => {
		const { errors } = this.props;
		return errors.length > 0 ? <ErrorComponent /> : <React.Fragment />;
	};

	render() {
		const renderBarChart =
			this.props.loggedIn && !this.props.isLoading ? (
				<BarChart
					chartData={this.props.data}
					chartHeader={this.props.header}
					height={550}
					width={850}
				/>
			) : (
				<React.Fragment />
			);

		const renderFinancesApps =
			this.props.navLocation === "finances" ? (
				<React.Fragment>
					{renderBarChart}
					<GoogleAuthComponent
						loggedIn={this.props.onLoggedIn}
						onLogIn={this.props.onLoginSuccess}
						onLogout={this.props.onLogoutSuccess}
						onLoadingStart={this.props.onLoadingStart}
						onLoadingEnd={this.props.onLoadingEnd}
					/>
				</React.Fragment>
			) : (
				<React.Fragment />
			);

		const renderWeatherApps =
			this.props.navLocation === "weather" ? (
				<React.Fragment>
					<Weather
						loadingStart={this.props.onLoadingStart}
						loadingEnd={this.props.onLoadingEnd}
						errorOccured={this.props.onErrorOccured}
					/>
				</React.Fragment>
			) : (
				<React.Fragment />
			);
		return (
			<div
				className={`${defaultElements.CONTAINER_CLASS} ${defaultElements.COLOR_GROUP}`}>
				{/* <React.Fragment>
					<Drawer
						anchor={"left"}
						open={true}
						onClose={() => {
							console.log("dee");
						}}>
						Teststing Blah blah
					</Drawer>
				</React.Fragment> */}
				{this.renderLoading()}
				{this.renderOverlay()}
				{this.renderError()}
				<Container fixed>
					<BottomNavigation
						showLabels
						className={defaultElements.COLOR_GROUP}
						value={this.props.navLocation}
						onChange={(event: any, newValue: any) => {
							this.props.onNavigationToggle(newValue);
						}}>
						<BottomNavigationAction
							label="Finances"
							value="finances"
							style={{ color: defaultElements.ICON_STYLE.COLOR }}
							icon={
								<MonetizationOnIcon
									style={{ color: defaultElements.ICON_STYLE.COLOR }}
								/>
							}
						/>
						<BottomNavigationAction
							label="Weather"
							value="weather"
							style={{ color: defaultElements.ICON_STYLE.COLOR }}
							icon={
								<WbSunnyIcon
									style={{ color: defaultElements.ICON_STYLE.COLOR }}
								/>
							}
						/>
					</BottomNavigation>
				</Container>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						{renderFinancesApps}
					</Grid>
					<Grid item xs={12}>
						{renderWeatherApps}
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
