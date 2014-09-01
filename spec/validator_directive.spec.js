describe('chValidator directive:', function() {

  var
    scope,
    rootScope,
    formElement,
    inputElement,
    validator,
    VALIDATION_EVENT,
    VALIDATION_ERROR;

  beforeEach(module('ch.Validator'));


  beforeEach(inject(function($rootScope, $compile, $injector) {
    VALIDATION_EVENT = $injector.get('VALIDATION_EVENT');
    VALIDATION_ERROR = $injector.get('VALIDATION_ERROR');
    validator = $injector.get('validator');

    scope = $rootScope.$new();
    rootScope = $rootScope;

    formElement = angular.element('<form name="myForm">' +
                                  '<input type="text" name="foobar" ng-model="foobar" ch-validator="required minLength:3 maxLength:10 confirm:baz" />' +
                                  '<input type="text" name="baz" ng-mode="baz"/>' +
                                  '</form>');

    $compile(formElement)(scope);

    scope.$digest();

    inputElement = angular.element(formElement.children()[0]);
  }));

  it('should exist', function() {
    expect(formElement).to.not.be.undefined;
    expect(inputElement).to.not.be.undefined;
  });

  describe('attribute parsing', function() {
    describe('minLength', function() {
      it('should pull out the length argument', function() {
        validator.minLength = sinon.spy();
        scope.foobar = 'blah';
        scope.$digest();
        inputElement.triggerHandler('blur');

        expect(validator.minLength.calledWith('blah', '3')).to.be.true;
      });
    });

    describe('maxLength', function() {
      it('should pull out the length argument', function() {
        validator.maxLength = sinon.spy();
        scope.foobar = 'blah';
        scope.$digest();
        inputElement.triggerHandler('blur');

        expect(validator.maxLength.calledWith('blah', '10')).to.be.true;
      });
    });

    describe('confirm', function() {
      it('should pull out the scope model argument', function() {
        validator.confirm = sinon.spy();
        scope.baz = 'baz';
        scope.foobar = 'blah';
        scope.$digest();
        inputElement.triggerHandler('blur');

        expect(validator.confirm.calledWith('blah', 'baz')).to.be.true;
      });
    });
  });

  describe('setting validity', function() {
    it('should set the validity to false if the field is invalid', function() {
      inputElement.triggerHandler('blur');

      expect(scope.myForm.foobar.$invalid).to.be.true;
      expect(scope.myForm.foobar.$error[VALIDATION_ERROR['REQUIRED']]).to.be.true;
    });

    it('should set the validity to true if the field is valid', function() {
      scope.foobar = 'blah';
      scope.baz = 'blah';
      scope.$digest();
      inputElement.triggerHandler('keyup');

      expect(scope.myForm.foobar.$valid).to.be.true;
      expect(scope.myForm.foobar.$error[VALIDATION_ERROR['REQUIRED']]).to.be.false;
    });
  });

  describe('field decoration', function(){
    it('should set an error element after the input field if the field is invalid', function() {
      inputElement.triggerHandler('blur');

      expect(inputElement.next().prop('tagName')).to.equal('P');
    });

    it('should clear the error element after the input field if the field is valid', function() {
      inputElement.triggerHandler('blur');

      expect(inputElement.next().prop('tagName')).to.equal('P');

      scope.foobar = 'blah';
      scope.baz = 'blah';
      scope.$digest();

      inputElement.triggerHandler('blur');

      expect(inputElement.next().prop('tagName')).to.not.equal('P');
    });
  });

  describe('trigger events', function() {
    it('should validate on the VALIDATION_EVENT.VALIDATE event', function() {
      rootScope.$broadcast(VALIDATION_EVENT.VALIDATE);

      expect(scope.myForm.foobar.$invalid).to.be.true;
      expect(scope.myForm.foobar.$error[VALIDATION_ERROR['REQUIRED']]).to.be.true;
      expect(inputElement.next().prop('tagName')).to.equal('P');
    });
  });

});