"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = require("express");
var _config = _interopRequireDefault(require("../../../config/config"));
var _prodServ = _interopRequireDefault(require("./prodServ.routes"));
// Importar rutas
// Asegúrate de que el nombre del archivo importado sea correcto

var routerAPI = function routerAPI(app) {
  var router = (0, _express.Router)();
  var api = _config["default"].API_URL; // Asegúrate de que config tenga una propiedad API_URL

  app.use(api, router);
  // Rutas
  router.use('/entregas', _prodServ["default"]); // Cambiado de '/prod-serv' a '/entregas' para reflejar el enfoque en envíos

  // Retorna el router
  return router;
};
module.exports = routerAPI;