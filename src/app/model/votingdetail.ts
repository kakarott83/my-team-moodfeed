import { Rating } from "./rating"

export interface Votingdetail {
    id?: string
    question?:string,
    description?: string
    rating?: Rating,
    result?: number
}
