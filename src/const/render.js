import moment from 'moment'

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

/**
 * 电流转换  mA => A  最多保留2位小数
 */
export const currentMA2A = value => {
    if (typeof value === undefined || value == null) return;

    return value / 1000
}
