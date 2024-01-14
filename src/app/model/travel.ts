import { Customer } from "./customer";
import { Spend } from "./spend";

export interface Travel {
    id?: string,
    userId?: string,
    date?:Date[],
    comment?: string,
    customer?: Customer,
    reason?: string,
    spends?: Spend[]
}
