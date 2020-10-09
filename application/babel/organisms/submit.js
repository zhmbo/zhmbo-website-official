var Submit = {

  //  DATA
  data: function (template, fields) {
    var data = {}
    for (i = 0; i < fields.length; i++) {
      var field = $(fields[i])
      var name = field.attr('name')
      var value = field.val().replace(/(?:\r\n|\r|\n)/g, '<br>')
      data[name] = value
    }

    return data
  },

  //  PUSH
  push: function (form) {
    var template = $('.template[data-template=' + form + ']')
    var fields = template.find('.field input, .field textarea')

    //  WAITING
    Submit.view('[data-status=waiting]', template)

    // 获取留言
    var message = Submit.data(template, fields)["secret"];

    Server.save(message).then(
      function (object) {
        // 成功保存之后，执行其他逻辑
        Submit.callback('success', form, template, fields)
        console.log("保存成功。objectId：" + object.id);
      },
      function (error) {
        // 保存失败之后，执行其他逻辑
        Submit.callback('error', form, template, fields)
        console.log("保存失败。error：" + error);
      }
    )


    //  AJAX
    // $.ajax({
    //   type: 'POST',
    //   url: 'includes/php/' + form + '.php',
    //   data: {
    //     dd: JSON.stringify(Submit.data(template, fields))
    //   },
    //   dataType: 'json',
    //   error: function (XMLHttpRequest, textStatus, errorThrown) {
    //     Submit.callback('error', form, template, fields)
    //   },
    //   success: function (data) {
    //     Submit.callback('success', form, template, fields)
    //   }
    // })
  },

  //  CALLBACK
  callback: function (status, form, template, fields) {
    setTimeout(function () {

      //  SUCCESS
      if (status == 'success') {
        template.find('.form .status').removeClass('current')
        fields.closest('.field').fadeOut(700)
        fields.closest('.form').find('.submit').fadeOut(700)
        Identity.stop()

        if (form == 'secret') secretAvailability = false

        setTimeout(function () {
          fields.closest('.form').find('.submit').remove()
          fields.closest('.field').remove()
          template.find('.form .status[data-status=success]').addClass('current')


          var message = Submit.data(template, fields)["secret"];
          var systeminfo = System.getOS() + '-' + System.getBrowser();

          var div = template.find('.div');
          var titP = $("<p style='font-size:12px;color:#00897B;'></p>").text(returnCitySN.cname + '-' + systeminfo);
          var msgP = "<p style='font-size:10px;color:#FFF176'>" + message + "</p>";
          div.prepend(titP); // 追加新元素
          titP.append(msgP);
        }, 750)
      }

      //  ERROR
      else {
        Submit.view('[data-status=error]', template)
        setTimeout(function () {
          Submit.view(':not([data-status])', template)
        }, 6000)
      }
    }, 4000)
  },

  //	VIEW
  view: function (selector, template) {
    template.find('.form .status').removeClass('current')
    template.find('.form .status' + selector).addClass('current')
  },

  //	LISTEN
  listen: function (selector) {
    $(selector).on('click', function (e) {
      if ($(this).closest('.form').hasClass('validated')) {
        var form = $(this).attr('data-form')
        Submit.push(form)
      }

      e.preventDefault()
    })
  }
}