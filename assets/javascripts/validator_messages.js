(function(angular) {

  angular.module('ch.Validator')
    .provider('validatorMessages', validatorMessagesProvider);

  function validatorMessagesProvider() {
    var
      messages = {},
      definitions;

    messages.digits = 'Please only enter numbers';
    messages.text = 'Please only enter letters';
    messages.required = 'This field is required';
    messages.email = 'Please enter a valid email';
    messages.password = 'Password must contain a number, a lowercase letter, and an uppercase letter';
    messages.minLength = 'Field must be greater than {{n}} characters in length';
    messages.maxLength = 'Field must be less than {{n}} characters in length';
    messages.url = 'Please enter a valid url starting with http:// or https://';
    messages.phone = 'Please enter a valid phone number';
    messages.confirm = 'Fields do not match';

    definitions = [
      validatorMessagesFactory
    ];

    return {
      setMessage: setMessage,
      setMessages: setMessages,
      $get: definitions
    };

    function setMessage(type, message) {
      if (messages[type]) {
        messages[type] = message;
      }
    }

    function setMessages(config) {
      for (var i in config) {
        setMessage(i, config[i]);
      }
    }

    function validatorMessagesFactory() {

      return {
        get: get
      };

      function get(type, config) {
        var
          msg = messages[type];

        if (config && angular.isObject(config)) {
          angular.forEach(config, interpolateMessage);
        }

        return msg;

        function interpolateMessage(val, key) {
          msg = msg.replace(new RegExp('{{' + key + '}}', 'g'), val);
        }
      }

    }


  }

})(angular);