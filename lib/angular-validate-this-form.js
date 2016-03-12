(function () {
    angular.module('angularValidateThisForm', ['ngMessages']);
    angular.module('angularValidateThisForm').directive('validateThisForm', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {

                var formName = attrs.name;

                // track form items throught their the property they're binding to
                var formItemsProcessed = [];

                //// focus first input element
                //var firstInput = elem[0].querySelector('input');
                //if (firstInput)firstInput.focus();

                var elementsToIterateOver = $(elem).find('[required], [type=number], [type=email], [type=date]');

                for (var i = 0; i < elementsToIterateOver.length; i++) {

                    var element = elementsToIterateOver[i];

                    (function (element) {

                        scope.foo = $(element).attr('min');
                        // get the name attribute of this element
                        scope.elementName = $(element).attr('name');
                        scope.propertyBindingTo = $(element).attr('ng-model');

                        // get the .form-group div containing the input element
                        var parentFormGroup = $(element).parents('.form-group');

                        // compile the ng-messages directive
                        var ngMessagesHTML =
                            '<div class="help-block" ' +
                            'ng-messages="' + formName + '.' + scope.elementName + '.$error" ' +
                                //'ng-if="' + formName + '.' + '$submitted" ' +
                            'ng-show="' + formName + '.' + scope.elementName + '.$dirty || ' + formName + '.' + scope.elementName + '.$invalid"' +
                            '>' +
                            '<p ng-message="required" class="my-messages" >This field is required</p>' +
                            '<p ng-message="number">Invalid number.</p>' +
                            '<p ng-message="min">This number needs to be larger.</p>' +
                            '<p ng-message="max">This number needs to be smaller.</p>' +
                            '<p ng-message="minlength">This field is too short</p>' +
                            '<p ng-message="maxlength">This field is too long</p>' +
                            '<p ng-message="required">This field is required</p>' +
                            '<p ng-message="email">This needs to be a valid email</p>' +
                            '<p ng-message="minDate">End date cant be lower than start date</p>' +
                            '<p ng-message="maxDate">Start date cant be higher than End date</p>' +
                            '<p ng-message="date">This needs to be a valid date</p>' +
                            '<p ng-message="pattern">Must be a whole number</p>' +
                            '</div>';
                        var ngMessagesElement = $compile(ngMessagesHTML)(scope);

                        // append it to the DOM
                        // take a decision on where to append it according to its type
                        var formInputType = $(element).attr('type') ? $(element).attr('type').toLowerCase() : $(element);

                        // if it's of type text, number or date
                        if (['text', 'number', 'date', 'password', 'email'].indexOf(formInputType) >= 0) {
                            // attach it to the first parent div
                            $(element).parents('div:first').append(ngMessagesElement);
                            formItemsProcessed.push(scope.propertyBindingTo);
                        } else
                        // if it's of type select
                        if (element.localName == 'select') {
                            $(element).parent().append(ngMessagesElement);
                            formItemsProcessed.push(scope.propertyBindingTo);
                        } else
                        // if it's of type textarea
                        if (element.localName == 'textarea') {
                            $(element).parent().append(ngMessagesElement);
                            formItemsProcessed.push(scope.propertyBindingTo);
                        } else
                        // if it's of type radio
                        if ($(element).attr('type') == 'radio') {
                            // don't append duplicate ng-messages in case of radio buttons
                            if (formItemsProcessed.indexOf(scope.propertyBindingTo) < 0) {
                                if ($(element).parents('.radio-inline')) {
                                    $(element).parents('div:not(.radio-inline):first').append(ngMessagesElement);
                                    formItemsProcessed.push(scope.propertyBindingTo);
                                }
                                else if ($(element).parents('.radio')) {
                                    $(element).parents('div:not(.radio):first').append(ngMessagesElement);
                                    formItemsProcessed.push(scope.propertyBindingTo);
                                }
                            }
                        } else
                        // if it's of type ui-select
                        if (element.localName == 'ui-select') {
                            $(element).parent().append(ngMessagesElement);
                            formItemsProcessed.push(scope.propertyBindingTo);
                        } else
                        // if it's of type datepicker
                        if (element.localName == 'uib-datepicker-popup' || $(element).attr('uib-datepicker-popup')) {
                            $(element).parent().append(ngMessagesElement);
                            formItemsProcessed.push(scope.propertyBindingTo);
                        }

                        // if it's of type datepicker
                        if (element.localName == 'uib-timepicker') {
                            $(element).parent().append(ngMessagesElement);
                            formItemsProcessed.push(scope.propertyBindingTo);
                        }

                        // watch form item's validity and add bootstrap error class to the parent form-group div accordingly
                        scope.$watch(formName + '.' + scope.elementName + '.$valid', function (formItemIsValid) {

                            if (parentFormGroup) {
                                if (formItemIsValid) {
                                    parentFormGroup.removeClass('has-error')
                                } else {
                                    parentFormGroup.addClass('has-error')
                                }
                            }
                        });

                    })(element);

                }
                // set up event handler on the form element
                elem.on('submit', function () {
                    // find the first invalid element
                    var firstInvalid = elem[0].querySelector('.ng-invalid');
                    // if we find one, set focus
                    if (firstInvalid) {
                        // if it's a ui-select, open it
                        if (firstInvalid.classList.contains('ui-select-container')) {
                            // get the ui select controller
                            var uiSelect = angular.element(firstInvalid).controller('uiSelect');
                            uiSelect.activate();
                            // scroll to it
                            $(firstInvalid).parents('.form-group').find('label').focus()
                        } else {
                            // focus on the input
                            firstInvalid.focus();
                        }
                    }
                });
            },
        };
    });
})();
