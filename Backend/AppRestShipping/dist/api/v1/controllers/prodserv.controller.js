"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.updateInfoAdByIdInstituto = exports.updateEntrega = exports.getRastreosByInstituto = exports.getProductosByInstituto = exports.getInfoAdByIdInstituto = exports.getEnviosByInstitutoWithId = exports.getEntregasByInstituto = exports.getAllRastreos = exports.getAllProducts = exports.getAllInstitutesInfoAd = exports.getAllEnvios = exports.getAllEntregas = exports.deleteProduct = exports.deleteInfoAdByInstitute = exports.deleteEntregaByIdInstitutoOK = exports.createEntrega = exports.addInfoAdicional = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _prodServ = _interopRequireDefault(require("../services/prodServ.service"));
var _ProdServ = _interopRequireDefault(require("../models/ProdServ"));
var _boom = _interopRequireDefault(require("@hapi/boom"));
// Verifica que el path sea correcto

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

/* Obtener un envío específico por ID

export const getEntregaById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const entrega = await entregaService.findById(id);
        if (!entrega) {
            return res.status(404).json({ message: 'Envío no encontrado.' });
        }
        return res.status(200).json(entrega);
    } catch (error) {
        console.error('Error en getEntregaById:', error);
        next(boom.internal(error.message));
    }
}; */

// Crear un nuevo envío
var createEntrega = exports.createEntrega = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var newEntrega;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _prodServ["default"].create(req.body);
        case 3:
          newEntrega = _context2.sent;
          if (newEntrega) {
            _context2.next = 6;
            break;
          }
          throw _boom["default"].badRequest('No se pudo crear el envío.');
        case 6:
          res.status(201).json(newEntrega);
          _context2.next = 13;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          next(_boom["default"].internal(_context2.t0.message));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function createEntrega(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

// Actualizar un envío
var updateEntrega = exports.updateEntrega = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var id, updatedEntrega;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return _prodServ["default"].update(id, req.body);
        case 4:
          updatedEntrega = _context3.sent;
          if (updatedEntrega) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Envío no encontrado.'
          }));
        case 7:
          return _context3.abrupt("return", res.status(200).json(updatedEntrega));
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error('Error en updateEntrega:', _context3.t0);
          next(_boom["default"].internal(_context3.t0.message));
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function updateEntrega(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var updateProduct = exports.updateProduct = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var IdProdServOK, updatedData, updatedEntrega;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          IdProdServOK = req.params.IdProdServOK; // Obtener el ID del producto desde los parámetros
          updatedData = req.body; // Obtener los datos actualizados desde el cuerpo de la solicitud
          // Actualizar el producto específico dentro de envios.productos
          _context4.next = 5;
          return _ProdServ["default"].updateOne({
            "envios.productos.IdProdServOK": IdProdServOK
          },
          // Buscar por IdProdServOK
          {
            $set: {
              "envios.$[].productos.$[producto]": updatedData // Actualizar los datos
            }
          }, {
            arrayFilters: [{
              "producto.IdProdServOK": IdProdServOK
            } // Filtro para el producto específico
            ],
            "new": true // Retornar el documento actualizado
          });
        case 5:
          updatedEntrega = _context4.sent;
          if (updatedEntrega.modifiedCount) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "Producto no encontrado."
          }));
        case 8:
          res.status(200).json({
            message: "Producto actualizado correctamente."
          });
          _context4.next = 15;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error("Error al actualizar el producto:", _context4.t0);
          next(_context4.t0);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function updateProduct(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteProduct = exports.deleteProduct = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var IdProdServOK, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          IdProdServOK = req.params.IdProdServOK; // Obtener el ID del producto a eliminar
          _context5.next = 4;
          return _ProdServ["default"].updateOne({
            "envios.productos.IdProdServOK": IdProdServOK
          },
          // Buscar el producto dentro de envios
          {
            $pull: {
              "envios.$[].productos": {
                IdProdServOK: IdProdServOK
              }
            } // Eliminar el producto por ID
          });
        case 4:
          result = _context5.sent;
          if (result.modifiedCount) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: "Producto no encontrado."
          }));
        case 7:
          res.status(200).json({
            message: "Producto eliminado correctamente."
          });
          _context5.next = 14;
          break;
        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.error("Error al eliminar el producto:", _context5.t0);
          next(_context5.t0);
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function deleteProduct(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

// Eliminar un envío por IdInstitutoOK
var deleteEntregaByIdInstitutoOK = exports.deleteEntregaByIdInstitutoOK = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var IdInstitutoOK, deletedEntrega;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          IdInstitutoOK = req.params.IdInstitutoOK;
          _context6.next = 4;
          return _prodServ["default"].deleteByIdInstitutoOK(IdInstitutoOK);
        case 4:
          deletedEntrega = _context6.sent;
          if (deletedEntrega) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Envío no encontrado.'
          }));
        case 7:
          return _context6.abrupt("return", res.status(200).json({
            message: 'Envío eliminado exitosamente.',
            deletedEntrega: deletedEntrega
          }));
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          console.error('Error en deleteEntregaByIdInstitutoOK:', _context6.t0);
          next(_boom["default"].internal(_context6.t0.message));
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function deleteEntregaByIdInstitutoOK(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();

// Obtener la info_ad de un IdInstitutoOK
var getInfoAdByIdInstituto = exports.getInfoAdByIdInstituto = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var idInstitutoOK, entrega;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          idInstitutoOK = req.params.idInstitutoOK; // Buscar el registro por IdInstitutoOK
          _context7.next = 4;
          return _ProdServ["default"].findOne({
            IdInstitutoOK: idInstitutoOK
          }, {
            IdInstitutoOK: 1,
            info_ad: 1
          });
        case 4:
          entrega = _context7.sent;
          if (entrega) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: "No se encontr\xF3 informaci\xF3n para el IdInstitutoOK: ".concat(idInstitutoOK)
          }));
        case 7:
          return _context7.abrupt("return", res.status(200).json({
            IdInstitutoOK: entrega.IdInstitutoOK,
            info_ad: entrega.info_ad
          }));
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](0);
          console.error("Error al obtener la información adicional por IdInstitutoOK:", _context7.t0);
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

// Obtener todas las ID del Instituto con su info_ad
var getAllInstitutesInfoAd = exports.getAllInstitutesInfoAd = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var entregas;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _ProdServ["default"].find({}, {
            IdInstitutoOK: 1,
            info_ad: 1
          });
        case 3:
          entregas = _context8.sent;
          if (!(!entregas || entregas.length === 0)) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: "No se encontró información de institutos."
          }));
        case 6:
          return _context8.abrupt("return", res.status(200).json(entregas));
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          console.error("Error al obtener la información de todos los institutos:", _context8.t0);
          next(_context8.t0);
        case 13:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return function getAllInstitutesInfoAd(_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}();

// Obtener productos por IdInstitutoOK
var getProductosByInstituto = exports.getProductosByInstituto = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var IdInstitutoOK, entregas, productos;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          IdInstitutoOK = req.params.IdInstitutoOK;
          _context9.prev = 1;
          _context9.next = 4;
          return _ProdServ["default"].find({
            IdInstitutoOK: IdInstitutoOK
          });
        case 4:
          entregas = _context9.sent;
          if (!(!entregas || entregas.length === 0)) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: "No se encontraron entregas para el instituto: ".concat(IdInstitutoOK)
          }));
        case 7:
          // Extraer todos los productos asociados a los envíos
          productos = entregas.flatMap(function (entrega) {
            return entrega.envios.flatMap(function (envio) {
              return envio.productos;
            });
          }); // Si no hay productos, responde con un mensaje vacío
          if (!(productos.length === 0)) {
            _context9.next = 10;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: "No se encontraron productos para el instituto: ".concat(IdInstitutoOK)
          }));
        case 10:
          // Responder con la lista de productos
          res.status(200).json({
            IdInstitutoOK: IdInstitutoOK,
            productos: productos
          });
          _context9.next = 17;
          break;
        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](1);
          console.error("Error en getProductosByInstituto:", _context9.t0);
          next(_context9.t0);
        case 17:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 13]]);
  }));
  return function getProductosByInstituto(_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}();

// Controlador: Obtener todos los productos
var getAllProducts = exports.getAllProducts = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
    var entregas, productosPorInstituto;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return _ProdServ["default"].find({}, {
            IdInstitutoOK: 1,
            "envios.productos": 1
          });
        case 3:
          entregas = _context10.sent;
          if (entregas.length) {
            _context10.next = 6;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: "No se encontraron productos."
          }));
        case 6:
          productosPorInstituto = entregas.map(function (entrega) {
            return {
              IdInstitutoOK: entrega.IdInstitutoOK,
              productos: entrega.envios.flatMap(function (envio) {
                return envio.productos;
              })
            };
          });
          return _context10.abrupt("return", res.status(200).json(productosPorInstituto));
        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          console.error("Error al obtener todos los productos:", _context10.t0);
          next(_context10.t0);
        case 14:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 10]]);
  }));
  return function getAllProducts(_x28, _x29, _x30) {
    return _ref10.apply(this, arguments);
  };
}();

// Obtener todas las entregas completas por IdInstitutoOK
var getEntregasByInstituto = exports.getEntregasByInstituto = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
    var IdInstitutoOK, entregas;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          IdInstitutoOK = req.params.IdInstitutoOK;
          _context11.prev = 1;
          _context11.next = 4;
          return _ProdServ["default"].find({
            IdInstitutoOK: IdInstitutoOK
          });
        case 4:
          entregas = _context11.sent;
          if (!(!entregas || entregas.length === 0)) {
            _context11.next = 7;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            message: "No se encontraron entregas para el instituto: ".concat(IdInstitutoOK)
          }));
        case 7:
          // Responder con todas las entregas completas
          res.status(200).json({
            IdInstitutoOK: IdInstitutoOK,
            entregas: entregas
          });
          _context11.next = 14;
          break;
        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](1);
          console.error("Error en getEntregasByInstituto:", _context11.t0);
          next(_context11.t0);
        case 14:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[1, 10]]);
  }));
  return function getEntregasByInstituto(_x31, _x32, _x33) {
    return _ref11.apply(this, arguments);
  };
}();

// Obtener envíos con el IdInstitutoOK en el nivel superior
var getEnviosByInstitutoWithId = exports.getEnviosByInstitutoWithId = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
    var IdInstitutoOK, data, response;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          IdInstitutoOK = req.params.IdInstitutoOK; // Buscar el documento correspondiente al IdInstitutoOK
          _context12.next = 4;
          return _ProdServ["default"].findOne({
            IdInstitutoOK: IdInstitutoOK
          }, {
            IdInstitutoOK: 1,
            // Incluir solo el IdInstitutoOK
            "envios.IdDomicilioOK": 1,
            "envios.IdPaqueteriaOK": 1,
            "envios.IdTipoMetodoEnvio": 1,
            "envios.CostoEnvio": 1,
            _id: 0 // Excluir el campo _id del documento principal
          });
        case 4:
          data = _context12.sent;
          if (data) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: "No se encontraron datos para el instituto ".concat(IdInstitutoOK, ".")
          }));
        case 7:
          // Construir la respuesta con el formato requerido
          response = {
            IdInstitutoOK: data.IdInstitutoOK,
            envios: data.envios
          };
          return _context12.abrupt("return", res.status(200).json(response));
        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](0);
          console.error("Error en getEnviosByInstitutoWithId:", _context12.t0);
          next(_context12.t0);
        case 15:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 11]]);
  }));
  return function getEnviosByInstitutoWithId(_x34, _x35, _x36) {
    return _ref12.apply(this, arguments);
  };
}();

// Obtener todos los envíos agrupados por IdInstitutoOK
var getAllEnvios = exports.getAllEnvios = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
    var registros, resultado;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return _ProdServ["default"].find({}, {
            IdInstitutoOK: 1,
            envios: 1
          });
        case 3:
          registros = _context13.sent;
          // Filtrar y estructurar la respuesta para cumplir con el formato solicitado
          resultado = registros.map(function (registro) {
            return {
              IdInstitutoOK: registro.IdInstitutoOK,
              envios: registro.envios.map(function (envio) {
                return {
                  IdDomicilioOK: envio.IdDomicilioOK,
                  IdPaqueteriaOK: envio.IdPaqueteriaOK,
                  IdTipoMetodoEnvio: envio.IdTipoMetodoEnvio,
                  CostoEnvio: envio.CostoEnvio
                };
              })
            };
          }); // Retornar la respuesta estructurada
          return _context13.abrupt("return", res.status(200).json(resultado));
        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          console.error("Error al obtener todos los envíos:", _context13.t0);
          next(_context13.t0);
        case 12:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 8]]);
  }));
  return function getAllEnvios(_x37, _x38, _x39) {
    return _ref13.apply(this, arguments);
  };
}();

// Obtener rastreos con el IdInstitutoOK en el nivel superior
var getRastreosByInstituto = exports.getRastreosByInstituto = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res, next) {
    var IdInstitutoOK, data, response;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          IdInstitutoOK = req.params.IdInstitutoOK; // Buscar el documento correspondiente al IdInstitutoOK
          _context14.next = 4;
          return _ProdServ["default"].findOne({
            IdInstitutoOK: IdInstitutoOK
          }, {
            IdInstitutoOK: 1,
            // Incluir solo el IdInstitutoOK
            "envios.rastreos": 1,
            // Incluir solo el campo rastreos dentro de envios
            _id: 0 // Excluir el campo _id del documento principal
          });
        case 4:
          data = _context14.sent;
          if (data) {
            _context14.next = 7;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            message: "No se encontraron datos de rastreo para el instituto ".concat(IdInstitutoOK, ".")
          }));
        case 7:
          // Construir la respuesta con el formato requerido
          response = {
            IdInstitutoOK: data.IdInstitutoOK,
            rastreos: data.envios.map(function (envio) {
              return envio.rastreos;
            }) // Extraer solo rastreos
          };
          return _context14.abrupt("return", res.status(200).json(response));
        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](0);
          console.error("Error en getRastreosByInstituto:", _context14.t0);
          next(_context14.t0);
        case 15:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 11]]);
  }));
  return function getRastreosByInstituto(_x40, _x41, _x42) {
    return _ref14.apply(this, arguments);
  };
}();

// Obtener todos los rastreos de todos los institutos
var getAllRastreos = exports.getAllRastreos = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res, next) {
    var envios, rastreosData;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return _ProdServ["default"].find({
            "envios.rastreos": {
              $exists: true
            }
          },
          // Filtra registros que tengan rastreos
          {
            IdInstitutoOK: 1,
            // Incluye IdInstitutoOK
            "envios.rastreos": 1 // Incluye solo los rastreos dentro de envios
          });
        case 3:
          envios = _context15.sent;
          // Formatear la respuesta para incluir IdInstitutoOK y los rastreos
          rastreosData = envios.map(function (entrega) {
            return {
              IdInstitutoOK: entrega.IdInstitutoOK,
              rastreos: entrega.envios.filter(function (envio) {
                return envio.rastreos;
              }) // Filtra envíos que tengan rastreos
              .map(function (envio) {
                return envio.rastreos;
              }) // Obtén solo los rastreos
            };
          });
          res.status(200).json(rastreosData);
          _context15.next = 12;
          break;
        case 8:
          _context15.prev = 8;
          _context15.t0 = _context15["catch"](0);
          console.error("Error al obtener todos los rastreos:", _context15.t0);
          next(_context15.t0);
        case 12:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 8]]);
  }));
  return function getAllRastreos(_x43, _x44, _x45) {
    return _ref15.apply(this, arguments);
  };
}();

//CRUD INFO ADD
//ADD 
// Agregar información adicional
var addInfoAdicional = exports.addInfoAdicional = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res, next) {
    var IdInstitutoOK, _req$body, Etiqueta, Valor, Secuencia, Activo, FechaReg, UsuarioReg, entrega, nuevaInfoAdicional;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          IdInstitutoOK = req.params.IdInstitutoOK; // Obtener el ID del instituto desde los parámetros
          _req$body = req.body, Etiqueta = _req$body.Etiqueta, Valor = _req$body.Valor, Secuencia = _req$body.Secuencia, Activo = _req$body.Activo, FechaReg = _req$body.FechaReg, UsuarioReg = _req$body.UsuarioReg; // Obtener datos del cuerpo de la solicitud
          // Buscar el documento correspondiente al ID del instituto
          _context16.next = 5;
          return _ProdServ["default"].findOne({
            IdInstitutoOK: IdInstitutoOK
          });
        case 5:
          entrega = _context16.sent;
          if (entrega) {
            _context16.next = 8;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            message: "No se encontr\xF3 un registro con el ID Instituto: ".concat(IdInstitutoOK)
          }));
        case 8:
          // Crear el nuevo objeto de información adicional
          nuevaInfoAdicional = {
            IdEtiqueta: Etiqueta,
            Etiqueta: Etiqueta,
            Valor: Valor,
            Secuencia: Secuencia,
            detail_row: {
              Activo: Activo || "S",
              detail_row_reg: [{
                FechaReg: FechaReg || new Date(),
                UsuarioReg: UsuarioReg || "Sistema" // Usuario por defecto si no se proporciona
              }]
            }
          }; // Agregar el nuevo objeto a la lista de info_ad en el documento existente
          entrega.info_ad.push(nuevaInfoAdicional);

          // Guardar los cambios en la base de datos
          _context16.next = 12;
          return entrega.save();
        case 12:
          // Responder con el nuevo objeto creado
          res.status(201).json({
            message: "Información adicional agregada correctamente.",
            infoAdicional: nuevaInfoAdicional
          });
          _context16.next = 19;
          break;
        case 15:
          _context16.prev = 15;
          _context16.t0 = _context16["catch"](0);
          console.error("Error al agregar información adicional:", _context16.t0);
          next(_boom["default"].internal(_context16.t0.message));
        case 19:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 15]]);
  }));
  return function addInfoAdicional(_x46, _x47, _x48) {
    return _ref16.apply(this, arguments);
  };
}();

// Eliminar toda la información adicional por IdInstitutoOK
var deleteInfoAdByInstitute = exports.deleteInfoAdByInstitute = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var IdInstitutoOK, updatedEntrega;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          IdInstitutoOK = req.params.IdInstitutoOK; // Buscar y actualizar el documento, eliminando la información adicional
          _context17.next = 4;
          return _ProdServ["default"].findOneAndUpdate({
            IdInstitutoOK: IdInstitutoOK
          }, {
            $set: {
              info_ad: []
            }
          },
          // Vaciar el array de info_ad
          {
            "new": true
          } // Retorna el documento actualizado
          );
        case 4:
          updatedEntrega = _context17.sent;
          if (updatedEntrega) {
            _context17.next = 7;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            message: "No se encontr\xF3 informaci\xF3n para el Instituto con ID: ".concat(IdInstitutoOK)
          }));
        case 7:
          return _context17.abrupt("return", res.status(200).json({
            message: "Información adicional eliminada correctamente.",
            updatedEntrega: updatedEntrega
          }));
        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](0);
          console.error("Error al eliminar información adicional:", _context17.t0);
          res.status(500).json({
            message: "Error interno del servidor.",
            error: _context17.t0.message
          });
        case 14:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 10]]);
  }));
  return function deleteInfoAdByInstitute(_x49, _x50) {
    return _ref17.apply(this, arguments);
  };
}();
var updateInfoAdByIdInstituto = exports.updateInfoAdByIdInstituto = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res, next) {
    var IdInstitutoOK, _req$body2, Etiqueta, Valor, Secuencia, Activo, FechaReg, UsuarioReg, entrega;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          IdInstitutoOK = req.params.IdInstitutoOK; // ID del instituto desde los parámetros
          _req$body2 = req.body, Etiqueta = _req$body2.Etiqueta, Valor = _req$body2.Valor, Secuencia = _req$body2.Secuencia, Activo = _req$body2.Activo, FechaReg = _req$body2.FechaReg, UsuarioReg = _req$body2.UsuarioReg; // Datos a actualizar
          // Buscar el documento por IdInstitutoOK
          _context18.next = 5;
          return _ProdServ["default"].findOne({
            IdInstitutoOK: IdInstitutoOK
          });
        case 5:
          entrega = _context18.sent;
          if (entrega) {
            _context18.next = 8;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            message: "No se encontr\xF3 informaci\xF3n para el Instituto con ID: ".concat(IdInstitutoOK)
          }));
        case 8:
          // Actualizar todos los subdocumentos en info_ad
          entrega.info_ad.forEach(function (info) {
            info.Etiqueta = Etiqueta || info.Etiqueta;
            info.Valor = Valor || info.Valor;
            info.Secuencia = Secuencia || info.Secuencia;
            info.detail_row.Activo = Activo || info.detail_row.Activo;
            info.detail_row.detail_row_reg[0].FechaReg = FechaReg || info.detail_row.detail_row_reg[0].FechaReg;
            info.detail_row.detail_row_reg[0].UsuarioReg = UsuarioReg || info.detail_row.detail_row_reg[0].UsuarioReg;
          });

          // Guardar los cambios
          _context18.next = 11;
          return entrega.save();
        case 11:
          return _context18.abrupt("return", res.status(200).json({
            message: "Información adicional actualizada correctamente.",
            updatedInfoAd: entrega.info_ad
          }));
        case 14:
          _context18.prev = 14;
          _context18.t0 = _context18["catch"](0);
          console.error("Error al actualizar información adicional:", _context18.t0);
          next(_context18.t0);
        case 18:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 14]]);
  }));
  return function updateInfoAdByIdInstituto(_x51, _x52, _x53) {
    return _ref18.apply(this, arguments);
  };
}();