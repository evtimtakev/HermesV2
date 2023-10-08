import moment, {Moment} from "moment";

export const isBetweenNowAndStartDate = (dateToCheck: Moment, startDate: any ): boolean => {
    return moment(dateToCheck).isBetween(startDate, moment());
}

export const substractPeriod = (amount: number, unit: any): Moment => {
    return moment().subtract(amount, unit.toUpperCase()).startOf("day");
}