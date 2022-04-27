import type {
  FunctionComponent,
  ReactElement,
  PropsWithRef,
  PropsWithChildren,
  ErrorInfo,
  ReactNode,
} from "react";

import { Component } from "react";

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

export type FallbackRender = (
  props: FallbackProps
) =>
  | ReactElement<unknown, string | FunctionComponent | typeof Component>
  | null
  | undefined
  | void;

export type OnError = (error: Error, info: ErrorInfo) => void;
export interface ErrorBoundaryPropsWithRender {
  onResetKeysChange?: (
    prevResetKeys: Array<unknown> | undefined,
    resetKeys: Array<unknown> | undefined
  ) => void;
  onReset?: (...args: Array<unknown>) => void;
  onError?: OnError;
  resetKeys?: Array<unknown>;
  //lazily render component with render function
  fallbackRender?: FallbackRender;
}

export type ErrorBoundaryProps = ErrorBoundaryPropsWithRender;

type ErrorBoundaryState = { error: Error | null };

const initialState: ErrorBoundaryState = { error: null };
export class ErrorBoundary extends Component<
  PropsWithRef<PropsWithChildren<ErrorBoundaryProps>>,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  state = initialState;
  resetErrorBoundary = (...args: Array<unknown>) => {
    this.props.onReset?.(...args);
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(
    prevProps: ErrorBoundaryProps,
    prevState: ErrorBoundaryState
  ) {
    const { error } = this.state;
    const { resetKeys } = this.props;

    // There's an edge case where if the thing that triggered the error
    // happens to *also* be in the resetKeys array, we'd end up resetting
    // the error boundary immediately. This would likely trigger a second
    // error to be thrown.
    // So we make sure that we don't check the resetKeys on the first call
    // of cDU after the error is set

    if (error !== null && prevState.error !== null) {
      const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) =>
        a.length !== b.length ||
        a.some((item, index) => !Object.is(item, b[index]));

      if (changedArray(prevProps.resetKeys, resetKeys)) {
        this.props.onResetKeysChange?.(prevProps.resetKeys, resetKeys);
        this.reset();
      }
    }
  }

  render() {
    const { error } = this.state;
    if (error !== null) {
      const { fallbackRender } = this.props;

      if (!fallbackRender) return null;

      const comp = fallbackRender({
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      });

      //because void === undefined
      return comp as ReactNode;
    }

    return this.props.children;
  }
}
