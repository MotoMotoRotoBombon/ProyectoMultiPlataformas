"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEntrega = exports.getSeguimientoByEntregaId = exports.getResumenPorPaqueteria = exports.getProductosByEntregaId = exports.getInfoAdByIdInstituto = exports.getEntregasByFecha = exports.getEntregaById = exports.getAllEntregas = exports.deleteEntregaByIdInstitutoOK = exports.createEntrega = void 0;
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

// Eliminar un envío por IdInstitutoOK
var deleteEntregaByIdInstitutoOK = exports.deleteEntregaByIdInstitutoOK = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var IdInstitutoOK, deletedEntrega;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          IdInstitutoOK = req.params.IdInstitutoOK;
          _context5.next = 4;
          return _prodServ["default"].deleteByIdInstitutoOK(IdInstitutoOK);
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
            message: 'Envío eliminado exitosamente.',
            deletedEntrega: deletedEntrega
          }));
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error('Error en deleteEntregaByIdInstitutoOK:', _context5.t0);
          next(_boom["default"].internal(_context5.t0.message));
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function deleteEntregaByIdInstitutoOK(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

//Devuelve un resumen de envíos agrupados por IdPaqueteriaOK.
var getResumenPorPaqueteria = exports.getResumenPorPaqueteria = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var resumen;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return Entrega.aggregate([{
            $unwind: "$envios"
          }, {
            $group: {
              _id: "$envios.IdPaqueteriaOK",
              TotalEnvios: {
                $sum: 1
              },
              CostoTotal: {
                $sum: "$envios.CostoEnvio"
              }
            }
          }, {
            $project: {
              Paqueteria: "$_id",
              TotalEnvios: 1,
              CostoTotal: 1,
              _id: 0
            }
          }]);
        case 3:
          resumen = _context6.sent;
          res.status(200).json(resumen);
          _context6.next = 11;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error("Error al obtener el resumen por paquetería:", _context6.t0);
          next(_context6.t0);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function getResumenPorPaqueteria(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

//Devuelve toda la información adicional (info_ad) asociada a un IdInstitutoOK.
var getInfoAdByIdInstituto = exports.getInfoAdByIdInstituto = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var idInstitutoOK, infoAd;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          idInstitutoOK = req.params.idInstitutoOK;
          _context7.next = 4;
          return Entrega.findOne({
            IdInstitutoOK: idInstitutoOK
          }, {
            info_ad: 1,
            _id: 0
          });
        case 4:
          infoAd = _context7.sent;
          if (infoAd) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: "Información no encontrada para el instituto proporcionado."
          }));
        case 7:
          res.status(200).json(infoAd.info_ad);
          _context7.next = 14;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.error("Error al obtener información adicional:", _context7.t0);
          next(_context7.t0);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return function getInfoAdByIdInstituto(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();

//Devuelve los envíos realizados dentro de un rango de fechas.
var getEntregasByFecha = exports.getEntregasByFecha = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var _req$query, inicio, fin, envios;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _req$query = req.query, inicio = _req$query.inicio, fin = _req$query.fin;
          _context8.next = 4;
          return Entrega.find({
            "envios.info_ad.detail_row.detail_row_reg.FechaReg": {
              $gte: new Date(inicio),
              $lte: new Date(fin)
            }
          });
        case 4:
          envios = _context8.sent;
          if (!(!envios || envios.length === 0)) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: "No se encontraron envíos en el rango de fechas especificado."
          }));
        case 7:
          res.status(200).json(envios);
          _context8.next = 14;
          break;
        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          console.error("Error al obtener envíos por rango de fechas:", _context8.t0);
          next(_context8.t0);
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 10]]);
  }));
  return function getEntregasByFecha(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

//Devuelve los productos asociados a un envío específico (IdEntregaOK).
var getProductosByEntregaId = exports.getProductosByEntregaId = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var id, entrega;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.params.id;
          _context9.next = 4;
          return Entrega.findOne({
            "envios.IdEntregaOK": id
          }, {
            "envios.$.productos": 1
          });
        case 4:
          entrega = _context9.sent;
          if (entrega) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: "No se encontraron productos para el envío proporcionado."
          }));
        case 7:
          res.status(200).json(entrega.envios[0].productos);
          _context9.next = 14;
          break;
        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          console.error("Error al obtener productos por IdEntregaOK:", _context9.t0);
          next(_context9.t0);
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return function getProductosByEntregaId(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

//Devuelve el historial de seguimiento de un envío específico (IdEntregaOK).
var getSeguimientoByEntregaId = exports.getSeguimientoByEntregaId = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var id, entrega;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          id = req.params.id;
          _context10.next = 4;
          return Entrega.findOne({
            "envios.IdEntregaOK": id
          }, {
            "envios.$.rastreos.seguimiento": 1
          });
        case 4:
          entrega = _context10.sent;
          if (entrega) {
            _context10.next = 7;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: "No se encontró el seguimiento para el envío proporcionado."
          }));
        case 7:
          res.status(200).json(entrega.envios[0].rastreos.seguimiento);
          _context10.next = 14;
          break;
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          console.error("Error al obtener seguimiento por IdEntregaOK:", _context10.t0);
          next(_context10.t0);
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return function getSeguimientoByEntregaId(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();