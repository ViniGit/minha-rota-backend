
interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number
    convertToUTC(date: Date)
    dateNow(): Date
    addDays(days: number): Date
    addHours(hours: number): Date
    compareIfBefore(start_date: Date, end_date: Date): boolean
}

export { IDateProvider }