import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    displayName = Layout.name

  render() {
    return (
      <Grid fluid>
        <Row>
            <NavMenu/>
        </Row>
        <Row>
            {this.props.children}
        </Row>
      </Grid>
    );
  }
}
