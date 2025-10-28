type AppStatus = "off" | "loading" | "on"
type LoginStatus = boolean | null
type ListenStatus = "off" | "loading" | "waiting" | "running"
interface outputStatus {
    log: string,
    app: AppStatus,
    login: LoginStatus,
    code: string,
    listen: ListenStatus,
    isRunning: boolean
}

export interface point_bot_WhatsApp_status {
    success: boolean,
    msg: string,
    result: outputStatus
}

export interface point_bot_WhatsApp_create {
    success: boolean,
    msg: string,
    bot_process: string
}