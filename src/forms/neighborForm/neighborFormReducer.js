const INITIAL_STATE = {bairrosList: []}

export default (state = INITIAL_STATE,action) =>{
    switch(action.type){
        case "BAIRROS_LIST_FETCHED":{
            const list = []

            for(var i in action.payload.data){
                list.push(action.payload.data[i].properties.NOME)
            }
            return {...state, bairrosList: list.sort()}
        }
        default:
            return state
    }
}
