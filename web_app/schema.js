// schema.js - USDA Soil Survey Picklists & Munsell Data
const SCHEMA = {
  Calicatas: {
    material_parental: [
      { label: "Aluvial (ALL)", value: "ALL" },
      { label: "Ceniza Volcánica (ASH)", value: "ASH" },
      { label: "Coluvial (COL)", value: "COL" },
      { label: "Residuo de Roca / In Situ (RES)", value: "RES" },
      { label: "Eólico / Loess (LOE)", value: "LOE" },
      { label: "Orgánico (ORM)", value: "ORM" }
    ],
    forma_relieve: [
      { label: "Abanico Aluvial (AF)", value: "AF" },
      { label: "Cresta (CT)", value: "CT" },
      { label: "Depresión o Cuenca (DP)", value: "DP" },
      { label: "Interfluvio (IF)", value: "IF" },
      { label: "Plano / Planicie (PL)", value: "PL" },
      { label: "Ladera de Cerro (SS)", value: "SS" },
      { label: "Terraza (TR)", value: "TR" },
      { label: "Fondo de Valle (VF)", value: "VF" }
    ],
    pedregosidad_sup: [
      { label: "Sin Piedras / Clase 0 [<0.01%] (Clase 0)", value: "Clase 0" },
      { label: "Poco Pedregoso / Clase 1 [0.01 - 0.1%] (Clase 1)", value: "Clase 1" },
      { label: "Pedregoso / Clase 2 [0.1 - 3%] (Clase 2)", value: "Clase 2" },
      { label: "Muy Pedregoso / Clase 3 [3 - 15%] (Clase 3)", value: "Clase 3" },
      { label: "Extremadamente Pedregoso / Clase 4 [>15%] (Clase 4)", value: "Clase 4" }
    ],
    condicion_tiempo: [
      { label: "Soleado / Despejado (SU)", value: "SU" },
      { label: "Parcialmente Nublado (PC)", value: "PC" },
      { label: "Nublado (OV)", value: "OV" },
      { label: "Lluvia (RA)", value: "RA" },
      { label: "Aguanieve (SL)", value: "SL" },
      { label: "Nieve (SN)", value: "SN" }
    ],
    hillslope_pos: [
      { label: "Cumbre (SU)", value: "SU" },
      { label: "Hombro (SH)", value: "SH" },
      { label: "Ladera Media / Ladera (BS)", value: "BS" },
      { label: "Pie de Ladera (FS)", value: "FS" },
      { label: "Base de Ladera (TS)", value: "TS" }
    ],
    slope_shape: [
      { label: "Lineal - Lineal (LL)", value: "LL" },
      { label: "Cóncavo - Cóncavo (CC)", value: "CC" },
      { label: "Convexo - Convexo (VV)", value: "VV" },
      { label: "Lineal - Cóncavo (LC)", value: "LC" },
      { label: "Lineal - Convexo (LV)", value: "LV" },
      { label: "Cóncavo - Lineal (CL)", value: "CL" },
      { label: "Convexo - Lineal (VL)", value: "VL" },
      { label: "Cóncavo - Convexo (CV)", value: "CV" },
      { label: "Convexo - Cóncavo (VC)", value: "VC" }
    ],
    drenaje_clase: [
      { label: "Subacuático (SA)", value: "SA" },
      { label: "Muy Pobremente Drenado (VP)", value: "VP" },
      { label: "Pobremente Drenado (PD)", value: "PD" },
      { label: "Algo Pobremente Drenado (SP)", value: "SP" },
      { label: "Moderadamente Bien Drenado (MW)", value: "MW" },
      { label: "Bien Drenado (WD)", value: "WD" },
      { label: "Algo Excesivamente Drenado (SE)", value: "SE" },
      { label: "Excesivamente Drenado (ED)", value: "ED" }
    ],
    estado_humedad: [
      { label: "Seco (D)", value: "Seco" },
      { label: "Ligeramente Húmedo (SM)", value: "Ligeramente Húmedo" },
      { label: "Húmedo (M)", value: "Húmedo" },
      { label: "Muy Húmedo (VM)", value: "Muy Húmedo" },
      { label: "Saturado (S)", value: "Saturado" }
    ]
  },
  Horizontes: {
    textura_campo: [
      { label: "Arena (S)", value: "S" },
      { label: "Arena Franca (LS)", value: "LS" },
      { label: "Franco Arenoso (SL)", value: "SL" },
      { label: "Franco (L)", value: "L" },
      { label: "Franco Limoso (SIL)", value: "SIL" },
      { label: "Limo (SI)", value: "SI" },
      { label: "Franco Arcillo Arenoso (SCL)", value: "SCL" },
      { label: "Franco Arcilloso (CL)", value: "CL" },
      { label: "Franco Arcillo Limoso (SICL)", value: "SICL" },
      { label: "Arcillo Arenoso (SC)", value: "SC" },
      { label: "Arcillo Limoso (SIC)", value: "SIC" },
      { label: "Arcilla (C)", value: "C" }
    ],
    estructura_tipo: [
      { label: "Granular (GR)", value: "GR" },
      { label: "Bloques Angulares (ABK)", value: "ABK" },
      { label: "Bloques Subangulares (SBK)", value: "SBK" },
      { label: "Prismática (PR)", value: "PR" },
      { label: "Columnar (COL)", value: "COL" },
      { label: "Laminar (PL)", value: "PL" },
      { label: "Lenticular (LP)", value: "LP" },
      { label: "En Cuña (WEG)", value: "WEG" },
      { label: "Sin Estructura - Grano Suelto (SGR)", value: "SGR" },
      { label: "Sin Estructura - Masiva (MA)", value: "MA" }
    ],
    estructura_grado: [
      { label: "Sin Estructura (0)", value: "0" },
      { label: "Débil (1)", value: "1" },
      { label: "Moderada (2)", value: "2" },
      { label: "Fuerte (3)", value: "3" }
    ],
    consistencia_humedo: [
      { label: "Suelto (L)", value: "L" },
      { label: "Muy Friable (VFR)", value: "VFR" },
      { label: "Friable (FR)", value: "FR" },
      { label: "Firme (FI)", value: "FI" },
      { label: "Muy Firme (VFI)", value: "VFI" },
      { label: "Extremadamente Firme (EFI)", value: "EFI" },
      { label: "Ligeramente Rígido (SR)", value: "SR" },
      { label: "Rígido (R)", value: "R" },
      { label: "Muy Rígido (VR)", value: "VR" }
    ],
    efervescencia_hcl: [
      { label: "Sin Efervescencia (NE)", value: "NE" },
      { label: "Muy Débil (VS)", value: "VS" },
      { label: "Ligeramente Efervescente (SL)", value: "SL" },
      { label: "Fuertemente Efervescente (ST)", value: "ST" },
      { label: "Violentamente Efervescente (VE)", value: "VE" }
    ],
    limite_nitidez: [
      { label: "Muy Abrupto [<0.5 cm] (V)", value: "V" },
      { label: "Abrupto [0.5 - <2 cm] (A)", value: "A" },
      { label: "Claro [2 - <5 cm] (C)", value: "C" },
      { label: "Gradual [5 - <15 cm] (G)", value: "G" },
      { label: "Difuso [>=15 cm] (D)", value: "D" }
    ],
    limite_topografia: [
      { label: "Suave / Plano (S)", value: "S" },
      { label: "Ondulado (W)", value: "W" },
      { label: "Irregular (I)", value: "I" },
      { label: "Discontinuo / Roto (B)", value: "B" }
    ],
    estructura_tamano: [
      { label: "Muy Fina (VF)", value: "VF" },
      { label: "Fina (F)", value: "F" },
      { label: "Media (M)", value: "M" },
      { label: "Gruesa (CO)", value: "CO" },
      { label: "Muy Gruesa (VC)", value: "VC" }
    ],
    rmf_cantidad: [
      { label: "Pocos [<2%] (F)", value: "F" },
      { label: "Comunes [2 - 20%] (C)", value: "C" },
      { label: "Muchos / Abundantes [>20%] (M)", value: "M" }
    ],
    rmf_contraste: [
      { label: "Tenue / Faint (F)", value: "F" },
      { label: "Distinto / Distinct (D)", value: "D" },
      { label: "Prominente / Prominent (P)", value: "P" }
    ],
    raices_cantidad: [
      { label: "Ninguna (0)", value: "0" },
      { label: "Pocas (1)", value: "1" },
      { label: "Comunes (2)", value: "2" },
      { label: "Muchas (3)", value: "3" }
    ],
    raices_tamano: [
      { label: "Muy Finas [<1mm] (VF)", value: "VF" },
      { label: "Finas [1-2mm] (F)", value: "F" },
      { label: "Medias [2-5mm] (M)", value: "M" },
      { label: "Gruesas [>5mm] (CO)", value: "CO" }
    ],
    poros_cantidad: [
      { label: "Ninguno (0)", value: "0" },
      { label: "Pocos (1)", value: "1" },
      { label: "Comunes (2)", value: "2" },
      { label: "Muchos (3)", value: "3" }
    ],
    poros_tamano: [
      { label: "Muy Finos [<0.5mm] (VF)", value: "VF" },
      { label: "Finos [0.5-1mm] (F)", value: "F" },
      { label: "Medios [1-2mm] (M)", value: "M" },
      { label: "Gruesos [>2mm] (CO)", value: "CO" }
    ],
    pedregosidad_clase: [
      { label: "Sin Fragmentos [<15% vol]", value: "NONE" },
      { label: "Gravoso / Pedregoso [15 - 35% vol] (GR)", value: "GR" },
      { label: "Muy Gravoso / Muy Pedregoso [35 - 60% vol] (VGR)", value: "VGR" },
      { label: "Extremadamente Gravoso / Pedregoso [>60% vol] (XGR)", value: "XGR" }
    ],
    frag_tipo: [
      { label: "Gravas Finas [2 - 5 mm]", value: "FGR" },
      { label: "Gravas Gruesas [5 - 75 mm]", value: "CGR" },
      { label: "Piedras [75 - 250 mm]", value: "STN" },
      { label: "Bolones / Rocas [>250 mm]", value: "BYD" },
      { label: "Fragmentos Angulares / Lajosos", value: "CHN" }
    ]
  },

  Rasgos_Redox: {
    rmf_tipo: [
      { label: "Concentración Redox (RC)", value: "RC" },
      { label: "Agotamiento Redox / Depletion (RD)", value: "RD" },
      { label: "Matriz Reducida (RM)", value: "RM" }
    ],
    rmf_cantidad: [
      { label: "Pocos [<2%] (F)", value: "F" },
      { label: "Comunes [2-20%] (C)", value: "C" },
      { label: "Muchos [>20%] (M)", value: "M" }
    ],
    rmf_contraste: [
      { label: "Tenue (F)", value: "F" },
      { label: "Distinto (D)", value: "D" },
      { label: "Prominente (P)", value: "P" }
    ],
    rmf_tamano: [
      { label: "Fino [<2mm] (F)", value: "F" },
      { label: "Medio [2-5mm] (M)", value: "M" },
      { label: "Grueso [5-15mm] (C)", value: "C" },
      { label: "Muy Grueso [>15mm] (VC)", value: "VC" }
    ],
    rmf_ubicacion: [
      { label: "En la Matriz del Horizonte (MX)", value: "MX" },
      { label: "A lo largo de Poros (PO)", value: "PO" },
      { label: "En la Superficie de Agregados / Pedfaces (PF)", value: "PF" },
      { label: "En Canales de Raíces (RC)", value: "RC" }
    ]
  }
};

// Munsell Soil Color Matrix (Matriz oficial del libro de suelos)
const MUNSELL_SOIL_MATRIX = {
  "5R": [
    "8/1", "8/2", "8/3", "8/4",
    "7/1", "7/2", "7/3", "7/4",
    "6/1", "6/2", "6/3", "6/4", "6/6", "6/8",
    "5/1", "5/2", "5/3", "5/4", "5/6", "5/8",
    "4/1", "4/2", "4/3", "4/4", "4/6", "4/8",
    "3/1", "3/2", "3/3", "3/4", "3/6", "3/8",
    "2.5/1", "2.5/2", "2.5/3", "2.5/4"
  ],
  "7.5R": [
    "8/1", "8/2", "8/3", "8/4",
    "7/1", "7/2", "7/3", "7/4", "7/6", "7/8",
    "6/1", "6/2", "6/3", "6/4", "6/6", "6/8",
    "5/1", "5/2", "5/3", "5/4", "5/6", "5/8",
    "4/1", "4/2", "4/3", "4/4", "4/6", "4/8",
    "3/1", "3/2", "3/3", "3/4", "3/6", "3/8",
    "2.5/1", "2.5/2", "2.5/3", "2.5/4"
  ],
  "10R": [
    "8/1", "8/2", "8/3", "8/4",
    "7/1", "7/2", "7/3", "7/4", "7/6", "7/8",
    "6/1", "6/2", "6/3", "6/4", "6/6", "6/8",
    "5/1", "5/2", "5/3", "5/4", "5/6", "5/8",
    "4/1", "4/2", "4/3", "4/4", "4/6", "4/8",
    "3/1", "3/2", "3/3", "3/4", "3/6",
    "2.5/1", "2.5/2", "2.5/3"
  ],
  "2.5YR": [
    "8/1", "8/2", "8/3", "8/4",
    "7/1", "7/2", "7/3", "7/4", "7/6", "7/8",
    "6/1", "6/2", "6/3", "6/4", "6/6", "6/8",
    "5/1", "5/2", "5/3", "5/4", "5/6", "5/8",
    "4/1", "4/2", "4/3", "4/4", "4/6", "4/8",
    "3/1", "3/2", "3/3", "3/4", "3/6",
    "2.5/1", "2.5/2", "2.5/3", "2.5/4"
  ],
  "5YR": [
    "8/1", "8/2", "8/3", "8/4",
    "7/1", "7/2", "7/3", "7/4", "7/6", "7/8",
    "6/1", "6/2", "6/3", "6/4", "6/6", "6/8",
    "5/1", "5/2", "5/3", "5/4", "5/6", "5/8",
    "4/1", "4/2", "4/3", "4/4", "4/6",
    "3/1", "3/2", "3/3", "3/4",
    "2.5/1", "2.5/2"
  ],
  "7.5YR": [
    "8/1", "8/2", "8/3", "8/4", "8/6",
    "7/1", "7/2", "7/3", "7/4", "7/6", "7/8",
    "6/1", "6/2", "6/3", "6/4", "6/6", "6/8",
    "5/1", "5/2", "5/3", "5/4", "5/6", "5/8",
    "4/1", "4/2", "4/3", "4/4", "4/6",
    "3/1", "3/2", "3/3", "3/4",
    "2.5/1", "2.5/2", "2.5/3"
  ],
  "10YR": [
    "8/1", "8/2", "8/3", "8/4", "8/6", "8/8",
    "7/1", "7/2", "7/3", "7/4", "7/6", "7/8",
    "6/1", "6/2", "6/3", "6/4", "6/6", "6/8",
    "5/1", "5/2", "5/3", "5/4", "5/6", "5/8",
    "4/1", "4/2", "4/3", "4/4", "4/6",
    "3/1", "3/2", "3/3", "3/4", "3/6",
    "2/1", "2/2"
  ],
  "2.5Y": [
    "8/1", "8/2", "8/3", "8/4", "8/6", "8/8",
    "7/1", "7/2", "7/3", "7/4", "7/6", "7/8",
    "6/1", "6/2", "6/3", "6/4", "6/6", "6/8",
    "5/1", "5/2", "5/3", "5/4", "5/6",
    "4/1", "4/2", "4/3", "4/4",
    "3/1", "3/2", "3/3",
    "2.5/1"
  ],
  "5Y": [
    "8/1", "8/2", "8/3", "8/4", "8/6", "8/8",
    "7/1", "7/2", "7/3", "7/4", "7/6", "7/8",
    "6/1", "6/2", "6/3", "6/4", "6/6",
    "5/1", "5/2", "5/3", "5/4", "5/6",
    "4/1", "4/2", "4/3", "4/4",
    "3/1", "3/2",
    "2.5/1", "2.5/2"
  ],
  "10Y": [
    "6/2", "6/4",
    "5/2", "5/4",
    "4/2", "4/4",
    "3/2", "3/4"
  ],
  "5GY": [
    "6/2", "6/4",
    "5/2", "5/4",
    "4/2", "4/4",
    "3/2", "3/4"
  ],
  "GLEY 1 - N": [
    "8/0", "7/0", "6/0", "5/0", "4/0", "3/0", "2.5/0"
  ],
  "GLEY 1 - 10Y": [
    "8/1", "7/1", "6/1", "5/1", "4/1", "3/1", "2.5/1"
  ],
  "GLEY 1 - 5GY": [
    "8/1", "7/1", "6/1", "5/1", "4/1", "3/1", "2.5/1"
  ],
  "GLEY 1 - 10GY": [
    "8/1", "7/1", "6/1", "5/1", "4/1", "3/1", "2.5/1"
  ],
  "GLEY 1 - 5G": [
    "8/1", "8/2",
    "7/1", "7/2",
    "6/1", "6/2",
    "5/1", "5/2",
    "4/1", "4/2",
    "3/1", "3/2",
    "2.5/1", "2.5/2"
  ],
  "GLEY 2 - 10G": [
    "8/1", "7/1", "6/1", "5/1", "4/1", "3/1", "2.5/1"
  ],
  "GLEY 2 - 5BG": [
    "8/1", "7/1", "6/1", "5/1", "4/1", "3/1", "2.5/1"
  ],
  "GLEY 2 - 10BG": [
    "8/1", "7/1", "6/1", "5/1", "4/1", "3/1", "2.5/1"
  ],
  "GLEY 2 - 5B": [
    "8/1", "7/1", "6/1", "5/1", "4/1", "3/1", "2.5/1"
  ],
  "GLEY 2 - 10B": [
    "8/1", "7/1", "6/1", "5/1", "4/1", "3/1", "2.5/1"
  ],
  "GLEY 2 - 5PB": [
    "8/1", "7/1", "6/1", "5/1", "4/1", "3/1", "2.5/1"
  ],
  "WHITE PAGE - N": [
    "9.5/0", "9/0", "8.5/0", "8/0"
  ],
  "WHITE PAGE - 7.5YR": [
    "9.5/1", "9/1", "8.5/1", "8/1",
    "9.5/2", "9/2", "8.5/2", "8/2"
  ],
  "WHITE PAGE - 10YR": [
    "9.5/1", "9/1", "8.5/1", "8/1",
    "9.5/2", "9/2", "8.5/2", "8/2"
  ],
  "WHITE PAGE - 2.5Y": [
    "9.5/1", "9/1", "8.5/1", "8/1",
    "9.5/2", "9/2", "8.5/2", "8/2"
  ]
};

// Munsell Color Constants & Charts Tabs
const MUNSELL_HUES = [
  "5R", "7.5R", "10R", 
  "2.5YR", "5YR", "7.5YR", "10YR", 
  "2.5Y", "5Y", "10Y", "5GY",
  "GLEY 1", "GLEY 2", "WHITE PAGE"
];

// Approximate RGB/Hex colors for soil Munsell notation
function getMunsellColorHex(hue, value, chroma) {
  if (!hue || value === undefined || value === null) return "#A0A0A0";
  const h = String(hue).toUpperCase();
  const v = parseFloat(value) || 5;
  const c = parseFloat(chroma) || 1;
  
  let r = 140, g = 110, b = 50;
  
  if (h === "5R") { r = 180; g = 40; b = 40; }
  else if (h === "7.5R") { r = 170; g = 45; b = 40; }
  else if (h === "10R") { r = 160; g = 50; b = 40; }
  else if (h === "2.5YR") { r = 160; g = 70; b = 40; }
  else if (h === "5YR") { r = 160; g = 90; b = 45; }
  else if (h === "7.5YR") { r = 150; g = 105; b = 50; }
  else if (h === "10YR") { r = 140; g = 110; b = 50; }
  else if (h === "2.5Y") { r = 135; g = 120; b = 55; }
  else if (h === "5Y") { r = 125; g = 125; b = 55; }
  else if (h === "10Y") { r = 115; g = 130; b = 60; }
  else if (h === "5GY") { r = 95; g = 135; b = 70; }
  else if (h.includes("10GY") || h.includes("5G") || h.includes("5BG")) { r = 85; g = 130; b = 115; }
  else if (h.includes("10G") || h.includes("10BG") || h.includes("5B") || h.includes("10B") || h.includes("5PB")) { r = 80; g = 115; b = 135; }
  else if (h.includes("WHITE")) { r = 235; g = 235; b = 230; }
  else if (h === "N") { r = 128; g = 128; b = 128; }
  
  // Adjust brightness by Value (2 to 9.5)
  const valFactor = v / 5.0;
  r = Math.min(255, Math.max(15, Math.round(r * valFactor)));
  g = Math.min(255, Math.max(15, Math.round(g * valFactor)));
  b = Math.min(255, Math.max(15, Math.round(b * valFactor)));
  
  // Adjust saturation/chroma
  const chrFactor = (c === 0) ? 0 : c / 4.0;
  const avg = (r + g + b) / 3;
  r = Math.min(255, Math.max(0, Math.round(avg + (r - avg) * chrFactor)));
  g = Math.min(255, Math.max(0, Math.round(avg + (g - avg) * chrFactor)));
  b = Math.min(255, Math.max(0, Math.round(avg + (b - avg) * chrFactor)));

  const toHex = (n) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


