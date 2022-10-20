class CalendarV {
    public constructor() {
        this.isAttaching = false;
    }
    private isAttaching: boolean;
    private instance?: HTMLDivElement | undefined;
    public attach(htmlId: string) {
        this.instance = document.getElementById(htmlId) as HTMLDivElement;
        if (this.instance) {
            this.isAttaching = true;
        }
    }

    public setCalendarView() {
        if(this.isAttaching) {
            const today = new Date();
            const title = `${today.getFullYear()}年${today.getMonth() + 1}月`;
            this.instance!.innerHTML = `${this.genHeadHtml(title)}\n${this.genWeekNameHtml()}\n${this.genCalendarHtml()}`;
        }
    }

    public static readonly weekName = ['一', '二', '三', '四', '五', '六', '日'];

    public static isLeapYear(year: number): boolean {
        if (year % 4 == 0 && year % 100 != 0) {
            return true;
        }
        else if (year % 400 == 0 && year % 3200 != 0) {
            return true;
        }
        else if (year % 3200 == 0 && year % 172800 == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    private genHeadHtml(title: string) {
        return `<span class="calendar-head">${title}</span>`;
    }

    private genWeekNameHtml() {
        let items = CalendarV.weekName.map(e => `<span>${e}</span>`);
        return `<div class="calendar-weekname">${items.join('\n')}</div>`;
    }

    private genCalendarHtml() {
        const today = new Date();
        const res: string[] = [];
        
        let lastMonth = new Date();
        lastMonth.setHours(0);
        lastMonth.setMinutes(0);
        lastMonth.setDate(1);
        let lastMonthDays = lastMonth.getDay() - 1;
        if (lastMonthDays < 0) {
            lastMonthDays = 6;
        }
        lastMonth = new Date(lastMonth.getTime() - 3600 * 1000);
        for (let i = 0; i < lastMonthDays; i++) {
            res.push(`<span class="other">${lastMonth.getDate() - lastMonthDays + i + 1}</span>`);
        }
        const daysOfMonth = [31, CalendarV.isLeapYear(today.getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let daysofmon = daysOfMonth[today.getMonth()];
        for (let i = 1; i <= daysofmon; i++) {
            if(i == today.getDate()) {
                res.push(`<span class="today">${i}</span>`);
            }
            else {
                res.push(`<span>${i}</span>`);
            }
        }
        const remainder = 42 - res.length;
        for (let i = 1; i <= remainder; i++) {
            res.push(`<span class="other">${i}</span>`);
        }
        let result: string[] = [];
        for (let i = 0; i < 6; i++) {
            result.push(`<div class="calendar-weeks">${res.slice(i * 7, i * 7 + 7).join('\n')}</div>`);
        }
        return result.join('\n');
    }
}

const calendar = new CalendarV();
calendar.attach('calendar');
calendar.setCalendarView();

