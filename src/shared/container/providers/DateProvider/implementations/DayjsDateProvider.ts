import { IDateProvider } from "../IDateProvider"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)


class DayjsDateProvider implements IDateProvider {

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate()
    }
    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate()
    }
    dateNow(): Date {
        return dayjs().toDate()
    }

    convertToUTC(date: Date) {
        return dayjs(date).utc().local().format()
    }

    compareInHours(start_date: Date, end_date: Date): number {
        return dayjs(end_date).diff(start_date, "hours")
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date)
    }


}


export { DayjsDateProvider }