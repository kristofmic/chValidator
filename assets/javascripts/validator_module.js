(function(angular) {

  var
    dependencies;

  dependencies = [

  ];

  angular.module('ch.Validator', dependencies)
    .constant('VALIDATION_TYPE', {
      DIGITS: 'digits',
      TEXT: 'text',
      REQUIRED: 'required',
      EMAIL: 'email',
      PASSWORD: 'password',
      MINLENGTH: 'minLength',
      MAXLENGTH: 'maxLength',
      URL: 'url',
      PHONE: 'phone',
      CONFIRM: 'confirm'
    })
    .constant('VALIDATION_ERROR', {
      DIGITS: 'chDigits',
      TEXT: 'chText',
      REQUIRED: 'chRequired',
      EMAIL: 'chEmail',
      PASSWORD: 'chPassword',
      MINLENGTH: 'chMinLength',
      MAXLENGTH: 'chMaxLength',
      URL: 'chUrl',
      PHONE: 'chPhone',
      CONFIRM: 'chConfirm'
    })
    .constant('VALIDATION_EVENT', {
      VALIDATE: 'VALIDATE'
    });

})(angular);