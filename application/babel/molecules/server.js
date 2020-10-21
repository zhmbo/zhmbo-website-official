var Server = {
    APP_ID: "eMrMn2lz8USHXk6QzJlzjpW5-MdYXbMMI",
    APP_KEY: "Bnu0GIzABXuyooNNUDXcTg47",
    SERVER_URL: "https://lc-official.itzhangbao.com",
    init: function () {
        AV.init({
            appId: Server.APP_ID,
            appKey: Server.APP_KEY,
            serverURL: Server.SERVER_URL,
        });
    },

    save: function (message) {
        // 声明 class
        const Todo = AV.Object.extend('secret');
        // 构建对象
        const todo = new Todo();
        // 为属性赋值
        systeminfo = System.getOS() + '-' + System.getBrowser();
        todo.set('city', returnCitySN.cname)
        todo.set('cip', returnCitySN.cip);
        todo.set('os_info', systeminfo);
        todo.set('message', message);
        // 将对象保存到云端
        return todo.save();
    },

    query: function () {
        var query = new AV.Query('secret') //.find().then(fn1.fn2) 如果成功了调用then的第一个参数，失败了调用第二个参数
        return query.find();
    },

}