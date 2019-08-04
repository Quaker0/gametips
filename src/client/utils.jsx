import React, { Component } from 'react';
import Spinner from 'reactstrap/lib/Spinner';

export default class CenteredSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = { display: false };
    this.enableMessage = this.enableMessage.bind(this);
    this.timer = setTimeout(this.enableMessage, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableMessage() {
    this.setState({ display: true });
  }

  render() {
    const { display } = this.state;
    if (!display) {
      return null;
    }
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner color="light" />
      </div>
    );
  }
}
