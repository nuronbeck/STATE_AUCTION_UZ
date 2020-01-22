import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import userSettingsStyles from './componentStyle/userSettings.css';

export class userSettings extends Component {
  displayName = userSettings.name

    constructor(props)
    {
        super(props)
        let loggedIn = true

        this.state = {
            loggedIn,
            idOrganisation: null,
            fioOrg: null,
            fullNameOrg: null,
            shortNameOrg: null,
            telNumberOrg: null,
            factAddressOrg: null,
            yurAddressOrg: null,
            inn: null,
            kpp: null,
            okpo: null,
            okved: null,
            ogrn: null,
            userShortName: '',
            userAccountTypeIcon: ''

        }

        this.redirectLogout = this.redirectLogout.bind(this)
        this.redirectUserMain = this.redirectUserMain.bind(this)
        this.getUserData = this.getUserData.bind(this)
        this.getUserOrganisationData = this.getUserOrganisationData.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.saveUserOrganisationSettings = this.saveUserOrganisationSettings.bind(this)

        this.state = { loggedIn }
    }

    componentWillMount()
    {
        const userAuthorizedId = localStorage.getItem('AuthUserId')
        if (userAuthorizedId == null) {
            this.setState({
                loggedIn: false
            })
        }
        else
        {
            this.getUserData()
        }
    }
    getUserData()
    {
        fetch('/api/User/Details/' + localStorage.getItem('AuthUserId'))
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    idOrganisation: data.organisationId
                })

                var shortUsername = data.fioUser.split(" ")
                if (shortUsername.length == 1) {
                    shortUsername = shortUsername[0]
                }
                else if (shortUsername.length > 1) {
                    shortUsername = shortUsername[0] + " " + shortUsername[1][0] + '.'
                }

                var accountLogoMarker = 'orderedUserCabinetUserIcon'
                if (data.typeId == 1) { accountLogoMarker += " UserCabinetUserIconBlue" }
                else { accountLogoMarker += " UserCabinetUserIconYellow" }

                this.setState({
                    userShortName: shortUsername,
                    userAccountTypeIcon: accountLogoMarker
                })
            })
            .then(() => {
                //alert(this.state.userOrganisationId)
                this.getUserOrganisationData(this.state.idOrganisation)
            });
    }

    getUserOrganisationData(idOrg)
    {
        fetch('/api/Organisation/Details/' + idOrg)
            .then(response => response.json())
            .then((data) => {
                //alert(JSON.stringify(data))
                this.setState({
                    fioOrg: data.fioOrg,
                    fullNameOrg: data.fullNameOrg,
                    shortNameOrg: data.shortNameOrg,
                    telNumberOrg: data.telNumberOrg,
                    factAddressOrg: data.factAddressOrg,
                    yurAddressOrg: data.yurAddressOrg,
                    inn: data.inn,
                    kpp: data.kpp,
                    okpo: data.okpo,
                    okved: data.okved,
                    ogrn: data.ogrn
                })
            })
            .then(() => {
                //alert(this.state)
            });
    }

    redirectUserMain() {
        this.props.history.push('/userCabinet')
    }
    redirectLogout()
    {
        this.props.history.push('/logout')
    }

    onInputChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveUserOrganisationSettings = (e) =>
    {
        e.preventDefault()

        //var userSettingsPostForm = new FormData()
        //userSettingsPostForm.append('idOrganisation', this.state.idOrganisation)
        //userSettingsPostForm.append('fioOrg', this.state.fioOrg)
        //userSettingsPostForm.append('fullNameOrg', this.state.fullNameOrg)
        //userSettingsPostForm.append('shortNameOrg', this.state.shortNameOrg)
        //userSettingsPostForm.append('telNumberOrg', this.state.telNumberOrg)
        //userSettingsPostForm.append('factAddressOrg', this.state.factAddressOrg)
        //userSettingsPostForm.append('yurAddressOrg', this.state.yurAddressOrg)
        //userSettingsPostForm.append('inn', this.state.inn)
        //userSettingsPostForm.append('kpp', this.state.kpp)
        //userSettingsPostForm.append('okpo', this.state.okpo)
        //userSettingsPostForm.append('okved', this.state.okved)
        //userSettingsPostForm.append('ogrn', this.state.ogrn)


        var userSettingsPostForm = {
            'idOrganisation': this.state.idOrganisation,
            'fioOrg' : this.state.fioOrg,
            'fullNameOrg' : this.state.fullNameOrg,
            'shortNameOrg' : this.state.shortNameOrg,
            'telNumberOrg' : this.state.telNumberOrg,
            'factAddressOrg' : this.state.factAddressOrg,
            'yurAddressOrg' : this.state.yurAddressOrg,
            'inn' : this.state.inn,
            'kpp' : this.state.kpp,
            'okpo' : this.state.okpo,
            'okved' : this.state.okved,
            'ogrn' : this.state.ogrn
        }

        //alert(JSON.stringify(userSettingsPostForm))

        fetch('/api/Organisation/Edit', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(userSettingsPostForm)
        })
        .then((response) =>
        {
            if (response.status === 200)
            {
                this.props.history.push("/cabinet/settings");
                alert("Данные сохранены успешно!")
            }
            else { alert('регистрация невозможно! причина: "ошибка на сервере."') }
        })
    }

  render() {
    const { userShortName, userAccountTypeIcon, loggedIn} = this.state

    if (loggedIn == false)
    {
        return <Redirect to="/signIn"/> 
    }

    return (
        <div class="orderedUserCabinetContainer">
	
	        <div class="orderedUserCabinetDashboard">
                <div class="orderedUserCabinetUserName">
                    <div class={userAccountTypeIcon}></div>
                    {userShortName}
		        </div>
		        <div class="orderedUserCabinetMenu">
                    <div class="orderedUserCabinetMenuItems" onClick={this.redirectUserMain}>История сделок</div>
			        <div class="orderedUserCabinetMenuItems activeMenuItem">Настройки</div>
                    <div class="orderedUserCabinetMenuItems" onClick={this.redirectLogout}>Выход</div>
		        </div>
	        </div>

	        <div class="orderedUserCabinetPanel">
		        <div class="orderedUserCabinetPanelMyOrders">
			        <span>Настройки юридических данных</span>
		        </div>
                <div class="orderedUserCabinetPanelOrderedLotsBlock">
                    <form class="userCabinetSettingsForm" onSubmit={this.saveUserOrganisationSettings}>
				        <div class="fioBlock">
                            <span>Ф.И.О. руководителя организации:</span>
                            <input type="text" name="fioOrg" value={this.state.fioOrg} onChange={this.onInputChange} />
				        </div>
				        <div class="fullNameOrgBlock">
                            <span>Полное наименование юридического лица:</span>
                            <input type="text" name="fullNameOrg" value={this.state.fullNameOrg} onChange={this.onInputChange}/>
				        </div>
				        <div class="lawNameShortNumberBlock">
					        <div class="lawShortName">
                                <span>Сокращенное наименование юридического лица:</span>
                                <input type="text" name="shortNameOrg" value={this.state.shortNameOrg} onChange={this.onInputChange}/>
					        </div>
					        <div class="numberBlock">
                                <span>Номер телефона:</span>
                                <input type="text" name="telNumberOrg" value={this.state.telNumberOrg} onChange={this.onInputChange}/>
					        </div>
				        </div>
				        <div class="fullNameOrgBlock">
                            <span>Адрес место нахождения (фактический адрес):</span>
                            <input type="text" name="factAddressOrg" value={this.state.factAddressOrg} onChange={this.onInputChange}/>
				        </div>
				        <div class="fullNameOrgBlock">
					        <span>Юридический адрес:</span>
                            <input type="text" name="yurAddressOrg" value={this.state.yurAddressOrg} onChange={this.onInputChange}/>
				        </div>
				        <div class="lawCodesTitle">Реквизиты:</div>
				        <div class="lawCodesBlock">
					        <div class="lowCodesColumns">
						        <div class="lowCodeItem">
							        <span>ИНН:</span>
                                    <input type="text" name="inn" value={this.state.inn} onChange={this.onInputChange}/>
						        </div>
						        <div class="lowCodeItem">
							        <span>ОКПО:</span>
                                    <input type="text" name="okpo" value={this.state.okpo} onChange={this.onInputChange}/>
						        </div>
						        <div class="lowCodeItem">
							        <span>ОКВЭД:</span>
                                    <input type="text" name="okved" value={this.state.okved} onChange={this.onInputChange}/>
						        </div>
					        </div>
					        <div class="lowCodesColumns">
						        <div class="lowCodeItem">
							        <span>КПП:</span>
                                    <input type="text" name="kpp" value={this.state.kpp} onChange={this.onInputChange}/>
						        </div>
						        <div class="lowCodeItem">
                                    <span>ОГРН:</span>
                                    <input type="text" name="ogrn" value={this.state.ogrn} onChange={this.onInputChange}/>
						        </div>
					        </div>
				        </div>

                        <div class="saveUserSettingsBlock">
                            <input type="submit" class="saveUserSettingsButton" value="Сохранить данные" />
				        </div>
			        </form>
		        </div>
	        </div>

        </div>
    );
  }
}
