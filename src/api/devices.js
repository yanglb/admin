import axios, { get, post, put } from 'axios'
import EventSource from 'eventsource'
import { store } from '@/store/user'

const base = '/devices'

export const query = (params) => get(base, { params })
export const detail = number => get(`${base}/${number}`)
export const update = (id, data) => put(`${base}/${id}`, data)

// 获取雷达信号数据
export const radar = (number, params) => get(`${base}/${number}/radar`, { params })

// 命令
export const execCmd = (number, code, data) => post(`${base}/${number}/commands/${code}`, data)
export const execSetSettingCmd = (number, data) => post(`${base}/${number}/commands/set-setting`, data)
export const execReadSettingCmd = (number, data) => post(`${base}/${number}/commands/read-setting`, data)

// 服务端通知
export const statusEvent = number => new EventSource(`${axios.defaults.baseURL}${base}/${number}/events/status`, {
  headers: {
    "Authorization": `${store.state.type} ${store.state.token}`
  }
})
