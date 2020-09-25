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
    var lastupdate = new Date(strtime)
    // 将时间转换为date
    var date = getLocalTime(8, lastupdate)

    console.log(date)
    // 
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    $(update_time).text(Y + M + D + h + m + s)


    // console.log("*******************东区时间************************************");
    // console.log("零时区-伦敦时间：" + getLocalTime(0));
    // console.log("东一区-柏林时间：" + getLocalTime(1));
    // console.log("东二区-雅典时间：" + getLocalTime(2));
    // console.log("东三区-莫斯科时间：" + getLocalTime(3));
    // console.log("东四区-时间：" + getLocalTime(4));
    // console.log("东五区-伊斯兰堡时间：" + getLocalTime(5));
    // console.log("东六区-科伦坡时间：" + getLocalTime(6));
    // console.log("东七区-曼谷时间：" + getLocalTime(7));
    // console.log("东八区-北京时间：" + getLocalTime(8));
    // console.log("东九区-东京时间：" + getLocalTime(9));
    // console.log("东十区-悉尼时间：" + getLocalTime(10));
    // console.log("东十二区-斐济时间：" + getLocalTime(12));
    // console.log("*******************西区时间************************************");
    // console.log("西十区-斐济时间：" + getLocalTime(-10));
    // console.log("西九区-阿拉斯加时间：" + getLocalTime(-9));
    // console.log("西八区-太平洋时间（美国和加拿大）：" + getLocalTime(-8));
    // console.log("西七区-山地时间（美国和加拿大）：" + getLocalTime(-7));
    // console.log("西六区-中部时间（美国和加拿大）：" + getLocalTime(-6));
    // console.log("西五区-东部时间（美国和加拿大）：" + getLocalTime(-5));
    // console.log("西四区-大西洋时间（加拿大）：" + getLocalTime(-4));
    // console.log("西三区-巴西利亚时间：" + getLocalTime(-3));
}

// 得到标准时区的时间的函数
function getLocalTime(i, date) {

    // if (date) {
    console.log('date been is ', date)
    // }

    //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
    if (typeof i !== 'number') return;
    var d = date ? date : new Date();

    //得到1970年一月一日到现在的秒数
    var len = d.getTime();

    //本地时间与GMT时间的时间偏移差
    var offset = d.getTimezoneOffset() * 60000;

    //得到现在的格林尼治时间
    var utcTime = len + offset;

    return new Date(utcTime + 3600000 * i);
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