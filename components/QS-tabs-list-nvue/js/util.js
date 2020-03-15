function _setTimeout(fn, time) {
	if(_isFn(fn)) setTimeout(fn, time || 0);
}
function _isFn(fn) {
	return fn && typeof fn === 'function';
}
function _isArray(arg) {
	return Object.prototype.toString.call(arg) === '[object Array]';
}
function _isUndef(arg) {
	return arg === undefined;
}
function _isNull(arg) {
	return arg === null;
}
function _isUndefOrNull(arg) {
	return arg === undefined || arg === null;
}

module.exports = {
	_setTimeout,
	_isFn,
	_isArray,
	_isUndef,
	_isNull,
	_isUndefOrNull
}