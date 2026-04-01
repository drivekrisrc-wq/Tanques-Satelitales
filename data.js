// ============================================================
//  data.js  –  Datos del dashboard de Tanques Satelitales
//  Actualiza este archivo cada vez que cambien los datos del Excel
//  Última actualización: 18/03/2026
// ============================================================

const ULTIMA_ACTUALIZACION = "18/03/2026";

// Estado actual de cada tanque
// Campos: id, tipo, capacidad (m³), nivel (m³), pct (0-1),
//         fechaRegistro, diasDesdeRetiro, notas
const TANQUES = [
  { id: 1,  tipo: "Aguas Residuales", capacidad: 10,   nivel: 9,    pct: 0.90, fechaRegistro: "17/03/2026", diasDesdeRetiro: 5,  notas: "" },
  { id: 2,  tipo: "Aguas Residuales", capacidad: 30,   nivel: 27,   pct: 0.90, fechaRegistro: "17/03/2026", diasDesdeRetiro: 12, notas: "" },
  { id: 4,  tipo: "Aguas Aceitosas",  capacidad: 5.7,  nivel: 0,    pct: 0.00, fechaRegistro: "17/03/2026", diasDesdeRetiro: 2,  notas: "" },
  { id: 5,  tipo: "Aguas Residuales", capacidad: 7.5,  nivel: 0,    pct: 0.00, fechaRegistro: "17/03/2026", diasDesdeRetiro: 20, notas: "" },
  { id: 6,  tipo: "Aguas Residuales", capacidad: 7.5,  nivel: 7.5,  pct: 1.00, fechaRegistro: "17/03/2026", diasDesdeRetiro: 8,  notas: "" },
  { id: 7,  tipo: "Aguas Residuales", capacidad: 7.5,  nivel: 0,    pct: 0.00, fechaRegistro: "17/03/2026", diasDesdeRetiro: 3,  notas: "" },
  { id: 8,  tipo: "Aguas Aceitosas",  capacidad: 5.7,  nivel: 0,    pct: 0.00, fechaRegistro: "17/03/2026", diasDesdeRetiro: 7,  notas: "" },
  { id: 9,  tipo: "Aguas Aceitosas",  capacidad: 5.7,  nivel: 0,    pct: 0.00, fechaRegistro: "17/03/2026", diasDesdeRetiro: 25, notas: "" },
  { id: 10, tipo: "Aguas Aceitosas",  capacidad: 5.7,  nivel: 1.71, pct: 0.30, fechaRegistro: "17/03/2026", diasDesdeRetiro: 10, notas: "" },
  { id: 13, tipo: "Aguas Aceitosas",  capacidad: 5.7,  nivel: 0,    pct: 0.00, fechaRegistro: "17/03/2026", diasDesdeRetiro: 1,  notas: "" },
  { id: 14, tipo: "Aguas Aceitosas",  capacidad: 5.7,  nivel: 2.28, pct: 0.40, fechaRegistro: "17/03/2026", diasDesdeRetiro: 18, notas: "" },
  { id: 15, tipo: "Aguas Residuales", capacidad: 7.5,  nivel: 0,    pct: 0.00, fechaRegistro: "17/03/2026", diasDesdeRetiro: 9,  notas: "" },
];

// Historial de mediciones de la Bitácora de Registros
// Campos: fecha, tanque (id), tipo, pct (0-1), capacidad (m³), nivel (m³)
const HISTORIAL = [
  { fecha: "16/03/2026", tanque: 1,  tipo: "Aguas Residuales", pct: 0.60, capacidad: 10,  nivel: 6    },
  { fecha: "16/03/2026", tanque: 2,  tipo: "Aguas Residuales", pct: 0.10, capacidad: 30,  nivel: 3    },
  { fecha: "15/03/2026", tanque: 4,  tipo: "Aguas Aceitosas",  pct: 0.06, capacidad: 5.7, nivel: 0.34 },
  { fecha: "13/03/2026", tanque: 1,  tipo: "Aguas Residuales", pct: 0.90, capacidad: 10,  nivel: 9    },
  { fecha: "13/03/2026", tanque: 2,  tipo: "Aguas Residuales", pct: 0.15, capacidad: 30,  nivel: 4.5  },
  { fecha: "13/03/2026", tanque: 5,  tipo: "Aguas Residuales", pct: 0.00, capacidad: 7.5, nivel: 0    },
  { fecha: "13/03/2026", tanque: 6,  tipo: "Aguas Residuales", pct: 1.00, capacidad: 7.5, nivel: 7.5  },
  { fecha: "13/03/2026", tanque: 7,  tipo: "Aguas Residuales", pct: 0.00, capacidad: 7.5, nivel: 0    },
  { fecha: "13/03/2026", tanque: 15, tipo: "Aguas Residuales", pct: 1.00, capacidad: 7.5, nivel: 7.5  },
  { fecha: "13/03/2026", tanque: 4,  tipo: "Aguas Aceitosas",  pct: 0.00, capacidad: 5.7, nivel: 0    },
  { fecha: "13/03/2026", tanque: 8,  tipo: "Aguas Aceitosas",  pct: 0.00, capacidad: 5.7, nivel: 0    },
  { fecha: "13/03/2026", tanque: 9,  tipo: "Aguas Aceitosas",  pct: 0.00, capacidad: 5.7, nivel: 0    },
  { fecha: "13/03/2026", tanque: 10, tipo: "Aguas Aceitosas",  pct: 0.30, capacidad: 5.7, nivel: 1.71 },
  { fecha: "13/03/2026", tanque: 13, tipo: "Aguas Aceitosas",  pct: 0.00, capacidad: 5.7, nivel: 0    },
  { fecha: "13/03/2026", tanque: 14, tipo: "Aguas Aceitosas",  pct: 0.40, capacidad: 5.7, nivel: 2.28 },
  { fecha: "17/03/2026", tanque: 1,  tipo: "Aguas Residuales", pct: 0.90, capacidad: 10,  nivel: 9    },
  { fecha: "17/03/2026", tanque: 2,  tipo: "Aguas Residuales", pct: 0.90, capacidad: 30,  nivel: 27   },
  { fecha: "17/03/2026", tanque: 5,  tipo: "Aguas Residuales", pct: 0.00, capacidad: 7.5, nivel: 0    },
  { fecha: "17/03/2026", tanque: 6,  tipo: "Aguas Residuales", pct: 1.00, capacidad: 7.5, nivel: 7.5  },
  { fecha: "17/03/2026", tanque: 7,  tipo: "Aguas Residuales", pct: 0.00, capacidad: 7.5, nivel: 0    },
  { fecha: "17/03/2026", tanque: 15, tipo: "Aguas Residuales", pct: 0.00, capacidad: 7.5, nivel: 0    },
  { fecha: "17/03/2026", tanque: 4,  tipo: "Aguas Aceitosas",  pct: 0.00, capacidad: 5.7, nivel: 0    },
  { fecha: "17/03/2026", tanque: 8,  tipo: "Aguas Aceitosas",  pct: 0.00, capacidad: 5.7, nivel: 0    },
  { fecha: "17/03/2026", tanque: 9,  tipo: "Aguas Aceitosas",  pct: 0.00, capacidad: 5.7, nivel: 0    },
  { fecha: "17/03/2026", tanque: 10, tipo: "Aguas Aceitosas",  pct: 0.30, capacidad: 5.7, nivel: 1.71 },
  { fecha: "17/03/2026", tanque: 13, tipo: "Aguas Aceitosas",  pct: 0.00, capacidad: 5.7, nivel: 0    },
  { fecha: "17/03/2026", tanque: 14, tipo: "Aguas Aceitosas",  pct: 0.40, capacidad: 5.7, nivel: 2.28 },
];

// Umbrales del semáforo (no cambiar salvo que se redefina la política)
const UMBRALES = {
  urgente: 0.90,   // >= 90% → RETIRO URGENTE
  proximo: 0.75,   // >= 75% → RETIRO PRÓXIMO
  medio:   0.50,   // >= 50% → NIVEL MEDIO
                   //  < 50% → NIVEL BAJO
};
