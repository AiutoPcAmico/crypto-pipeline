import axios from "axios"

export async function getCoinList() {
    try {
        const data = await axios.get('/coins/');
        return data.data;
    } catch (error) {
        console.log("Errore durante il recupero: " + error);
        return [];
    }
}

export async function getCoinDetailed(id) {
    try {
        const { data: coinDetail } = await axios.get(`/coins/` + id);
        return coinDetail;
    } catch (error) {
        console.log("Errore durante il recupero dei dettagli: " + error);
        return [];
    }
}

export async function getCoinChart(id) {
    try {
        const { data: coinChart } = await axios.get(`/coins/${id}/market_chart?vs_currency=usd&days=365`);
        return coinChart;
    } catch (error) {
        console.log("Errore durante il recupero dei dettagli: " + error);
        return [];
    }
}