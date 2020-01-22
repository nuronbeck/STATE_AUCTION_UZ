import React, { Component } from 'react';
import documentationStyle from './componentStyle/documentation.css';
import { Link } from 'react-router-dom';
import goverImage from './imgs/gover.png';

export class documentation extends Component {
  displayName = documentation.name

  render() {
    return (
        <div class="documentationBody">
            <h3>
                <img src={goverImage} />
                Постановления Правительства РФ
            </h3>
            <hr />

            <h4>
                1. Постановление Правительства РФ от 05.11.2019 N 1401 О типовых формах заявок на участие в электронных процедурах.
                <Link to="/documentFiles/document_1.pdf" target="_blank" download> Скачать</Link>
                <hr/>
            </h4>

            <h4>
                2. Постановление Правительства РФ от 08.06.2018 № 656 (ред. от 05.11.2019) О требованиях к операторам электронных площадок. 
                <Link to="/documentFiles/document_2.pdf" target="_blank" download> Скачать</Link>
                <hr />
            </h4>

            <h4>
                3. Постановление Правительства РФ от 30.06.2004 № 329 (ред. от 18.10.2019) О Министерстве финансов Российской Федерации. 
                <Link to="/documentFiles/document_3.pdf" target="_blank" download> Скачать</Link>
                <hr />
            </h4>

            <h4>
                4. Постановление Правительства РФ от 28.11.2013 N 1084 (ред. от 07.10.2019) О порядке ведения реестра контрактов. 
                <Link to="/documentFiles/document_4.pdf" target="_blank" download> Скачать</Link>
                <hr />
            </h4>

            <h4>
                5. Постановление Правительства РФ от 04.02.2015 N 99 (ред. от 15.10.2019) Об установлении дополнительных требований к участникам закупки. 
                <Link to="/documentFiles/document_5.pdf" target="_blank" download> Скачать</Link>
                <hr />
            </h4>

            <h4>
                6. Постановление Правительства РФ от 11.12.2014 N 1352 (ред. от 18.09.2019) Об участии субъектов малого и среднего предпринимательства в закупках.
                <Link to="/documentFiles/document_6.pdf" target="_blank" download> Скачать</Link>
                <hr />
            </h4>

            <h4>
                7. Постановление Правительства Российской Федерации от 30.09.2019 № 1279 «Об установлении порядка формирования, утверждения, внесения изменений, размещения в ЕИС и требований к форме планов-графиков закупок». 
                <Link to="/documentFiles/document_7.pdf" target="_blank" download> Скачать</Link>
                <hr />
            </h4>

            <h4>
                8. Проект постановления Правительства РФ об установлении порядка формирования, утверждения планов-графиков закупок, внесения изменений в такие планы-графики, размещения планов-графиков закупок в единой информационной системе в сфере закупок. 
                <Link to="/documentFiles/document_8.pdf" target="_blank" download> Скачать</Link>
                <hr />
            </h4>

        </div>
    );
  }
}
