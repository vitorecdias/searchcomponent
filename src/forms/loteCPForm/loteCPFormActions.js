import axios from 'axios'
import {URLlogradouros} from "../../common/consts"

export function getLogradouroTypeList(){

    var request = axios.get(URLlogradouros+"/tipos")

    return{
        type: 'LOGRADOURO_TYPE_LIST_FETCHED',
        payload: request
    }
}



