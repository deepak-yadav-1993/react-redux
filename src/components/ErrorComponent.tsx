import React from 'react';
import { Alert } from '@material-ui/lab';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { errorDismissed, selectErrors } from '../redux/reducers/errorSlice';
import { ErrorType } from '../shared/Type';

export const ErrorComponent = () => {
  const dispatch = useDispatch();
  const errors: [string, string][] = useSelector(selectErrors);

  return (
    <Container fixed>
      {errors.map(([key, item]: string[]) => (
        <Alert
          severity="error"
          key={key}
          onClick={() => {
            dispatch(errorDismissed(key));
          }}
          style={{
            margin: '3px'
          }}
        >
          {item}
        </Alert>
      ))}
    </Container>
  );
};

export const transformErrorMessage = (err: any): ErrorType =>
  findMessageRecursively(err);

const findMessageRecursively = (data: any): any => {
  const type = typeof data;

  switch (type) {
    case 'object':
      if (
        Object.prototype.hasOwnProperty.call(data, 'message') &&
        Object.prototype.hasOwnProperty.call(data, 'code')
      ) {
        const { message, code } = data;
        return { message, code };
      }
      if (
        Object.prototype.hasOwnProperty.call(data, 'message') &&
        !Object.prototype.hasOwnProperty.call(data, 'code')
      ) {
        const { message } = data;
        return { message, code: 520 };
      }

      return Object.values(data).reduce(
        (collection: any, next: any, idx: number) => {
          return Object.assign(collection, findMessageRecursively(next));
        },
        {}
      );
    case 'string':
      return { message: data, code: 520 };
    default:
      return { message: 'Failed to fetch data', code: 520 };
  }
};

export default ErrorComponent;
