import { combineReducers } from 'redux'
import {ADD_TERM} from './actions'
function terms(state = [], action) {
  switch (action.type) {
    case ADD_TERM:
      return [
        ...state,
        {
          text: action.text,
        }
      ]
    default:
      return state
  }
}
const termApp = combineReducers({
  terms
})
export default termApp