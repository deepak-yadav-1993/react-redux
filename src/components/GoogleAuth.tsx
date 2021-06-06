import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import APIService from "../shared/ApiCallService";
import { connect } from "react-redux";
import { onSheetsDataRecieved, onErrorOccured } from "../redux/ActionCreaters";
import { ErrorType, SheetsData } from "../shared/Type";
import { transformErrorMessage } from "./ErrorComponent";

const containerClass = "component google-auth";

// using react-env for local developemnt but setting environment variable when publishing docker image
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const mapStateToProps = (state: any) => {
	const { sheetData, speadSheetId, sheetId, loggedIn } = state.appState;
	return {
		sheetData,
		speadSheetId,
		sheetId,
		loggedIn,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onSheetsDataRecieved: (sheetData: SheetsData) =>
			dispatch(onSheetsDataRecieved(sheetData)),
		onErrorOccured: (error: ErrorType) => dispatch(onErrorOccured(error)),
	};
};
const emptyRecord = (element: string) => element === "";
/**
 * This function filters out the rows that do not have values for the
 * headers
 *
 * @param header [string]: An array of headers
 * @param data [string]: An array of data values
 */
const filterData = ({ header, data }: SheetsData) => {
	const transformedData = data.map((row: any) => {
		return row.map((item: any) => {
			const record = item.replace("$", "");
			return record.replace(",", "");
		});
	});

	const result = transformedData.filter(
		(row: any) => row.length === header.length && !row.some(emptyRecord)
	);

	// Send record of last 12 months year
	return result.length > 12
		? result.slice(result.length - 12, result.length)
		: result;
};

const GoogleAuth = (props: any) => {
	// Reserved for hooks
	useEffect(() => {
		// Update the document title using the browser API
		window.addEventListener("click", onClickHandler);
		return () => {
			// Cleanup
			window.removeEventListener("click", onClickHandler);
		};
	});

	const {
		loggedIn,
		onLogIn,
		onLogout,
		onLoadingStart,
		onLoadingEnd,
		onErrorOccured,
		onSheetsDataRecieved,
	} = props;

	const onClickHandler = (e: any) => {
		const buttonElement = document.querySelector(".my-google-button-class");
		if (buttonElement?.contains(e.target)) {
			onLoadingStart();
			e.stopPropagation();
		}
	};

	const handleLoginSuccess = async (response: any) => {
		const userProfile = {
			name: response.profileObj.name,
			email: response.profileObj.email,
			imageUrl: response.profileObj.imageUrl,
			googleId: response.profileObj.googleId,
		};
		onLogIn(userProfile);

		const apiService = new APIService(response.accessToken);

		try {
			const { speadSheetId, sheetId } = props;
			// const test = await apiService.getLoginHistory({
			// 	maxResults: 45,
			// });
			// console.log(test);
			const sheets = await apiService.getSheetData({
				speadSheetId,
				sheetId,
			});
			let [header, ...data] = sheets?.data?.values ?? [];
			data = filterData({ header, data });
			onSheetsDataRecieved({ header, data });
			onLoadingEnd();
		} catch (err) {
			console.log(err);
			onErrorOccured(transformErrorMessage(err));
			onSheetsDataRecieved([]);
			onLoadingEnd();
		}
	};

	const handleLogout = () => {
		onLogout();
		onLoadingEnd();
	};

	const handleLoginFailed = ({ error: message }: any) => {
		const errMsg = { message };
		onErrorOccured(errMsg);
		onLoadingEnd();
	};

	const _renderButton = (googleClientId: any) => {
		return loggedIn ? (
			<GoogleLogout
				key="google-logout-button"
				clientId={googleClientId}
				className="my-google-button-class logout"
				buttonText="Logout"
				onLogoutSuccess={handleLogout}
			/>
		) : (
			<GoogleLogin
				key="google-login-button"
				clientId={googleClientId}
				className="my-google-button-class login"
				onSuccess={handleLoginSuccess}
				onFailure={handleLoginFailed}
				scope="https://www.googleapis.com/auth/spreadsheets"
				isSignedIn={true}
				buttonText="Login with Google"
			/>
		);
	};
	return <div className={containerClass}>{_renderButton(googleClientId)}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
