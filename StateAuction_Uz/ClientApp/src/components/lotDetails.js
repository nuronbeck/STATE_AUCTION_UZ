import React, { Component } from 'react';
import lotDetailsStyle from './componentStyle/lotDetails.css';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import goverImage from './imgs/gover.png';

export class lotDetails extends Component {
  displayName = lotDetails.name
    constructor(props)
    {
        super(props)

        let loggedIn = true
        this.state = {
            loggedIn,
            lotId: parseInt(this.props.match.params['lotId']),
            lotDetails: [],
            isLoadingData: true,
            allLotTovar: [],
            lotSuggestAmountSumm: 0,
            unitsMeasuringData: [],
            userDataDetails: [],
            lastPrices: [],
            suggestedPrices: [],
        }

        this.loadLotDataFromApi = this.loadLotDataFromApi.bind(this)
        this.loadLotProductsFromApi = this.loadLotProductsFromApi.bind(this)
        this.loadUnitsFromApi = this.loadUnitsFromApi.bind(this)
        this.filterLotTovar = this.filterLotTovar.bind(this)
        this.suggestMyPriceClick = this.suggestMyPriceClick.bind(this)

        this.loadAuthorizedUserData = this.loadAuthorizedUserData.bind(this)
        this.returnSuggestionHtml = this.returnSuggestionHtml.bind(this)
        this.onChangeSuggestPrice = this.onChangeSuggestPrice.bind(this)
        this.editLotTovarPrice = this.editLotTovarPrice.bind(this)
    }

    componentWillMount()
    {
        const userAuthorizedId = localStorage.getItem('AuthUserId')
        if (userAuthorizedId == null)
        {
            this.setState({
                loggedIn: false
            })
        }
        this.setState({
            isLoadingData: true
        }, () => { this.loadAuthorizedUserData() })

        this.loadUnitsFromApi()
    }

    loadAuthorizedUserData()
    {
        if (this.state.loggedIn == true)
        {
            fetch('/api/User/Details/' + localStorage.getItem('AuthUserId'))
                .then(response => response.json())
                .then((data) =>
                    this.setState({
                        userDataDetails: data
                    })
                )
                .then(() => {
                    if (this.state.userDataDetails.typeId == 1)
                    {
                        //alert("Вы исполнитель")
                    }
                    if (this.state.userDataDetails.typeId == 2)
                    {
                        //alert("Вы заказчик")
                    }
                    
                })
        }
        if (this.state.loggedIn == false)
        {
            alert("Не авторизован!")
        }
        
    }

    loadLotDataFromApi()
    {
        fetch('/api/Lot/Details/' + this.state.lotId)
            .then(response => response.json())
            .then((data) =>
                this.setState({
                    lotDetails: data
                })
            )
            .then(() => {
                //alert(JSON.stringify(this.state.lotDetails))
                this.setState({
                    isLoadingData: false
                })
            })
    }

    loadLotProductsFromApi()
    {
        fetch('/api/LotTovar/All')
            .then(response => response.json())
            .then((data) =>
                this.setState({
                    allLotTovar: data
                })
            )
            .then(() => {
                this.filterLotTovar()
                this.lotAmountSummDidSuggest()
            })
            .then(() => {
                //alert(JSON.stringify(this.state.allLotTovar))

                this.setState({
                    suggestedPrices: this.state.allLotTovar.map((lotTovarObject) => {
                        return lotTovarObject.suggestPriceLotTovar
                    }),
                    lastPrices: this.state.allLotTovar.map((lotTovarObject) => {
                        return lotTovarObject.suggestPriceLotTovar
                    }),
                })

                

                this.loadLotDataFromApi()
            })
    }

    loadUnitsFromApi()
    {
        fetch('/api/UnitsMeasuring/All')
            .then(response => response.json())
            .then((data) =>
                this.setState({ unitsMeasuringData: data })
            )
            .then(() =>
            {
                //alert(JSON.stringify(this.state.unitsMeasuringData))
                this.loadLotProductsFromApi()
            })
    }

    filterLotTovar = () => {
        this.setState({
            allLotTovar: this.state.allLotTovar.filter(lotTovars => parseInt(lotTovars.lotId) === this.state.lotId)
        })
    }

    lotAmountSummDidSuggest()
    {
        this.state.allLotTovar.map(lotTovar =>
        {
            this.setState({
                lotSuggestAmountSumm: this.state.lotSuggestAmountSumm + (lotTovar.countLotTovar * lotTovar.suggestPriceLotTovar)
            })
        })
    }

    suggestMyPriceClick = () =>
    {
        //alert('Пока еще эта функция не доступна!')

        //alert(JSON.stringify(this.state.lastPrices))
        //alert(JSON.stringify(this.state.suggestedPrices))

        var checkPriceLower = this.state.suggestedPrices.map((suggestedObject, index) =>
        {
            return suggestedObject < this.state.lastPrices[index] ? true : false
        })

        checkPriceLower.map((checkSuggest, ind) => {
            return checkSuggest ? console.log("okay") : window.confirm("Предложите ниже цену!\n\n" + (ind + 1) + "-предложенная цена не может быть\n равен или больше текущей предложенной цены!")
        })

        const inputFilledTrue = checkPriceLower.some(objectCheck => (objectCheck == true))
        //alert("Все заполнено: " + inputFilledTrue)

        if (inputFilledTrue == true)
        {
            this.editLotTovarPrice()
        }
        

    }

    editLotTovarPrice()
    {
        this.state.allLotTovar.map((lotTovObject, i) =>
        {
            //alert(JSON.stringify(lotTovObject))

            var lotTovarPutData = {
                'IdLotTovar': lotTovObject.idLotTovar,
                'SuggestPriceLotTovar': this.state.suggestedPrices[i],
                'UserId': localStorage.getItem("AuthUserId")
            }

            fetch('/api/LotTovar/EditPrice', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
            },
                body: JSON.stringify(lotTovarPutData)
            })

        })

        fetch('api/Lot/EditExecutor', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                'IdLot': this.state.lotId,
                'ExecuterUserId': localStorage.getItem('AuthUserId')
            })
        })
        .then(() => {
            if (window.confirm("Предложение принято!"))
            {
                this.props.history.push('/userCabinet')
            }  
        })      
        
    }

    onChangeSuggestPrice(index, e)
    {
        if (parseFloat(e.target.value))
        {
            this.state.suggestedPrices[index] = parseFloat(e.target.value)
            this.forceUpdate()
        }
    }

    returnSuggestionHtml(allLotTovar, unitsMeasuringData)
    {
        if (this.state.userDataDetails.typeId == 1)
        {
            return (
                <div class="lotDetailsSuggestBlock">
                    {allLotTovar.map((lotTovar, index) =>
                        <div class="lotDetailsProductForm">
                            <div>{lotTovar.nameLotTovar}</div>
                            <div class="lotDetailsProductFormInput">
                                <input type="text" name={"suggestPrice" + index} onChange={(e) => this.onChangeSuggestPrice(index, e)} value={this.state.suggestedPrices[index]} /> рублей / {unitsMeasuringData.map(um => { if (um.idUnitsMeasuring == lotTovar.unitsMeasuringId) { return um.nameUnitsMeasuring } })}
                            </div>
                        </div>
                    )}
                    <input type="button" value="➤ Предложить свою цену" onClick={() => this.suggestMyPriceClick()} />
                </div>
            )
        }
        if (this.state.userDataDetails.typeId == 2)
        {
            return (
                <div class="lotDetailsSuggestBlock"> </div>
            )
        }
        
    }


  render() {

      const { lotId, lotSuggestAmountSumm, allLotTovar, lotDetails, unitsMeasuringData, isLoadingData } = this.state

    if (isLoadingData)
    {
        return (<div class="container"><div class="lotDetailsListHeader">Загрузка данных...</div></div> )
    }

    return (
	<div class="container">
		<div class="lotDetailsListHeader">
			<div class="lotDetailsTitle">
                    <div class="lotDetailsNumber">Лот № {lotId}</div>
				<div class="lotDetailsSumm">Текущая стоимость:  {lotSuggestAmountSumm} рублей</div>
			</div>
		</div>
		<div class="lotDetailsTableContent">
			<div class="lotTovarTables">
            {allLotTovar.map(lotTovar =>
				<div class="lotTovarsBlocks">
					<p class="nameLotTovar"><span>Наименование товара: </span> {lotTovar.nameLotTovar}</p>
					<table>
						<tr class="tableHeader">
							<td>Количество</td>
							<td>Ед. измерения</td>
							<td>Стартовая цена</td>
							<td>Предложенная цена</td>
						</tr>
						<tr class="tableData">
							<td>{lotTovar.countLotTovar}</td>
							<td>
                            {
                                unitsMeasuringData.map(um => 
                                {
                                    if (um.idUnitsMeasuring == lotTovar.unitsMeasuringId) { return um.nameUnitsMeasuring }
                                })
                            }
                            </td>
							<td class="lotTovarStartPrice">{lotTovar.startPriceLotTovar}</td>
							<td class="lotTovarSuggestPrice">{lotTovar.suggestPriceLotTovar}</td>
						</tr>
					</table>
				</div>
            )}
			</div>
		</div>


            {this.returnSuggestionHtml(allLotTovar, unitsMeasuringData)}


		<div class="lotDetailsFullDescriptionBlock">
			<div class="lotDetailsFullDescriptionTitle">Описание:</div>
			<div class="lotDetailsFullDescriptionText">{lotDetails.descriptionLot}</div>
		</div>
	</div>
    );
  }
}
