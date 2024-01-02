import { Rating } from "./rating"

export interface Votingdetail {
    id?: string
    question?:string,
    rating?: Rating,
    result?: number
}
