import axios from 'axios'


export function getCamadasList(){

    var request = axios.get("http://bhmap-hm.pbh.gov.br/v2/api/metacamada")

    return{
        type: 'CAMADAS_LIST_FETCHED',
        payload: request
    }
}



