import Div from "./Div";
import Span from "./Span";
export default class Calendar {
    public constructor(today: Date) {
        this.MonthDays = [31, this.isLeapYear(today.getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.currentLookMonth = new Date();
    }
    //private grid: number[] = [];
    private static today: Date = new Date();
    private currentLookMonth: Date;
    public static readonly weekdayName: string[] = ['一', '二', '三', '四', '五', '六', '日'];

    private static copyDate = (date: Date): Date => {
        return new Date(date.getTime());
    };

    public isLeapYear = (year: number): boolean => {
        if (year % 3200 == 0 || (year % 100 == 0 && year % 400 != 0)) {
            return false;
        }
        else if (year % 4 == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    public static addMonth = (date: Date, val: number) => {
        let month = date.getMonth();
        let year = date.getFullYear();
        month += val;
        while (month >= 12) {
            month -= 12;
            year++;
        }
        while (month < 0) {
            month += 12;
            year--;
        }
        if (year < 0) {
            throw Error('没有更早的年份');
        }
        date.setFullYear(year);
        date.setMonth(month);
    };

    public static isToday = (date: Date): boolean => {
        let t = new Date();
        if (date.getFullYear() != t.getFullYear() || date.getMonth() != t.getMonth()) {
            return false;
        }
        else {
            return true;
        }
    };

    private MonthDays: number[];
    private getMonthData = (): CalendarData[] => {
        let thisMonthDaysCount = this.MonthDays[this.currentLookMonth.getMonth()];
        let lastMonthDaysCount = (this.currentLookMonth.getMonth() - 1) == -1 ? this.MonthDays[11] : this.MonthDays[this.currentLookMonth.getMonth() - 1];
        this.currentLookMonth.setDate(1);
        let offset = this.currentLookMonth.getDay() - 1;
        let res: CalendarData[] = [];
        for (let i = 0; i < offset; i++) {
            let item = { day: lastMonthDaysCount - offset + i + 1, className: 'last-month' };
            res.push(item);
        }
        for (let i = 0; i < 42 - offset; i++) {
            if (i < thisMonthDaysCount) {
                let item = { day: i + 1, className: 'this-month' };
                if (Calendar.today.getDate() == i + 1 && Calendar.isToday(this.currentLookMonth)) {
                    item.className = 'today';
                }

                res.push(item);
            }
            else {
                let item = { day: i - thisMonthDaysCount + 1, className: 'next-month' };
                res.push(item);
            }
        }
        return res;
    };
    public getThisMonth = (): CalendarData[] => {
        this.currentLookMonth = Calendar.copyDate(Calendar.today);
        return this.getMonthData();
    };
    public getNextMonth = (): CalendarData[] => {
        Calendar.addMonth(this.currentLookMonth, 1);
        return this.getMonthData();
    };

    public getLastMonth = (): CalendarData[] => {
        Calendar.addMonth(this.currentLookMonth, -1);
        return this.getMonthData();
    };

    public getCurrentMonthStr = (): string => {
        return `${this.currentLookMonth.getFullYear()}年${this.currentLookMonth.getMonth() + 1}月`
    }

    public updateDate = (): void => {
        Calendar.today = new Date();
        this.currentLookMonth = new Date();
    }

    public exportCalendar(id: string, mode = 0) {
        const box = new Div('calendar_wrapper', true, 'grid');
        box.innerHtml = '';
        const weekdays = Calendar.weekdayName.map((el) => `<div class="cell weekday-title">${el}</div>`);
        let data: CalendarData[];
        switch (mode) {
            case 1: data = this.getLastMonth(); break;
            case 2: data = this.getNextMonth(); break;
            default: data = this.getThisMonth();
        }
        //const data = this.getThisMonth();
        weekdays.push(...data.map((el) => `<div class="cell ${el.className}">${el.day}</div>`));
        const title = new Span('calendar_title_month', this.getCurrentMonthStr());
        box.innerHtml = weekdays.join('');
    }


}

interface CalendarData {
    day: number;
    className: string;
}