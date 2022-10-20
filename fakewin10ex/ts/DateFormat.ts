export default class DateFormat {
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
                    fmt = fmt.replace(tReg, `00${o[k]}`.substr(`${o[k]}`.length));
                }
            }
        }
        return fmt;
    }
}

interface StringKeyJson {
    [key: string]: number;
}