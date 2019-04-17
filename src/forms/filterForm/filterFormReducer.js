const INITIAL_STATE = {camadasList: []}

export default (state = INITIAL_STATE,action) =>{
    switch(action.type){
        case "CAMADAS_LIST_FETCHED":{
            const list = []
            console.log(action.payload.data)
            /*for(var i in action.payload.data){
                list.push(action.payload.data[i].descricao)
            }*/
            return {...state, camadasList: list.sort()}
        }
        default:
            return state
    }
}
