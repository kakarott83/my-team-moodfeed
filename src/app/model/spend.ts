import { SpendType } from "./spend-type";

export interface Spend {
    type?: SpendType,
    value?: number,
    date?: Date,
    comment?: string
}
