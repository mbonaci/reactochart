'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.accessor = accessor;
exports.InterfaceMixin = InterfaceMixin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var PropTypes = _react2['default'].PropTypes;
var AccessorPropType = PropTypes.oneOfType(PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.func);

exports.AccessorPropType = AccessorPropType;

function accessor(key) {
    return _lodash2['default'].isFunction(key) ? key : // pass an accessor function...
    _lodash2['default'].isNull(key) || _lodash2['default'].isUndefined(key) ? _lodash2['default'].identity : // or null/undefined to just return the item itself...
    _lodash2['default'].property(key); // or an array index or object key
}

// InterfaceMixin takes a list of string "interfaces"
// and adds a static called implementsInterface to the component that simply checks if an interface is in the list
// This way, a parent component can pass particular props only to children which implement the relevant interface
// by checking child.type.implementsInterface('SomeInterface')
// usage:
// mixins: [InterfaceMixin('SomeInterface')] // or...
// mixins: [InterfaceMixin(['SomeInterface', 'AnotherInterface'])]

function InterfaceMixin(interfaces) {
    interfaces = _lodash2['default'].isString(interfaces) ? [interfaces] : interfaces;
    return {
        statics: {
            implementsInterface: function implementsInterface(name) {
                return interfaces.indexOf(name) > -1;
            }
        }
    };
}