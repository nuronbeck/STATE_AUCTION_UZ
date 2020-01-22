import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import userSettingsStyles from './componentStyle/userSettings.css';

export class userCabinetAddLot extends Component {
  displayName = userCabinetAddLot.name

    constructor(props)
    {
        super(props)
        let loggedIn = true

        this.state = {
            loggedIn,
            userShortName: '',
            userAccountTypeIcon: '',
            citiesData: [],
            cityOptionsHtml: null,
            unitsMeasuringData: [],
            unitsMeasuringHtml: null,
            lotPostAddress: null,
            lotPostCity: null,
            lotPostDeliveryDay: null,
            lotPostDescription: null,
            addressNewLot: null,
            cityIdNewLot: null,
            deliveryDaysNewLot: null,
            descriptionNewLot: null,
            itemsInState: [],
            counterItemsInState: 0,
            newItemName: null,
            newItemCount: null,
            newItemUnit: null,
            newItemStartPrice: null,
            itemsDataHtml: null
        }

        this.redirectLogout = this.redirectLogout.bind(this)
        this.redirectSettings = this.redirectSettings.bind(this)
        this.redirectUserMain = this.redirectUserMain.bind(this)

        this.getUserData = this.getUserData.bind(this)
        this.getCitiesData = this.getCitiesData.bind(this)
        this.getUnitsMeasuringData = this.getUnitsMeasuringData.bind(this)
        this.createLotWithItems = this.createLotWithItems.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.addNewItemToState = this.addNewItemToState.bind(this)
        this.returnStateTempItems = this.returnStateTempItems.bind(this)
        this.removeStateTempItems = this.removeStateTempItems.bind(this)

        this.returnUnitName = this.returnUnitName.bind(this)


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
            this.getCitiesData()
            this.getUnitsMeasuringData()

            this.setState({
                counterItemsInState: 0,
                newItemUnit: 1,
                itemsInState: []
            })
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
                //alert(this.state)
            });
    }

    getCitiesData()
    {
        fetch('/api/City/All')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    citiesData: data
                })
            })
            .then(() => {
                //alert(JSON.stringify(this.state.citiesData))

                let cityOptionss = this.state.citiesData.map((cityObject) =>
                {
                    return (<option value={cityObject.idCity}>{cityObject.nameCity}</option>)
                })

                this.setState({
                    cityOptionsHtml: cityOptionss,
                    cityIdNewLot: "1"
                })
            });
    }

    getUnitsMeasuringData()
    {
        fetch('/api/UnitsMeasuring/All')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    unitsMeasuringData: data
                })
            }) .then(() => {
                //alert(JSON.stringify(this.state.unitsMeasuringData))

                let umOptionss = this.state.unitsMeasuringData.map((umObject) => {
                    return (<option value={umObject.idUnitsMeasuring}>{umObject.nameUnitsMeasuring}</option>)
                })
                this.setState({
                    unitsMeasuringHtml: umOptionss
                })
            });
    }

    redirectUserMain() {
        this.props.history.push('/userCabinet')
    }
    redirectSettings() {
        this.props.history.push('/cabinet/settings')
    }
    redirectLogout(){
        this.props.history.push('/logout')
    }

    onInputChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addNewItemToState()
    {
        let newItemName = this.state.newItemName
        let newItemCount = this.state.newItemCount
        let newItemUnit = this.state.newItemUnit
        let newItemStartPrice = this.state.newItemStartPrice

        //alert(newItemName + "\n" + newItemCount + "\n" + newItemUnit + "\n" + newItemStartPrice)


        if (newItemName != null && newItemName != "" && newItemCount != null && newItemCount != '' && newItemCount != 0 && newItemCount > 0 && newItemStartPrice != null && newItemStartPrice != '' && newItemStartPrice != 0 && newItemStartPrice > 0) {
            //alert("ВСЕ ОКЕЙ!")

            var itemFormAdded = { id: this.state.counterItemsInState, name: newItemName, count: newItemCount, unit: newItemUnit, startPrice: newItemStartPrice }

            if (this.state.counterItemsInState == 0) {
                this.setState({
                    itemsInState: [itemFormAdded]
                }, () => {
                    //alert(JSON.stringify(this.state.itemsInState))
                    this.returnStateTempItems()
                })
                this.forceUpdate()
            }
            if (this.state.counterItemsInState > 0) {
                this.setState({
                    itemsInState: [...this.state.itemsInState, itemFormAdded]
                }, () => {
                    //alert(JSON.stringify(this.state.itemsInState))
                    this.returnStateTempItems()
                })
            }

            this.setState({ counterItemsInState: this.state.counterItemsInState + 1 })


            this.setState({
                newItemName: '',
                newItemCount: '',
                newItemUnit: 1,
                newItemStartPrice: ''
            })

            this.forceUpdate()
        }
        else
        {
            alert("Заполните все поля или проверьте введенных данных!")
        }
    }

    returnUnitName(unId)
    {

        var unName = this.state.unitsMeasuringData.map((unItem) =>
        {
            if (unItem.idUnitsMeasuring == unId)
            {
                return (unItem.nameUnitsMeasuring)
            }
        })

        return unName
    }

    returnStateTempItems()
    {
        let itemsHtml = this.state.itemsInState.map((itemObjState) =>
        {
            return (
                <div class="addedToStateNewLotOneItem">
                    <div class="addedToStateNewLotOneItemDescription">{itemObjState.name}</div>
                    <table>
                        <tr>
                            <td>Количество</td>
                            <td>Ед. измерения</td>
                            <td>Стартовая цена</td>
                        </tr>
                        <tr>
                            <td>{itemObjState.count}</td>
                            <td>{this.returnUnitName(itemObjState.unit)}</td>
                            <td>{itemObjState.startPrice} руб.</td>
                        </tr>
                    </table>
                    <div class="deleteAddedToStateNewLotItemBlock">
                        <input type="button" class="deleteAddedToStateNewLotItem" value="удалить товар" onClick={() => this.removeStateTempItems(itemObjState.id)}/>
                    </div>
                </div>
            )
        })

        this.setState({
            itemsDataHtml: itemsHtml
        })

        //alert(JSON.stringify(itemsHtml))
    }

    removeStateTempItems(idTempItem)
    {
        const conf = window.confirm("Вы действительно хотите убрать этот товар?")

        if (conf == true)
        {
            //alert(idTempItem)
            const newItems = this.state.itemsInState.filter((itemObjct) => {
                return itemObjct.id != idTempItem
            })

            this.setState({
                itemsInState: newItems
            }, () => {
                //alert(JSON.stringify(this.state.itemsInState))
                this.returnStateTempItems()
                this.forceUpdate()
            })
        }
    }

    createLotWithItems()
    {
        //alert(JSON.stringify(this.state.addressNewLot + ' | ' + this.state.cityIdNewLot + " | " + this.state.deliveryDaysNewLot + " | " + this.state.descriptionNewLot ))

        if (this.state.addressNewLot != '' && this.state.addressNewLot != null && this.state.cityIdNewLot != '' && this.state.deliveryDaysNewLot != '' && this.state.descriptionNewLot != '')
        {
            if (this.state.itemsInState.length == 0)
            {
                window.confirm("Вы еще не добавили товары в лот!\nЛот не может быть без товаров!\nДобавьте товары!")
            }
            if (this.state.itemsInState.length > 0)
            {
                //alert(this.state.addressNewLot + "\n" + this.state.cityIdNewLot + "\n" + this.state.deliveryDaysNewLot + "\n" + this.state.descriptionNewLot)
                //alert(JSON.stringify(this.state.itemsInState))

                var date = new Date().getDate()
                var month = new Date().getMonth() + 1
                var year = new Date().getFullYear()

                var endLotData = new Date(year, month, date + 10)
                //var todayDate = year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec


                var LotJsonData = JSON.stringify({
                    'OrderedUserId': localStorage.getItem('AuthUserId'),
                    'AddessLot': this.state.addressNewLot,
                    'DescriptionLot': this.state.descriptionNewLot,
                    'EndDateTimeLot': endLotData,
                    'ExecuterUserId': localStorage.getItem('AuthUserId'),
                    'DeliveryDurationLot': this.state.deliveryDaysNewLot,
                    'ClosedLot': false,
                    'CityId': this.state.cityIdNewLot
                })

                //alert(LotJsonData)

                var idAddedLot = 0

                fetch('/api/Lot/Add', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: LotJsonData
                })
                .then((Response) => Response.json())
                .then((serverResponse) => {
                    //alert(JSON.stringify(serverResponse.idLot))
                    idAddedLot = serverResponse.idLot
                })
                .then(() => {
                    //alert(idAddedLot)

                    this.state.itemsInState.map((itemState) => {
                        let lotTovarObject = JSON.stringify({
                            'lotId': idAddedLot,
                            'nameLotTovar': itemState.name,
                            'countLotTovar': itemState.count,
                            'unitsMeasuringId': itemState.unit,
                            'startPriceLotTovar': itemState.startPrice,
                            'suggestPriceLotTovar': itemState.startPrice,
                            'userId': localStorage.getItem('AuthUserId')
                        })

                        fetch('/api/LotTovar/Create', {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json; charset=UTF-8',
                            },
                            body: lotTovarObject
                        })

                    })

                    this.props.history.push("/userCabinet");
                })
                .then(() => {
                    alert("Ваш лот успешно добавлен!")
                })



            //Тут можно добавлять наши товары в лот перебирает из состояния записи
            //this.state.itemsInState.map((itemObject) =>
            //{
            //    alert(itemObject.name)
            //})
            }
        }
        else
        {
            window.confirm("Заполните все поля и проверьте правильность заполненных данных! ")
        }

    }

  


  render() {
      const { userShortName, userAccountTypeIcon, cityOptionsHtml, unitsMeasuringHtml, itemsDataHtml, loggedIn} = this.state

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
                    <div class="orderedUserCabinetMenuItems" onClick={this.redirectSettings}>Настройки</div>
                    <div class="orderedUserCabinetMenuItems" onClick={this.redirectLogout}>Выход</div>
		        </div>
            </div>
            <div class="orderedUserCabinetPanel">
		        <div class="orderedUserCabinetPanelMyOrders">
			        <span>Создание новой закупки</span>
		        </div>
		            <div class="orderedUserCabinetPanelOrderedLotsBlock">
			            <div class="userCabinetSettingsForm">
				            <div class="fullNameOrgBlock">
					            <span>Введите адрес поставки лота:</span>
                            <input type="text" name="addressNewLot" value={this.state.addressNewLot} onChange={this.onInputChange}/>
				            </div>
				            <div class="lawNameShortNumberBlock">
					            <div class="lawShortName">
						            <span>Выберите город:</span>
                                <select name="cityIdNewLot" class="addLotCitySelect" value={this.state.cityIdNewLot} onChange={this.onInputChange}>
                                    {cityOptionsHtml}
						        </select>
					            </div>
					            <div class="numberBlock">
						            <span>Срок поставки в течении:</span>
						            <input type="number" placeholder="... рабочих дней" name="deliveryDaysNewLot" value={this.state.deliveryDaysNewLot} onChange={this.onInputChange} />
					            </div>
				            </div>
				            <div class="fullNameOrgBlock">
					            <span>Описание или требование к текущему лоту:</span>
					            <textarea name="descriptionNewLot" value={this.state.descriptionNewLot} onChange={this.onInputChange} class="addLotPrivacyDescription" rows="6"></textarea>
				            </div>
				            <br/>
				            <br/>
				            <div class="classAddProductCrudTitle"><b>Добавьте закупаемые товары:</b></div>
				            <hr/>
				            <br/>
				            <div class="fullNameOrgBlock">
					            <span>Наименование товара:</span>
					            <input type="text" name="newItemName" value={this.state.newItemName} onChange={this.onInputChange} />
				            </div>
				            <div class="addItemsToLotBlock">
					            <div class="addToLotItemParams">
						            <span>Количество:</span>
						            <input type="number" name="newItemCount" value={this.state.newItemCount} onChange={this.onInputChange} />
					            </div>
					            <div class="addToLotItemParams">
						            <span>Единица измерения:</span>
						            <select name="newItemUnit" value={this.state.newItemUnit} onChange={this.onInputChange}>
                                    {unitsMeasuringHtml}
						            </select>
					            </div>
					            <div class="addToLotItemParams">
						            <span>Стартовая цена:</span>
                                <input type="number" placeholder="... рублей" name="newItemStartPrice" value={this.state.newItemStartPrice} onChange={this.onInputChange} />
					            </div>
				            </div>
				            <div class="addItemsToLotButtonBlock">
					            <input type="button" onClick={this.addNewItemToState} value="Добавить товар"/>
				            </div>
				            <hr/>

				            <div class="addedToStateNewLotItems">

                            {itemsDataHtml}

				            </div>


				            <hr/>
				            <div class="saveUserSettingsBlock">
					            <input type="submit" class="saveUserSettingsButton" onClick={this.createLotWithItems} value="Выставить на аукцион" />
				            </div>
			            </div>
		            </div>
	            </div>

        </div>
    );
  }
}
