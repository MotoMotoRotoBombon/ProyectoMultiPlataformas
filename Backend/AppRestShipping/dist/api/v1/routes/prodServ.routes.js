"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var entregaController = _interopRequireWildcard(require("../controllers/prodserv.controller"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Shipping

var router = (0, _express.Router)();

// Ruta para obtener la lista de todos los envíos
router.get('/', entregaController.getAllEntregas);

/* Ruta para obtener un envío específico por ID

router.get('/:id', entregaController.getEntregaById); */

// Ruta para crear un nuevo envío
router.post('/', entregaController.createEntrega);

// Ruta para actualizar un envío existente
router.put('/:id', entregaController.updateEntrega);

// Ruta para eliminar por IdInstitutoOK
router["delete"]('/by-idinstituto/:IdInstitutoOK', entregaController.deleteEntregaByIdInstitutoOK);

// Nueva ruta: Obtener info_ad por IdInstitutoOK
router.get("/info-ad/:idInstitutoOK", entregaController.getInfoAdByIdInstituto);

// Nueva ruta: Obtener todas las IDs de Institutos con su info_ad
router.get("/info-ad", entregaController.getAllInstitutesInfoAd);

// Nueva ruta: Obtener todos los productos
router.get("/productos", entregaController.getAllProducts);

// Nueva ruta: Obtener productos por IdInstitutoOK
router.get("/:IdInstitutoOK/productos", entregaController.getProductosByInstituto);

// Nueva ruta: Obtener todas las entregas completas por IdInstitutoOK
router.get("/:IdInstitutoOK", entregaController.getEntregasByInstituto);

// Nueva ruta: Obtener envíos con el IdInstitutoOK
router.get("/envios/instituto/:IdInstitutoOK", entregaController.getEnviosByInstitutoWithId);

// Nueva ruta: Obtener todos los envíos
router.get("/instituto/envios", entregaController.getAllEnvios);

// Nueva ruta: Obtener rastreos con el IdInstitutoOK
router.get("/rastreos/instituto/:IdInstitutoOK", entregaController.getRastreosByInstituto);

// Nueva ruta: Obtener todos los rastreos
router.get("/instituto/rastreos", entregaController.getAllRastreos);

//CRUD INFO 
router.put("/productos/:IdProdServOK", entregaController.updateProduct);
router["delete"]("/productos/:IdProdServOK", entregaController.deleteProduct);

// Nueva ruta: Obtener todas las IDs de Institutos con su info_ad
router.get("/info-ad", entregaController.getAllInstitutesInfoAd);

// Ruta para agregar información adicional
router.post("/info-adicional/:IdInstitutoOK", entregaController.addInfoAdicional);

// Nueva ruta para eliminar info_ad por IdInstitutoOK
router["delete"]("/info-ad/:IdInstitutoOK", entregaController.deleteInfoAdByInstitute);

// Nueva ruta para actualizar Info Adicional
router.put('/info-ad/:IdInstitutoOK', entregaController.updateInfoAdByIdInstituto);
var _default = exports["default"] = router;