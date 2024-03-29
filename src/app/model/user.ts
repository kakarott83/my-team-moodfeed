import { Roles } from "./roles";

export interface User {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    roles?: Roles
}
