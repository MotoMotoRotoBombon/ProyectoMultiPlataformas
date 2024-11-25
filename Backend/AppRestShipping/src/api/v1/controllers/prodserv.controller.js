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

// Obtener todos los envíos agrupados por IdInstitutoOK
export const getAllEnvios = async (req, res, next) => {
  try {
    // Busca todos los registros en la base de datos
    const registros = await Entrega.find({}, { IdInstitutoOK: 1, envios: 1 });

    // Filtrar y estructurar la respuesta para cumplir con el formato solicitado
    const resultado = registros.map((registro) => ({
      IdInstitutoOK: registro.IdInstitutoOK,
      envios: registro.envios.map((envio) => ({
        IdDomicilioOK: envio.IdDomicilioOK,
        IdPaqueteriaOK: envio.IdPaqueteriaOK,
        IdTipoMetodoEnvio: envio.IdTipoMetodoEnvio,
        CostoEnvio: envio.CostoEnvio,
      })),
    }));

    // Retornar la respuesta estructurada
    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al obtener todos los envíos:", error);
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

  // Obtener todos los rastreos de todos los institutos
export const getAllRastreos = async (req, res, next) => {
  try {
    // Buscar todos los registros que contengan rastreos
    const envios = await Entrega.find(
      { "envios.rastreos": { $exists: true } }, // Filtra registros que tengan rastreos
      {
        IdInstitutoOK: 1, // Incluye IdInstitutoOK
        "envios.rastreos": 1, // Incluye solo los rastreos dentro de envios
      }
    );

    // Formatear la respuesta para incluir IdInstitutoOK y los rastreos
    const rastreosData = envios.map((entrega) => ({
      IdInstitutoOK: entrega.IdInstitutoOK,
      rastreos: entrega.envios
        .filter((envio) => envio.rastreos) // Filtra envíos que tengan rastreos
        .map((envio) => envio.rastreos), // Obtén solo los rastreos
    }));

    res.status(200).json(rastreosData);
  } catch (error) {
    console.error("Error al obtener todos los rastreos:", error);
    next(error);
  }

};

//CRUD INFO ADD
//ADD 
// Agregar información adicional
export const addInfoAdicional = async (req, res, next) => {
  try {
    const { IdInstitutoOK } = req.params; // Obtener el ID del instituto desde los parámetros
    const { Etiqueta, Valor, Secuencia, Activo, FechaReg, UsuarioReg } = req.body; // Obtener datos del cuerpo de la solicitud

    // Buscar el documento correspondiente al ID del instituto
    const entrega = await Entrega.findOne({ IdInstitutoOK });

    if (!entrega) {
      return res
        .status(404)
        .json({ message: `No se encontró un registro con el ID Instituto: ${IdInstitutoOK}` });
    }

    // Crear el nuevo objeto de información adicional
    const nuevaInfoAdicional = {
      IdEtiqueta: Etiqueta,
      Etiqueta,
      Valor,
      Secuencia,
      detail_row: {
        Activo: Activo || "S",
        detail_row_reg: [
          {
            FechaReg: FechaReg || new Date(),
            UsuarioReg: UsuarioReg || "Sistema", // Usuario por defecto si no se proporciona
          },
        ],
      },
    };

    // Agregar el nuevo objeto a la lista de info_ad en el documento existente
    entrega.info_ad.push(nuevaInfoAdicional);

    // Guardar los cambios en la base de datos
    await entrega.save();

    // Responder con el nuevo objeto creado
    res.status(201).json({
      message: "Información adicional agregada correctamente.",
      infoAdicional: nuevaInfoAdicional,
    });
  } catch (error) {
    console.error("Error al agregar información adicional:", error);
    next(boom.internal(error.message));
  }
};

// Eliminar toda la información adicional por IdInstitutoOK
export const deleteInfoAdByInstitute = async (req, res) => {
  try {
    const { IdInstitutoOK } = req.params;

    // Buscar y actualizar el documento, eliminando la información adicional
    const updatedEntrega = await Entrega.findOneAndUpdate(
      { IdInstitutoOK },
      { $set: { info_ad: [] } }, // Vaciar el array de info_ad
      { new: true } // Retorna el documento actualizado
    );

    if (!updatedEntrega) {
      return res.status(404).json({
        message: `No se encontró información para el Instituto con ID: ${IdInstitutoOK}`,
      });
    }

    return res.status(200).json({
      message: "Información adicional eliminada correctamente.",
      updatedEntrega,
    });
  } catch (error) {
    console.error("Error al eliminar información adicional:", error);
    res.status(500).json({
      message: "Error interno del servidor.",
      error: error.message,
    });
  }
};

