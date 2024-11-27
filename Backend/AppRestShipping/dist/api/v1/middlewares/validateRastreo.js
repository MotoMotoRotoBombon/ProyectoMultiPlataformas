"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRastreo = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("joi"));
var _boom = _interopRequireDefault(require("@hapi/boom"));
// Esquema de validación usando Joi
var rastreoSchema = _joi["default"].object({
  IdInstitutoOK: _joi["default"].string().required(),
  NumeroGuia: _joi["default"].string().required(),
  IdRepartidorOK: _joi["default"].string().required(),
  NombreRepartidor: _joi["default"].string().required(),
  Alias: _joi["default"].string().required(),
  Ubicacion: _joi["default"].string().required(),
  FechaRegistro: _joi["default"].date().iso().required(),
  UsuarioRegistro: _joi["default"].string().required()
});

// Middleware de validación
var validateRastreo = exports.validateRastreo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return rastreoSchema.validateAsync(req.body);
        case 3:
          next(); // Continúa si los datos son válidos
          _context.next = 9;
          break;
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          // Retorna un error si los datos no son válidos
          next(_boom["default"].badRequest(_context.t0.details[0].message));
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function validateRastreo(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();