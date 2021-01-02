import { get, post } from 'axios'

const base = '/articles'

export const articles = () => get(base)
export const save = data => post(base, data)
