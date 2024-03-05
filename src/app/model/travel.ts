import { Customer } from "./customer";
import { Reason } from "./reason";
import { Spend } from "./spend";
import { TravelDays } from "./travelDays";

export interface Travel {
    id?: string,
    userId?: string,
    date:Date[],
    comment?: string,
    customer?: Customer,
    reason?: Reason,
    spends?: Spend[],
    days?: TravelDays[],
    fileRefs?: any[],
    state?: string, /*Save,Submitted,Paid*/
    breakfast?: boolean,
    launch?: boolean,
    dinner?: boolean,
    amount?: number
}
