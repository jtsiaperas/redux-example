
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import auth from './store/reducers/auth'

import {
  authRegisterReducer,
  authLoginReducer,
  fetchUsersReducer,
  verifyAccountReducer,
  passwordForgotReducer,
  passwordResetReducer,
  userDeleteReducer
} from "./store/reducers";

const rootReducer = combineReducers({
  auth,
  authRegister: authRegisterReducer,
  authInfo: authLoginReducer,
  userList: fetchUsersReducer,
  verifyAccount: verifyAccountReducer,
  passwordForgot: passwordForgotReducer,
  passwordReset: passwordResetReducer,
  userDelete: userDeleteReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
