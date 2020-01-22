import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenuAuthorized.css';

export class NavMenuAuthorized extends Component {
  displayName = NavMenuAuthorized.name

  render() {
      return (
          <div class="defaultPageHeader">
              <div class="headerLogo">
                  <LinkContainer to={'/'} exact>
                    <NavItem>Портал государственных закупок</NavItem>
                  </LinkContainer>
              </div>
              <div class="headerMenu">
                  <div class="menuItem">
                      <LinkContainer to={'/lotslist'}>
                          <NavItem>Закупки</NavItem>
                      </LinkContainer>
                  </div>
                  <div class="menuItem">
                      <LinkContainer to={'/documentation'}>
                          <NavItem>Документы</NavItem>
                      </LinkContainer>
                  </div>
                  <div class="menuItem">
                      <LinkContainer to={'/userCabinet'}>
                          <NavItem>⚙ Мой кабинет</NavItem>
                      </LinkContainer>
                  </div>
              </div>
          </div>
    );
  }
}
