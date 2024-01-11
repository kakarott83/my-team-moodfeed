import { Country } from "./country";

export interface Customer {
    id?: string,
    name?: string,
    city?: string,
    country: Country
}
