const INITIAL_STATE = {camadasList: []}

export default (state = INITIAL_STATE,action) =>{
    switch(action.type){
        case "CAMADAS_LIST_FETCHED":{
            
            return {...state, camadasList: action.payload.data}
        }
        default:
            return state
    }
}
