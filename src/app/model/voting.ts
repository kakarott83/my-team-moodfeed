import { Votingdetail } from "./votingdetail";

export interface Voting {
    id?: string,
    votings?: Votingdetail[],
    votingWeek?: string,
    votingYear?: string,
    department?: string,
    comment?: string,
    total?: number    
}
