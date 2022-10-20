"use strict";
class CalendarV {
    constructor() {
        this.isAttaching = false;
    }
    attach(htmlId) {
        this.instance = document.getElementById(htmlId);
        if (this.instance) {
            this.isAttaching = true;
        }
    }
    setCalendarView() {
        if (this.isAttaching) {
            const today = new Date();
            const title = `${today.getFullYear()}年${today.getMonth() + 1}月`;
            this.instance.innerHTML = `${this.genHeadHtml(title)}\n${this.genWeekNameHtml()}\n${this.genCalendarHtml()}`;
        }
    }
    static isLeapYear(year) {
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
    genHeadHtml(title) {
        return `<span class="calendar-head">${title}</span>`;
    }
    genWeekNameHtml() {
        let items = CalendarV.weekName.map(e => `<span>${e}</span>`);
        return `<div class="calendar-weekname">${items.join('\n')}</div>`;
    }
    genCalendarHtml() {
        const today = new Date();
        const res = [];
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
            if (i == today.getDate()) {
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
        let result = [];
        for (let i = 0; i < 6; i++) {
            result.push(`<div class="calendar-weeks">${res.slice(i * 7, i * 7 + 7).join('\n')}</div>`);
        }
        return result.join('\n');
    }
}
CalendarV.weekName = ['一', '二', '三', '四', '五', '六', '日'];
const calendar = new CalendarV();
calendar.attach('calendar');
calendar.setCalendarView();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sU0FBUztJQUNYO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUdNLE1BQU0sQ0FBQyxNQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQW1CLENBQUM7UUFDbEUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN6QixNQUFNLEtBQUssR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDaEUsSUFBSSxDQUFDLFFBQVMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQztTQUNqSDtJQUNMLENBQUM7SUFJTSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDakMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQztTQUNmO2FBQ0ksSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNmO2FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUM3QyxPQUFPLElBQUksQ0FBQztTQUNmO2FBQ0k7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFTyxXQUFXLENBQUMsS0FBYTtRQUM3QixPQUFPLCtCQUErQixLQUFLLFNBQVMsQ0FBQztJQUN6RCxDQUFDO0lBRU8sZUFBZTtRQUNuQixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3RCxPQUFPLGtDQUFrQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEUsQ0FBQztJQUVPLGVBQWU7UUFDbkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN6QixNQUFNLEdBQUcsR0FBYSxFQUFFLENBQUM7UUFFekIsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMzQixTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksYUFBYSxHQUFHLENBQUMsRUFBRTtZQUNuQixhQUFhLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO1FBQ0QsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDeEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsYUFBYSxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3pGO1FBQ0QsTUFBTSxXQUFXLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEgsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsSUFBRyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9DO2lCQUNJO2dCQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0o7UUFDRCxNQUFNLFNBQVMsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0M7UUFDRCxJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlGO1FBQ0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7O0FBN0RzQixrQkFBUSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFnRTFFLE1BQU0sUUFBUSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7QUFDakMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QixRQUFRLENBQUMsZUFBZSxFQUFFLENBQUMifQ==