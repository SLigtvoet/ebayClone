import { combineReducers } from 'redux'
import events from './events'
import currentAdd from './add'
import login from './login'
import signup from './signup'
import users from './users'
import currentUser from './currentUser'
import tickets from './tickets'
import comments from './comments'

export default combineReducers({
    events,
    currentAdd,
    login,
    signup,
    users,
    currentUser,
    tickets,
    comments
})
