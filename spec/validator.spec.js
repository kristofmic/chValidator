describe('validator', function() {

  var
    service,
    VALIDATION_TYPE;

  beforeEach(module('ch.Validator'));

  beforeEach(inject(function($injector) {
    VALIDATION_TYPE = $injector.get('VALIDATION_TYPE');

    service = $injector.get('validator');
  }));

  it('should exist', function() {
    expect(service).to.not.be.undefined;
  });

  describe('validateDigits()', function() {
    var
      validNum = 13423,
      validString = '134544',
      invalid = '1343b3';

    it('should return true for a valid set of digits', function(){
      expect(service.digits(validNum)).to.be.true;
      expect(service.digits(validString)).to.be.true;
    });

    it('should return false for an invalid set of digits', function() {
      expect(service.digits(invalid)).to.be.false;
    });
  });

  describe('validateText()', function() {
    var
      valid = 'asdfsdf',
      invalid = 'asdf34dfd';

    it('should return true for a valid set of text', function(){
      expect(service.text(valid)).to.be.true;
    });

    it('should return false for an invalid set of text', function() {
      expect(service.text(invalid)).to.be.false;
    });
  });

  describe('validateRequired()', function() {
    var
      valid = 'asdfsdf',
      invalid = '',
      notDefined;

    it('should return true for a valid set of required', function(){
      expect(service.required(valid)).to.be.true;
    });

    it('should return false for an invalid set of required', function() {
      expect(service.required(invalid)).to.be.false;
      expect(service.required(notDefined)).to.be.false;
    });
  });

  describe('validateEmail()', function() {
    var
      valid = 'ch@foo.com',
      invalid = 'ch',
      invalid2 = 'ch@',
      invalid3 = 'ch@foo';

    it('should return true for a valid set of email', function(){
      expect(service.email(valid)).to.be.true;
    });

    it('should return false for an invalid set of email', function() {
      expect(service.email(invalid)).to.be.false;
      expect(service.email(invalid2)).to.be.false;
      expect(service.email(invalid3)).to.be.false;
    });
  });

  describe('validatePassword()', function() {
    var
      valid = 'Fooobar1',
      valid2 = 'Fooobar!',
      invalidSpecial = 'Fooobarr',
      invalidCap = 'fooobar1!';

    it('should return true for a valid set of password', function(){
      expect(service.password(valid)).to.be.true;
      expect(service.password(valid2)).to.be.true;
    });

    it('should return false for an invalid set of password', function() {
      expect(service.password(invalidSpecial)).to.be.false;
      expect(service.password(invalidCap)).to.be.false;
    });
  });

  describe('validateMinLength()', function() {
    var
      valid = 'Fooobarsd',
      valid2 = 'FoobarFoobarFoobarFo',
      empty = '',
      invalid = 'Foobar7',
      invalid2 = 'F',
      notDefined;

    it('should return true for a valid set of minLength', function(){
      expect(service.minLength(valid, 8)).to.be.true;
      expect(service.minLength(valid2, '10')).to.be.true;
    });

    it('should return false for an invalid set of minLength', function() {
      expect(service.minLength(empty, 0)).to.be.false;
      expect(service.minLength(invalid, 8)).to.be.false;
      expect(service.minLength(invalid2, '2')).to.be.false;
      expect(service.minLength(notDefined, 0)).to.be.false;
    });
  });

  describe('validateMaxLength()', function() {
    var
      valid = 'Fooobarsd',
      valid2 = 'FoobarFoobarFoobarFo',
      empty = '',
      invalid = 'Foobar7',
      invalid2 = 'F',
      notDefined;

    it('should return true for a valid set of maxLength', function(){
      expect(service.maxLength(valid, 9)).to.be.true;
      expect(service.maxLength(valid2, '20')).to.be.true;
    });

    it('should return false for an invalid set of maxLength', function() {
      expect(service.maxLength(empty, 0)).to.be.false;
      expect(service.maxLength(invalid, 5)).to.be.false;
      expect(service.maxLength(invalid2, '0')).to.be.false;
      expect(service.maxLength(notDefined, 0)).to.be.false;
    });
  });

  describe('validateUrl()', function() {
    var
      valid = 'http://www.foobar.com',
      valid2 = 'http://foobar.com',
      invalid = 'www.foobar.com',
      invalid2 = 'foobar.com';

    it('should return true for a valid set of url', function(){
      expect(service.url(valid)).to.be.true;
      expect(service.url(valid2)).to.be.true;
    });

    it('should return false for an invalid set of url', function() {
      expect(service.url(invalid)).to.be.false;
      expect(service.url(invalid2)).to.be.false;
    });
  });

  describe('validatePhone()', function() {
    var
      valid = '2123423',
      valid2 = '234.3344.23432',
      valid3 = '234-342-2344',
      empty = '',
      invalid = '23234w',
      invalid2 = '+223434';

    it('should return true for a valid set of phone number', function(){
      expect(service.phone(valid)).to.be.true;
      expect(service.phone(valid2)).to.be.true;
      expect(service.phone(valid3)).to.be.true;
    });

    it('should return false for an invalid set of phone number', function() {
      expect(service.phone(invalid)).to.be.false;
      expect(service.phone(invalid2)).to.be.false;
    });
  });

  describe('validateConfirm()', function() {
    var
      valid = 'foobar',
      valid2 = 'foobar',
      empty = '',
      invalid = '12',
      invalid2 = '+2a',
      notDefined;

    it('should return true for a valid set of confirm', function(){
      expect(service.confirm(valid, valid2)).to.be.true;
      expect(service.confirm(empty, empty)).to.be.true;
      expect(service.confirm(notDefined, notDefined)).to.be.true;
      expect(service.confirm(empty, notDefined)).to.be.true;
    });

    it('should return false for an invalid set of confirm', function() {
      expect(service.confirm(empty, invalid)).to.be.false;
      expect(service.confirm(invalid, invalid2)).to.be.false;
      expect(service.confirm(invalid, notDefined)).to.be.false;
    });
  });

});