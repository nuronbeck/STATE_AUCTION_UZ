import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenuAuthorized } from './NavMenuAuthorized';

export class LayoutAuthorized extends Component {
    displayName = LayoutAuthorized.name

  render() {
    return (
      <Grid fluid>
        <Row>
            <NavMenuAuthorized/>
        </Row>
        <Row>
            {this.props.children}
        </Row>
      </Grid>
    );
  }
}
