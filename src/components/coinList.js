import { useEffect, useState, useMemo } from "react";
import { getCoinList } from "../api";
import { CoinRow } from "./coinRow";
import { TextField } from '@mui/material';

export const CoinList = () => {


    const [coins, setCoins] = useState([]);

    const [search, setSearch] = useState('');

    useEffect(function () {
        refreshData();
    }, [])

    async function refreshData() {
        const array = await getCoinList();
        setCoins(array);
    }



    function ontextchange(evento) {
        console.log(evento.target.value);
        setSearch(evento.target.value);
    }

    const filteredCoins = useMemo(() => {
        const searched = coins.filter(singolo => singolo.name.toLowerCase().includes(search));
        return searched;

    }, [coins, search])





    return (
        <div className="coinList">
            <TextField id="filled-basic" label="Ricerca..." variant="filled" className="inputTesto" onChange={ontextchange} />
            <br></br>
            <br></br>
            <center>Numero elementi: {filteredCoins.length}</center>
            <br></br>
            <table id="customers">
                <thead >
                    <div className="divMorbido">
                        <div className="headTable"></div>
                        <div className="headTable">Nome</div>
                        <div className="headTable">Codice</div>
                        <div className="headTable">Prezzo</div>
                    </div>


                </thead>
                < tbody>
                    {filteredCoins.map((coin) => <CoinRow coin={coin} />)}
                </tbody>
            </table>

        </div >
    )

}