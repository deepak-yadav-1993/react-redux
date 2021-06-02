import React from "react";
import GoogleAuthComponent from "./GoogleAuth";
import BarChart from "./BarChart";
import Drawer from "@material-ui/core/Drawer";
import {
	BottomNavigation,
	BottomNavigationAction,
	Container,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RestoreIcon from "@material-ui/icons/Restore";
import { connect } from "react-redux";
import { LinearProgress } from "@material-ui/core";
import ErrorComponent from "./ErrorComponent";
import {
	onLoginSuccess,
	onLogoutSuccess,
	onLoadingStart,
	onLoadingEnd,
	onErrorOccured,
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
	render() {
		const loading = this.props.isLoading ? (
			<LinearProgress color="secondary" style={{ height: "4px" }} />
		) : (
			<div
				style={{
					height: "1vh",
				}}
			/>
		);
		const overlayRender = this.props.isLoading ? (
			<div id="overlay" />
		) : (
			<React.Fragment />
		);
		const renderBarChart = this.props.loggedIn ? (
			<BarChart
				chartData={this.props.data}
				chartHeader={this.props.header}
				height={700}
				width={1000}
			/>
		) : (
			<React.Fragment />
		);

		const { errors } = this.props;
		const errorRender =
			errors.length > 0 ? <ErrorComponent /> : <React.Fragment />;
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
				<div className="loading-container">{loading}</div>
				{overlayRender}
				<div className="error-container">{errorRender}</div>
				<Container fixed>
					<GoogleAuthComponent
						loggedIn={this.props.onLoggedIn}
						onLogIn={this.props.onLoginSuccess}
						onLogout={this.props.onLogoutSuccess}
						onLoadingStart={this.props.onLoadingStart}
						onLoadingEnd={this.props.onLoadingEnd}
					/>
					<BottomNavigation
						value={"test"}
						showLabels
						className={defaultElements.COLOR_GROUP}>
						<BottomNavigationAction
							label="Recents"
							style={{ color: defaultElements.ICON_STYLE.COLOR }}
							icon={
								<RestoreIcon
									style={{ color: defaultElements.ICON_STYLE.COLOR }}
								/>
							}
						/>
						<BottomNavigationAction
							label="Favorites"
							style={{ color: defaultElements.ICON_STYLE.COLOR }}
							icon={
								<FavoriteIcon
									style={{ color: defaultElements.ICON_STYLE.COLOR }}
								/>
							}
						/>
					</BottomNavigation>
				</Container>
				{renderBarChart}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
