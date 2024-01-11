import { Customer } from "./customer";

export interface Travel {
    id?: string,
    userId?: string,
    date?:string,
    comment?: string,
    customer?: Customer,
    reason?: string
}
