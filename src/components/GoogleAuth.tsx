import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import apiService from "../shared/ApiCallService";
import { connect } from "react-redux";
import { sheetsDataRecieved, errorOccured } from "../redux/ActionCreaters";
import { ErrorType, SheetsData } from "../shared/Type";
import { transformErrorMessage } from "./ErrorComponent";

const containerClass = "component google-auth";

// using react-env for local developemnt but setting environment variable when publishing docker image
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const mapStateToProps = (state: any) => {
	let { sheetData, speadSheetId, sheetId } = state.appState;
	return {
		sheetData,
		speadSheetId,
		sheetId,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		sheetsDataRecieved: (sheetData: SheetsData) =>
			dispatch(sheetsDataRecieved(sheetData)),
		errorOccured: (error: ErrorType) => dispatch(errorOccured(error)),
	};
};

/**
 * This function filters out the rows that do not have values for the
 * headers
 *
 * @param header [string]: An array of headers
 * @param data [string]: An array of data values
 */
const filterData = ({ header, data }: SheetsData) => {
	return data.filter((row: any) => row.length === header.length);
};

const GoogleAuth = (props: any) => {
	// Reserved for hooks
	useEffect(() => {
		// Update the document title using the browser API
		window.addEventListener("click", onClickHandler);
		return function cleanup() {
			window.removeEventListener("click", onClickHandler);
		};
	});

	const onClickHandler = (e: any) => {
		const buttonElement = document.querySelector(".my-google-button-class");
		if (buttonElement?.contains(e.target)) {
			props.loadingStart();
			e.stopPropagation();
		}
	};

	const loginSuccess = async (response: any) => {
		let userProfile = {
			name: response.profileObj.name,
			email: response.profileObj.email,
			imageUrl: response.profileObj.imageUrl,
			googleId: response.profileObj.googleId,
		};
		props.onLogIn(userProfile);

		try {
			let { speadSheetId, sheetId } = props;
			let sheets = await new apiService(response.accessToken).getSheetData({
				speadSheetId,
				sheetId,
			});
			let [header, ...data] = sheets?.data?.values ?? [];
			data = filterData({ header, data });
			props.sheetsDataRecieved({ header, data });
			props.loadingEnd();
		} catch (err) {
			props.sheetsDataRecieved([]);
			props.loadingEnd();
			props.errorOccured(transformErrorMessage(err));
		}
	};

	const handleLogout = () => {
		console.log("Logged Out");
		props.onLogout();
		props.loadingEnd();
	};

	const loginfailed = ({ error: message }: any) => {
		props.errorOccured({ message });
		props.loadingEnd();
	};

	const _renderButton = (googleClientId: any) => {
		return props.loggedIn ? (
			<GoogleLogout
				clientId={googleClientId}
				className="my-google-button-class"
				buttonText="Logout"
				onLogoutSuccess={handleLogout}
			/>
		) : (
			<GoogleLogin
				clientId={googleClientId}
				className="my-google-button-class"
				onSuccess={loginSuccess}
				onFailure={loginfailed}
				scope="https://www.googleapis.com/auth/spreadsheets"
				isSignedIn={true}
				buttonText="Login with Google"
			/>
		);
	};
	return <div className={containerClass}>{_renderButton(googleClientId)}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
