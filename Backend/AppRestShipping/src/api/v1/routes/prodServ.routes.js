import { Router } from "express";
import * as entregaController from "../controllers/prodserv.controller";
import { validateRastreo } from "../middlewares/validateRastreo";

const router = Router();

// **CRUD principal**
router.get("/", entregaController.getAllEntregas); // 1
router.post("/", entregaController.createEntrega); // 2
router.put("/:id", entregaController.updateEntrega); // 3
router.delete("/by-idinstituto/:IdInstitutoOK", entregaController.deleteEntregaByIdInstitutoOK); // 4

// **Información adicional**
router.get("/info-ad/:idInstitutoOK", entregaController.getInfoAdByIdInstituto); // 5
router.get("/info-ad", entregaController.getAllInstitutesInfoAd); // 6
router.post("/info-adicional/:IdInstitutoOK", entregaController.addInfoAdicional); // 7
router.put("/info-ad/:IdInstitutoOK", entregaController.updateInfoAdByIdInstituto); // 8
router.delete("/info-ad/:IdInstitutoOK", entregaController.deleteInfoAdByInstitute); // 9

// **Productos**
router.get("/productos", entregaController.getAllProducts); // 10
router.get("/:IdInstitutoOK/productos", entregaController.getProductosByInstituto); // 11
router.put("/productos/:IdProdServOK", entregaController.updateProduct); // 12
router.delete("/productos/:IdProdServOK", entregaController.deleteProduct); // 13

// **Rastreos**
router.get("/instituto/rastreos", entregaController.getAllRastreos); // 14
router.get("/rastreos", entregaController.getAllRastreos); // 15 (redundante)
router.post("/rastreos", entregaController.createRastreo); // 16
router.put("/rastreos/:IdInstitutoOK/:NumeroGuia", entregaController.updateRastreo); // 17
router.delete("/rastreos/:IdInstitutoOK/:NumeroGuia", entregaController.deleteRastreo); // 18

// **Envíos**
router.get("/envios/instituto/:IdInstitutoOK", entregaController.getEnviosByInstitutoWithId); // 19
router.get("/instituto/envios", entregaController.getAllEnvios); // 20
router.get("/envios", entregaController.getAllInstitutesEnvios); // 21
router.post("/envios/:IdInstitutoOK", entregaController.addEnvio); // 22
router.put("/envios/:IdInstitutoOK", entregaController.updateEnviosByInstitute); // 23
router.delete("/envios/:IdInstitutoOK", entregaController.deleteEnviosByInstitute); // 24

// **Extra**
router.get("/:IdInstitutoOK", entregaController.getEntregasByInstituto); // 25
router.put("/FIC/:IdInstitutoOK", entregaController.updateEntregaByIdInstitutoOK); // 26
router.get("/info-ad", entregaController.getAllInstitutesInfoAd); // 27 (aparece varias veces, pero ya está)

export default router;
