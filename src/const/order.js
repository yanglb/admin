
export const OrderStatusEnum = {
    /**
     * 未付款
     */
    Unpaid: 0,

    /**
     * 已付款
     */
    Paid: 1,
}

export const OrderAfterSaleEnum = {
    /**
     * 未申请
     */
    NotApplied: 0,

    /**
     * 已申请
     */
    Applied: 10,

    /**
     * 同意
     */
    Refunded: 20,

    /**
     * 不同意退款
     */
    Refuse: 1,
}

export const OrderUseStatusEnum = {
    /**
     * 未使用
     */
    Unused: 0,

    /**
     * 已使用
     */
    Used: 1,
}

export const ItemTypeEnum = {
    /**
     * 一次性
     */
    Once: 'once',

    /**
     * 一天
     */
    OneDay: 'one-day',
}
