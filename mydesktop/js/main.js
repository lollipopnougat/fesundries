"use strict";
class DateFormat {
    static Format(date, fmt) {
        const o = {
            'y+': date.getFullYear(),
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
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
                }
                else {
                    fmt = fmt.replace(tReg, `00${o[k]}`.substring(`${o[k]}`.length));
                }
            }
        }
        return fmt;
    }
}
const timeDate = document.querySelector('.time-date');
const logo = document.querySelector('.logo');
const slogan = document.querySelector('.slogan');
const batteryCharge = document.querySelector('.battery-charge');
const batteryLevel = document.querySelector('.battery-level');
const battery = document.querySelector('.battery');
// const color_scheme = document.querySelector('.color-scheme') as HTMLImageElement;
const header = document.querySelector('header');
const colorSwitcher = document.querySelector('.color-scheme-box');
const broswer = document.querySelector('.broswer');
const addBar = document.querySelector('.address-bar');
const demoWin = document.querySelector('.blank-window');
const launchBar = document.querySelector('.launch-pad');
const controlBar = document.querySelector('.control-bar');
const winTime = document.querySelector('#win_time');
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
function addClassName(ele, className) {
    ele.className = `${ele.className} ${className}`;
}
function removeClassName(ele, className) {
    const array = ele.className.split(' ');
    const res = [];
    for (const i of array) {
        if (i != className && i != '' && i != null) {
            res.push(i);
        }
    }
    ele.className = res.join(' ');
}
function lightElement(ele) {
    addClassName(ele, 'light');
}
function darkElement(ele) {
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
    }
    else {
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
        timeDate.children[0].innerText = tim;
        timeDate.children[2].innerText = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
        if (isWinClock) {
            winTime.innerText = tim;
        }
    }, 1000);
    slogan.onclick = () => {
        if (isOpenBroswer) {
            broswer.style.display = 'none';
            slogan.setAttribute('title', '显示博客');
            addBar.style.display = 'none';
        }
        else {
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
        }
        else {
            batteryCharge.style.display = 'none';
            batteryLevel.className = 'battery-level';
        }
        batteryLevel.style.height = `${e.level * 100}%`;
        battery.title = `${e.level * 100}%`;
        batteryLevel.style.top = `${(1 - e.level) * 100}%`;
        if (e.level >= 0.96) {
            batteryLevel.style.borderRadius = `${4 - (1 - e.level) * 100}px ${4 - (1 - e.level) * 100}px 4px 4px`;
        }
        else {
            batteryLevel.style.borderRadius = '0 0 4px 4px';
        }
        e.onchargingchange = (ee) => {
            if (ee.target.charging) {
                batteryCharge.style.display = 'block';
                batteryLevel.className = 'battery-level battery-oncharging';
            }
            else {
                batteryCharge.style.display = 'none';
                batteryLevel.className = 'battery-level';
            }
        };
        e.onlevelchange = (ee) => {
            const manager = ee.target;
            batteryLevel.style.height = `${manager.level * 100}%`;
            batteryLevel.style.top = `${(1 - e.level) * 100}%`;
            battery.title = `${manager.level * 100}%`;
            if (e.level >= 0.96) {
                batteryLevel.style.borderRadius = `${4 - (1 - e.level) * 100}px ${4 - (1 - e.level) * 100}px 4px 4px`;
            }
            else {
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
    launchBar.children[0].onclick = () => {
        if (isOpenBroswer) {
            broswer.style.display = 'none';
            slogan.setAttribute('title', '显示博客');
            addBar.style.display = 'none';
        }
        else {
            broswer.style.display = 'block';
            slogan.setAttribute('title', '关闭博客');
            addBar.style.display = 'block';
        }
        isOpenBroswer = !isOpenBroswer;
    };
    launchBar.children[1].onclick = () => {
        isWinClock = !isWinClock;
    };
    launchBar.children[2].onclick = () => {
        alert('emmm, is null!');
    };
    launchBar.children[4].onclick = () => {
        if (isHideWindow) {
            demoWin.style.display = 'block';
        }
        else {
            demoWin.style.display = 'none';
        }
        isHideWindow = !isHideWindow;
    };
    controlBar.onclick = () => {
        demoWin.style.display = 'none';
        isHideWindow = !isHideWindow;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWdCQSxNQUFNLFVBQVU7SUFDTCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQVUsRUFBRSxHQUFXO1FBQ3hDLE1BQU0sQ0FBQyxHQUFrQjtZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN4QixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7WUFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSTtTQUNqQyxDQUFDO1FBQ0YsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDZixNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtvQkFDWCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUNuQyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN4QixJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7d0JBQ2hCLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUMvQjtvQkFDRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNO29CQUNILEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ3BFO2FBQ0o7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBQ0QsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQW1CLENBQUM7QUFDeEUsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQXFCLENBQUM7QUFDakUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQW9CLENBQUM7QUFDcEUsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBcUIsQ0FBQztBQUNwRixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFxQixDQUFDO0FBQ2xGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFtQixDQUFDO0FBQ3JFLG9GQUFvRjtBQUNwRixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBbUIsQ0FBQztBQUNsRSxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFtQixDQUFDO0FBQ3BGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFzQixDQUFDO0FBQ3hFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFxQixDQUFDO0FBQzFFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFtQixDQUFDO0FBQzFFLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFtQixDQUFDO0FBQzFFLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFtQixDQUFDO0FBQzVFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFtQixDQUFDO0FBQ3RFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztBQUNsQixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDMUIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztBQUN2QixNQUFNLEtBQUssR0FBRztJQUNWLENBQUMsRUFBRSxDQUFDO0lBQ0osQ0FBQyxFQUFFLENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQztJQUNKLENBQUMsRUFBRSxDQUFDO0lBQ0osTUFBTSxFQUFFLEtBQUs7Q0FDaEIsQ0FBQztBQUNGLFNBQVMsWUFBWSxDQUFDLEdBQWdCLEVBQUUsU0FBaUI7SUFDckQsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFLENBQUM7QUFDcEQsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLEdBQWdCLEVBQUUsU0FBaUI7SUFDeEQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsTUFBTSxHQUFHLEdBQWEsRUFBRSxDQUFDO0lBQ3pCLEtBQUksTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDeEMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNmO0tBQ0o7SUFDRCxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLEdBQWdCO0lBQ2xDLFlBQVksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEdBQWdCO0lBQ2pDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELFNBQVMsVUFBVTtJQUNmLElBQUksTUFBTSxFQUFFO1FBQ1IsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QixZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsOEJBQThCO1FBQzlCLGlEQUFpRDtRQUNqRCx1Q0FBdUM7UUFDdkMscUNBQXFDO1FBQ3JDLGlDQUFpQztRQUNqQywwQ0FBMEM7UUFDMUMsc0RBQXNEO1FBQ3RELDBDQUEwQztLQUM3QztTQUFNO1FBQ0gsbUNBQW1DO1FBQ25DLDJDQUEyQztRQUMzQyxpQ0FBaUM7UUFDakMsK0JBQStCO1FBQy9CLDJCQUEyQjtRQUMzQixvQ0FBb0M7UUFDcEMsZ0RBQWdEO1FBQ2hELG9DQUFvQztRQUNwQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMxQjtJQUNELE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNyQixDQUFDO0FBQ0QsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFDakIsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQXFCLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUN6RCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBcUIsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztRQUNwSCxJQUFJLFVBQVUsRUFBRTtZQUNaLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1QsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7UUFDbEIsSUFBSSxhQUFhLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDL0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ2pDO2FBQU07WUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDaEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ2xDO1FBQ0QsYUFBYSxHQUFHLENBQUMsYUFBYSxDQUFDO0lBRW5DLENBQUMsQ0FBQztJQUNGLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUMzQixNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLE9BQU8sRUFBRTtZQUNsQixPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDOUI7UUFDRCxxQkFBcUI7SUFDekIsQ0FBQyxDQUFDO0lBQ0YscUNBQXFDO0lBRXJDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQ25DLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUM5QixJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDWixhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdEMsWUFBWSxDQUFDLFNBQVMsR0FBRyxrQ0FBa0MsQ0FBQztTQUMvRDthQUFNO1lBQ0gsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3JDLFlBQVksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO1NBQzVDO1FBQ0QsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWhELE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ25ELElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO1NBQ3pHO2FBQU07WUFDSCxZQUFZLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUM7U0FDbkQ7UUFDRCxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUN4QixJQUFNLEVBQUUsQ0FBQyxNQUFxQyxDQUFDLFFBQVEsRUFBRTtnQkFDckQsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN0QyxZQUFZLENBQUMsU0FBUyxHQUFHLGtDQUFrQyxDQUFDO2FBQy9EO2lCQUFNO2dCQUNILGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDckMsWUFBWSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7YUFDNUM7UUFDTCxDQUFDLENBQUM7UUFDRixDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDckIsTUFBTSxPQUFPLEdBQUksRUFBRSxDQUFDLE1BQW9DLENBQUM7WUFDekQsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3RELFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25ELE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzFDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ2pCLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQzthQUN6RztpQkFBTTtnQkFDSCxZQUFZLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUM7YUFDbkQ7UUFDTCxDQUFDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN4QixLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDcEIsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUM3QixLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDNUIsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBRUYsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2YsT0FBTztTQUNWO1FBQ0QsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7UUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO0lBRTVDLENBQUMsQ0FBQztJQUVGLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QixLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBb0IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ3JELElBQUksYUFBYSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUNqQzthQUFNO1lBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUNsQztRQUNELGFBQWEsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBb0IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ3JELFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBb0IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ3JELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQztJQUVELFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFvQixDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7UUFDckQsSUFBRyxZQUFZLEVBQUU7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDbkM7YUFBTTtZQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUNsQztRQUNELFlBQVksR0FBRyxDQUFDLFlBQVksQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFFRixVQUFVLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtRQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDL0IsWUFBWSxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQ2pDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyJ9