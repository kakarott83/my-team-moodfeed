import { Votingdetail } from "./votingdetail";

export interface Voting {
    id?: string,
    votings?: Votingdetail[],
    votingWeek?: string,
    department?: string,
    comment?: string    
}
