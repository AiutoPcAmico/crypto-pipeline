import { useState } from "react";
import { getCoinChart, getCoinDetailed } from "../api";
import { CircularProgress } from '@mui/material';

import React, { Component } from "react";
import Chart from "react-apexcharts";

const options = {
    chart: {
        id: "basic-bar"
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001]
    }
}
const series = [
    {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 104, 78, 123]
    }
]

class App extends Component {
    constructor(props) {
        super(props);



        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="500"
                        />
                    </div>
                </div>
            </div>
        );

    }
}

const defaultChart = {
    options,
    series
}
export const CoinRow = ({ coin }) => {

    const [open, setOpen] = useState(false);
    const [vediGrafico, setVediGrafico] = useState(false);
    const [chartSettings, setChartSettigs] = useState(defaultChart);

    const onClickRow = async (coin) => {
        const asscoinChart = await getCoinChart(coin);



        const newChartSettings = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xasis: {
                    categories: asscoinChart.prices.map(price => price[0])
                }
            },
            series: [{
                name: "series-1",
                data: asscoinChart.prices.map(price => price[1].toFixed(2))
            }]
        }


        setChartSettigs(newChartSettings);
    }


    return (
        <tr
            key={coin.id}
            onMouseEnter={() => { setOpen(true); onClickRow(coin.id) }}
            onMouseLeave={() => {
                setOpen(false);
                setVediGrafico(false)
            }}
        >

            <div className="divMorbido">
                <div className="divSpaziato"><img src={coin.image.small} alt={coin.id}></img></div>
                <div className="divSpaziato">{coin.name}</div>
                <div className="divSpaziato">{coin.symbol}</div>
                <div className="divSpaziato">{coin.market_data.current_price.eur} €</div>
            </div>

            {open && <div className="sopra">
                <p className="monete">Monete in circolazione: {coin.market_data.circulating_supply}</p>
                <div className="invito" onClick={() => setVediGrafico(true)}>Visualizza il Grafico!</div>
                {vediGrafico &&

                    <Chart options={chartSettings.options} series={chartSettings.series} type="line" height={350} />}
            </div>

            }

        </tr>


    )
}

