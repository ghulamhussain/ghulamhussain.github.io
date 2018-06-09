"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var handleQueue = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(task, cb) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return request(task);

          case 3:
            response = _context.sent;

            cb(null, response);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            cb(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function handleQueue(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @typedef {Options}
 * @type {Object}
 * @see For a detailed descriptions of the options,
 *      see {@link https://www.npmjs.com/package/better-queue#full-documentation|better-queue on Github}
 */

/**
 * Run a series of requests tasks in a queue for better flow control
 *
 * @param  {Object[]} tasks  An array of Axios formatted request objects
 * @param  {Options}  opts   Options that will be given to better-queue
 * @return {Promise}         Resolves with the accumulated values from the tasks
 */


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Queue = require(`better-queue`);
var Promise = require(`bluebird`);
var request = require(`axios`);

var _defaults = {
  id: `url`

  /**
   * [handleQueue description]
   * @param  {[type]}   task [description]
   * @param  {Function} cb   [description]
   * @return {[type]}        [description]
   */
};module.exports = function requestInQueue(tasks) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (res, rej) {
    var q = new Queue(handleQueue, (0, _extends3.default)({}, _defaults, opts));

    var taskMap = new Map(tasks.map(function (t) {
      q.push(t);
      return [t.url, null];
    }));

    q.on(`task_failed`, function (id, err) {
      rej(`${id} failed with err: ${err}`);
      q.destroy();
    });

    q.on(`task_finish`, function (id, response) {
      taskMap.set(id, response);
    });

    q.on(`drain`, function () {
      return res(Array.from(taskMap.values()));
    });
  });
};