import entregaService from '../services/prodServ.service';
import boom from '@hapi/boom';

// Obtener lista de todos los envíos
export const getAllEntregas = async (req, res, next) => {
    try {
        const entregasList = await entregaService.listAll();
        if (!entregasList || entregasList.length === 0) {
            return res.status(404).json({ message: 'No se encontraron envíos registrados.' });
        }
        return res.status(200).json(entregasList);
    } catch (error) {
        console.error('Error en getAllEntregas:', error);
        next(boom.internal(error.message));
    }
};

// Obtener un envío específico por ID
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
};

// Crear un nuevo envío
export const createEntrega = async (req, res, next) => {
    try {
        const newEntrega = await entregaService.create(req.body);
        if (!newEntrega) {
            throw boom.badRequest('No se pudo crear el envío.');
        }
        res.status(201).json(newEntrega);
    } catch (error) {
        console.log(error);
        next(boom.internal(error.message));
    }
};

// Actualizar un envío
export const updateEntrega = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedEntrega = await entregaService.update(id, req.body);
        if (!updatedEntrega) {
            return res.status(404).json({ message: 'Envío no encontrado.' });
        }
        return res.status(200).json(updatedEntrega);
    } catch (error) {
        console.error('Error en updateEntrega:', error);
        next(boom.internal(error.message));
    }
};

// Eliminar un envío por IdInstitutoOK
export const deleteEntregaByIdInstitutoOK = async (req, res, next) => {
    try {
      const { IdInstitutoOK } = req.params;
      const deletedEntrega = await entregaService.deleteByIdInstitutoOK(IdInstitutoOK);
      if (!deletedEntrega) {    
        return res.status(404).json({ message: 'Envío no encontrado.' });
      }
      return res.status(200).json({ message: 'Envío eliminado exitosamente.', deletedEntrega });
    } catch (error) {
      console.error('Error en deleteEntregaByIdInstitutoOK:', error);
      next(boom.internal(error.message));
    }  };

//Devuelve un resumen de envíos agrupados por IdPaqueteriaOK.
    export const getResumenPorPaqueteria = async (req, res, next) => {
      try {
          const resumen = await Entrega.aggregate([
              {
                  $unwind: "$envios"
              },
              {
                  $group: {
                      _id: "$envios.IdPaqueteriaOK",
                      TotalEnvios: { $sum: 1 },
                      CostoTotal: { $sum: "$envios.CostoEnvio" }
                  }
              },
              {
                  $project: {
                      Paqueteria: "$_id",
                      TotalEnvios: 1,
                      CostoTotal: 1,
                      _id: 0
                  }
              }
          ]);
          res.status(200).json(resumen);
      } catch (error) {
          console.error("Error al obtener el resumen por paquetería:", error);
          next(error);
      }
  };

  //Devuelve toda la información adicional (info_ad) asociada a un IdInstitutoOK.
  export const getInfoAdByIdInstituto = async (req, res, next) => {
    try {
        const { idInstitutoOK } = req.params;
        const infoAd = await Entrega.findOne(
            { IdInstitutoOK: idInstitutoOK },
            { info_ad: 1, _id: 0 }
        );
        if (!infoAd) {
            return res.status(404).json({ message: "Información no encontrada para el instituto proporcionado." });
        }
        res.status(200).json(infoAd.info_ad);
    } catch (error) {
        console.error("Error al obtener información adicional:", error);
        next(error);
    }
};

//Devuelve los envíos realizados dentro de un rango de fechas.
export const getEntregasByFecha = async (req, res, next) => {
  try {
      const { inicio, fin } = req.query;
      const envios = await Entrega.find({
          "envios.info_ad.detail_row.detail_row_reg.FechaReg": {
              $gte: new Date(inicio),
              $lte: new Date(fin)
          }
      });
      if (!envios || envios.length === 0) {
          return res.status(404).json({ message: "No se encontraron envíos en el rango de fechas especificado." });
      }
      res.status(200).json(envios);
  } catch (error) {
      console.error("Error al obtener envíos por rango de fechas:", error);
      next(error);
  }
};

//Devuelve los productos asociados a un envío específico (IdEntregaOK).
export const getProductosByEntregaId = async (req, res, next) => {
  try {
      const { id } = req.params;
      const entrega = await Entrega.findOne(
          { "envios.IdEntregaOK": id },
          { "envios.$.productos": 1 }
      );
      if (!entrega) {
          return res.status(404).json({ message: "No se encontraron productos para el envío proporcionado." });
      }
      res.status(200).json(entrega.envios[0].productos);
  } catch (error) {
      console.error("Error al obtener productos por IdEntregaOK:", error);
      next(error);
  }
};

//Devuelve el historial de seguimiento de un envío específico (IdEntregaOK).
export const getSeguimientoByEntregaId = async (req, res, next) => {
  try {
      const { id } = req.params;
      const entrega = await Entrega.findOne(
          { "envios.IdEntregaOK": id },
          { "envios.$.rastreos.seguimiento": 1 }
      );
      if (!entrega) {
          return res.status(404).json({ message: "No se encontró el seguimiento para el envío proporcionado." });
      }
      res.status(200).json(entrega.envios[0].rastreos.seguimiento);
  } catch (error) {
      console.error("Error al obtener seguimiento por IdEntregaOK:", error);
      next(error);
  }
};






  
    

      
      
      
      
      
      

    
 

  

  
  
