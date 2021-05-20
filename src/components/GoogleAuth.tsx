import React from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { clientId } from "../shared/GoogleAuthCreds";
import apiService from "../shared/ApiCallService";
import { connect } from "react-redux";
import { sheetsDataRecieved, errorOccured } from "../redux/ActionCreaters";
import { ErrorType, SheetsData } from "../shared/Type";
import { transformErrorMessage } from "./ErrorComponent";

const containerClass = "component google-auth";

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
class GoogleAuth extends React.Component<any, any> {
	render() {
		const loginSuccess = async (response: any) => {
			let userProfile = {
				name: response.profileObj.name,
				email: response.profileObj.email,
				imageUrl: response.profileObj.imageUrl,
				googleId: response.profileObj.googleId,
			};
			this.props.onLogIn(userProfile);

			try {
				let { speadSheetId, sheetId } = this.props;
				let sheets = await new apiService(response.accessToken).getSheetData({
					speadSheetId,
					sheetId,
				});
				let [header, ...data] = sheets?.data?.values ?? [];
				data = filterData({ header, data });
				this.props.sheetsDataRecieved({ header, data });
				this.props.loadingEnd();
			} catch (err) {
				this.props.sheetsDataRecieved({});
				this.props.loadingEnd();
				this.props.errorOccured(transformErrorMessage(err));
			}
		};

		const logout = () => {
			console.log("Logged Out");
			this.props.onLogout();
			this.props.loadingEnd();
		};

		const loginfailed = (response: object) => {
			console.log(response);
			this.props.loadingEnd();
		};

		return (
			<div
				className={containerClass}
				onClick={(e) => this.props.loadingStart()}>
				{this.props.loggedIn ? (
					<GoogleLogout
						clientId={clientId}
						className="my-google-button-class"
						buttonText="Logout"
						onLogoutSuccess={logout}
					/>
				) : (
					<GoogleLogin
						clientId={clientId}
						className="my-google-button-class"
						onSuccess={loginSuccess}
						onFailure={loginfailed}
						scope="https://www.googleapis.com/auth/spreadsheets"
						isSignedIn={true}
						buttonText="Login with Google"
					/>
				)}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
