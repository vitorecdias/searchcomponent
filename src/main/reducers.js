import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import AdressFormReducer from '../forms/adressForm/adressFormReducer'
import NeighborFormReducer from '../forms/neighborForm/neighborFormReducer'

const rootReducer = combineReducers({
    form: formReducer,
    adressForm: AdressFormReducer,
    neighborForm: NeighborFormReducer
})

export default rootReducer