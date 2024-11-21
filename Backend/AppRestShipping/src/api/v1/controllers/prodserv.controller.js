import entregaService from '../services/prodServ.service';
import Entrega from '../models/ProdServ'; // Verifica que el path sea correcto
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


    // Obtener la info_ad de un IdInstitutoOK
export const getInfoAdByIdInstituto = async (req, res, next) => {
    try {
      const { idInstitutoOK } = req.params;
      
      // Buscar el registro por IdInstitutoOK
      const entrega = await Entrega.findOne({ IdInstitutoOK: idInstitutoOK }, { IdInstitutoOK: 1, info_ad: 1 });
      
      if (!entrega) {
        return res.status(404).json({ message: `No se encontró información para el IdInstitutoOK: ${idInstitutoOK}` });
      }
  
      // Retornar solo el IdInstitutoOK y la información de info_ad
      return res.status(200).json({
        IdInstitutoOK: entrega.IdInstitutoOK,
        info_ad: entrega.info_ad,
      });
    } catch (error) {
      console.error("Error al obtener la información adicional por IdInstitutoOK:", error);
      next(error);
    }
  };

  // Obtener todas las ID del Instituto con su info_ad
export const getAllInstitutesInfoAd = async (req, res, next) => {
  try {
    // Busca todas las entradas en la colección, pero solo selecciona los campos requeridos
    const entregas = await Entrega.find({}, { IdInstitutoOK: 1, info_ad: 1 });

    if (!entregas || entregas.length === 0) {
      return res.status(404).json({ message: "No se encontró información de institutos." });
    }

    // Devuelve las ID del Instituto y su info_ad
    return res.status(200).json(entregas);
  } catch (error) {
    console.error("Error al obtener la información de todos los institutos:", error);
    next(error);
  }
};


  // Obtener productos por IdInstitutoOK
export const getProductosByInstituto = async (req, res, next) => {
    const { IdInstitutoOK } = req.params;
    try {
        // Buscar todas las entregas asociadas al IdInstitutoOK
        const entregas = await Entrega.find({ IdInstitutoOK });

        // Si no hay entregas para el IdInstitutoOK, retorna un mensaje vacío
        if (!entregas || entregas.length === 0) {
            return res.status(404).json({
                message: `No se encontraron entregas para el instituto: ${IdInstitutoOK}`,
            });
        }

        // Extraer todos los productos asociados a los envíos
        const productos = entregas.flatMap((entrega) =>
            entrega.envios.flatMap((envio) => envio.productos)
        );

        // Si no hay productos, responde con un mensaje vacío
        if (productos.length === 0) {
            return res.status(404).json({
                message: `No se encontraron productos para el instituto: ${IdInstitutoOK}`,
            });
        }

        // Responder con la lista de productos
        res.status(200).json({
            IdInstitutoOK,
            productos,
        });
    } catch (error) {
        console.error("Error en getProductosByInstituto:", error);
        next(error);
    }
};

// Controlador: Obtener todos los productos
export const getAllProducts = async (req, res, next) => {
  try {
    const entregas = await Entrega.find({}, { IdInstitutoOK: 1, "envios.productos": 1 });
    if (!entregas.length) {
      return res.status(404).json({ message: "No se encontraron productos." });
    }

    const productosPorInstituto = entregas.map((entrega) => ({
      IdInstitutoOK: entrega.IdInstitutoOK,
      productos: entrega.envios.flatMap((envio) => envio.productos),
    }));

    return res.status(200).json(productosPorInstituto);
  } catch (error) {
    console.error("Error al obtener todos los productos:", error);
    next(error);
  }
};

// Obtener todas las entregas completas por IdInstitutoOK
export const getEntregasByInstituto = async (req, res, next) => {
    const { IdInstitutoOK } = req.params;

    try {
        // Buscar todas las entregas asociadas al IdInstitutoOK
        const entregas = await Entrega.find({ IdInstitutoOK });

        // Si no hay entregas para el IdInstitutoOK, retorna un mensaje vacío
        if (!entregas || entregas.length === 0) {
            return res.status(404).json({
                message: `No se encontraron entregas para el instituto: ${IdInstitutoOK}`,
            });
        }

        // Responder con todas las entregas completas
        res.status(200).json({
            IdInstitutoOK,
            entregas,
        });
    } catch (error) {
        console.error("Error en getEntregasByInstituto:", error);
        next(error);
    }
};

// Obtener envíos con el IdInstitutoOK en el nivel superior
export const getEnviosByInstitutoWithId = async (req, res, next) => {
    try {
      const { IdInstitutoOK } = req.params;
  
      // Buscar el documento correspondiente al IdInstitutoOK
      const data = await Entrega.findOne(
        { IdInstitutoOK },
        {
          IdInstitutoOK: 1, // Incluir solo el IdInstitutoOK
          "envios.IdDomicilioOK": 1,
          "envios.IdPaqueteriaOK": 1,
          "envios.IdTipoMetodoEnvio": 1,
          "envios.CostoEnvio": 1,
          _id: 0, // Excluir el campo _id del documento principal
        }
      );
  
      if (!data) {
        return res
          .status(404)
          .json({ message: `No se encontraron datos para el instituto ${IdInstitutoOK}.` });
      }
  
      // Construir la respuesta con el formato requerido
      const response = {
        IdInstitutoOK: data.IdInstitutoOK,
        envios: data.envios,
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error en getEnviosByInstitutoWithId:", error);
      next(error);
    }
  };
  
  // Obtener rastreos con el IdInstitutoOK en el nivel superior
export const getRastreosByInstituto = async (req, res, next) => {
    try {
      const { IdInstitutoOK } = req.params;
  
      // Buscar el documento correspondiente al IdInstitutoOK
      const data = await Entrega.findOne(
        { IdInstitutoOK },
        {
          IdInstitutoOK: 1, // Incluir solo el IdInstitutoOK
          "envios.rastreos": 1, // Incluir solo el campo rastreos dentro de envios
          _id: 0, // Excluir el campo _id del documento principal
        }
      );
  
      if (!data) {
        return res
          .status(404)
          .json({ message: `No se encontraron datos de rastreo para el instituto ${IdInstitutoOK}.` });
      }
  
      // Construir la respuesta con el formato requerido
      const response = {
        IdInstitutoOK: data.IdInstitutoOK,
        rastreos: data.envios.map((envio) => envio.rastreos), // Extraer solo rastreos
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error en getRastreosByInstituto:", error);
      next(error);
    }
  };
  


  
  
  


  

