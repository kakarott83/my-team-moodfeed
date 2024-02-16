import { Customer } from "./customer";
import { Reason } from "./reason";
import { Spend } from "./spend";

export interface Travel {
    id?: string,
    userId?: string,
    date?:Date[],
    comment?: string,
    customer?: Customer,
    reason?: Reason,
    spends?: Spend[],
    fileRefs?: any[],
    state?: string, /*Save,Submitted,Paid*/
    breakfast?: boolean,
    launch?: boolean,
    dinner?: boolean,
}
