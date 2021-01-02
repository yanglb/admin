import { get, post } from 'axios'

const base = '/orders'

export const orderList = params => get(base, { params })
export const afterSaleConfirm = (number, data) => post(`${base}/${number}`, data)
