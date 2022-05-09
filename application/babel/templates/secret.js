var secretAvailability = true;

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

  // if ($('.wrapper') == 'secret') return;

  Server.init();

  Server.query().then(function (secret) {
    console.log("获取成功", secret);
    array = secret.map(function (data) {
      return data.attributes
    })
    $(document).ready(function () {
      var template = $(".template[data-template=secret]")
      var div = template.find('.div');
      div.empty();
      for (var j = array.length - 1; j > -1; j--) {
        secret = array[j];
        var titP = $("<p style='font-size:12px;color:#00897B;'></p>").text(secret.city + '-' + secret.os_info);
        var msgP = "<p style='font-size:10px;color:#FFF176'>" + secret.message + "</p>";
        div.append(titP); // 追加新元素
        titP.append(msgP);
      }
    })
  }, function (error) {
    console.log("获取失败", error);
  });
}