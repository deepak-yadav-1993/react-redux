import React, { Component } from "react";
import { connect } from "react-redux";
import { onSheetsDataRecieved } from "../redux/ActionCreaters";

const containerClass = "component user-imput-form";

const mapStateToProps = (state: any) => {
	const { sheetdata, speadSheetId, sheetId } = state;
	return {
		sheetdata,
		speadSheetId,
		sheetId,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		sheetsDataRecieved: (sheetData: any) =>
			dispatch(onSheetsDataRecieved(sheetData)),
	};
};
class UserInputForm extends React.Component<any, any> {
	render() {
		return <div>Test</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInputForm);
