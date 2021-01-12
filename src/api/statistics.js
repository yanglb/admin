import { get } from 'axios'

const base = '/statistics'

// 数量统计
export const count = () => get(`${base}/count`)

// 按天统计
export const dayReport = (date, number) => get(`${base}/report/day`, { params: { date, number} })

// 日报
export const dailyReport = (start, end, number) => get(`${base}/report/daily`, { params: { start, end, number } })

// COVID-19
export const COVID19 = () => get(`${base}/COVID-19`)
