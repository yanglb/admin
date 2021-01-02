import { get, post, del } from 'axios'

const base = '/auth'

export const signin = (username, password) => post(base, { username, password })
export const info = () => get(base)
export const signout = () => del(base)
