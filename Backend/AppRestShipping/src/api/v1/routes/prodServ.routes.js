// Shipping
import { Router } from 'express';
import * as entregaController from '../controllers/prodserv.controller';
const router = Router();

// Ruta para obtener la lista de todos los envíos
router.get('/', entregaController.getAllEntregas);

// Ruta para obtener un envío específico por ID
router.get('/:id', entregaController.getEntregaById);

// Ruta para crear un nuevo envío
router.post('/', entregaController.createEntrega);

// Ruta para actualizar un envío existente
router.put('/:id', entregaController.updateEntrega);

// Ruta para eliminar por IdInstitutoOK
router.delete('/by-idinstituto/:IdInstitutoOK', entregaController.deleteEntregaByIdInstitutoOK);

// Nueva ruta: Resumen por paquetería
router.get("/paqueterias/resumen", entregaController.getResumenPorPaqueteria);

// Nueva ruta: Información adicional por IdInstitutoOK
router.get("/info-ad/:idInstitutoOK", entregaController.getInfoAdByIdInstituto);

// Nueva ruta: Envíos dentro de un rango de fechas
router.get("/fecha", entregaController.getEntregasByFecha);

// Nueva ruta: Productos asociados a un envío
router.get("/:id/envios/productos", entregaController.getProductosByEntregaId);

// Nueva ruta: Seguimiento de un envío
router.get("/:id/seguimiento", entregaController.getSeguimientoByEntregaId);


export default router;
