// to use context in whole places of app


import {createContext} from 'react'

function noop() {

}

export const AuthContext = createContext( {
    login: noop,
    logout: noop,
    token: null,
    userId: null,
    isAuthenticated: false
})