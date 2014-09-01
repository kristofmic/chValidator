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
    messages.passwordLength = 'Password must be between 8 and 20 characters in length';
    messages.url = 'Please enter a valid url starting with http://';
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

      function get(type) {
        return messages[type];
      }

    }


  }

})(angular);