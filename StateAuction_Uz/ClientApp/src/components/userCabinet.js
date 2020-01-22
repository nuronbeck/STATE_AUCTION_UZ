import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import orderedUserCabinet from './componentStyle/orderedUserCabinet.css';

export class userCabinet extends Component {
  displayName = userCabinet.name

    constructor(props)
    {
        super(props)
        let loggedIn = true

        this.state = {
            loggedIn,
            userName: '',
            userTypeId: '',
            currentUserId: 0,
            userLotsData: [],
            allLotsItems: [],
            allUnitsMeasuring: [],
            userLotsBlock: null
        }

        this.getUserInfoData = this.getUserInfoData.bind(this)
        this.getUserLotsData = this.getUserLotsData.bind(this)
        this.returnUserLots = this.returnUserLots.bind(this)
        this.getAllLotTovars = this.getAllLotTovars.bind(this)
        this.redirectLotAddPage = this.redirectLotAddPage.bind(this)
        this.getAllUnitsMeasuring = this.getAllUnitsMeasuring.bind(this)
        this.returnUnitsMeasuringName = this.returnUnitsMeasuringName.bind(this)
        this.returnUserLotItems = this.returnUserLotItems.bind(this)
        this.convertDateFormat = this.convertDateFormat.bind(this)
        this.redirectLogout = this.redirectLogout.bind(this)
        this.redirectUserSettings = this.redirectUserSettings.bind(this)

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
            this.getAllUnitsMeasuring()
            this.getAllLotTovars()
            this.getUserInfoData(userAuthorizedId)
        }
    }

    getUserInfoData(userId)
    {
        fetch('/api/User/Details/' + userId)
            .then(response => response.json())
            .then((data) => {
                var shortUsername = data.fioUser.split(" ")
                if (shortUsername.length == 1) {
                    shortUsername = shortUsername[0]
                }
                else if (shortUsername.length > 1) {
                    shortUsername = shortUsername[0] + " " + shortUsername[1][0] + '.'
                }
                this.setState({
                    currentUserId: data.idUser,
                    userName: shortUsername,
                    userTypeId: data.typeId
                })
            })
            .then(() => {
                //alert(JSON.stringify(this.state.currentUserId))
                this.getUserLotsData(this.state.currentUserId)
            })
    }

    getUserLotsData(id_user)
    {
        //alert("Current user id = " + id_user)

        fetch('/api/Lot/All/')
            .then(response => response.json())
            .then((data) => {
                if (this.state.userTypeId == 1) // Исполнитель
                {
                    let currentUserLots = data.filter(lotObject => {
                        return lotObject.executerUserId == this.state.currentUserId;
                    }); 

                    this.setState({
                        userLotsData: currentUserLots
                    })
                }
                if (this.state.userTypeId == 2) // Заказчик
                {
                    let currentUserLots = data.filter(lotObject => {
                        return lotObject.orderedUserId == this.state.currentUserId;
                    }); 

                    this.setState({
                        userLotsData: currentUserLots
                    })
                }
                
            })
            .then(() => {
                //alert(JSON.stringify(this.state.userLotsData))
                this.returnUserLots()
            })
    }

    convertDateFormat(date)
    {
        var date1 = new Date()
        var date2 = new Date(date)

        var Difference_In_Time = date2.getTime() - date1.getTime()
        var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24))
        var Diffence_Hours = Math.abs(((Difference_In_Time / (1000 * 3600 * 24)) - Difference_In_Days)*24);

        return Difference_In_Days + " дней " + Math.round(Diffence_Hours) + " часов";
    }

    returnUserLots()
    {
        if (this.state.userTypeId == 1)
        {
            this.setState({
                userLotsBlock: this.state.userLotsData.map((userlot) => {
                    return (
                    <div class="orderedUserCabinetPanelOrderedLotsBlockLot">
                        <div class="orderedUserCabinetPanelOrderedLotsBlockLotTitle">Заказ № {userlot.idLot}</div>

                            {
                                this.returnUserLotItems(userlot.idLot)
                            }

				            <div class="orderedUserCabinetPanelOrderedLotItem">
					            <div class="orderedUserCabinetPanelOrderedLotsBlockLotItemCounter">
                                    <span>Срок окончания торгов:</span>
                                    {
                                        this.convertDateFormat(userlot.endDateTimeLot)
                                    }
					            </div>
                            </div>

			        </div>)
                })
            })
        }

        if (this.state.userTypeId == 2)
        {
            this.setState({
                userLotsBlock: this.state.userLotsData.map((userlot) => {
                    return (
                        <div class="orderedUserCabinetPanelOrderedLotsBlockLot">
                            <div class="orderedUserCabinetPanelOrderedLotsBlockLotTitle">Заказ № {userlot.idLot}</div>

                            {
                                this.returnUserLotItems(userlot.idLot)
                            }

                            <div class="orderedUserCabinetPanelOrderedLotItem">
                                <div class="orderedUserCabinetPanelOrderedLotsBlockLotItemCounter">
                                    <span>Срок окончания торгов:</span>
                                    {
                                        this.convertDateFormat(userlot.endDateTimeLot)
                                    }
					            </div>
                            </div>

                        </div>)
                })
            })
        }
        
    }

    getAllLotTovars()
    {
        fetch('/api/LotTovar/All')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    allLotsItems: data
                })
            })
            .then(() => {
                //alert(JSON.stringify(this.state.allLotsItems))
            })
    }

    getAllUnitsMeasuring() {
        fetch('/api/UnitsMeasuring/All')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    allUnitsMeasuring: data
                })
            })
            .then(() => {
                //alert(JSON.stringify(this.state.allUnitsMeasuring))
            })
    }

    returnUnitsMeasuringName(um_id)
    {
        let name = ''
        this.state.allUnitsMeasuring.map((umElement) => {
            if (umElement.idUnitsMeasuring == um_id)
            {
                name = umElement.nameUnitsMeasuring
            }
        })

        return name
    }

    returnUserLotItems(lot_id)
    {
        let lotTovarBlock = null
        if (this.state.userTypeId == 1)
        {
            lotTovarBlock = this.state.allLotsItems.map((currentlotItem) =>
            {
                if (currentlotItem.lotId == lot_id)
                {
                    return (
                        <div class="orderedUserCabinetPanelOrderedLotItem">
					            <div class="orderedUserCabinetPanelOrderedLotsBlockLotDescription">
						            <span>Подробное описание:</span>
                                {currentlotItem.nameLotTovar}
					            </div>
					            <div class="orderedUserCabinetPanelOrderedLotsBlockLotItemTable">
						            <table>
							            <tr>
								            <td>Количество</td>
								            <td>Ед. измерения</td>
								            <td>Стартовая цена</td>
								            <td>Предложенная цена</td>
							            </tr>
							            <tr>
                                        <td>{currentlotItem.countLotTovar}</td>
                                        <td>{this.returnUnitsMeasuringName(currentlotItem.unitsMeasuringId)}</td>
                                        <td>{currentlotItem.startPriceLotTovar} руб.</td>
                                        <td>{currentlotItem.suggestPriceLotTovar} руб.</td>
							            </tr>
						            </table>
					            </div>
				            </div>
                    )
                }

            })

            return lotTovarBlock
        }
        if (this.state.userTypeId == 2)
        {
            lotTovarBlock = this.state.allLotsItems.map((currentlotItem) =>
            {
                if (currentlotItem.lotId == lot_id)
                {
                    return (
                        <div class="orderedUserCabinetPanelOrderedLotItem">
					            <div class="orderedUserCabinetPanelOrderedLotsBlockLotDescription">
						            <span>Подробное описание:</span>
						            {currentlotItem.nameLotTovar}
					            </div>
					            <div class="orderedUserCabinetPanelOrderedLotsBlockLotItemTable">
						            <table>
							            <tr>
								            <td>Количество</td>
								            <td>Ед. измерения</td>
								            <td>Стартовая цена</td>
								            <td>Предложенная цена</td>
							            </tr>
							            <tr>
                                            <td>{currentlotItem.countLotTovar}</td>
                                            <td>{this.returnUnitsMeasuringName(currentlotItem.unitsMeasuringId)}</td>
                                            <td>{currentlotItem.startPriceLotTovar} руб.</td>
                                            <td>{currentlotItem.suggestPriceLotTovar} руб.</td>
							            </tr>
						            </table>
					            </div>
				            </div>
                    )
                }
            })

            return lotTovarBlock
        }
    }



    redirectUserSettings()
    {
        this.props.history.push('/cabinet/settings')
    }
    redirectLotAddPage()
    {
        this.props.history.push('/lot/add')
    }
    redirectLogout()
    {
        this.props.history.push('/logout')
    }


  render() {

      const { userName, userTypeId } = this.state

      if (this.state.loggedIn == false)
      {
          return <Redirect to="/signIn"/>
      }

if (userTypeId == 1)
{
    return (
        <div class="orderedUserCabinetContainer">	
	        <div class="orderedUserCabinetDashboard">
		        <div class="orderedUserCabinetUserName">
                    <div class="orderedUserCabinetUserIcon UserCabinetUserIconBlue"></div>
                    {userName}
		        </div>
		        <div class="orderedUserCabinetMenu">
                    <div class="orderedUserCabinetMenuItems activeMenuItem">История сделок</div>
                    <div class="orderedUserCabinetMenuItems" onClick={this.redirectUserSettings}>Настройки</div>
                    <div class="orderedUserCabinetMenuItems" onClick={this.redirectLogout}>Выход</div>
		        </div>
	        </div>

	        <div class="orderedUserCabinetPanel">
		        <div class="orderedUserCabinetPanelMyOrders">
                    <span>Мои сделки</span>
		        </div>
                <div class="orderedUserCabinetPanelOrderedLotsBlock">
                
                    {this.state.userLotsBlock}

		        </div>
	        </div>
        </div>
    );
}
if (userTypeId == 2)
{
    return (
        <div class="orderedUserCabinetContainer">	
	        <div class="orderedUserCabinetDashboard">
		        <div class="orderedUserCabinetUserName">
                    <div class="orderedUserCabinetUserIcon UserCabinetUserIconYellow"></div>
                    {userName}
		        </div>
		        <div class="orderedUserCabinetMenu">
                    <div class="orderedUserCabinetMenuItems activeMenuItem">История сделок</div>
                    <div class="orderedUserCabinetMenuItems" onClick={this.redirectUserSettings}>Настройки</div>
                    <div class="orderedUserCabinetMenuItems" onClick={this.redirectLogout}>Выход</div>
		        </div>
	        </div>

	        <div class="orderedUserCabinetPanel">
		        <div class="orderedUserCabinetPanelMyOrders">
                    <span>Мои заказы</span>
                    <button onClick={this.redirectLotAddPage}>Создать новую закупку</button>
		        </div>
		        <div class="orderedUserCabinetPanelOrderedLotsBlock">

                    {this.state.userLotsBlock}

		        </div>
	        </div>
        </div>
    );
}

return <div class="orderedUserCabinetContainer"><div class="orderedUserCabinetPanel"><div class="orderedUserCabinetPanelMyOrders"><span>Загрузка...</span></div></div></div>
  }
}
