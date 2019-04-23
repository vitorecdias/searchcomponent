import axios from 'axios'

export function getBairrosList(){
    var request = axios.get('http://bhmapogcbase-hm.pbh.gov.br/bhmapogcbase/wfs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ide_bhgeo:BAIRRO&outputFormat=application%2Fjson&propertyName=NOME&sortBy=NOME')//("http://geocoder.pbh.gov.br/geocoder/v2/bairros?limite=0")
    
    return{
        type: 'BAIRROS_LIST_FETCHED',
        payload: request
    }
}



