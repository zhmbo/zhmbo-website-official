var secretAvailability = true;
var APP_ID = "zpnBDHzP0jlcCYvmsyVjauAR-9Nh9j0Va";
var APP_KEY = "3lQcvLWSf6qG3ta8oCNwNnwk";

function secret() {
  if (secretAvailability == true) {
    setTimeout(function () {
      var input = $(".template[data-template=secret] .field").find(
        "input, textarea"
      );

      input.focus();
      Identity.robot();
    }, Identity.duration * 1.25);
  }

  AV.init({
    appId: APP_ID,
    appKey: APP_KEY,
    serverURL: "https://zpnbdhzp.lc-cn-e1-shared.com",
  });

  var query = new AV.Query('Message') //.find().then(fn1.fn2) 如果成功了调用then的第一个参数，失败了调用第二个参数
  query.find().then(function (messages) {

    console.log("获取成功", messages);
    array = messages.map(function (message) {
      return message.attributes
    })
    $(document).ready(function () {
      for (var j = array.length - 1; j > -1; j--) {
        message = array[j];
        var template = $(".template[data-template=secret]")

        var div = template.find('.div');
        var msgP = $("<p></p>").text(message.message); // 以 jQuery 创建新元素
        // msgP.display = none;
        div.append(msgP); // 追加新元素
      }
    })

  }, function (error) {
    console.log("获取失败", error);
  });
}