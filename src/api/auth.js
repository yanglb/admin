import { post, del } from 'axios'

const base = '/auth'

export const signin1 = (username, password) => post(base, { username, password })
export const signin = () => Promise.resolve({ "user": { "id": 1, "username": "admin", "name": "管理员" }, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiLnrqHnkIblkZgiLCJpYXQiOjE2MTA0Mjg0ODV9.ZBZrmkKJThMF0bCCb0aIpNXSNYoKbrRwKaLh8XiEjVM", "type": "Bearer" })
export const info = () => Promise.resolve({ "id": 1, "username": "admin", "name": "管理员", "iat": 1610428485 })
export const signout = () => del(base)
