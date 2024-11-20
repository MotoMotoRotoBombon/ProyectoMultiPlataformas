"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEntrega = exports.getEntregaById = exports.getAllEntregas = exports.deleteEntrega = exports.createEntrega = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _prodServ = _interopRequireDefault(require("../services/prodServ.service"));
var _boom = _interopRequireDefault(require("@hapi/boom"));
// Obtener lista de todos los envíos
var getAllEntregas = exports.getAllEntregas = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var entregasList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _prodServ["default"].listAll();
        case 3:
          entregasList = _context.sent;
          if (!(!entregasList || entregasList.length === 0)) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'No se encontraron envíos registrados.'
          }));
        case 6:
          return _context.abrupt("return", res.status(200).json(entregasList));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error('Error en getAllEntregas:', _context.t0);
          next(_boom["default"].internal(_context.t0.message));
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getAllEntregas(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Obtener un envío específico por ID
var getEntregaById = exports.getEntregaById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var id, entrega;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return _prodServ["default"].findById(id);
        case 4:
          entrega = _context2.sent;
          if (entrega) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Envío no encontrado.'
          }));
        case 7:
          return _context2.abrupt("return", res.status(200).json(entrega));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error('Error en getEntregaById:', _context2.t0);
          next(_boom["default"].internal(_context2.t0.message));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getEntregaById(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

// Crear un nuevo envío
var createEntrega = exports.createEntrega = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var newEntrega;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _prodServ["default"].create(req.body);
        case 3:
          newEntrega = _context3.sent;
          if (newEntrega) {
            _context3.next = 6;
            break;
          }
          throw _boom["default"].badRequest('No se pudo crear el envío.');
        case 6:
          res.status(201).json(newEntrega);
          _context3.next = 13;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          next(_boom["default"].internal(_context3.t0.message));
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function createEntrega(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

// Actualizar un envío
var updateEntrega = exports.updateEntrega = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var id, updatedEntrega;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return _prodServ["default"].update(id, req.body);
        case 4:
          updatedEntrega = _context4.sent;
          if (updatedEntrega) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Envío no encontrado.'
          }));
        case 7:
          return _context4.abrupt("return", res.status(200).json(updatedEntrega));
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error('Error en updateEntrega:', _context4.t0);
          next(_boom["default"].internal(_context4.t0.message));
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function updateEntrega(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

// Eliminar un envío
var deleteEntrega = exports.deleteEntrega = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var id, deletedEntrega;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return _prodServ["default"]["delete"](id);
        case 4:
          deletedEntrega = _context5.sent;
          if (deletedEntrega) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Envío no encontrado.'
          }));
        case 7:
          return _context5.abrupt("return", res.status(200).json({
            message: 'Envío eliminado exitosamente.'
          }));
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error('Error en deleteEntrega:', _context5.t0);
          next(_boom["default"].internal(_context5.t0.message));
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function deleteEntrega(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();