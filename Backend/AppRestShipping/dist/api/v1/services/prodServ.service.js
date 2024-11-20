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
  }, {
    key: "getResumenPorPaqueteria",
    value: function () {
      var _getResumenPorPaqueteria = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _ProdServ["default"].aggregate([{
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
              return _context6.abrupt("return", _context6.sent);
            case 6:
              _context6.prev = 6;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 6]]);
      }));
      function getResumenPorPaqueteria() {
        return _getResumenPorPaqueteria.apply(this, arguments);
      }
      return getResumenPorPaqueteria;
    }()
  }, {
    key: "getInfoAdByIdInstituto",
    value: function () {
      var _getInfoAdByIdInstituto = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(idInstitutoOK) {
        var infoAd;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _ProdServ["default"].findOne({
                IdInstitutoOK: idInstitutoOK
              }, {
                info_ad: 1,
                _id: 0
              });
            case 3:
              infoAd = _context7.sent;
              return _context7.abrupt("return", infoAd ? infoAd.info_ad : null);
            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;
            case 10:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 7]]);
      }));
      function getInfoAdByIdInstituto(_x6) {
        return _getInfoAdByIdInstituto.apply(this, arguments);
      }
      return getInfoAdByIdInstituto;
    }()
  }, {
    key: "getEntregasByFecha",
    value: function () {
      var _getEntregasByFecha = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(fechaInicio, fechaFin) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _ProdServ["default"].find({
                "envios.info_ad.detail_row.detail_row_reg.FechaReg": {
                  $gte: new Date(fechaInicio),
                  $lte: new Date(fechaFin)
                }
              });
            case 3:
              return _context8.abrupt("return", _context8.sent);
            case 6:
              _context8.prev = 6;
              _context8.t0 = _context8["catch"](0);
              throw _context8.t0;
            case 9:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 6]]);
      }));
      function getEntregasByFecha(_x7, _x8) {
        return _getEntregasByFecha.apply(this, arguments);
      }
      return getEntregasByFecha;
    }()
  }, {
    key: "getProductosByEntregaId",
    value: function () {
      var _getProductosByEntregaId = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(idEntregaOK) {
        var entrega;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _ProdServ["default"].findOne({
                "envios.IdEntregaOK": idEntregaOK
              }, {
                "envios.$.productos": 1
              });
            case 3:
              entrega = _context9.sent;
              return _context9.abrupt("return", entrega ? entrega.envios[0].productos : null);
            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              throw _context9.t0;
            case 10:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 7]]);
      }));
      function getProductosByEntregaId(_x9) {
        return _getProductosByEntregaId.apply(this, arguments);
      }
      return getProductosByEntregaId;
    }()
  }, {
    key: "getSeguimientoByEntregaId",
    value: function () {
      var _getSeguimientoByEntregaId = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(idEntregaOK) {
        var entrega;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _ProdServ["default"].findOne({
                "envios.IdEntregaOK": idEntregaOK
              }, {
                "envios.$.rastreos.seguimiento": 1
              });
            case 3:
              entrega = _context10.sent;
              return _context10.abrupt("return", entrega ? entrega.envios[0].rastreos.seguimiento : null);
            case 7:
              _context10.prev = 7;
              _context10.t0 = _context10["catch"](0);
              throw _context10.t0;
            case 10:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 7]]);
      }));
      function getSeguimientoByEntregaId(_x10) {
        return _getSeguimientoByEntregaId.apply(this, arguments);
      }
      return getSeguimientoByEntregaId;
    }()
  }]);
}();
var _default = exports["default"] = new EntregaService();