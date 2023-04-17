// 获取当前时间格式化
function GetCurrentTime() {
    const week = new Array(
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
    );
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    return {
        Today: year +
            '.' +
            (month < 10 ? '0' + month : month) +
            '.' +
            (day < 10 ? '0' + day : day) + //202.08.08修复日期天数小于10时添加0
            '' +
            ' ' +
            (hour < 10 ? '0' + hour : hour) +
            ':' +
            (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (second < 10 ? '0' + second : second),
        Week: (week[date.getDay() - 1] || week[6]),
        WeekIndex: week.indexOf((week[date.getDay() - 1] || week[6])) + 1
    }
}

export { GetCurrentTime }