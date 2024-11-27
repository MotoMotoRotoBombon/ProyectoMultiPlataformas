"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var entregaSchema = new mongoose.Schema({
  IdInstitutoOK: {
    type: String,
    required: true
  },
  IdNegocioOK: {
    type: String,
    required: true
  },
  IdEntregaOK: {
    type: String,
    required: true
  },
  IdEntregaBK: {
    type: String
  },
  IdOrdenOK: {
    type: String
  },
  info_ad: [{
    IdEtiquetaOK: {
      type: String
    },
    IdEtiqueta: {
      type: String,
      required: true
    },
    Etiqueta: {
      type: String,
      required: true
    },
    Valor: {
      type: String
    },
    IdTipoSeccionOK: {
      type: String
    },
    Secuencia: {
      type: Number
    },
    detail_row: {
      Activo: {
        type: String,
        "default": 'S'
      },
      Borrado: {
        type: String,
        "default": 'N'
      },
      detail_row_reg: [{
        FechaReg: {
          type: Date,
          "default": Date.now
        },
        UsuarioReg: {
          type: String
        }
      }],
      _id: false
    },
    _id: false
  }],
  envios: [{
    IdDomicilioOK: {
      type: String
    },
    IdPaqueteriaOK: {
      type: String
    },
    IdTipoMetodoEnvio: {
      type: String
    },
    CostoEnvio: {
      type: Number
    },
    info_ad: [{
      IdEtiquetaOK: {
        type: String
      },
      IdEtiqueta: {
        type: String,
        required: true
      },
      Etiqueta: {
        type: String,
        required: true
      },
      Valor: {
        type: String
      },
      IdTipoSeccionOK: {
        type: String
      },
      Secuencia: {
        type: Number
      },
      detail_row: {
        Activo: {
          type: String,
          "default": 'S'
        },
        Borrado: {
          type: String,
          "default": 'N'
        },
        detail_row_reg: [{
          FechaReg: {
            type: Date,
            "default": Date.now
          },
          UsuarioReg: {
            type: String
          }
        }],
        _id: false
      },
      _id: false
    }],
    productos: [{
      IdProdServOK: {
        type: String
      },
      IdPresentaOK: {
        type: String
      },
      DesProdServ: {
        type: String
      },
      DesPresenta: {
        type: String
      },
      CantidadPed: {
        type: Number
      },
      CantidadEnt: {
        type: Number
      }
    }],
    estatus: [{
      IdTipoEstatusOK: {
        type: String
      },
      Actual: {
        type: String
      },
      Observacion: {
        type: String
      },
      detail_row: {
        Activo: {
          type: String,
          "default": 'S'
        },
        Borrado: {
          type: String,
          "default": 'N'
        },
        detail_row_reg: [{
          FechaReg: {
            type: Date,
            "default": Date.now
          },
          UsuarioReg: {
            type: String
          }
        }],
        _id: false
      },
      _id: false
    }],
    rastreos: {
      NumeroGuia: {
        type: String
      },
      IdRepartidorOK: {
        type: String
      },
      NombreRepartidor: {
        type: String
      },
      Alias: {
        type: String
      },
      seguimiento: [{
        Ubicacion: {
          type: String
        },
        DesUbicacion: {
          type: String
        },
        Referencias: {
          type: String
        },
        Observacion: {
          type: String
        },
        FechaReg: {
          type: Date
        },
        UsuarioReg: {
          type: String
        }
      }],
      _id: false
    }
  }],
  detail_row: {
    Activo: {
      type: String,
      "default": 'S'
    },
    Borrado: {
      type: String,
      "default": 'N'
    },
    detail_row_reg: [{
      FechaReg: {
        type: Date,
        "default": Date.now
      },
      UsuarioReg: {
        type: String
      }
    }]
  }
});
var _default = exports["default"] = mongoose.model('Entrega', entregaSchema, 'entregas');