import React from "react";
import { connect } from "react-redux";
import { onErrorDismissed } from "../redux/ActionCreaters";
import { ErrorType } from "../shared/Type";
import { Alert } from "@material-ui/lab";
import { Container } from "@material-ui/core";

export const ErrorComponent = (props: any) => {
	return (
		<Container fixed>
			{props.errors.map((item: ErrorType) => {
				return (
					<Alert
						severity="error"
						key={item.index}
						onClick={() => {
							props.errorDismissed(item.index);
						}}
						style={{
							margin: "3px",
						}}>
						{item.message}
					</Alert>
				);
			})}
		</Container>
	);
};

const mapStateToProps = (state: any) => ({
	errors: state.appState.errors,
});

const mapDispatchToProps = (dispatch: any) => {
	return {
		errorDismissed: (error: number) => dispatch(onErrorDismissed(error)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);

export const transformErrorMessage = (err: any): ErrorType =>
	findMessageRecursively(err);

const findMessageRecursively = (data: any): any => {
	const type = typeof data;

	switch (type) {
		case "object":
			if (data.hasOwnProperty("message") && data.hasOwnProperty("code")) {
				const { message, code } = data;
				return { message, code };
			}
			if (data.hasOwnProperty("message") && !data.hasOwnProperty("code")) {
				const { message } = data;
				return { message, code: 520 };
			}

			return Object.values(data).reduce(
				(collection: any, next: any, idx: number) => {
					return Object.assign(collection, findMessageRecursively(next));
				},
				{}
			);
		case "string":
			return { message: data, code: 520 };
		default:
			return { message: "Failed to fetch data", code: 520 };
	}
};
