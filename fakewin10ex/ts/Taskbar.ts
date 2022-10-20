import Button from "./Button";
import Div from "./Div";
import Span from './Span';
import DateFormat from "./DateFormat";
import Calendar from "./Calendar";

export default class Taskbar {
    public constructor() {
        this.startMenu = new Div('start_menu', false, 'block');
        this.startButton = new Button('start_btn', '', () => {
            this.startMenu.toggleVisiable();
        });
        this.calendarWrapper = new Div('calendar', false, 'block');
        this.calendarButton = new Button('date_area', '<nope>', () => {
            this.calendarWrapper.toggleVisiable();
            console.log('cl');
        });
        this.dateSpan = new Span('date', '2022/1/9');
        this.timeSpan = new Span('time', '00:00:00');
        this.calendarTimeSpan = new Span('calendar_time', '00:00:00');
        this.calendarDateSpan = new Span('calendar_date', '2022年1月9日');
        this.startClock();
        this.calendar = new Calendar(new Date());
        this.initCalendar();
        this.calendarNextButton = new Button('button_down', '<nope>', () => {
            this.calendar.exportCalendar('calendar_wrapper', 2);
        });
        this.calendarLastButton = new Button('button_up', '<nope>', () => {
            this.calendar.exportCalendar('calendar_wrapper', 1);
        });
    }

    private startButton: Button;
    private startMenu: Div;
    private calendarButton: Button;
    private calendarWrapper: Div;
    private dateSpan: Span;
    private timeSpan: Span;
    private calendarTimeSpan: Span;
    private calendarDateSpan: Span;
    private calendar: Calendar;
    private calendarLastButton: Button;
    private calendarNextButton: Button;
    public clockSync() {
        const now = new Date();
        this.dateSpan.text = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
        this.timeSpan.text = DateFormat.Format(now, 'hh:mm:ss');
    }

    public startClock() {
        let tmp = setInterval(() => {
            const now = new Date();
            this.dateSpan.text = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
            let time = DateFormat.Format(now, 'hh:mm:ss');
            this.timeSpan.text = time;
            this.calendarTimeSpan.text = time;
            this.calendarDateSpan.text = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
        }, 1000);
    }

    private initCalendar() {
        this.calendar.exportCalendar('calendar_wrapper');
    }

}