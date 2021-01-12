
/**
 * 命令码
 */
export const CommandCodes = {
    Heartbeat : 0x20, // 心跳与注册，发送固定信息。网关发送给服务器。
    OTA : 0x21, // 升级

    FanOn : 0x30, // 控制循环杀监控器开。
    FanOff : 0x31, // 控制循环杀监控器关。

    UVOn : 0x32, // 控制照射杀监控器开。
    UVOff : 0x33, // 控制照射杀监控器关。

    Detect : 0x34, // 调试命令。
    SetSetting : 0x35, // 配置循环杀时间，照射杀时间，配置上报时间。雷达控制使能。
    ReadSetting : 0x36, // 查询循环杀时间，照射杀时间，配置上报时间。雷达控制使能。

    NoticeStatus : 0x40, // 上报监控器状态。
    NoticeReport : 0x41 // 根据服务器配置的上报时间上报消杀报告。
}

/**
 * 危险命令提示消息
 */
export const CommandCodeConfirms = {
    // CommandCodes
}

/**
 * 命令执行结果码
 */
export const CommandExecutionResultCode = {
    Success: 0x79, // 'y',
    TurnFailed: 0x6e, // 'n',
    OtherFailed: 0x52, // 'R'
}

export const DeviceWorkingModeEnum = {
    Automatic: 0x00,
    Manual: 0x01
}

export const DeviceFanSpeedEnum = {
    High: 0x00,
    Medium: 0x01,
    Low: 0x02
}

/**
 * 设备模块工作状态
 * 0x00为已停止，0x01为运行中
 */
export const DeviceWorkingStatusEnum = {
    Stopped: 0x00,
    Running: 0x01
}
