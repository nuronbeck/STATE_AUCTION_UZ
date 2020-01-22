import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
      return (
          <div class="defaultPageHeader">
              <div class="headerLogo">
                  <LinkContainer to={'/'} exact>
                    <NavItem>Закупки для корпоративных заказчиков</NavItem>
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
                      <LinkContainer to={'/signIn'}>
                          <NavItem>➜ Войти в систему</NavItem>
                      </LinkContainer>
                  </div>
              </div>
          </div>
    );
  }
}
