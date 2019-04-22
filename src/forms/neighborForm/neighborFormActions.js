import axios from 'axios'

export function getBairrosList(){
    var request = axios.get("http://bhmapogcbase-hm.pbh.gov.br/bhmapogcbase/wfs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ide_bhgeo:BAIRRO&maxFeatures=5000&outputFormat=application%2Fjson")
    
    return{
        type: 'BAIRROS_LIST_FETCHED',
        payload: request
    }
}



