"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _ProdServ = _interopRequireDefault(require("../models/ProdServ"));
var EntregaService = /*#__PURE__*/function () {
  function EntregaService() {
    (0, _classCallCheck2["default"])(this, EntregaService);
  }
  return (0, _createClass2["default"])(EntregaService, [{
    key: "listAll",
    value: function () {
      var _listAll = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _ProdServ["default"].find({});
            case 3:
              return _context.abrupt("return", _context.sent);
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              throw _context.t0;
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 6]]);
      }));
      function listAll() {
        return _listAll.apply(this, arguments);
      }
      return listAll;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(entregaId) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _ProdServ["default"].findById(entregaId);
            case 3:
              return _context2.abrupt("return", _context2.sent);
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 6]]);
      }));
      function findById(_x) {
        return _findById.apply(this, arguments);
      }
      return findById;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(entregaData) {
        var entrega;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              entrega = new _ProdServ["default"](entregaData);
              _context3.next = 4;
              return entrega.save();
            case 4:
              return _context3.abrupt("return", _context3.sent);
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }));
      function create(_x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(entregaId, entregaData) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _ProdServ["default"].findByIdAndUpdate(entregaId, entregaData, {
                "new": true
              });
            case 3:
              return _context4.abrupt("return", _context4.sent);
            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;
            case 9:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 6]]);
      }));
      function update(_x3, _x4) {
        return _update.apply(this, arguments);
      }
      return update;
    }() // Eliminar un envío por IdInstitutoOK
  }, {
    key: "deleteByIdInstitutoOK",
    value: function () {
      var _deleteByIdInstitutoOK = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(IdInstitutoOK) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _ProdServ["default"].findOneAndDelete({
                IdInstitutoOK: IdInstitutoOK
              });
            case 3:
              return _context5.abrupt("return", _context5.sent);
            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 6]]);
      }));
      function deleteByIdInstitutoOK(_x5) {
        return _deleteByIdInstitutoOK.apply(this, arguments);
      }
      return deleteByIdInstitutoOK;
    }()
  }]);
}();
var _default = exports["default"] = new EntregaService();