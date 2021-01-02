import moment from 'moment'
import { OrderAfterSaleEnum } from './order'

export const yesno = value =>  value ? '是' : '否'
export const normalAbnormal = value => !value ? '正常' : '异常'
export const hasno = value => value ? '有' : '无'

export const dateTimeFormat = value => {
    if (!value) return ''
    const r = moment(value).format('YYYY/M/D H:m:s')
    return r
}

export const dateTimeFormatShort = value => {
    if (!value) return ''
    const r = moment(value).format('M/D H:m')
    return r
}

export const prettyDateFormat = value => {
    if (!value) return ''
    const r = moment(value).fromNow()
    return r
}

export const dateFormat = value => {
    if (!value) return ''
    return moment(value).format('YYYY/M/D')
}

export const afterSaleStatus = value => {
    switch (value) {
        case OrderAfterSaleEnum.NotApplied:
            return '未申请'
        case OrderAfterSaleEnum.Applied:
            return '申请中'
        case OrderAfterSaleEnum.Refunded:
            return '已退款'
        case OrderAfterSaleEnum.Refuse:
            return '已拒绝'
    
        default:
            return '未知'
    }
}
