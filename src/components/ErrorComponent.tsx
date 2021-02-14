import React from "react";
import { connect } from "react-redux";
import { errorDismissed } from "../redux/ActionCreaters";
import { ErrorType } from "../shared/Type";
import { Alert } from "@material-ui/lab";
import { Container } from "@material-ui/core";

export const ErrorComponent = (props: any) => {
  return (
    <Container fixed>
      {props.errors.map((item: ErrorType, index: number) => {
        return (
          <Alert
            severity="error"
            key={index}
            onClick={() => {
              props.errorDismissed(index);
            }}
            style={{
              margin: "3px",
            }}
          >
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
    errorDismissed: (index: number) => dispatch(errorDismissed(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);

export const transformErrorMessage = (err: any) => {
  return (
    err?.response?.data?.error ?? {
      error: { message: "Failed to fetch data", code: 520 },
    }
  );
};
