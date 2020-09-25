function home() {
    // running
    var running_time = $('.template[data-template=home] running_time')
    var runtimeFunc = function () {
        // 2020-09-23 00:00:00 毫秒时间戳 = 1600790400000
        $(running_time).text(get_time_diff('1600790400000'))
        setTimeout(runtimeFunc, 1000)
    }
    runtimeFunc()

    // update
    // 获取控件
    var update_time = $('.template[data-template=home] update_time')
    // 获取文件最后修改时间
    var strtime = document.lastModified
    // 将时间转换为date
    var date = new Date(strtime)
    // 转换时间戳后加 8个小时，github actions的运行环境存在8小时差
    // var time8 = date.getTime() + 28800000
    // 时间戳转日期格式
    // var date8 = new Date(time8)
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    console.log(Y + M + D + h + m + s); //呀麻碟
    $(update_time).text(Y + M + D + h + m + s)
}

/**
 * JS获取距当前时间差
 * 
 * @param int time JS毫秒时间戳
 *
 */
function get_time_diff(time) {
    var diff = '';
    var time_diff = new Date().getTime() - time;
    // 计算相差天数  
    var days = Math.floor(time_diff / (24 * 3600 * 1000));
    if (days > 0) {
        diff += days + 'd.';
    }
    // 计算相差小时数  
    var leave1 = time_diff % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours > 0) {
        diff += hours + 'h.';
    } else {
        if (diff !== '') {
            diff += hours + 'h.';
        }
    }
    // 计算相差分钟数  
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes > 0) {
        diff += minutes + 'm.';
    } else {
        if (diff !== '') {
            diff += minutes + 'm.';
        }
    }
    // 计算相差秒数  
    var leave3 = leave2 % (60 * 1000);
    var seconds = Math.round(leave3 / 1000);
    if (seconds > 0) {
        diff += seconds + 's.';
    } else {
        if (diff !== '') {
            diff += seconds + 's.';
        }
    }

    return diff;
}