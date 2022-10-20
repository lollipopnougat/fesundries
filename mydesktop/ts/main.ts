interface StringKeyJson {
    [key: string]: number;
}

interface BatteryManager {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    onchargingchange: (e: Event) => void;
    onlevelchange: (e: Event) => void;
}

declare interface Navigator {
    getBattery: () => Promise<BatteryManager>;
}
class DateFormat {
    public static Format(date: Date, fmt: string): string {
        const o: StringKeyJson = {
            'y+': date.getFullYear(),
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds() //毫秒
        };
        for (const k in o) {
            const tReg = new RegExp(`(${k})`);
            const target = fmt.match(tReg);
            if (target != null) {
                if (k == 'y+') {
                    const targetLen = target[0].length;
                    let yearStr = `${o[k]}`;
                    if (targetLen == 2) {
                        yearStr = yearStr.substr(2);
                    }
                    fmt = fmt.replace(tReg, yearStr);
                } else {
                    fmt = fmt.replace(tReg, `00${o[k]}`.substring(`${o[k]}`.length));
                }
            }
        }
        return fmt;
    }
}
const timeDate = document.querySelector('.time-date') as HTMLDivElement;
const logo = document.querySelector('.logo') as HTMLImageElement;
const slogan = document.querySelector('.slogan') as HTMLSpanElement;
const batteryCharge = document.querySelector('.battery-charge') as HTMLImageElement;
const batteryLevel = document.querySelector('.battery-level') as HTMLImageElement;
const battery = document.querySelector('.battery') as HTMLDivElement;
// const color_scheme = document.querySelector('.color-scheme') as HTMLImageElement;
const header = document.querySelector('header') as HTMLDivElement;
const colorSwitcher = document.querySelector('.color-scheme-box') as HTMLDivElement;
const broswer = document.querySelector('.broswer') as HTMLIFrameElement;
const addBar = document.querySelector('.address-bar') as HTMLInputElement;
const demoWin = document.querySelector('.blank-window') as HTMLDivElement;
const launchBar = document.querySelector('.launch-pad') as HTMLDivElement;
const controlBar = document.querySelector('.control-bar') as HTMLDivElement;
const winTime = document.querySelector('#win_time') as HTMLDivElement;
let isDark = true;
let isOpenBroswer = false;
let isHideWindow = true;
let isWinClock = false;
const point = {
    x: 0,
    y: 0,
    l: 0,
    t: 0,
    isDown: false
};
function addClassName(ele: HTMLElement, className: string) {
    ele.className = `${ele.className} ${className}`;
}
function removeClassName(ele: HTMLElement, className: string) {
    const array = ele.className.split(' ');
    const res: string[] = [];
    for(const i of array) {
        if (i != className && i != '' && i != null) {
            res.push(i);
        }
    }
    ele.className = res.join(' ');
}

function lightElement(ele: HTMLElement) {
    addClassName(ele, 'light');
}

function darkElement(ele: HTMLElement) {
    removeClassName(ele, 'light');
}

function darkSwitch() {
    if (isDark) {
        lightElement(header);
        lightElement(battery);
        lightElement(slogan);
        lightElement(logo);
        lightElement(timeDate);
        lightElement(colorSwitcher);
        lightElement(addBar);
        lightElement(demoWin);
        lightElement(launchBar);
        // header.className = 'light';
        // color_scheme.className = 'color-scheme light';
        // battery.className = 'battery light';
        // slogan.className = 'slogan light';
        // logo.className = 'logo light';
        // timeDate.className = 'time-date light';
        // colorSwitcher.className = 'color-scheme-box light';
        // addBar.className = 'address-bar light';
    } else {
        // header.removeAttribute('class');
        // color_scheme.className = 'color-scheme';
        // battery.className = 'battery';
        // slogan.className = 'slogan';
        // logo.className = 'logo';
        // timeDate.className = 'time-date';
        // colorSwitcher.className = 'color-scheme-box';
        // addBar.className = 'address-bar';
        darkElement(header);
        darkElement(battery);
        darkElement(slogan);
        darkElement(logo);
        darkElement(timeDate);
        darkElement(colorSwitcher);
        darkElement(addBar);
        darkElement(demoWin);
        darkElement(launchBar);
    }
    isDark = !isDark;
}
window.onload = () => {
    setInterval(() => {
        const now = new Date();
        const tim = DateFormat.Format(now, 'hh:mm:ss');
        (timeDate.children[0] as HTMLSpanElement).innerText = tim;
        (timeDate.children[2] as HTMLSpanElement).innerText = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
        if (isWinClock) {
            winTime.innerText = tim;
        }
    }, 1000);
    slogan.onclick = () => {
        if (isOpenBroswer) {
            broswer.style.display = 'none';
            slogan.setAttribute('title', '显示博客');
            addBar.style.display = 'none';
        } else {
            broswer.style.display = 'block';
            slogan.setAttribute('title', '关闭博客');
            addBar.style.display = 'block';
        }
        isOpenBroswer = !isOpenBroswer;

    };
    addBar.value = broswer.src;
    addBar.onkeydown = (e) => {
        if (e.key == 'Enter') {
            broswer.src = addBar.value;
        }
        //console.log(e.key);
    };
    // color_scheme.onclick = darkSwitch;

    colorSwitcher.onclick = darkSwitch;
    navigator.getBattery().then((e) => {
        if (e.charging) {
            batteryCharge.style.display = 'block';
            batteryLevel.className = 'battery-level battery-oncharging';
        } else {
            batteryCharge.style.display = 'none';
            batteryLevel.className = 'battery-level';
        }
        batteryLevel.style.height = `${e.level * 100}%`;

        battery.title = `${e.level * 100}%`;
        batteryLevel.style.top = `${(1 - e.level) * 100}%`;
        if (e.level >= 0.96) {
            batteryLevel.style.borderRadius = `${4 - (1 - e.level) * 100}px ${4 - (1 - e.level) * 100}px 4px 4px`;
        } else {
            batteryLevel.style.borderRadius = '0 0 4px 4px';
        }
        e.onchargingchange = (ee) => {
            if (((ee.target as unknown) as BatteryManager).charging) {
                batteryCharge.style.display = 'block';
                batteryLevel.className = 'battery-level battery-oncharging';
            } else {
                batteryCharge.style.display = 'none';
                batteryLevel.className = 'battery-level';
            }
        };
        e.onlevelchange = (ee) => {
            const manager = (ee.target as unknown) as BatteryManager;
            batteryLevel.style.height = `${manager.level * 100}%`;
            batteryLevel.style.top = `${(1 - e.level) * 100}%`;
            battery.title = `${manager.level * 100}%`;
            if (e.level >= 0.96) {
                batteryLevel.style.borderRadius = `${4 - (1 - e.level) * 100}px ${4 - (1 - e.level) * 100}px 4px 4px`;
            } else {
                batteryLevel.style.borderRadius = '0 0 4px 4px';
            }
        };
    });

    demoWin.onmousedown = (e) => {
        point.x = e.clientX;
        point.y = e.clientY;
        point.l = demoWin.offsetLeft;
        point.t = demoWin.offsetTop;
        point.isDown = true;
    };

    window.onmousemove = (e) => {
        if (!point.isDown) {
            return;
        }
        const dx = e.clientX - point.x;
        const dy = e.clientY - point.y;
        demoWin.style.left = `${point.l + dx}px`;
        demoWin.style.top = `${point.t + dy}px`;

    };

    demoWin.onmouseup = (e) => {
        point.isDown = false;
    };

    (launchBar.children[0] as HTMLDivElement).onclick = () => {
        if (isOpenBroswer) {
            broswer.style.display = 'none';
            slogan.setAttribute('title', '显示博客');
            addBar.style.display = 'none';
        } else {
            broswer.style.display = 'block';
            slogan.setAttribute('title', '关闭博客');
            addBar.style.display = 'block';
        }
        isOpenBroswer = !isOpenBroswer;
    };

    (launchBar.children[1] as HTMLDivElement).onclick = () => {
        isWinClock = !isWinClock;
    };

    (launchBar.children[2] as HTMLDivElement).onclick = () => {
        alert('emmm, is null!');
    };

    (launchBar.children[4] as HTMLDivElement).onclick = () => {
        if(isHideWindow) {
            demoWin.style.display = 'block';
        } else {
            demoWin.style.display = 'none';
        }
        isHideWindow = !isHideWindow;
    };

    controlBar.onclick = () => {
        demoWin.style.display = 'none';
        isHideWindow = !isHideWindow;
    };
};