import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import indexPageLotList from './componentStyle/lotList.css';

export class lotList extends Component {
    displayName = lotList.name

    constructor(props)
    {
        super(props)
        this.state = {
            lotsData: [],
            cities: [],
            lotProducts: [],
            isLoadingData: true,
        }

        this.loadDataFromApi = this.loadDataFromApi.bind(this)
        this.loadCityList = this.loadCityList.bind(this)
        this.loadLotProducts = this.loadLotProducts.bind(this)
    }

    componentWillMount()
    {
        this.setState({
            isLoadingData: true
        })
        this.loadDataFromApi()
    }

    loadDataFromApi()
    {
        fetch('/api/Lot/All')
            .then(response => response.json())
            .then((data) =>
                this.setState({
                    lotsData: data
                })
            )
            .then(() => {
                //alert(JSON.stringify(this.state.lotsData))
                this.loadCityList()
            })
    }

    loadCityList()
    {
        fetch('/api/City/All')
            .then(response => response.json())
            .then((data) =>
                this.setState({
                    cities: data
                })
            )
            .then(() => {
                //alert(JSON.stringify(this.state.cities))
                this.setState({
                    isLoadingData: false
                })

                this.loadLotProducts()
            })
    }

    loadLotProducts()
    {
        fetch('/api/LotTovar/All')
            .then(response => response.json())
            .then((data) =>
                this.setState({
                    lotProducts: data
                })
            )
            .then(() => {
                //alert(JSON.stringify(this.state.lotProducts))
            })
    }




    render() {
        const { lotsData, lotProducts, cities, isLoadingData } = this.state

        if (isLoadingData)
        {
            return (
                <div class="container"><div class="lotListHeader">Загрузка данных...</div></div>
            );
        }

    return (
      <div class="container">
		<div class="lotListHeader">Все лоты</div>
		<div class="tableContent">
			<table>
				<tr class="tableHeader">
					<td>№ лота</td>
					<td>Наименование заказа</td>
					<td>Город</td>
					<td>Срок</td>
					<td>Дата завершения</td>
				</tr>

            {lotsData.map(lot =>
                <tr class="tableData" key={lot.idLot} >
				    <td><Link to={'/lotDetails/'+lot.idLot}>{lot.idLot}</Link></td>
				    <td>
                        <Link to={'/lotDetails/'+lot.idLot}>
                        {lotProducts.map((lotItem, i) => {
                            if(lotItem.lotId == lot.idLot)
                            {
                                return lotItem.nameLotTovar + ', '
                            }
                        })}
                        </Link>
                    </td>
				    <td>
                    {
                        cities.map(city => {
                            if(city.idCity == lot.cityId) { return city.nameCity }
                        })
                    }
                    </td>
				    <td>{lot.deliveryDurationLot} дней</td>
				    <td>
                        {new Intl.DateTimeFormat('en-GB', {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                        }).format(new Date(lot.endDateTimeLot)).replace(/\//g, '.')}
                    </td>
			    </tr>

                //<li key={lot.objectID}>
                //<a href={lot.url}>{hit.title}</a>
                //</li>
            )}
			</table>

        {/*}
		<div class="nextPageBlock">
			<input class="btnNextLots" type="button" value="Следующая страница ➔"/>
		</div>
        {*/}
		</div>
	</div>
    );
  }
}
