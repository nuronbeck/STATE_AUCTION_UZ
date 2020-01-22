import React, { Component } from 'react';
import signInStyle from './componentStyle/signIn.css';
import { NavItem } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export class signIn extends Component {
  displayName = signIn.name
    constructor(props)
    {
        super(props)
        let loggedIn = true
        this.state = {
            emailUser: '',
            passwordUser: '',
            loggedIn
        }

        const userAuthorizedId = localStorage.getItem('AuthUserId')
        if (userAuthorizedId == null){
            loggedIn = false
        }

        this.onChange = this.onChange.bind(this)
        this.signInSubmit = this.signInSubmit.bind(this)
        this.userCheckIsset = this.userCheckIsset.bind(this)

        this.state = {loggedIn}
    }

    onChange(e)
    {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    userCheckIsset()
    {
        fetch('/api/User/All')
            .then(response => response.json())
            .then((data) => {
                data.map(userData => {
                    if (userData.emailUser === this.state.emailUser && userData.passwordUser === this.state.passwordUser) {
                        this.setState({
                            loggedIn : true
                        })

                        localStorage.setItem('AuthUserId', userData.idUser)

                    }
                    else
                    {
                        this.setState({
                            loggedIn: false
                        })
                    }
                })
            })
            .then(() => {
                // Инициализируем пустую организацию для пользователя
                //alert(this.state.checkUserIsset)
                if (this.state.loggedIn == false)
                {
                    alert('Еmail и пароль введены не правильно!\nПроверьте введенные данные!')
                }
                if (this.state.loggedIn == true)
                {
                    this.props.history.push('/userCabinet')
                }
            });
    }

    signInSubmit(e)
    {
        e.preventDefault()
        //alert("submitted")
        const { emailUser, passwordUser } = this.state
        this.userCheckIsset()

    }

  render() {
      if (this.state.loggedIn)
      {
          return <Redirect to='/userCabinet'/>
      }

    return (
        <div class="signInBody">
	        <div class="authContainer">
		        <form action="/signIn" method="POST" onSubmit={this.signInSubmit}>
			        <div class="signInTitle">Авторизация</div>
			        <hr/>
			        <div class="signInInputs">
				        <p>
                            <span>✉</span>
                            <input type="email" placeholder="Email" name="emailUser" value={this.state.emailUser} onChange={this.onChange} />
				        </p>
				        <p>
					        <span>✎</span>
                            <input type="password" placeholder="Пароль" name="passwordUser" value={this.state.passwordUser} onChange={this.onChange}/>
				        </p>
				        <p class="signIncheckParag"> <input type="checkbox"/> Запомнить меня </p>
				        <p> <input type="submit" value="Войти"/> </p>
				        <p>Еще не зарегистрированы?</p>
				        <p>
                            <LinkContainer to={'/signUp'} exact>
                                <NavItem>Зарегистрируйтесь</NavItem>
                            </LinkContainer>
                        </p>
			        </div>
		        </form>
	        </div>
        </div>
    );
  }
}
