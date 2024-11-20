
import Entrega from '../models/ProdServ';

class EntregaService {
    async listAll() {
        try {
            return await Entrega.find({});
        } catch (error) {
            throw error;
        }
    }

    async findById(entregaId) {
        try {
            return await Entrega.findById(entregaId);
        } catch (error) {
            throw error;
        }
    }

    async create(entregaData) {
        try {
            const entrega = new Entrega(entregaData);
            return await entrega.save();
        } catch (error) {
            throw error;
        }
    }

    async update(entregaId, entregaData) {
        try {
            return await Entrega.findByIdAndUpdate(entregaId, entregaData, { new: true });
        } catch (error) {
            throw error;
        }
    }

   // Eliminar un envío por IdInstitutoOK
async deleteByIdInstitutoOK(IdInstitutoOK) {
    try {
      return await Entrega.findOneAndDelete({ IdInstitutoOK });
    } catch (error) {
      throw error;
    }
  }

  async getResumenPorPaqueteria() {
    try {
        return await Entrega.aggregate([
            { $unwind: "$envios" },
            {
                $group: {
                    _id: "$envios.IdPaqueteriaOK",
                    TotalEnvios: { $sum: 1 },
                    CostoTotal: { $sum: "$envios.CostoEnvio" },
                },
            },
            {
                $project: {
                    Paqueteria: "$_id",
                    TotalEnvios: 1,
                    CostoTotal: 1,
                    _id: 0,
                },
            },
        ]);
    } catch (error) {
        throw error;
    }
}

async getInfoAdByIdInstituto(idInstitutoOK) {
  try {
      const infoAd = await Entrega.findOne(
          { IdInstitutoOK: idInstitutoOK },
          { info_ad: 1, _id: 0 }
      );
      return infoAd ? infoAd.info_ad : null;
  } catch (error) {
      throw error;
  }
}

async getEntregasByFecha(fechaInicio, fechaFin) {
  try {
      return await Entrega.find({
          "envios.info_ad.detail_row.detail_row_reg.FechaReg": {
              $gte: new Date(fechaInicio),
              $lte: new Date(fechaFin),
          },
      });
  } catch (error) {
      throw error;
  }
}

async getProductosByEntregaId(idEntregaOK) {
  try {
      const entrega = await Entrega.findOne(
          { "envios.IdEntregaOK": idEntregaOK },
          { "envios.$.productos": 1 }
      );
      return entrega ? entrega.envios[0].productos : null;
  } catch (error) {
      throw error;
  }
}

async getSeguimientoByEntregaId(idEntregaOK) {
  try {
      const entrega = await Entrega.findOne(
          { "envios.IdEntregaOK": idEntregaOK },
          { "envios.$.rastreos.seguimiento": 1 }
      );
      return entrega ? entrega.envios[0].rastreos.seguimiento : null;
  } catch (error) {
      throw error;
  }
}




  

  
  
  
  
  
}

export default new EntregaService();
