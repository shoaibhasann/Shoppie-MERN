import React, { Component } from "react";
import ErrorHandler from "../components/layout/ErrorHandler";

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorHandler status='500' message='Something went wrong.'/>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
