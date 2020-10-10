var upTime = '2020-10-10 19:12:30'

function home() {
    // running
    var running_time = $(".template[data-template=home] running_time");
    var runtimeFunc = function () {
        // 2020-09-23 00:00:00 毫秒时间戳 = 1600790400000
        $(running_time).text(get_time_diff("1600790400000"));
        setTimeout(runtimeFunc, 1000);
    };
    runtimeFunc();

    // update
    var update_time = $(".template[data-template=home] update_time");
    $(update_time).text(upTime);
}

/**
 * JS获取距当前时间差
 *
 * @param int time JS毫秒时间戳
 *
 */
function get_time_diff(time) {
    var diff = "";
    var time_diff = new Date().getTime() - time;
    // 计算相差天数
    var days = Math.floor(time_diff / (24 * 3600 * 1000));
    if (days > 0) {
        diff += days + "d.";
    }
    // 计算相差小时数
    var leave1 = time_diff % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours > 0) {
        diff += hours + "h.";
    } else {
        if (diff !== "") {
            diff += hours + "h.";
        }
    }
    // 计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes > 0) {
        diff += minutes + "m.";
    } else {
        if (diff !== "") {
            diff += minutes + "m.";
        }
    }
    // 计算相差秒数
    var leave3 = leave2 % (60 * 1000);
    var seconds = Math.round(leave3 / 1000);
    if (seconds > 0) {
        diff += seconds + "s.";
    } else {
        if (diff !== "") {
            diff += seconds + "s.";
        }
    }

    return diff;
}

// 得到标准时区的时间的函数
function getLocalTime(i, date) {
    //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
    if (typeof i !== "number") return;
    var d = date ? date : new Date();

    //得到1970年一月一日到现在的秒数
    var len = d.getTime();

    //本地时间与GMT时间的时间偏移差
    var offset = d.getTimezoneOffset() * 60000;

    //得到现在的格林尼治时间
    var utcTime = len + offset;

    return new Date(utcTime + 3600000 * i);
}
