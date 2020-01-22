import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import signUpStyle from './componentStyle/signUp.css';

export class signUp extends Component {
  displayName = signUp.name
    constructor(props)
    {
        super(props)
        this.state = 
        {
            fioUser: '',
            emailUser: '',
            passwordUser: '',
            userrepassword: '',
            typeId: 1,
            organisationId: 0,
            registerAgree: false,
            userAvailableToRegister: false
        }

        this.onChange = this.onChange.bind(this)
        this.submitSignUp = this.submitSignUp.bind(this)
        this.clickUserType = this.clickUserType.bind(this)
        this.agreementClick = this.agreementClick.bind(this)
        this.registerNewUser = this.registerNewUser.bind(this)
        this.handlePrepareRegister = this.handlePrepareRegister.bind(this)
        this.initOrganisationForUser = this.initOrganisationForUser.bind(this)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clickUserType(idUserType)
    {
        this.setState({
            typeId: idUserType
        });
    }
    agreementClick()
    {
        if (this.state.registerAgree) {
            this.setState({
                registerAgree: false
            })
        }
        else{
            this.setState({
                registerAgree: true
            })
        }
        
    }

    handlePrepareRegister(inputEmail)
    {
        fetch('/api/User/CheckEmail/' + inputEmail)
            .then(response => response.json())
            .then((data) => {
                //Если такой Email в БД есть
                if (data == '1') { this.setState({ userAvailableToRegister: false }) }
                //Если такой Email в БД нету, значить доступен для регистрации
                if (data == '0') { this.setState({ userAvailableToRegister: true }) }
            })
            .then(() =>
            {
                // Инициализируем пустую организацию для пользователя
                this.initOrganisationForUser()
            });
    }

    initOrganisationForUser() {
        if (this.state.userAvailableToRegister) {
            fetch('/api/Organisation/Create', { method: 'POST', body: '' })
                .then((Response) => Response.json())
                .then((serverResponse) => {
                    //alert(serverResponse.idOrganisation)
                    //alert('В БД инициализирована организация с пустыми полями для нового пользователя')
                    var initIdOrgan = serverResponse.idOrganisation
                    this.setState({
                        organisationId: initIdOrgan
                    })
                })
                .then(() => {
                    //  Регистрируем пользователя
                    this.registerNewUser()
                })
        }
        else { alert('Пользователь с таким Email уже зарегистрирован!\nВыберите другой Email.') }


    }

    // Функция регистрации пользователя
    registerNewUser()
    {
        var userPostForm = new FormData()
        userPostForm.append('fioUser', this.state.fioUser)
        userPostForm.append('emailUser', this.state.emailUser)
        userPostForm.append('passwordUser', this.state.passwordUser)
        userPostForm.append('typeId', this.state.typeId)
        userPostForm.append('organisationId', this.state.organisationId)

        //alert(JSON.stringify(this.state))
        alert('Регистрация успешно прошла!\nВы будете перенаправлены на страницу авторизации..')

        fetch('/api/User/Create', {
            method: 'post',
            body: userPostForm
        })
        .then((response) =>
        {
            if (response.status === 200)
            {
                this.props.history.push("/signIn");
            }
            else { alert('регистрация невозможно! причина: "ошибка на сервере."') }
        })

    }


    submitSignUp(e) {
        e.preventDefault();
        //alert(this.state.userfio);

        const { fioUser, emailUser, passwordUser, userrepassword, typeId, organisationId } = this.state

        if (this.state.fioUser != "" && this.state.emailUser != "" && this.state.passwordUser != "")
        {
            if (this.state.passwordUser == this.state.userrepassword)
            {
                //alert(JSON.stringify(this.state))

                if (this.state.registerAgree)
                {
                    this.handlePrepareRegister(this.state.emailUser)
                }
                else { alert('Для регистрации Вы должны согласиться на обработку Ваших персональных данных!'); }
            }
            else { alert("Пароли не совпадают!") }
        }
        else {  alert("Заполните все поля корректно! Где то что то неправильно заполнена или даже не заполнена!"); }
    }

  render() {

    return (
    <div class="signUpContainer">
      <div class="signUpFormDiv">
        <div class="signUpTitle">Регистрация</div>
        <hr style={{width: "84%", margin: '0 auto', marginBottom: '10px'}}/>
         <form class="signUpForm" onSubmit={this.submitSignUp} method="post">
          <div class="formContainer">
            <p>ФИО: </p>
            <p><input type="text" name="fioUser" placeholder="Иванов Иван Иванович" value={this.state.fioUser} onChange={this.onChange} /> </p>
            <p>Email: </p>
            <p><input type="email" name="emailUser" placeholder="ivanov@example.com" value={this.state.emailUser} onChange={this.onChange}/> </p>
            <p>Пароль: </p>
            <p><input type="password" name="passwordUser" placeholder="•••••••••" value={this.state.passwordUser} onChange={this.onChange} /> </p>
            <p>Повторите пароль: </p>
            <p><input type="password" name="userrepassword" placeholder="•••••••••" value={this.state.userrepassword} onChange={this.onChange} /> </p>
                        <p class="meWho">Я:
              <input type="radio" name="typeId" value="1" checked={this.state.typeId === 1} onClick={() => this.clickUserType(1)} /> Исполнитель
              <input type="radio" name="typeId" value="2" checked={this.state.typeId === 2} onClick={() => this.clickUserType(2)} /> Заказчик
            </p>
            <hr />
            <p><input type="checkbox" name="registerAgreement" checked={this.state.registerAgree} onChange={this.agreementClick} /> Согласен на обработку персональных данных</p>
            <p class="signUpSubmitParagraph"><input type="submit" name="signUpButton" value="Зарегистрироваться"/> </p>
            <p>Есть аккаунт? Тогда <Link to="/signIn">авторизуйтесь</Link> </p>
          </div>
        </form>
      </div>
    </div>
    );
  }
}
