const INITIAL_STATE = {logradouroTypeList: []}

export default (state = INITIAL_STATE,action) =>{
    switch(action.type){
        case "LOGRADOURO_TYPE_LIST_FETCHED":{
            const list = []
            
            for(var i in action.payload.data){
                list.push(action.payload.data[i].descricao)
            }
            return {...state, logradouroTypeList: list.sort()}
        }
        default:
            return state
    }
}
