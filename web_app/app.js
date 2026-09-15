// app.js - Full Application Logic for Calicatas WebGIS (USDA)

// Global State
let state = {
  projects: [],
  activeProjectId: null,
  calicatas: [],
  selectedCalicataId: null,
  editingHorizonteId: null,
  currentHorizonRMFs: [],
  activeTab: 'list',
  currentMunsellTarget: null, // 'seco' or 'humedo'
  selectedHue: '10YR',
  tempMarker: null,
  map: null,
  markersLayer: null
};

// Initial Sample Projects
const INITIAL_DEMO_PROJECTS = [
  {
    id_proyecto: "PRJ-01",
    nombre: "Estudio Edafológico Valle Central",
    cliente: "Agrícola Santa Laura",
    ubicacion: "Rancagua, Región de O'Higgins",
    fecha_creacion: "2026-08-20",
    responsable: "Reinaldo Cordero",
    superficie_ha: 45.0,
    objetivo_estudio: "Estudio Agrológico y Capacidad de Uso de Suelo (CUS - SAG)",
    nivel_detalle: "Orden 2 - Detallado (1:10.000 a 1:25.000)",
    descripcion: "Levantamiento detallado de perfiles de suelo para zonificación y aptitud frutal."
  },
  {
    id_proyecto: "PRJ-02",
    nombre: "Línea Base Suelos Proyecto Solar El Romero",
    cliente: "Energías Renovables del Norte S.A.",
    ubicacion: "Vallenar, Región de Atacama",
    fecha_creacion: "2026-08-24",
    responsable: "Dra. Carolina Morales",
    superficie_ha: 120.0,
    objetivo_estudio: "Línea de Base Ambiental (SEIA / EIA / DIA)",
    nivel_detalle: "Orden 2 - Detallado (1:10.000 a 1:25.000)",
    descripcion: "Evaluación de capacidad de uso de suelo, erosión y estratigrafía para instalación de parque fotovoltaico."
  }
];

const INITIAL_DEMO_DATA = [
  // PRJ-01 Calicata
  {
    id_calicata: "CAL-01",
    proyecto_id: "PRJ-01",
    fecha: "2026-08-20",
    examinador: "Reinaldo Cordero",
    clasificacion_usda: "Typic Haploxeroll",
    material_parental: "ALL",
    forma_relieve: "TR",
    pendiente_pct: 2.5,
    pedregosidad_sup: "Clase 0",
    drenaje_clase: "WD",
    estado_humedad: "Húmedo",
    nivel_freatico_cm: null,
    prof_raices_cm: 75,
    profundidad_efectiva_cm: 110,
    condicion_tiempo: "SU",
    coord_x: -70.79289,
    coord_y: -34.44858,
    altitud_msnm: 540,
    foto_general: "",
    horizontes: [
      {
        id_horizonte: "HOR-01-A",
        designacion: "Ap",
        prof_sup_cm: 0,
        prof_inf_cm: 25,
        color_munsell_seco: "10YR 4/3",
        color_munsell_humedo: "10YR 2/2",
        textura_campo: "L",
        estructura_tipo: "GR",
        estructura_grado: "2",
        consistencia_humedo: "FR",
        efervescencia_hcl: "NE",
        limite_nitidez: "C",
        rasgos_redox: []
      },
      {
        id_horizonte: "HOR-01-B",
        designacion: "Bt",
        prof_sup_cm: 25,
        prof_inf_cm: 65,
        color_munsell_seco: "7.5YR 4/4",
        color_munsell_humedo: "7.5YR 3/4",
        textura_campo: "CL",
        estructura_tipo: "SBK",
        estructura_grado: "3",
        consistencia_humedo: "FI",
        efervescencia_hcl: "NE",
        limite_nitidez: "G",
        rasgos_redox: [
          {
            id_rmf: "RMF-01",
            rmf_tipo: "RC",
            rmf_cantidad: "C",
            rmf_contraste: "D",
            rmf_hue: "5YR",
            rmf_value: "4",
            rmf_chroma: "6",
            color_munsell_rmf: "5YR 4/6"
          }
        ]
      },
      {
        id_horizonte: "HOR-01-C",
        designacion: "C",
        prof_sup_cm: 65,
        prof_inf_cm: 110,
        color_munsell_seco: "2.5Y 6/3",
        color_munsell_humedo: "2.5Y 5/4",
        textura_campo: "SL",
        estructura_tipo: "MA",
        estructura_grado: "0",
        consistencia_humedo: "VFR",
        efervescencia_hcl: "SL",
        limite_nitidez: "D",
        rasgos_redox: []
      }
    ]
  },
  // PRJ-02 Calicata 1
  {
    id_calicata: "CAL-01",
    proyecto_id: "PRJ-02",
    fecha: "2026-08-24",
    examinador: "Dra. Carolina Morales",
    clasificacion_usda: "Typic Torriorthent",
    material_parental: "RES",
    forma_relieve: "PL",
    pendiente_pct: 1.2,
    pedregosidad_sup: "Clase 2",
    drenaje_clase: "ED",
    estado_humedad: "Seco",
    nivel_freatico_cm: null,
    prof_raices_cm: 25,
    profundidad_efectiva_cm: 50,
    condicion_tiempo: "SU",
    coord_x: -70.75540,
    coord_y: -28.57420,
    altitud_msnm: 680,
    foto_general: "",
    horizontes: [
      {
        id_horizonte: "HOR-02-A",
        designacion: "A",
        prof_sup_cm: 0,
        prof_inf_cm: 15,
        color_munsell_seco: "10YR 6/4",
        color_munsell_humedo: "10YR 4/4",
        textura_campo: "SL",
        estructura_tipo: "GR",
        estructura_grado: "1",
        consistencia_humedo: "VFR",
        efervescencia_hcl: "SL",
        limite_nitidez: "C",
        rasgos_redox: []
      },
      {
        id_horizonte: "HOR-02-C",
        designacion: "C",
        prof_sup_cm: 15,
        prof_inf_cm: 55,
        color_munsell_seco: "7.5YR 6/6",
        color_munsell_humedo: "7.5YR 5/6",
        textura_campo: "LS",
        estructura_tipo: "SCL",
        estructura_grado: "0",
        consistencia_humedo: "LO",
        efervescencia_hcl: "MO",
        limite_nitidez: "A",
        rasgos_redox: []
      },
      {
        id_horizonte: "HOR-02-R",
        designacion: "Cr",
        prof_sup_cm: 55,
        prof_inf_cm: 90,
        color_munsell_seco: "2.5YR 5/6",
        color_munsell_humedo: "2.5YR 4/6",
        textura_campo: "S",
        estructura_tipo: "MA",
        estructura_grado: "0",
        consistencia_humedo: "FI",
        efervescencia_hcl: "ST",
        limite_nitidez: "D",
        rasgos_redox: []
      }
    ]
  },
  // PRJ-02 Calicata 2
  {
    id_calicata: "CAL-02",
    proyecto_id: "PRJ-02",
    fecha: "2026-08-25",
    examinador: "Dra. Carolina Morales",
    clasificacion_usda: "Typic Haplocambid",
    material_parental: "ALL",
    forma_relieve: "AF",
    pendiente_pct: 3.0,
    pedregosidad_sup: "Clase 1",
    drenaje_clase: "WD",
    condicion_tiempo: "SU",
    coord_x: -70.75880,
    coord_y: -28.57710,
    altitud_msnm: 695,
    foto_general: "",
    horizontes: [
      {
        id_horizonte: "HOR-02-2A",
        designacion: "A",
        prof_sup_cm: 0,
        prof_inf_cm: 20,
        color_munsell_seco: "10YR 5/3",
        color_munsell_humedo: "10YR 3/3",
        textura_campo: "L",
        estructura_tipo: "SBK",
        estructura_grado: "2",
        consistencia_humedo: "FR",
        efervescencia_hcl: "SL",
        limite_nitidez: "G",
        rasgos_redox: []
      },
      {
        id_horizonte: "HOR-02-2B",
        designacion: "Bw",
        prof_sup_cm: 20,
        prof_inf_cm: 70,
        color_munsell_seco: "7.5YR 5/4",
        color_munsell_humedo: "7.5YR 4/4",
        textura_campo: "CL",
        estructura_tipo: "ABK",
        estructura_grado: "2",
        consistencia_humedo: "FI",
        efervescencia_hcl: "MO",
        limite_nitidez: "C",
        rasgos_redox: []
      }
    ]
  }
];

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadStoredData();
  initLeafletMap();
  populateDropdowns();
  setupEventListeners();
  renderProjectSelector();
  renderCalicatasList();
  renderMarkersOnMap();
});

// Storage Management & Data Migration
function loadStoredData() {
  const storedProjects = localStorage.getItem("calicatas_web_projects");
  const storedActiveProj = localStorage.getItem("calicatas_web_active_project");
  const storedCalicatas = localStorage.getItem("calicatas_web_data");

  if (storedProjects) {
    try {
      state.projects = JSON.parse(storedProjects);
      if (!Array.isArray(state.projects) || !state.projects.length) {
        state.projects = JSON.parse(JSON.stringify(INITIAL_DEMO_PROJECTS));
      } else {
        // Ensure all demo projects exist
        INITIAL_DEMO_PROJECTS.forEach(demoP => {
          if (!state.projects.some(p => p.id_proyecto === demoP.id_proyecto)) {
            state.projects.push(JSON.parse(JSON.stringify(demoP)));
          }
        });
      }
    } catch (e) {
      state.projects = JSON.parse(JSON.stringify(INITIAL_DEMO_PROJECTS));
    }
  } else {
    state.projects = JSON.parse(JSON.stringify(INITIAL_DEMO_PROJECTS));
  }

  if (storedActiveProj && state.projects.some(p => p.id_proyecto === storedActiveProj)) {
    state.activeProjectId = storedActiveProj;
  } else if (state.projects.length) {
    state.activeProjectId = state.projects[0].id_proyecto;
  } else {
    state.activeProjectId = "PRJ-01";
  }

  if (storedCalicatas) {
    try {
      state.calicatas = JSON.parse(storedCalicatas);
      if (Array.isArray(state.calicatas)) {
        // Ensure any calicata without valid project is assigned
        state.calicatas.forEach(c => {
          if (!c.proyecto_id || !state.projects.some(p => p.id_proyecto === c.proyecto_id)) {
            c.proyecto_id = "PRJ-01";
          }
        });
        // Ensure all demo calicatas are present for each demo project
        INITIAL_DEMO_DATA.forEach(demoC => {
          if (!state.calicatas.some(c => c.id_calicata === demoC.id_calicata && c.proyecto_id === demoC.proyecto_id)) {
            state.calicatas.push(JSON.parse(JSON.stringify(demoC)));
          }
        });
      } else {
        state.calicatas = JSON.parse(JSON.stringify(INITIAL_DEMO_DATA));
      }
    } catch (e) {
      state.calicatas = JSON.parse(JSON.stringify(INITIAL_DEMO_DATA));
    }
  } else {
    state.calicatas = JSON.parse(JSON.stringify(INITIAL_DEMO_DATA));
  }

  // Select initial calicata
  const activeCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);
  state.selectedCalicataId = activeCalicatas.length ? activeCalicatas[0].id_calicata : null;

  saveData();
}

function saveData() {
  localStorage.setItem("calicatas_web_projects", JSON.stringify(state.projects));
  localStorage.setItem("calicatas_web_active_project", state.activeProjectId || "");
  localStorage.setItem("calicatas_web_data", JSON.stringify(state.calicatas));

  renderProjectSelector();
  renderCalicatasList();
  renderMarkersOnMap();
  renderHorizontesManager();
  renderProfileDiagram();
}

// Project Management Logic
function getActiveProject() {
  return state.projects.find(p => p.id_proyecto === state.activeProjectId) || null;
}

function renderProjectSelector() {
  const select = document.getElementById("header-select-project");
  const bannerName = document.getElementById("banner-project-name");
  const bannerMeta = document.getElementById("banner-project-meta");
  const formProjIndicator = document.getElementById("form-calicata-project-indicator");
  const countSpan = document.getElementById("projects-count");

  if (select) {
    if (!state.projects || !state.projects.length) {
      select.innerHTML = `<option value="" class="bg-slate-900 text-white">-- Sin Proyectos --</option>`;
    } else {
      select.innerHTML = state.projects.map(p => `
        <option value="${p.id_proyecto}" class="bg-slate-900 text-white font-medium" ${p.id_proyecto === state.activeProjectId ? 'selected' : ''}>
          ${p.id_proyecto} - ${p.nombre}
        </option>
      `).join("");
      if (state.activeProjectId) {
        select.value = state.activeProjectId;
      }
    }
  }

  const activeProj = getActiveProject();
  if (activeProj) {
    if (bannerName) bannerName.textContent = `${activeProj.id_proyecto} - ${activeProj.nombre}`;
    if (bannerMeta) bannerMeta.textContent = `Cliente: ${activeProj.cliente || 'N/A'} | ${activeProj.ubicacion || 'Sin ubicación'}`;
    if (formProjIndicator) formProjIndicator.textContent = `Proyecto: ${activeProj.id_proyecto} - ${activeProj.nombre}`;
  } else {
    if (bannerName) bannerName.textContent = "Sin Proyecto Activo";
    if (bannerMeta) bannerMeta.textContent = "Crea un proyecto para comenzar";
    if (formProjIndicator) formProjIndicator.textContent = "Sin Proyecto";
  }

  if (countSpan) countSpan.textContent = state.projects ? state.projects.length : 0;
}

function switchActiveProject(projId) {
  if (!projId || projId === "__NEW_PROJECT__") return;
  state.activeProjectId = projId;

  // Find calicatas of newly active project
  const projCalicatas = state.calicatas.filter(c => c.proyecto_id === projId);

  // Auto-select first calicata of the project so all views immediately populate
  state.selectedCalicataId = projCalicatas.length ? projCalicatas[0].id_calicata : null;

  // Hide calicata form if it was open
  const formCal = document.getElementById("form-calicata");
  if (formCal) formCal.classList.add("hidden");

  // Reset search filter
  const searchInput = document.getElementById("search-calicatas");
  if (searchInput) searchInput.value = "";

  // Switch sidebar to list tab so user immediately sees this project's calicatas
  switchTab('list');

  saveData();

  // Center map on project's calicatas if any exist
  const withCoords = projCalicatas.filter(c => c.coord_y && c.coord_x);
  if (withCoords.length && state.map) {
    if (withCoords.length === 1) {
      state.map.flyTo([withCoords[0].coord_y, withCoords[0].coord_x], 15, { duration: 0.8 });
    } else {
      const bounds = L.latLngBounds(withCoords.map(c => [c.coord_y, c.coord_x]));
      state.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
  }
}

function resetDemoData() {
  if (confirm("¿Restablecer todos los proyectos y calicatas a los datos de demostración iniciales?")) {
    state.projects = JSON.parse(JSON.stringify(INITIAL_DEMO_PROJECTS));
    state.activeProjectId = "PRJ-01";
    state.calicatas = JSON.parse(JSON.stringify(INITIAL_DEMO_DATA));
    state.selectedCalicataId = "CAL-01";
    saveData();
    switchTab('list');
    closeProjectsModal();
    if (state.map) {
      state.map.setView([-34.44858, -70.79289], 15);
    }
  }
}

function openProjectsModal(tab = "list") {
  const modal = document.getElementById("projects-modal");
  if (!modal) return;
  const searchInput = document.getElementById("search-projects");
  if (searchInput) searchInput.value = "";
  modal.classList.remove("hidden");
  switchProjectsModalTab(tab);
  renderProjectsModalList("");
}

function closeProjectsModal() {
  const modal = document.getElementById("projects-modal");
  if (modal) modal.classList.add("hidden");
}

function switchProjectsModalTab(tab) {
  const listContainer = document.getElementById("projects-list-container");
  const searchContainer = document.getElementById("projects-search-container");
  const form = document.getElementById("form-project");
  const tabListBtn = document.getElementById("modal-tab-projects-list");
  const tabNewBtn = document.getElementById("modal-tab-projects-new");

  if (tab === "list") {
    if (listContainer) listContainer.classList.remove("hidden");
    if (searchContainer) searchContainer.classList.remove("hidden");
    if (form) form.classList.add("hidden");
    if (tabListBtn) tabListBtn.className = "px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-600 text-white transition";
    if (tabNewBtn) tabNewBtn.className = "px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-700 transition";
  } else {
    if (listContainer) listContainer.classList.add("hidden");
    if (searchContainer) searchContainer.classList.add("hidden");
    if (form) form.classList.remove("hidden");
    if (tabListBtn) tabListBtn.className = "px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-700 transition";
    if (tabNewBtn) tabNewBtn.className = "px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-600 text-white transition";
  }
}

function renderProjectsModalList(searchTerm = "") {
  const container = document.getElementById("projects-list-container");
  const clearBtn = document.getElementById("btn-clear-search-projects");
  if (!container) return;

  const term = searchTerm ? searchTerm.trim().toLowerCase() : "";
  if (clearBtn) {
    if (term) clearBtn.classList.remove("hidden");
    else clearBtn.classList.add("hidden");
  }

  const filteredProjects = term
    ? state.projects.filter(p =>
        (p.nombre && p.nombre.toLowerCase().includes(term)) ||
        (p.id_proyecto && p.id_proyecto.toLowerCase().includes(term)) ||
        (p.cliente && p.cliente.toLowerCase().includes(term)) ||
        (p.ubicacion && p.ubicacion.toLowerCase().includes(term)) ||
        (p.responsable && p.responsable.toLowerCase().includes(term)) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(term))
      )
    : state.projects;

  if (!filteredProjects.length) {
    if (term) {
      container.innerHTML = `
        <div class="text-center py-8 text-gray-400 text-sm space-y-2">
          <i class="fa-solid fa-folder-open text-3xl text-slate-300"></i>
          <p>No se encontraron proyectos para la búsqueda "<b>${term}</b>".</p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="text-center py-8 text-gray-400 text-sm">
          No hay proyectos creados. ¡Haz clic en <b>Nuevo Proyecto</b> para comenzar!
        </div>
      `;
    }
    return;
  }

  container.innerHTML = filteredProjects.map(p => {
    const isActive = p.id_proyecto === state.activeProjectId;
    const calCount = state.calicatas.filter(c => c.proyecto_id === p.id_proyecto).length;
    const sup = (p.superficie_ha !== undefined && p.superficie_ha !== null && p.superficie_ha !== "") ? parseFloat(p.superficie_ha) : null;
    const densityStr = (sup && sup > 0 && calCount > 0) ? `1 cal / ${(sup / calCount).toFixed(1)} ha` : null;

    return `
      <div class="p-3.5 rounded-xl border transition ${isActive ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/30' : 'bg-white border-gray-200 hover:border-gray-300'}">
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <div class="flex items-center space-x-2">
              <span class="text-xs font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded">${p.id_proyecto}</span>
              <h4 class="font-bold text-slate-900 text-sm">${p.nombre}</h4>
              ${isActive ? '<span class="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full flex items-center shadow-xs"><span class="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>Activo</span>' : ''}
            </div>
            <p class="text-xs text-gray-600"><b>Cliente:</b> ${p.cliente || 'N/A'} | <b>Ubicación:</b> ${p.ubicacion || 'N/A'}</p>
            
            ${(p.objetivo_estudio || p.nivel_detalle || sup) ? `
              <div class="flex flex-wrap gap-1.5 pt-0.5 text-[11px]">
                ${sup ? `<span class="bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded-md font-semibold"><i class="fa-solid fa-ruler-combined mr-1 text-amber-700"></i>${sup} ha</span>` : ''}
                ${p.nivel_detalle ? `<span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"><i class="fa-solid fa-layer-group mr-1 text-slate-500"></i>${p.nivel_detalle}</span>` : ''}
                ${p.objetivo_estudio ? `<span class="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-md font-medium truncate max-w-[280px]" title="${p.objetivo_estudio}"><i class="fa-solid fa-bullseye mr-1 text-sky-600"></i>${p.objetivo_estudio}</span>` : ''}
              </div>
            ` : ''}

            ${p.descripcion ? `<p class="text-[11px] text-gray-500 mt-1 line-clamp-2">${p.descripcion}</p>` : ''}
          </div>
          <div class="text-right flex-shrink-0 ml-2">
            <span class="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-lg block">
              ${calCount} Calicatas
            </span>
            ${densityStr ? `<span class="text-[10px] text-emerald-700 font-semibold block mt-0.5">${densityStr}</span>` : ''}
            ${p.foto_paisaje ? `<img src="${p.foto_paisaje}" class="w-12 h-10 object-cover rounded-md border mt-1 ml-auto shadow-xs" title="Foto Panorámica">` : ''}
          </div>
        </div>

        <div class="mt-3 pt-2.5 border-t flex items-center justify-between">
          <span class="text-[11px] text-gray-400">
            <i class="fa-regular fa-calendar mr-1"></i>${p.fecha_creacion || 'N/A'}
          </span>
          <div class="flex space-x-1.5">
            <button type="button" onclick="exportProjectZIP('${p.id_proyecto}')" title="Descargar Paquete ZIP Consolidado" class="bg-amber-600 hover:bg-amber-700 text-white text-xs px-2.5 py-1 rounded-lg transition font-semibold flex items-center space-x-1 shadow-xs cursor-pointer">
              <i class="fa-solid fa-file-zipper text-amber-200"></i>
              <span>ZIP</span>
            </button>
            ${!isActive ? `
              <button type="button" onclick="switchActiveProject('${p.id_proyecto}'); closeProjectsModal();" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition shadow-xs cursor-pointer">
                <i class="fa-solid fa-check mr-1"></i>Activar
              </button>
            ` : ''}
            <button type="button" onclick="editProject('${p.id_proyecto}')" class="bg-gray-100 hover:bg-gray-200 text-slate-700 text-xs px-2.5 py-1 rounded-lg transition font-medium cursor-pointer">
              <i class="fa-solid fa-pen-to-square mr-1"></i>Editar
            </button>
            <button type="button" onclick="deleteProject('${p.id_proyecto}')" class="bg-red-50 hover:bg-red-100 text-red-600 text-xs px-2.5 py-1 rounded-lg transition cursor-pointer" title="Eliminar proyecto">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML += `
    <div class="pt-2 border-t flex justify-end">
      <button type="button" onclick="resetDemoData()" class="text-xs text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center space-x-1.5">
        <i class="fa-solid fa-rotate-left text-amber-600"></i>
        <span>Restablecer Proyectos y Calicatas de Demostración</span>
      </button>
    </div>
  `;
}

function handleProjectSubmit(e) {
  e.preventDefault();
  const origId = document.getElementById("proj-orig-id").value;
  let customId = (document.getElementById("proj-id").value || "").trim().toUpperCase();
  
  if (!customId) {
    customId = `PRJ-${String(state.projects.length + 1).padStart(2, '0')}`.slice(0, 6);
  } else if (customId.length > 6) {
    customId = customId.slice(0, 6);
  }

  const isEdit = !!origId;
  
  // Check if ID is already taken by another project
  const duplicate = state.projects.find(p => p.id_proyecto === customId && p.id_proyecto !== origId);
  if (duplicate) {
    alert(`El prefijo/ID "${customId}" ya está en uso por otro proyecto. Por favor elige uno diferente (máximo 6 caracteres).`);
    return;
  }

  const supInput = document.getElementById("proj-superficie").value;
  const objetivoSelect = document.getElementById("proj-objetivo-select").value;
  const objetivoOtro = document.getElementById("proj-objetivo-otro").value.trim();
  const finalObjetivo = (objetivoSelect === "__OTRO__") ? (objetivoOtro || "Otro") : objetivoSelect;
  const nivelDetalle = document.getElementById("proj-nivel-detalle").value;
  const projImgElem = document.getElementById("proj-foto-img");

  const projData = {
    id_proyecto: customId,
    nombre: document.getElementById("proj-nombre").value.trim(),
    cliente: document.getElementById("proj-cliente").value.trim(),
    fecha_creacion: document.getElementById("proj-fecha").value || new Date().toISOString().split('T')[0],
    ubicacion: document.getElementById("proj-ubicacion").value.trim(),
    responsable: document.getElementById("proj-responsable").value.trim(),
    superficie_ha: (supInput !== "" && !isNaN(supInput)) ? parseFloat(supInput) : null,
    objetivo_estudio: finalObjetivo,
    nivel_detalle: nivelDetalle,
    descripcion: document.getElementById("proj-descripcion").value.trim(),
    foto_paisaje: projImgElem ? projImgElem.src : ""
  };

  if (isEdit) {
    const idx = state.projects.findIndex(p => p.id_proyecto === origId);
    if (idx >= 0) state.projects[idx] = projData;
    // If ID changed, cascade to calicatas
    if (origId !== customId) {
      state.calicatas.forEach(c => {
        if (c.proyecto_id === origId) c.proyecto_id = customId;
      });
      if (state.activeProjectId === origId) {
        state.activeProjectId = customId;
      }
    }
  } else {
    state.projects.push(projData);
    state.activeProjectId = customId;
  }

  saveData();
  switchProjectsModalTab("list");
  renderProjectsModalList();
  closeProjectsModal();
}

function editProject(projId) {
  const proj = state.projects.find(p => p.id_proyecto === projId);
  if (!proj) return;

  document.getElementById("proj-orig-id").value = proj.id_proyecto;
  document.getElementById("proj-id").value = proj.id_proyecto;
  document.getElementById("proj-nombre").value = proj.nombre || "";
  document.getElementById("proj-cliente").value = proj.cliente || "";
  document.getElementById("proj-fecha").value = proj.fecha_creacion || "";
  document.getElementById("proj-ubicacion").value = proj.ubicacion || "";
  document.getElementById("proj-responsable").value = proj.responsable || "";
  document.getElementById("proj-superficie").value = (proj.superficie_ha !== undefined && proj.superficie_ha !== null) ? proj.superficie_ha : "";
  document.getElementById("proj-nivel-detalle").value = proj.nivel_detalle || "Orden 2 - Detallado (1:10.000 a 1:25.000)";

  const objSelect = document.getElementById("proj-objetivo-select");
  const objOtro = document.getElementById("proj-objetivo-otro");
  const knownOptions = Array.from(objSelect.options).map(o => o.value);
  
  if (proj.objetivo_estudio && knownOptions.includes(proj.objetivo_estudio)) {
    objSelect.value = proj.objetivo_estudio;
    objOtro.classList.add("hidden");
    objOtro.value = "";
  } else if (proj.objetivo_estudio) {
    objSelect.value = "__OTRO__";
    objOtro.classList.remove("hidden");
    objOtro.value = proj.objetivo_estudio;
  } else {
    objSelect.selectedIndex = 0;
    objOtro.classList.add("hidden");
    objOtro.value = "";
  }

  document.getElementById("proj-descripcion").value = proj.descripcion || "";

  const projImg = document.getElementById("proj-foto-img");
  const projPrev = document.getElementById("proj-foto-preview");
  if (proj.foto_paisaje) {
    if (projImg) projImg.src = proj.foto_paisaje;
    if (projPrev) projPrev.classList.remove("hidden");
  } else {
    if (projImg) projImg.src = "";
    if (projPrev) projPrev.classList.add("hidden");
  }

  switchProjectsModalTab("form");
}

function deleteProject(projId) {
  if (state.projects.length <= 1) {
    alert("No puedes eliminar el único proyecto existente. Debe haber al menos un proyecto activo.");
    return;
  }

  const proj = state.projects.find(p => p.id_proyecto === projId);
  if (!proj) return;
  const calCount = state.calicatas.filter(c => c.proyecto_id === projId).length;

  if (confirm(`¿Estás seguro de eliminar el proyecto "${proj.nombre}"?\nSe eliminarán permanentemente sus ${calCount} calicatas asociadas.`)) {
    state.projects = state.projects.filter(p => p.id_proyecto !== projId);
    state.calicatas = state.calicatas.filter(c => c.proyecto_id !== projId);

    if (state.activeProjectId === projId) {
      state.activeProjectId = state.projects[0].id_proyecto;
      state.selectedCalicataId = null;
    }

    saveData();
    renderProjectsModalList();
  }
}

// Coordinate parsing helper supporting commas, dots, and whitespace
function parseCoordinateNumber(val) {
  if (typeof val === 'number') return isNaN(val) ? null : val;
  if (!val) return null;
  const cleaned = String(val).trim().replace(/,/g, '.').replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

// Automatic Elevation Retrieval from SRTM/Copernicus Satellite DEM API
async function fetchElevation(latVal, lngVal) {
  // If arguments not provided, read from form inputs
  if (latVal === undefined || latVal === null) {
    latVal = document.getElementById("cal-lat") ? document.getElementById("cal-lat").value : null;
  }
  if (lngVal === undefined || lngVal === null) {
    lngVal = document.getElementById("cal-lng") ? document.getElementById("cal-lng").value : null;
  }

  const lat = parseCoordinateNumber(latVal);
  const lng = parseCoordinateNumber(lngVal);

  const elevInput = document.getElementById("cal-elevacion");
  const btnFetch = document.getElementById("btn-fetch-elevation");

  if (lat === null || lng === null) {
    alert("Por favor ingresa primero coordenadas válidas de Latitud y Longitud (acepta tanto punto como coma, ej: -34.44858 o -34,44858).");
    if (btnFetch) btnFetch.innerHTML = '<i class="fa-solid fa-mountain mr-0.5"></i>Auto';
    return null;
  }

  if (btnFetch) {
    btnFetch.innerHTML = '<i class="fa-solid fa-spinner animate-spin mr-0.5"></i>Buscando...';
    btnFetch.disabled = true;
  }
  if (elevInput && !elevInput.value) {
    elevInput.placeholder = "Buscando altitud...";
  }

  let elevation = null;

  // Primary API: Open-Meteo High-Resolution Satellite DEM (SRTM/Copernicus 30m)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lng}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.elevation) && data.elevation.length && data.elevation[0] !== null) {
        elevation = Math.round(data.elevation[0] * 10) / 10;
      }
    }
  } catch (err) {
    console.warn("Open-Meteo DEM error, intentando API de respaldo:", err);
  }

  // Fallback API: Open-Elevation
  if (elevation === null) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lng}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data && data.results && data.results.length && data.results[0].elevation !== undefined) {
          elevation = Math.round(data.results[0].elevation * 10) / 10;
        }
      }
    } catch (err2) {
      console.warn("Open-Elevation fallback error:", err2);
    }
  }

  if (elevation !== null) {
    if (elevInput) {
      elevInput.value = elevation;
      elevInput.placeholder = "m.s.n.m.";
      elevInput.classList.add("bg-emerald-50", "border-emerald-400");
      setTimeout(() => elevInput.classList.remove("bg-emerald-50", "border-emerald-400"), 1500);
    }
    if (btnFetch) {
      btnFetch.innerHTML = '<i class="fa-solid fa-check text-emerald-600 mr-0.5"></i>Listo';
      setTimeout(() => {
        btnFetch.innerHTML = '<i class="fa-solid fa-mountain mr-0.5"></i>Auto';
        btnFetch.disabled = false;
      }, 2000);
    }
    return elevation;
  } else {
    alert("No se pudo conectar con el servidor satelital DEM. Puedes ingresar la altitud manualmente.");
    if (elevInput) elevInput.placeholder = "m.s.n.m.";
    if (btnFetch) {
      btnFetch.innerHTML = '<i class="fa-solid fa-mountain mr-0.5"></i>Auto';
      btnFetch.disabled = false;
    }
    return null;
  }
}

// Leaflet Map Initialization
function initLeafletMap() {
  // Default position around initial data
  const centerLat = state.calicatas.length ? state.calicatas[0].coord_y : -34.44858;
  const centerLng = state.calicatas.length ? state.calicatas[0].coord_x : -70.79289;

  state.map = L.map("map-container").setView([centerLat, centerLng], 15);

  // Basemaps: 1. ESRI World Imagery (Default), 2. OpenTopoMap, 3. OpenStreetMap
  const esriWorldImagery = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri &mdash; Maxar, Earthstar Geographics, USDA, USGS"
  });

  const openTopoMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    maxZoom: 17,
    attribution: "&copy; OpenStreetMap contributors, SRTM | OpenTopoMap"
  });

  const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  });

  // Default active base layer: ESRI World Imagery
  esriWorldImagery.addTo(state.map);

  const baseMaps = {
    "Satelital HD (ESRI World Imagery)": esriWorldImagery,
    "Topográfico / Relieve (OpenTopoMap)": openTopoMap,
    "Callejero Libre (OpenStreetMap)": osm
  };

  L.control.layers(baseMaps).addTo(state.map);

  state.markersLayer = L.layerGroup().addTo(state.map);

  // Click on map to set coordinates in form or place new point
  state.map.on("click", (e) => {
    if (!state.activeProjectId || !state.projects.length) {
      alert("Por favor, define o selecciona un Proyecto antes de registrar calicatas en el mapa.");
      openProjectsModal("form");
      return;
    }

    const lat = parseFloat(e.latlng.lat.toFixed(6));
    const lng = parseFloat(e.latlng.lng.toFixed(6));

    document.getElementById("cal-lat").value = lat;
    document.getElementById("cal-lng").value = lng;
    fetchElevation(lat, lng);

    if (state.tempMarker) {
      state.map.removeLayer(state.tempMarker);
    }
    state.tempMarker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: 'custom-temp-marker',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        html: '<div class="temp-gps-pin"></div>'
      })
    }).addTo(state.map);

    // Show form if hidden
    switchTab('list');
    const form = document.getElementById("form-calicata");
    if (form.classList.contains("hidden")) {
      form.reset();
      document.getElementById("cal-fecha").value = new Date().toISOString().split('T')[0];
      const projectCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);
      document.getElementById("cal-id").value = `CAL-${String(projectCalicatas.length + 1).padStart(2, '0')}`;
      const activeProj = getActiveProject();
      if (activeProj && activeProj.responsable) {
        document.getElementById("cal-examinador").value = activeProj.responsable;
      }
      document.getElementById("form-calicata-title").textContent = "Nueva Calicata";
      form.classList.remove("hidden");
    }
    document.getElementById("cal-id").focus();
  });
}

function renderMarkersOnMap() {
  if (!state.markersLayer) return;
  state.markersLayer.clearLayers();

  const projectCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);

  projectCalicatas.forEach((cal) => {
    if (cal.coord_y && cal.coord_x) {
      const isSelected = cal.id_calicata === state.selectedCalicataId;

      const icon = L.divIcon({
        className: 'custom-calicata-marker',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        popupAnchor: [0, -28],
        html: `
          <div class="calicata-map-pin ${isSelected ? 'is-selected' : ''}">
            <div class="pin-badge">
              <span class="pin-icon-wrap">
                <i class="fa-solid fa-layer-group"></i>
              </span>
              <span class="pin-label">${cal.id_calicata}</span>
            </div>
            <div class="pin-arrow"></div>
          </div>
        `
      });

      const marker = L.marker([cal.coord_y, cal.coord_x], { icon });

      marker.on('click', () => {
        selectCalicata(cal.id_calicata);
      });

      const popupContent = `
        <div class="p-1.5 text-xs space-y-1.5 min-w-[160px]">
          <div class="flex items-center justify-between border-b pb-1">
            <h4 class="font-bold text-sm text-slate-800 flex items-center gap-1">
              <i class="fa-solid fa-layer-group text-amber-600"></i> ${cal.id_calicata}
            </h4>
            <span class="text-[10px] bg-slate-100 text-slate-700 font-semibold px-1.5 py-0.5 rounded border">${cal.fecha || ''}</span>
          </div>
          <p class="text-gray-600"><b>Clasificación:</b> ${cal.clasificacion_usda || 'Sin clasificar'}</p>
          <p class="text-gray-600"><b>Examinador:</b> ${cal.examinador || 'N/A'}</p>
          <p class="text-gray-600"><b>Horizontes:</b> ${cal.horizontes ? cal.horizontes.length : 0}</p>
          <button onclick="selectCalicata('${cal.id_calicata}')" class="mt-2 w-full bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold py-1.5 px-2 rounded-lg text-xs transition cursor-pointer shadow-xs">
            Ver Detalle & Horizontes
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      state.markersLayer.addLayer(marker);
    }
  });
}

// Populate Picklist Select Dropdowns from SCHEMA
function populateDropdowns() {
  const fillSelect = (elemId, options) => {
    const el = document.getElementById(elemId);
    if (!el) return;
    el.innerHTML = `<option value="">-- Seleccionar --</option>` +
      options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join("");
  };

  fillSelect("cal-material", SCHEMA.Calicatas.material_parental);
  fillSelect("cal-relieve", SCHEMA.Calicatas.forma_relieve);
  fillSelect("cal-pedregosidad", SCHEMA.Calicatas.pedregosidad_sup);
  fillSelect("cal-drenaje", SCHEMA.Calicatas.drenaje_clase);
  fillSelect("cal-humedad", SCHEMA.Calicatas.estado_humedad);

  fillSelect("hor-textura", SCHEMA.Horizontes.textura_campo);
  fillSelect("hor-estructura-tipo", SCHEMA.Horizontes.estructura_tipo);
  fillSelect("hor-estructura-grado", SCHEMA.Horizontes.estructura_grado);
  fillSelect("hor-estructura-tamano", SCHEMA.Horizontes.estructura_tamano);
  fillSelect("hor-consistencia", SCHEMA.Horizontes.consistencia_humedo);
  fillSelect("hor-hcl", SCHEMA.Horizontes.efervescencia_hcl);
  fillSelect("hor-limite", SCHEMA.Horizontes.limite_nitidez);
  fillSelect("hor-limite-topografia", SCHEMA.Horizontes.limite_topografia);

  fillSelect("hor-raices-cantidad", SCHEMA.Horizontes.raices_cantidad);
  fillSelect("hor-raices-tamano", SCHEMA.Horizontes.raices_tamano);
  fillSelect("hor-poros-cantidad", SCHEMA.Horizontes.poros_cantidad);
  fillSelect("hor-poros-tamano", SCHEMA.Horizontes.poros_tamano);

  fillSelect("hor-pedregosidad-clase", SCHEMA.Horizontes.pedregosidad_clase);
  fillSelect("hor-frag-tipo", SCHEMA.Horizontes.frag_tipo);

  fillSelect("rmf-tipo", SCHEMA.Rasgos_Redox.rmf_tipo);
  fillSelect("rmf-cantidad", SCHEMA.Rasgos_Redox.rmf_cantidad);
  fillSelect("rmf-contraste", SCHEMA.Rasgos_Redox.rmf_contraste);
  fillSelect("rmf-tamano", SCHEMA.Rasgos_Redox.rmf_tamano);
  fillSelect("rmf-ubicacion", SCHEMA.Rasgos_Redox.rmf_ubicacion);
}

// UI Event Listeners
function setupEventListeners() {
  // Tabs switching
  document.getElementById("tab-btn-list").addEventListener("click", () => switchTab('list'));
  document.getElementById("tab-btn-horizontes").addEventListener("click", () => switchTab('horizontes'));
  document.getElementById("tab-btn-diagram").addEventListener("click", () => switchTab('diagram'));

  // Sidebar Slide Toggle Button (Single Centered Handle)
  const btnSlideToggle = document.getElementById("btn-sidebar-slide-toggle");
  if (btnSlideToggle) {
    btnSlideToggle.addEventListener("click", () => toggleSidebar());
  }

  // Project Selector & Management Listeners
  const projSelect = document.getElementById("header-select-project");
  if (projSelect) {
    projSelect.addEventListener("change", (e) => switchActiveProject(e.target.value));
  }
  const btnOpenProj = document.getElementById("btn-open-projects");
  if (btnOpenProj) {
    btnOpenProj.addEventListener("click", () => openProjectsModal("list"));
  }
  const btnEditActProj = document.getElementById("btn-edit-active-project");
  if (btnEditActProj) {
    btnEditActProj.addEventListener("click", () => openProjectsModal("list"));
  }
  const btnCloseProjModal = document.getElementById("btn-close-projects-modal");
  if (btnCloseProjModal) {
    btnCloseProjModal.addEventListener("click", closeProjectsModal);
  }
  const searchProjInput = document.getElementById("search-projects");
  if (searchProjInput) {
    searchProjInput.addEventListener("input", (e) => renderProjectsModalList(e.target.value));
  }
  const btnClearSearchProj = document.getElementById("btn-clear-search-projects");
  if (btnClearSearchProj) {
    btnClearSearchProj.addEventListener("click", () => {
      if (searchProjInput) searchProjInput.value = "";
      renderProjectsModalList("");
      if (searchProjInput) searchProjInput.focus();
    });
  }
  const tabProjList = document.getElementById("modal-tab-projects-list");
  if (tabProjList) {
    tabProjList.addEventListener("click", () => switchProjectsModalTab("list"));
  }
  const tabProjNew = document.getElementById("modal-tab-projects-new");
  if (tabProjNew) {
    tabProjNew.addEventListener("click", () => {
      document.getElementById("form-project").reset();
      document.getElementById("proj-orig-id").value = "";
      document.getElementById("proj-superficie").value = "";
      document.getElementById("proj-nivel-detalle").selectedIndex = 0;
      const objSelect = document.getElementById("proj-objetivo-select");
      const objOtro = document.getElementById("proj-objetivo-otro");
      if (objSelect) objSelect.selectedIndex = 0;
      if (objOtro) {
        objOtro.classList.add("hidden");
        objOtro.value = "";
      }
      const projImg = document.getElementById("proj-foto-img");
      if (projImg) projImg.src = "";
      const projPrev = document.getElementById("proj-foto-preview");
      if (projPrev) projPrev.classList.add("hidden");
      const projInput = document.getElementById("proj-foto");
      if (projInput) projInput.value = "";
      
      // Auto-generate next 6-char prefix (e.g. PRJ-03)
      let nextNum = state.projects.length + 1;
      let autoPrefix = `PRJ-${String(nextNum).padStart(2, '0')}`.slice(0, 6);
      while (state.projects.some(p => p.id_proyecto === autoPrefix)) {
        nextNum++;
        autoPrefix = `PRJ-${String(nextNum).padStart(2, '0')}`.slice(0, 6);
      }
      document.getElementById("proj-id").value = autoPrefix;
      document.getElementById("proj-fecha").value = new Date().toISOString().split('T')[0];
      switchProjectsModalTab("form");
    });
  }

  // Objetivo dropdown toggle for "Otro (Especificar...)"
  const objSelect = document.getElementById("proj-objetivo-select");
  const objOtro = document.getElementById("proj-objetivo-otro");
  if (objSelect && objOtro) {
    objSelect.addEventListener("change", (e) => {
      if (e.target.value === "__OTRO__") {
        objOtro.classList.remove("hidden");
        objOtro.focus();
      } else {
        objOtro.classList.add("hidden");
        objOtro.value = "";
      }
    });
  }

  const btnCancelProjForm = document.getElementById("btn-cancel-project-form");
  if (btnCancelProjForm) {
    btnCancelProjForm.addEventListener("click", () => switchProjectsModalTab("list"));
  }
  const formProj = document.getElementById("form-project");
  if (formProj) {
    formProj.addEventListener("submit", handleProjectSubmit);
  }

  // GPS Button
  document.getElementById("btn-gps").addEventListener("click", handleGPSLocation);

  // New Calicata Action Handler
  function openNewCalicataForm() {
    if (!state.activeProjectId || !state.projects.length) {
      alert("Por favor, define o selecciona un Proyecto antes de registrar calicatas.");
      openProjectsModal("form");
      return;
    }
    switchTab('list');
    const form = document.getElementById("form-calicata");
    form.reset();
    document.getElementById("cal-fecha").value = new Date().toISOString().split('T')[0];
    document.getElementById("cal-elevacion").value = "";
    const humSel = document.getElementById("cal-humedad");
    if (humSel) humSel.selectedIndex = 0;
    const freatInp = document.getElementById("cal-nivel-freatico");
    if (freatInp) freatInp.value = "";
    const raicesInp = document.getElementById("cal-prof-raices");
    if (raicesInp) raicesInp.value = "";
    const profEfInp = document.getElementById("cal-prof-efectiva");
    if (profEfInp) profEfInp.value = "";

    const calFotoImg = document.getElementById("cal-foto-img");
    if (calFotoImg) calFotoImg.src = "";
    const calFotoPrev = document.getElementById("cal-foto-preview");
    if (calFotoPrev) calFotoPrev.classList.add("hidden");
    const calFotoInp = document.getElementById("cal-foto");
    if (calFotoInp) calFotoInp.value = "";

    const projectCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);
    document.getElementById("cal-id").value = `CAL-${String(projectCalicatas.length + 1).padStart(2, '0')}`;
    const activeProj = getActiveProject();
    if (activeProj && activeProj.responsable) {
      document.getElementById("cal-examinador").value = activeProj.responsable;
    }
    document.getElementById("form-calicata-title").textContent = "Nueva Calicata";
    form.classList.remove("hidden");
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Floating & Sidebar New Calicata Buttons
  document.getElementById("btn-new-calicata").addEventListener("click", openNewCalicataForm);
  const btnSidebarAddCal = document.getElementById("btn-sidebar-add-calicata");
  if (btnSidebarAddCal) {
    btnSidebarAddCal.addEventListener("click", openNewCalicataForm);
  }

  document.getElementById("btn-cancel-calicata").addEventListener("click", () => {
    document.getElementById("form-calicata").classList.add("hidden");
  });

  // Auto-Fetch Elevation Trigger
  const btnFetchElev = document.getElementById("btn-fetch-elevation");
  if (btnFetchElev) {
    btnFetchElev.addEventListener("click", (e) => {
      e.preventDefault();
      fetchElevation();
    });
  }

  const calLatInput = document.getElementById("cal-lat");
  const calLngInput = document.getElementById("cal-lng");
  const tryAutoElev = () => {
    const elevElem = document.getElementById("cal-elevacion");
    if (elevElem && !elevElem.value) {
      const lat = parseCoordinateNumber(calLatInput ? calLatInput.value : null);
      const lng = parseCoordinateNumber(calLngInput ? calLngInput.value : null);
      if (lat !== null && lng !== null) {
        fetchElevation(lat, lng);
      }
    }
  };
  if (calLatInput) calLatInput.addEventListener("blur", tryAutoElev);
  if (calLngInput) calLngInput.addEventListener("blur", tryAutoElev);

  // Calicata Form Submit
  document.getElementById("form-calicata").addEventListener("submit", handleCalicataSubmit);

  // Auto-Calcular USDA Classification Button
  document.getElementById("btn-autocalc-usda").addEventListener("click", () => {
    const calculated = autoDetermineUSDAClassification();
    alert(`Clasificación USDA calculada: ${calculated}`);
  });

  // Photo upload previews (Level 1, Level 2, Level 3)
  const projFotoInput = document.getElementById("proj-foto");
  if (projFotoInput) {
    projFotoInput.addEventListener("change", (e) => handleImagePreview(e, "proj-foto-img", "proj-foto-preview"));
  }
  const btnRemoveProjFoto = document.getElementById("btn-remove-proj-foto");
  if (btnRemoveProjFoto) {
    btnRemoveProjFoto.addEventListener("click", () => {
      const img = document.getElementById("proj-foto-img");
      if (img) img.src = "";
      const prev = document.getElementById("proj-foto-preview");
      if (prev) prev.classList.add("hidden");
      if (projFotoInput) projFotoInput.value = "";
    });
  }

  const calFotoInput = document.getElementById("cal-foto");
  if (calFotoInput) {
    calFotoInput.addEventListener("change", (e) => handleImagePreview(e, "cal-foto-img", "cal-foto-preview"));
  }
  const btnRemoveCalFoto = document.getElementById("btn-remove-cal-foto");
  if (btnRemoveCalFoto) {
    btnRemoveCalFoto.addEventListener("click", () => {
      const img = document.getElementById("cal-foto-img");
      if (img) img.src = "";
      const prev = document.getElementById("cal-foto-preview");
      if (prev) prev.classList.add("hidden");
      if (calFotoInput) calFotoInput.value = "";
    });
  }

  const calFotoPerfilInput = document.getElementById("cal-foto-perfil");
  if (calFotoPerfilInput) {
    calFotoPerfilInput.addEventListener("change", (e) => {
      handleImagePreview(e, "cal-foto-perfil-img", "cal-foto-perfil-preview", (dataUrl) => {
        saveProfilePhotoToActiveCalicata(dataUrl);
      });
    });
  }
  const btnRemovePerfilFoto = document.getElementById("btn-remove-perfil-foto");
  if (btnRemovePerfilFoto) {
    btnRemovePerfilFoto.addEventListener("click", removeProfilePhotoFromActiveCalicata);
  }

  // Search Calicatas
  document.getElementById("search-calicatas").addEventListener("input", (e) => renderCalicatasList(e.target.value));

  // Horizon Add/Cancel
  document.getElementById("btn-add-horizonte").addEventListener("click", () => {
    state.editingHorizonteId = null;
    state.currentHorizonRMFs = [];
    document.getElementById("form-horizonte-title").textContent = "Nuevo Horizonte";
    document.getElementById("form-horizonte").reset();
    document.getElementById("preview-munsell-seco").style.background = "#A0A0A0";
    document.getElementById("preview-munsell-humedo").style.background = "#A0A0A0";
    renderHorizonRMFItems();

    // Auto-calculate default Profundidad Superior: 0 for 1st horizon, or previous horizon's lower depth
    const cal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
    let defaultProfSup = 0;
    if (cal && cal.horizontes && cal.horizontes.length > 0) {
      const sorted = [...cal.horizontes].sort((a, b) => (Number(a.prof_sup_cm) || 0) - (Number(b.prof_sup_cm) || 0));
      const lastH = sorted[sorted.length - 1];
      if (lastH && lastH.prof_inf_cm !== undefined && lastH.prof_inf_cm !== null) {
        defaultProfSup = Number(lastH.prof_inf_cm) || 0;
      }
    }
    const profSupInput = document.getElementById("hor-prof-sup");
    if (profSupInput) {
      profSupInput.value = defaultProfSup;
    }
    const profInfInput = document.getElementById("hor-prof-inf");
    if (profInfInput) {
      profInfInput.value = "";
      profInfInput.min = defaultProfSup;
    }

    document.getElementById("form-horizonte").classList.remove("hidden");
    document.getElementById("form-horizonte").scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    const desigInp = document.getElementById("hor-designacion");
    if (desigInp) desigInp.focus();
  });
  document.getElementById("btn-cancel-horizonte").addEventListener("click", () => {
    state.editingHorizonteId = null;
    state.currentHorizonRMFs = [];
    document.getElementById("form-horizonte").classList.add("hidden");
  });
  document.getElementById("form-horizonte").addEventListener("submit", handleHorizonteSubmit);

  // RMF Item Sub-form Triggers
  document.getElementById("btn-add-rmf-item").addEventListener("click", () => {
    document.getElementById("rmf-subform").classList.remove("hidden");
  });
  document.getElementById("btn-cancel-rmf-item").addEventListener("click", () => {
    document.getElementById("rmf-subform").classList.add("hidden");
  });
  document.getElementById("btn-save-rmf-item").addEventListener("click", saveRMFItem);

  // Munsell Color Picker Modal Triggers
  document.getElementById("btn-pick-munsell-seco").addEventListener("click", () => openMunsellModal('seco'));
  document.getElementById("btn-pick-munsell-humedo").addEventListener("click", () => openMunsellModal('humedo'));
  const btnPickRmf = document.getElementById("btn-pick-munsell-rmf");
  if (btnPickRmf) {
    btnPickRmf.addEventListener("click", () => openMunsellModal('rmf'));
  }
  const rmfMunsellInput = document.getElementById("rmf-munsell");
  if (rmfMunsellInput) {
    rmfMunsellInput.addEventListener("input", (e) => {
      const hex = getMunsellColorHexFromStr(e.target.value.trim());
      const p = document.getElementById("preview-munsell-rmf");
      if (p) p.style.background = hex;
    });
  }
  document.getElementById("btn-close-munsell").addEventListener("click", closeMunsellModal);
  document.getElementById("btn-confirm-munsell").addEventListener("click", confirmMunsellSelection);

  // Export / Import
  const btnExportZip = document.getElementById("btn-export-zip");
  if (btnExportZip) {
    btnExportZip.addEventListener("click", () => exportProjectZIP());
  }

  const btnExportGpkg = document.getElementById("btn-export-gpkg");
  if (btnExportGpkg) {
    btnExportGpkg.addEventListener("click", exportDataGeoPackage);
  }
  document.getElementById("btn-export").addEventListener("click", exportDataJSON);
  
  const importGpxInput = document.getElementById("import-gpx-file");
  if (importGpxInput) {
    importGpxInput.addEventListener("change", importDataGPX);
  }

  // Munsell Quick Search
  setupMunsellQuickSearch();

  // Experimento del Lulito (Prueba de Cordoncillo de Campo) Modal
  document.getElementById("btn-open-lulito-guide").addEventListener("click", () => {
    resetLulitoState();
    document.getElementById("lulito-guide-modal").classList.remove("hidden");
  });
  document.getElementById("btn-close-lulito-modal").addEventListener("click", () => {
    document.getElementById("lulito-guide-modal").classList.add("hidden");
  });
  document.getElementById("btn-apply-lul-texture").addEventListener("click", applyLulitoTexture);


  // Visual Estimation Charts Modal
  document.getElementById("btn-open-visual-charts").addEventListener("click", () => {
    renderVisualEstimationCharts();
    document.getElementById("visual-charts-modal").classList.remove("hidden");
  });
  document.getElementById("btn-close-charts-modal").addEventListener("click", () => {
    document.getElementById("visual-charts-modal").classList.add("hidden");
  });

  // Print Ficha
  document.getElementById("btn-print-ficha").addEventListener("click", () => window.print());

  // Live Camera Modal Listeners
  const btnCloseCam = document.getElementById("btn-close-camera");
  if (btnCloseCam) btnCloseCam.addEventListener("click", closeLiveCamera);

  const btnCancelCamBottom = document.getElementById("btn-cancel-camera-bottom");
  if (btnCancelCamBottom) btnCancelCamBottom.addEventListener("click", closeLiveCamera);

  const btnSwitchCam = document.getElementById("btn-switch-camera");
  if (btnSwitchCam) btnSwitchCam.addEventListener("click", switchCameraFacingMode);

  const btnCapturePhoto = document.getElementById("btn-capture-photo");
  if (btnCapturePhoto) btnCapturePhoto.addEventListener("click", capturePhotoFromCamera);
}


// Toggle Sidebar Slide Visibility
function toggleSidebar(forceState) {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const willBeVisible = (typeof forceState === 'boolean')
    ? forceState
    : sidebar.classList.contains("collapsed");

  if (willBeVisible) {
    sidebar.classList.remove("collapsed");
  } else {
    sidebar.classList.add("collapsed");
  }

  // Update single slide handle button icon & title
  const slideIcon = document.getElementById("sidebar-slide-icon");
  const slideBtn = document.getElementById("btn-sidebar-slide-toggle");

  if (slideIcon) {
    slideIcon.className = willBeVisible 
      ? "fa-solid fa-chevron-right text-xs" 
      : "fa-solid fa-chevron-left text-xs";
  }
  if (slideBtn) {
    slideBtn.title = willBeVisible ? "Ocultar Panel Lateral" : "Mostrar Panel Lateral";
  }

  // Recalculate and resize Leaflet map tiles smoothly after transition finishes
  setTimeout(() => {
    if (state.map) state.map.invalidateSize();
  }, 360);
}

// Switch Sidebar Tabs
function switchTab(tabName) {
  state.activeTab = tabName;
  toggleSidebar(true);

  const btnList = document.getElementById("tab-btn-list");
  const btnHor = document.getElementById("tab-btn-horizontes");
  const btnDiag = document.getElementById("tab-btn-diagram");

  const contentList = document.getElementById("tab-content-list");
  const contentHor = document.getElementById("tab-content-horizontes");
  const contentDiag = document.getElementById("tab-content-diagram");

  [btnList, btnHor, btnDiag].forEach(b => {
    b.className = "flex-1 py-3 text-xs font-semibold text-center text-gray-500 hover:text-gray-700 flex items-center justify-center space-x-1.5";
  });
  [contentList, contentHor, contentDiag].forEach(c => c.classList.add("hidden"));

  if (tabName === 'list') {
    btnList.className = "flex-1 py-3 text-xs font-semibold text-center text-amber-600 border-b-2 border-amber-600 flex items-center justify-center space-x-1.5";
    contentList.classList.remove("hidden");
  } else if (tabName === 'horizontes') {
    btnHor.className = "flex-1 py-3 text-xs font-semibold text-center text-amber-600 border-b-2 border-amber-600 flex items-center justify-center space-x-1.5";
    contentHor.classList.remove("hidden");
    renderHorizontesManager();
  } else if (tabName === 'diagram') {
    btnDiag.className = "flex-1 py-3 text-xs font-semibold text-center text-amber-600 border-b-2 border-amber-600 flex items-center justify-center space-x-1.5";
    contentDiag.classList.remove("hidden");
    renderProfileDiagram();
  }
}

// GPS Geolocation Handler
function handleGPSLocation() {
  if (!navigator.geolocation) {
    alert("Geolocalización no es soportada por este navegador.");
    return;
  }

  const badge = document.getElementById("status-badge");
  const gpsBtn = document.getElementById("btn-gps");
  if (gpsBtn) {
    gpsBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i>';
    gpsBtn.classList.add("bg-amber-700", "animate-pulse");
  }
  badge.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Obteniendo GPS...`;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = parseFloat(pos.coords.latitude.toFixed(6));
      const lng = parseFloat(pos.coords.longitude.toFixed(6));

      document.getElementById("cal-lat").value = lat;
      document.getElementById("cal-lng").value = lng;

      if (pos.coords.altitude !== null && !isNaN(pos.coords.altitude) && pos.coords.altitude !== undefined) {
        document.getElementById("cal-elevacion").value = Math.round(pos.coords.altitude * 10) / 10;
      } else {
        fetchElevation(lat, lng);
      }

      state.map.setView([lat, lng], 17);

      if (state.tempMarker) state.map.removeLayer(state.tempMarker);
      state.tempMarker = L.marker([lat, lng]).addTo(state.map)
        .bindPopup("<b>Tu Ubicación Actual (GPS)</b>").openPopup();

      badge.innerHTML = `<span class="w-2 h-2 bg-emerald-400 rounded-full"></span><span>GPS OK (${lat}, ${lng})</span>`;
      if (gpsBtn) {
        gpsBtn.innerHTML = '<i class="fa-solid fa-crosshairs"></i>';
        gpsBtn.classList.remove("bg-amber-700", "animate-pulse");
      }
    },
    (err) => {
      alert(`Error al obtener ubicación GPS: ${err.message}`);
      badge.innerHTML = `<span class="w-2 h-2 bg-emerald-400 rounded-full"></span><span>PWA Activa</span>`;
      if (gpsBtn) {
        gpsBtn.innerHTML = '<i class="fa-solid fa-crosshairs"></i>';
        gpsBtn.classList.remove("bg-amber-700", "animate-pulse");
      }
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// Image File Compressor & Base64 Converter (Preserves High Clarity, prevents storage overload)
function handleImagePreview(event, imgElemId, containerElemId, callback) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const maxDim = 1600;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const optimizedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
      const targetImg = document.getElementById(imgElemId);
      if (targetImg) targetImg.src = optimizedDataUrl;
      if (containerElemId) {
        const container = document.getElementById(containerElemId);
        if (container) container.classList.remove("hidden");
      }
      if (callback) callback(optimizedDataUrl);
    };
    img.onerror = function() {
      const targetImg = document.getElementById(imgElemId);
      if (targetImg) targetImg.src = e.target.result;
      if (containerElemId) {
        const container = document.getElementById(containerElemId);
        if (container) container.classList.remove("hidden");
      }
      if (callback) callback(e.target.result);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function saveProfilePhotoToActiveCalicata(dataUrl) {
  const cal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
  if (!cal) return;
  cal.foto_perfil = dataUrl;
  saveData();
  renderHorizontesManager();
  renderProfileDiagram();
}

function removeProfilePhotoFromActiveCalicata() {
  const cal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
  if (!cal) return;
  if (confirm("¿Estás seguro de eliminar la fotografía del perfil de suelo?")) {
    cal.foto_perfil = "";
    saveData();
    renderHorizontesManager();
    renderProfileDiagram();
  }
}

// ==========================================
// WebRTC Live In-App Camera Engine
// ==========================================
state.cameraStream = null;
state.cameraTarget = 'calicata-surface'; // 'project' | 'calicata-surface' | 'calicata-profile'
state.cameraFacingMode = 'environment'; // 'environment' (rear) | 'user' (front/webcam)

async function openLiveCamera(targetType = 'calicata-surface') {
  state.cameraTarget = targetType;

  const modal = document.getElementById("camera-modal");
  const titleElem = document.getElementById("camera-modal-title");
  const videoElem = document.getElementById("camera-video");

  if (!modal || !videoElem) return;

  if (targetType === 'project') {
    if (titleElem) titleElem.textContent = "📸 Foto Panorámica del Predio (Nivel 1)";
  } else if (targetType === 'calicata-surface') {
    if (titleElem) titleElem.textContent = "📸 Foto Superficie / Entorno (Nivel 2)";
  } else if (targetType === 'calicata-profile') {
    if (titleElem) titleElem.textContent = "📸 Foto del perfil de suelo";
  }

  // Stop any active camera stream
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(t => t.stop());
    state.cameraStream = null;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Tu navegador no soporta acceso directo a la cámara o requiere conexión segura (HTTPS/localhost). Puedes usar el botón 'Archivo' para cargar tus fotos.");
    return;
  }

  try {
    const constraints = {
      video: {
        facingMode: state.cameraFacingMode ? { ideal: state.cameraFacingMode } : { ideal: "environment" },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      },
      audio: false
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    state.cameraStream = stream;
    videoElem.srcObject = stream;
    await videoElem.play();
    modal.classList.remove("hidden");
  } catch (err) {
    console.warn("No se pudo iniciar cámara con facingMode ideal, probando genérico:", err);
    try {
      // Fallback to generic video stream (e.g. laptop webcam on Linux/Windows/Mac)
      const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      state.cameraStream = fallbackStream;
      videoElem.srcObject = fallbackStream;
      await videoElem.play();
      modal.classList.remove("hidden");
    } catch (fallbackErr) {
      console.error("Error al acceder a la cámara:", fallbackErr);
      alert(`No se pudo acceder a la cámara: ${fallbackErr.message || fallbackErr.name}.\n\nAsegúrate de otorgar permisos de cámara en el navegador y de que ningún otro programa la esté usando.`);
    }
  }
}

function capturePhotoFromCamera() {
  const videoElem = document.getElementById("camera-video");
  if (!videoElem || !videoElem.videoWidth) {
    alert("La cámara no está lista para capturar. Inténtalo de nuevo.");
    return;
  }

  const vWidth = videoElem.videoWidth;
  const vHeight = videoElem.videoHeight;
  const maxDim = 1600;
  let targetWidth = vWidth;
  let targetHeight = vHeight;

  if (vWidth > vHeight) {
    if (vWidth > maxDim) {
      targetHeight = Math.round((vHeight * maxDim) / vWidth);
      targetWidth = maxDim;
    }
  } else {
    if (vHeight > maxDim) {
      targetWidth = Math.round((vWidth * maxDim) / vHeight);
      targetHeight = maxDim;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElem, 0, 0, targetWidth, targetHeight);

  const capturedDataUrl = canvas.toDataURL("image/jpeg", 0.85);

  // Assign photo based on target
  if (state.cameraTarget === 'project') {
    const projImg = document.getElementById("proj-foto-img");
    const projPrev = document.getElementById("proj-foto-preview");
    if (projImg) projImg.src = capturedDataUrl;
    if (projPrev) projPrev.classList.remove("hidden");
  } else if (state.cameraTarget === 'calicata-surface') {
    const calImg = document.getElementById("cal-foto-img");
    const calPrev = document.getElementById("cal-foto-preview");
    if (calImg) calImg.src = capturedDataUrl;
    if (calPrev) calPrev.classList.remove("hidden");

    if (state.selectedCalicataId) {
      const cal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
      if (cal) {
        cal.foto_superficie = capturedDataUrl;
        cal.foto_general = capturedDataUrl;
        saveData();
        renderCalicatasList();
        renderProfileDiagram();
      }
    }
  } else if (state.cameraTarget === 'calicata-profile') {
    saveProfilePhotoToActiveCalicata(capturedDataUrl);
  }

  closeLiveCamera();
}

function switchCameraFacingMode() {
  state.cameraFacingMode = (state.cameraFacingMode === 'user') ? 'environment' : 'user';
  openLiveCamera(state.cameraTarget);
}

function closeLiveCamera() {
  const modal = document.getElementById("camera-modal");
  const videoElem = document.getElementById("camera-video");

  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(t => t.stop());
    state.cameraStream = null;
  }
  if (videoElem) {
    videoElem.srcObject = null;
  }
  if (modal) {
    modal.classList.add("hidden");
  }
}

// Calicatas List Rendering
function renderCalicatasList(searchTerm = "") {
  const listContainer = document.getElementById("calicatas-list");
  const projectCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);
  const countElem = document.getElementById("calicatas-count");
  if (countElem) countElem.textContent = projectCalicatas.length;

  const filtered = projectCalicatas.filter(c => {
    const term = searchTerm.toLowerCase();
    return c.id_calicata.toLowerCase().includes(term) ||
           (c.clasificacion_usda && c.clasificacion_usda.toLowerCase().includes(term)) ||
           (c.examinador && c.examinador.toLowerCase().includes(term));
  });

  if (!filtered.length) {
    listContainer.innerHTML = `
      <div class="text-center py-8 text-gray-400 text-sm">
        No se encontraron calicatas en este proyecto. ¡Haz clic en el botón <b>+</b> para agregar una!
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered.map(cal => {
    const isSelected = cal.id_calicata === state.selectedCalicataId;
    const horCount = cal.horizontes ? cal.horizontes.length : 0;

    return `
      <div class="p-3.5 rounded-xl border transition cursor-pointer ${isSelected ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/30' : 'bg-white border-gray-200 hover:border-amber-300'}"
           onclick="selectCalicata('${cal.id_calicata}')">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <i class="fa-solid fa-layer-group"></i>
            </div>
            <div>
              <h4 class="font-bold text-slate-800 text-sm">${cal.id_calicata}</h4>
              <p class="text-xs text-gray-500">${cal.clasificacion_usda || 'Sin Clasificación USDA'}</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            ${horCount} Horizontes
          </span>
        </div>

        <div class="mt-2.5 pt-2 border-t text-xs text-gray-500 grid grid-cols-2 gap-1">
          <div><i class="fa-regular fa-calendar mr-1"></i>${cal.fecha || 'N/A'}</div>
          <div><i class="fa-solid fa-user mr-1"></i>${cal.examinador || 'N/A'}</div>
          <div><i class="fa-solid fa-mountain mr-1 text-amber-700"></i>Elev: ${(cal.elevacion_m !== undefined && cal.elevacion_m !== null) ? cal.elevacion_m + ' m' : (cal.altitud_msnm ? cal.altitud_msnm + ' m' : 'N/A')}</div>
          <div><i class="fa-solid fa-location-dot mr-1"></i>${cal.coord_y ? cal.coord_y.toFixed(4) : ''}, ${cal.coord_x ? cal.coord_x.toFixed(4) : ''}</div>
        </div>

        <div class="mt-2 flex space-x-2">
          <button onclick="event.stopPropagation(); editCalicata('${cal.id_calicata}')" class="flex-1 bg-gray-100 hover:bg-gray-200 text-slate-700 text-xs py-1 rounded-lg font-medium transition cursor-pointer">
            <i class="fa-solid fa-pen-to-square mr-1"></i>Editar
          </button>
          <button onclick="event.stopPropagation(); deleteCalicata('${cal.id_calicata}')" class="bg-red-50 hover:bg-red-100 text-red-600 text-xs px-2.5 py-1 rounded-lg transition cursor-pointer">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Select Calicata Active
function selectCalicata(id) {
  state.selectedCalicataId = id;
  const cal = state.calicatas.find(c => c.id_calicata === id && c.proyecto_id === state.activeProjectId);
  if (cal && cal.coord_y && cal.coord_x && state.map) {
    state.map.flyTo([cal.coord_y, cal.coord_x], 16, { duration: 0.8 });
  }
  renderCalicatasList();
  renderMarkersOnMap();
  switchTab('horizontes');
}

// Automatic USDA Taxonomy Calculator Engine
function autoDetermineUSDAClassification(calData) {
  const mat = calData ? calData.material_parental : document.getElementById("cal-material").value;
  const relieve = calData ? calData.forma_relieve : document.getElementById("cal-relieve").value;
  const drenaje = calData ? calData.drenaje_clase : document.getElementById("cal-drenaje").value;
  const pedreg = calData ? calData.pedregosidad_sup : document.getElementById("cal-pedregosidad").value;
  const slope = calData ? calData.pendiente_pct : parseFloat(document.getElementById("cal-pendiente").value) || 0;

  let horizontes = [];
  if (calData && calData.horizontes) {
    horizontes = calData.horizontes;
  } else if (state.selectedCalicataId) {
    const sel = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
    if (sel && sel.horizontes) horizontes = sel.horizontes;
  }

  let greatGroup = "Haploxeroll";
  let subgroupPrefix = "Typic";

  // Check 1: Organic material -> Histosol
  if (mat === "ORM") {
    greatGroup = "Haplosaprist";
    subgroupPrefix = "Typic";
  }
  // Check 2: Volcanic Ash -> Andisol
  else if (mat === "ASH") {
    greatGroup = "Haploxerand";
    subgroupPrefix = "Typic";
  }
  // Check 3: Poor drainage -> Aquic Regime
  else if (["VP", "PD", "SP"].includes(drenaje)) {
    subgroupPrefix = "Aquic";
    if (horizontes.some(h => h.designacion && h.designacion.includes("t"))) {
      greatGroup = "Argixeroll";
    } else {
      greatGroup = "Haploxeroll";
    }
  }
  // Check 4: Horizons presence & Diagnostic Subsurface Horizons
  else if (horizontes.length > 0) {
    const hasBt = horizontes.some(h => h.designacion && h.designacion.includes("t"));
    const hasBw = horizontes.some(h => h.designacion && h.designacion.includes("w"));
    const hasBk = horizontes.some(h => h.designacion && h.designacion.includes("k"));

    if (hasBt) {
      greatGroup = "Argixeroll";
    } else if (hasBk) {
      greatGroup = "Calcixeroll";
    } else if (hasBw) {
      greatGroup = "Haploxerept";
      subgroupPrefix = "Typic";
    } else if (horizontes.length <= 2) {
      if (mat === "ALL" || ["AF", "VF"].includes(relieve)) {
        greatGroup = "Xerofluvent";
        subgroupPrefix = "Typic";
      } else {
        greatGroup = "Xerorthent";
        subgroupPrefix = "Typic";
      }
    }
  }
  // Check 5: Parent Material Alluvial
  else if (mat === "ALL" || ["AF", "VF"].includes(relieve)) {
    subgroupPrefix = "Fluventic";
    greatGroup = "Haploxeroll";
  }
  // Check 6: Shallow bedrock or Lithic
  else if (mat === "RES" || pedreg === "Clase 4") {
    subgroupPrefix = "Lithic";
    greatGroup = "Haploxeroll";
  }

  const taxon = `${subgroupPrefix} ${greatGroup}`;
  document.getElementById("cal-clasificacion").value = taxon;
  return taxon;
}

// Calicata Submit Handler
function handleCalicataSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("cal-id").value.trim();
  let existingIndex = state.calicatas.findIndex(c => c.id_calicata === id && c.proyecto_id === state.activeProjectId);

  const fotoElem = document.getElementById("cal-foto-img");

  let clasif = document.getElementById("cal-clasificacion").value.trim();
  if (!clasif) {
    clasif = autoDetermineUSDAClassification();
  }

  const newCal = {
    id_calicata: id,
    proyecto_id: state.activeProjectId,
    fecha: document.getElementById("cal-fecha").value,
    examinador: document.getElementById("cal-examinador").value.trim(),
    clasificacion_usda: clasif,
    material_parental: document.getElementById("cal-material").value,
    forma_relieve: document.getElementById("cal-relieve").value,
    pedregosidad_sup: document.getElementById("cal-pedregosidad").value,
    drenaje_clase: document.getElementById("cal-drenaje").value,
    pendiente_pct: parseCoordinateNumber(document.getElementById("cal-pendiente").value) || 0,
    coord_y: parseCoordinateNumber(document.getElementById("cal-lat").value),
    coord_x: parseCoordinateNumber(document.getElementById("cal-lng").value),
    elevacion_m: parseCoordinateNumber(document.getElementById("cal-elevacion").value),
    altitud_msnm: parseCoordinateNumber(document.getElementById("cal-elevacion").value),

    estado_humedad: document.getElementById("cal-humedad") ? document.getElementById("cal-humedad").value : "",
    nivel_freatico_cm: parseCoordinateNumber(document.getElementById("cal-nivel-freatico") ? document.getElementById("cal-nivel-freatico").value : null),
    prof_raices_cm: parseCoordinateNumber(document.getElementById("cal-prof-raices") ? document.getElementById("cal-prof-raices").value : null),
    profundidad_efectiva_cm: parseCoordinateNumber(document.getElementById("cal-prof-efectiva") ? document.getElementById("cal-prof-efectiva").value : null),

    foto_superficie: fotoElem ? fotoElem.src : "",
    foto_general: fotoElem ? fotoElem.src : "",
    foto_perfil: existingIndex >= 0 ? (state.calicatas[existingIndex].foto_perfil || "") : "",
    horizontes: existingIndex >= 0 ? state.calicatas[existingIndex].horizontes : []
  };

  if (existingIndex >= 0) {
    state.calicatas[existingIndex] = newCal;
  } else {
    state.calicatas.push(newCal);
  }

  saveData();
  selectCalicata(id);
  document.getElementById("form-calicata").classList.add("hidden");
}

function editCalicata(id) {
  const cal = state.calicatas.find(c => c.id_calicata === id && c.proyecto_id === state.activeProjectId);
  if (!cal) return;

  document.getElementById("cal-id").value = cal.id_calicata;
  document.getElementById("cal-fecha").value = cal.fecha || "";
  document.getElementById("cal-examinador").value = cal.examinador || "";
  document.getElementById("cal-clasificacion").value = cal.clasificacion_usda || "";
  document.getElementById("cal-material").value = cal.material_parental || "";
  document.getElementById("cal-relieve").value = cal.forma_relieve || "";
  document.getElementById("cal-pedregosidad").value = cal.pedregosidad_sup || "";
  document.getElementById("cal-drenaje").value = cal.drenaje_clase || "";
  document.getElementById("cal-pendiente").value = cal.pendiente_pct || "";
  document.getElementById("cal-lat").value = cal.coord_y || "";
  document.getElementById("cal-lng").value = cal.coord_x || "";
  document.getElementById("cal-elevacion").value = (cal.elevacion_m !== undefined && cal.elevacion_m !== null) 
    ? cal.elevacion_m 
    : (cal.altitud_msnm !== undefined && cal.altitud_msnm !== null ? cal.altitud_msnm : "");

  const humSelect = document.getElementById("cal-humedad");
  if (humSelect) humSelect.value = cal.estado_humedad || "";
  const freatInput = document.getElementById("cal-nivel-freatico");
  if (freatInput) freatInput.value = (cal.nivel_freatico_cm !== undefined && cal.nivel_freatico_cm !== null) ? cal.nivel_freatico_cm : "";
  const raicesInput = document.getElementById("cal-prof-raices");
  if (raicesInput) raicesInput.value = (cal.prof_raices_cm !== undefined && cal.prof_raices_cm !== null) ? cal.prof_raices_cm : "";
  const profEfInput = document.getElementById("cal-prof-efectiva");
  if (profEfInput) profEfInput.value = (cal.profundidad_efectiva_cm !== undefined && cal.profundidad_efectiva_cm !== null) ? cal.profundidad_efectiva_cm : "";

  const fotoImg = document.getElementById("cal-foto-img");
  const fotoPrev = document.getElementById("cal-foto-preview");
  const surf = cal.foto_superficie || cal.foto_general;
  if (surf) {
    if (fotoImg) fotoImg.src = surf;
    if (fotoPrev) fotoPrev.classList.remove("hidden");
  } else {
    if (fotoImg) fotoImg.src = "";
    if (fotoPrev) fotoPrev.classList.add("hidden");
  }

  document.getElementById("form-calicata-title").textContent = `Editar Calicata ${cal.id_calicata}`;
  toggleSidebar(true);
  document.getElementById("form-calicata").classList.remove("hidden");
  document.getElementById("form-calicata").scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function deleteCalicata(id) {
  if (confirm(`¿Estás seguro de eliminar la Calicata ${id}?`)) {
    state.calicatas = state.calicatas.filter(c => !(c.id_calicata === id && c.proyecto_id === state.activeProjectId));
    if (state.selectedCalicataId === id) state.selectedCalicataId = null;
    saveData();
  }
}

// Horizontes (1:N) Manager Renderer
function renderHorizontesManager() {
  const noSel = document.getElementById("no-calicata-selected");
  const mgr = document.getElementById("horizontes-manager");

  if (!state.selectedCalicataId) {
    noSel.classList.remove("hidden");
    mgr.classList.add("hidden");
    return;
  }

  const cal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
  if (!cal) {
    state.selectedCalicataId = null;
    noSel.classList.remove("hidden");
    mgr.classList.add("hidden");
    return;
  }

  noSel.classList.add("hidden");
  mgr.classList.remove("hidden");

  document.getElementById("selected-calicata-name").textContent = `${cal.id_calicata} (${cal.clasificacion_usda || 'Sin Clasif.'})`;

  // Render Soil Profile Photo (Level 3)
  const perfilImg = document.getElementById("cal-foto-perfil-img");
  const perfilPrev = document.getElementById("cal-foto-perfil-preview");
  const perfilPlace = document.getElementById("cal-foto-perfil-placeholder");
  if (cal.foto_perfil) {
    if (perfilImg) perfilImg.src = cal.foto_perfil;
    if (perfilPrev) perfilPrev.classList.remove("hidden");
    if (perfilPlace) perfilPlace.classList.add("hidden");
  } else {
    if (perfilImg) perfilImg.src = "";
    if (perfilPrev) perfilPrev.classList.add("hidden");
    if (perfilPlace) perfilPlace.classList.remove("hidden");
  }

  const listContainer = document.getElementById("horizontes-list");
  const horizontes = cal.horizontes || [];

  const projectCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);
  const currentIdx = projectCalicatas.findIndex(c => c.id_calicata === cal.id_calicata);

  // Find previous calicata in the same project that has horizons
  let prevCalWithHorizons = null;
  if (currentIdx > 0) {
    for (let i = currentIdx - 1; i >= 0; i--) {
      if (projectCalicatas[i].horizontes && projectCalicatas[i].horizontes.length > 0) {
        prevCalWithHorizons = projectCalicatas[i];
        break;
      }
    }
  }

  // Header copy button handling
  const btnCopyHeader = document.getElementById("btn-copy-prev-horizontes");
  const btnCopyText = document.getElementById("btn-copy-prev-text");
  if (btnCopyHeader) {
    if (prevCalWithHorizons && !horizontes.length) {
      btnCopyHeader.classList.remove("hidden");
      if (btnCopyText) btnCopyText.textContent = `Copiar de ${prevCalWithHorizons.id_calicata}`;
      btnCopyHeader.onclick = () => copyHorizontesFromPrevious(prevCalWithHorizons.id_calicata);
    } else {
      btnCopyHeader.classList.add("hidden");
      btnCopyHeader.onclick = null;
    }
  }

  if (!horizontes.length) {
    if (prevCalWithHorizons) {
      listContainer.innerHTML = `
        <div class="bg-amber-50/50 border-2 border-dashed border-amber-300 rounded-2xl p-6 text-center shadow-xs space-y-4 my-2">
          <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xl shadow-xs">
            <i class="fa-solid fa-clone"></i>
          </div>
          <div>
            <h4 class="font-bold text-slate-800 text-sm sm:text-base">Esta calicata no tiene horizontes registrados</h4>
            <p class="text-xs text-gray-500 mt-1 max-w-sm mx-auto">Puedes prellenar toda la estratigrafía copiándola desde <b>${prevCalWithHorizons.id_calicata}</b> o comenzar a agregar horizontes desde cero.</p>
          </div>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
            <button type="button" onclick="copyHorizontesFromPrevious('${prevCalWithHorizons.id_calicata}')" class="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition cursor-pointer">
              <i class="fa-solid fa-copy text-amber-400"></i>
              <span>Copiar Horizontes de ${prevCalWithHorizons.id_calicata}</span>
            </button>
            <button type="button" onclick="document.getElementById('btn-add-horizonte').click()" class="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 shadow-md transition cursor-pointer">
              <i class="fa-solid fa-plus"></i>
              <span>Agregar Horizonte Vacío</span>
            </button>
          </div>
        </div>
      `;
    } else {
      listContainer.innerHTML = `
        <div class="text-center py-8 text-gray-400 text-sm">
          Esta calicata no tiene horizontes registrados.<br>Haz clic en <b>Agregar Horizonte</b> para empezar.
        </div>
      `;
    }
    return;
  }

  // Enforce stratigraphic continuity and sort by depth
  recalcHorizonDepthsContinuity(cal);

  listContainer.innerHTML = horizontes.map((h, idx) => {
    const colorHex = getMunsellColorHexFromStr(h.color_munsell_humedo || h.color_munsell_seco);
    const rmfCount = (h.rasgos_redox || []).length;
    const horId = h.id_horizonte || `HOR-${idx}`;

    return `
      <div class="p-3 bg-white border rounded-xl shadow-sm space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold border shadow-inner" style="background:${colorHex}"></span>
            <h4 class="font-bold text-slate-800 text-sm">Horizonte ${h.designacion || ''}</h4>
          </div>
          <span class="text-xs font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
            ${h.prof_sup_cm !== undefined ? h.prof_sup_cm : 0} - ${h.prof_inf_cm !== undefined ? h.prof_inf_cm : 0} cm
          </span>
        </div>

        <div class="grid grid-cols-2 gap-1 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
          <div><b>Color Seco:</b> ${h.color_munsell_seco || 'N/A'}</div>
          <div><b>Color Húmedo:</b> ${h.color_munsell_humedo || 'N/A'}</div>
          <div><b>Textura:</b> ${h.textura_campo || 'N/A'}</div>
          <div><b>Estructura:</b> ${h.estructura_tipo || 'N/A'} ${h.estructura_tamano ? '('+h.estructura_tamano+')' : ''}</div>
          <div><b>Raíces:</b> ${h.raices_cantidad ? h.raices_cantidad + ' (' + (h.raices_tamano || '') + ')' : 'N/A'}</div>
          <div><b>Poros:</b> ${h.poros_cantidad ? h.poros_cantidad + ' (' + (h.poros_tamano || '') + ')' : 'N/A'}</div>
          ${(h.frag_vol_pct || h.pedregosidad_clase || h.frag_tipo) ? `<div><b>Pedregosidad Interna:</b> ${h.frag_vol_pct ? h.frag_vol_pct + '% vol' : ''} ${h.pedregosidad_clase ? '('+h.pedregosidad_clase+')' : ''} ${h.frag_tipo ? '- ' + h.frag_tipo : ''}</div>` : ''}
          ${rmfCount ? `<div><b>Rasgos Redox:</b> <span class="text-blue-700 font-semibold">${rmfCount} registrados</span></div>` : ''}
        </div>


        <div class="flex justify-end space-x-2 pt-1">
          <button type="button" onclick="editHorizonte('${horId}', ${idx})" class="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs px-2.5 py-1 rounded-lg font-medium transition flex items-center space-x-1 cursor-pointer">
            <i class="fa-solid fa-pen-to-square"></i>
            <span>Editar</span>
          </button>
          <button type="button" onclick="deleteHorizonte('${horId}', ${idx})" class="bg-red-50 hover:bg-red-100 text-red-600 text-xs px-2.5 py-1 rounded-lg font-medium transition flex items-center space-x-1 cursor-pointer">
            <i class="fa-solid fa-trash"></i>
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function saveRMFItem() {
  const rmf = {
    id_rmf: `RMF-${Date.now()}`,
    rmf_tipo: document.getElementById("rmf-tipo") ? document.getElementById("rmf-tipo").value : "",
    rmf_cantidad: document.getElementById("rmf-cantidad") ? document.getElementById("rmf-cantidad").value : "",
    rmf_contraste: document.getElementById("rmf-contraste") ? document.getElementById("rmf-contraste").value : "",
    rmf_tamano: document.getElementById("rmf-tamano") ? document.getElementById("rmf-tamano").value : "",
    rmf_ubicacion: document.getElementById("rmf-ubicacion") ? document.getElementById("rmf-ubicacion").value : "",
    color_munsell_rmf: document.getElementById("rmf-munsell") ? document.getElementById("rmf-munsell").value.trim() : ""
  };

  if (!rmf.rmf_tipo) {
    alert("Por favor selecciona el tipo de Rasgo Redox (RMF).");
    return;
  }

  if (!state.currentHorizonRMFs) state.currentHorizonRMFs = [];
  state.currentHorizonRMFs.push(rmf);

  const sub = document.getElementById("rmf-subform");
  if (sub) sub.classList.add("hidden");

  setVal("rmf-tipo", "");
  setVal("rmf-cantidad", "");
  setVal("rmf-contraste", "");
  setVal("rmf-tamano", "");
  setVal("rmf-ubicacion", "");
  setVal("rmf-munsell", "");

  const rmfPrev = document.getElementById("preview-munsell-rmf");
  if (rmfPrev) rmfPrev.style.background = "#A0A0A0";

  renderHorizonRMFItems();
}

function deleteRMFItem(idx) {
  if (state.currentHorizonRMFs && state.currentHorizonRMFs[idx]) {
    state.currentHorizonRMFs.splice(idx, 1);
    renderHorizonRMFItems();
  }
}

function renderHorizonRMFItems() {
  const container = document.getElementById("rmf-items-list");
  if (!container) return;

  const items = state.currentHorizonRMFs || [];

  if (!items.length) {
    container.innerHTML = `<span class="text-[11px] text-gray-400 italic">Sin rasgos redoximórficos añadidos.</span>`;
    return;
  }

  container.innerHTML = items.map((item, idx) => {
    const colorHex = getMunsellColorHexFromStr(item.color_munsell_rmf);
    return `
      <div class="flex items-center justify-between bg-white p-1.5 px-2 rounded border border-blue-200 text-xs shadow-2xs">
        <div class="flex items-center space-x-2">
          <span class="w-3.5 h-3.5 rounded-full border flex-shrink-0" style="background:${colorHex}"></span>
          <span class="font-bold text-blue-950">${item.rmf_tipo}</span>
          <span class="text-gray-500 text-[11px]">${item.rmf_cantidad || ''} | ${item.rmf_contraste || ''} | ${item.color_munsell_rmf || 'S/C'}</span>
        </div>
        <button type="button" onclick="deleteRMFItem(${idx})" class="text-red-500 hover:text-red-700 text-xs font-bold px-1">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;
  }).join("");
}

function editHorizonte(idHor, idx) {
  const cal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
  if (!cal || !cal.horizontes) return;

  let h = null;
  if (idHor) {
    h = cal.horizontes.find(item => item.id_horizonte === idHor);
  }
  if (!h && idx !== undefined && idx !== null && cal.horizontes[idx]) {
    h = cal.horizontes[idx];
  }
  if (!h) return;

  const realId = h.id_horizonte || idHor;
  state.editingHorizonteId = realId;
  state.currentHorizonRMFs = JSON.parse(JSON.stringify(h.rasgos_redox || []));

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val !== undefined && val !== null ? val : "";
  };

  const titleElem = document.getElementById("form-horizonte-title");
  if (titleElem) titleElem.textContent = `Editar Horizonte ${h.designacion || ''}`;

  setVal("hor-designacion", h.designacion);
  setVal("hor-prof-sup", h.prof_sup_cm);
  setVal("hor-prof-inf", h.prof_inf_cm);

  setVal("hor-munsell-seco", h.color_munsell_seco);
  setVal("hor-munsell-humedo", h.color_munsell_humedo);

  const prevSeco = document.getElementById("preview-munsell-seco");
  if (prevSeco) prevSeco.style.background = getMunsellColorHexFromStr(h.color_munsell_seco);

  const prevHumedo = document.getElementById("preview-munsell-humedo");
  if (prevHumedo) prevHumedo.style.background = getMunsellColorHexFromStr(h.color_munsell_humedo);

  setVal("hor-textura", h.textura_campo);
  setVal("hor-estructura-tipo", h.estructura_tipo);
  setVal("hor-estructura-grado", h.estructura_grado);
  setVal("hor-estructura-tamano", h.estructura_tamano);
  setVal("hor-consistencia", h.consistencia_humedo);
  setVal("hor-hcl", h.efervescencia_hcl);
  setVal("hor-limite", h.limite_nitidez);
  setVal("hor-limite-topografia", h.limite_topografia);

  setVal("hor-raices-cantidad", h.raices_cantidad);
  setVal("hor-raices-tamano", h.raices_tamano);
  setVal("hor-poros-cantidad", h.poros_cantidad);
  setVal("hor-poros-tamano", h.poros_tamano);
  setVal("hor-frag-vol", h.frag_vol_pct);
  setVal("hor-pedregosidad-clase", h.pedregosidad_clase);
  setVal("hor-frag-tipo", h.frag_tipo);

  renderHorizonRMFItems();

  const formElem = document.getElementById("form-horizonte");
  if (formElem) {
    formElem.classList.remove("hidden");
    formElem.scrollIntoView({ behavior: 'smooth' });
  }
}


function copyHorizontesFromPrevious(prevCalId) {
  const currentCal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
  if (!currentCal) return;

  const prevCal = state.calicatas.find(c => c.id_calicata === prevCalId && c.proyecto_id === state.activeProjectId);
  if (!prevCal || !prevCal.horizontes || !prevCal.horizontes.length) {
    alert("La calicata anterior no tiene horizontes para copiar.");
    return;
  }

  // Deep clone horizontes with clean, unique IDs for the new calicata
  currentCal.horizontes = prevCal.horizontes.map((h, idx) => {
    const clone = JSON.parse(JSON.stringify(h));
    clone.id_horizonte = `HOR-${currentCal.id_calicata}-${clone.designacion || (idx + 1)}`;
    if (clone.rasgos_redox && Array.isArray(clone.rasgos_redox)) {
      clone.rasgos_redox = clone.rasgos_redox.map((r, rIdx) => ({
        ...r,
        id_rmf: `RMF-${Date.now()}-${rIdx}-${Math.random().toString(36).substring(2, 6)}`
      }));
    }
    return clone;
  });

  // Ensure depth continuum
  recalcHorizonDepthsContinuity(currentCal);

  // Copy USDA classification if current is blank
  if (!currentCal.clasificacion_usda && prevCal.clasificacion_usda) {
    currentCal.clasificacion_usda = prevCal.clasificacion_usda;
  }

  saveData();
  renderHorizontesManager();
  renderProfileDiagram();

  // Show notice dialog requested by user
  alert(`Se han prellenado los horizontes según ${prevCal.id_calicata}.\n\nPRECAUCIÓN: SE DEBEN EDITAR LAS DIFERENCIAS QUE CORRESPONDAN.`);
}

// Automatic Stratigraphic Continuum Propagation (Prevent Gaps and Overlaps)
function recalcHorizonDepthsContinuity(cal) {
  if (!cal || !cal.horizontes || !cal.horizontes.length) return;

  // Sort by existing upper depth or designation order
  cal.horizontes.sort((a, b) => (Number(a.prof_sup_cm) || 0) - (Number(b.prof_sup_cm) || 0));

  let currentTop = 0;
  for (let i = 0; i < cal.horizontes.length; i++) {
    const h = cal.horizontes[i];
    const oldSup = Number(h.prof_sup_cm) || 0;
    const oldInf = Number(h.prof_inf_cm) || 0;
    const oldThickness = Math.max(5, oldInf - oldSup);

    h.prof_sup_cm = currentTop;

    // If bottom boundary is less than or equal to the new top boundary, shift bottom boundary down
    if (oldInf <= currentTop) {
      h.prof_inf_cm = currentTop + oldThickness;
    } else {
      h.prof_inf_cm = oldInf;
    }

    currentTop = h.prof_inf_cm;
  }
}

function handleHorizonteSubmit(e) {
  e.preventDefault();
  if (!state.selectedCalicataId) return;

  const cal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
  if (!cal) return;

  if (!cal.horizontes) cal.horizontes = [];

  const desig = document.getElementById("hor-designacion").value.trim();
  const horData = {
    id_horizonte: state.editingHorizonteId || `HOR-${cal.id_calicata}-${desig}`,
    designacion: desig,
    prof_sup_cm: parseInt(document.getElementById("hor-prof-sup").value) || 0,
    prof_inf_cm: parseInt(document.getElementById("hor-prof-inf").value) || 0,
    color_munsell_seco: document.getElementById("hor-munsell-seco").value.trim(),
    color_munsell_humedo: document.getElementById("hor-munsell-humedo").value.trim(),
    textura_campo: document.getElementById("hor-textura").value,
    estructura_tipo: document.getElementById("hor-estructura-tipo").value,
    estructura_grado: document.getElementById("hor-estructura-grado").value,
    estructura_tamano: document.getElementById("hor-estructura-tamano").value,
    consistencia_humedo: document.getElementById("hor-consistencia").value,
    efervescencia_hcl: document.getElementById("hor-hcl").value,
    limite_nitidez: document.getElementById("hor-limite").value,
    limite_topografia: document.getElementById("hor-limite-topografia").value,
    raices_cantidad: document.getElementById("hor-raices-cantidad").value,
    raices_tamano: document.getElementById("hor-raices-tamano").value,
    poros_cantidad: document.getElementById("hor-poros-cantidad").value,
    poros_tamano: document.getElementById("hor-poros-tamano").value,
    frag_vol_pct: parseInt(document.getElementById("hor-frag-vol").value) || 0,
    pedregosidad_clase: document.getElementById("hor-pedregosidad-clase") ? document.getElementById("hor-pedregosidad-clase").value : "",
    frag_tipo: document.getElementById("hor-frag-tipo") ? document.getElementById("hor-frag-tipo").value : "",
    rasgos_redox: state.currentHorizonRMFs || []
  };

  if (state.editingHorizonteId) {
    const idx = cal.horizontes.findIndex(h => h.id_horizonte === state.editingHorizonteId);
    if (idx >= 0) {
      cal.horizontes[idx] = horData;
    } else {
      cal.horizontes.push(horData);
    }
  } else {
    cal.horizontes.push(horData);
  }

  // Automatically recalculate and adjust subsequent horizon depths to prevent overlaps and voids
  recalcHorizonDepthsContinuity(cal);

  state.editingHorizonteId = null;
  state.currentHorizonRMFs = [];

  // Auto-recalculate USDA classification if horizons changed
  if (cal.clasificacion_usda) {
    cal.clasificacion_usda = autoDetermineUSDAClassification(cal);
  }

  saveData();
  document.getElementById("form-horizonte").classList.add("hidden");
  renderHorizontesManager();
  renderProfileDiagram();
}

function deleteHorizonte(idHor, idx) {
  const cal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
  if (!cal || !cal.horizontes) return;

  if (confirm("¿Eliminar este horizonte?")) {
    if (idHor) {
      const initLen = cal.horizontes.length;
      cal.horizontes = cal.horizontes.filter(h => h.id_horizonte !== idHor);
      if (cal.horizontes.length === initLen && idx !== undefined && idx !== null) {
        cal.horizontes.splice(idx, 1);
      }
    } else if (idx !== undefined && idx !== null) {
      cal.horizontes.splice(idx, 1);
    }

    // Automatically adjust depth continuum
    recalcHorizonDepthsContinuity(cal);

    // Auto-recalculate USDA classification if horizons changed
    if (cal.clasificacion_usda) {
      cal.clasificacion_usda = autoDetermineUSDAClassification(cal);
    }

    saveData();
    renderHorizontesManager();
    renderProfileDiagram();
  }
}






// Profile Diagram (Ficha Edafológica) Visualizer
function renderProfileDiagram() {
  const noDiag = document.getElementById("no-diagram-selected");
  const container = document.getElementById("diagram-container");

  if (!state.selectedCalicataId) {
    noDiag.classList.remove("hidden");
    container.classList.add("hidden");
    return;
  }

  const cal = state.calicatas.find(c => c.id_calicata === state.selectedCalicataId && c.proyecto_id === state.activeProjectId);
  if (!cal) {
    noDiag.classList.remove("hidden");
    container.classList.add("hidden");
    return;
  }

  noDiag.classList.add("hidden");
  container.classList.remove("hidden");
  const activeProj = getActiveProject();
  const projName = activeProj ? activeProj.nombre : (cal.proyecto_id || 'N/A');
  const projClient = activeProj ? activeProj.cliente : 'N/A';
  const projLoc = activeProj ? activeProj.ubicacion : 'N/A';

  document.getElementById("diagram-calicata-id").textContent = `Ficha Edafológica - Calicata ${cal.id_calicata}`;
  document.getElementById("diagram-calicata-meta").textContent = `Proyecto: ${projName} | USDA: ${cal.clasificacion_usda || 'Sin datos'} | Fecha: ${cal.fecha || 'N/A'}`;

  // Render Site Metadatos
  const specsContainer = document.getElementById("diagram-site-specs");
  specsContainer.innerHTML = `
    <div><b>Proyecto:</b> ${projName}</div>
    <div><b>Cliente / Mandante:</b> ${projClient || 'N/A'}</div>
    <div><b>Ubicación Proyecto:</b> ${projLoc || 'N/A'}</div>
    <div><b>Examinador:</b> ${cal.examinador || 'N/A'}</div>
    <div><b>Material Parental:</b> ${cal.material_parental || 'N/A'}</div>
    <div><b>Relieve:</b> ${cal.forma_relieve || 'N/A'}</div>
    <div><b>Pendiente:</b> ${cal.pendiente_pct ? cal.pendiente_pct + '%' : 'N/A'}</div>
    <div><b>Drenaje:</b> ${cal.drenaje_clase || 'N/A'}</div>
    <div><b>Humedad Perfil:</b> ${cal.estado_humedad || 'N/A'}</div>
    <div><b>Nivel Freático:</b> ${(cal.nivel_freatico_cm !== undefined && cal.nivel_freatico_cm !== null && cal.nivel_freatico_cm !== '') ? cal.nivel_freatico_cm + ' cm' : 'Ausente'}</div>
    <div><b>Límite Raíces:</b> ${(cal.prof_raices_cm !== undefined && cal.prof_raices_cm !== null && cal.prof_raices_cm !== '') ? cal.prof_raices_cm + ' cm' : 'N/A'}</div>
    <div><b>Prof. Efectiva:</b> ${(cal.profundidad_efectiva_cm !== undefined && cal.profundidad_efectiva_cm !== null && cal.profundidad_efectiva_cm !== '') ? cal.profundidad_efectiva_cm + ' cm' : 'N/A'}</div>
    <div><b>Coordenadas:</b> ${cal.coord_y || 'N/A'}, ${cal.coord_x || 'N/A'}</div>
    <div><b>Altitud:</b> ${(cal.elevacion_m !== undefined && cal.elevacion_m !== null) ? cal.elevacion_m + ' m.s.n.m.' : (cal.altitud_msnm ? cal.altitud_msnm + ' m.s.n.m.' : 'N/A')}</div>
  `;

  // Render Photos Gallery in Ficha Perfil (Side by Side: Superficie & Perfil de Suelo)
  const photoSurfImg = document.getElementById("diagram-photo-superficie-img");
  const photoSurfEmpty = document.getElementById("diagram-photo-superficie-empty");
  const photoPerfilImg = document.getElementById("diagram-photo-perfil-img");
  const photoPerfilEmpty = document.getElementById("diagram-photo-perfil-empty");

  const surfPhoto = (cal.foto_superficie && cal.foto_superficie.trim()) || (cal.foto_general && cal.foto_general.trim());
  if (surfPhoto && !surfPhoto.startsWith("data:image/svg+xml;base64,") && surfPhoto !== "") {
    if (photoSurfImg) {
      photoSurfImg.src = surfPhoto;
      photoSurfImg.classList.remove("hidden");
    }
    if (photoSurfEmpty) photoSurfEmpty.classList.add("hidden");
  } else {
    if (photoSurfImg) {
      photoSurfImg.src = "";
      photoSurfImg.classList.add("hidden");
    }
    if (photoSurfEmpty) photoSurfEmpty.classList.remove("hidden");
  }

  const perfilPhoto = cal.foto_perfil && cal.foto_perfil.trim();
  if (perfilPhoto && !perfilPhoto.startsWith("data:image/svg+xml;base64,") && perfilPhoto !== "") {
    if (photoPerfilImg) {
      photoPerfilImg.src = perfilPhoto;
      photoPerfilImg.classList.remove("hidden");
    }
    if (photoPerfilEmpty) photoPerfilEmpty.classList.add("hidden");
  } else {
    if (photoPerfilImg) {
      photoPerfilImg.src = "";
      photoPerfilImg.classList.add("hidden");
    }
    if (photoPerfilEmpty) photoPerfilEmpty.classList.remove("hidden");
  }

  // Render Soil Horizon Column Diagram & Depth Scale Ruler
  const colVisual = document.getElementById("horizon-column-visual");
  const rulerAxis = document.getElementById("depth-ruler-axis");
  const totalDepthElem = document.getElementById("diagram-total-depth");
  const quickBadgesContainer = document.getElementById("diagram-quick-badges");
  const horizontes = cal.horizontes || [];

  // Render Quick Micro-Badges Bar
  if (quickBadgesContainer) {
    const badges = [];
    if (cal.estado_humedad) {
      badges.push(`<span class="bg-blue-50 text-blue-900 border border-blue-200 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"><i class="fa-solid fa-droplet text-blue-600"></i> ${cal.estado_humedad}</span>`);
    }
    if (cal.nivel_freatico_cm !== undefined && cal.nivel_freatico_cm !== null && cal.nivel_freatico_cm !== '') {
      badges.push(`<span class="bg-sky-50 text-sky-900 border border-sky-200 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"><i class="fa-solid fa-water text-sky-600"></i> Napa: ${cal.nivel_freatico_cm} cm</span>`);
    }
    if (cal.prof_raices_cm !== undefined && cal.prof_raices_cm !== null && cal.prof_raices_cm !== '') {
      badges.push(`<span class="bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"><i class="fa-solid fa-seedling text-emerald-600"></i> Raíces: ${cal.prof_raices_cm} cm</span>`);
    }
    if (cal.profundidad_efectiva_cm !== undefined && cal.profundidad_efectiva_cm !== null && cal.profundidad_efectiva_cm !== '') {
      badges.push(`<span class="bg-amber-50 text-amber-900 border border-amber-200 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"><i class="fa-solid fa-arrows-down-to-line text-amber-700"></i> Prof. Efectiva: ${cal.profundidad_efectiva_cm} cm</span>`);
    }
    quickBadgesContainer.innerHTML = badges.join("");
  }

  if (!horizontes.length) {
    if (colVisual) colVisual.innerHTML = `<div class="p-4 text-center text-gray-400 text-xs">Sin horizontes definidos</div>`;
    if (rulerAxis) rulerAxis.innerHTML = ``;
    if (totalDepthElem) totalDepthElem.textContent = `Profundidad Total: 0 cm`;
    return;
  }

  horizontes.sort((a,b) => (a.prof_sup_cm || 0) - (b.prof_sup_cm || 0));

  // Determine total profile depth
  const maxDepth = Math.max(...horizontes.map(h => h.prof_inf_cm || 0), 10);
  if (totalDepthElem) totalDepthElem.textContent = `Profundidad Total: 0 - ${maxDepth} cm`;

  // Scale factor: 1 cm = 3.5 pixels for strict visual proportionality
  const SCALE_FACTOR = 3.5;
  const totalHeightPx = maxDepth * SCALE_FACTOR;

  // Render Depth Tape Ruler Ticks
  let ticksHTML = [];
  const tickStep = maxDepth > 120 ? 20 : 10;
  for (let d = 0; d <= maxDepth; d += tickStep) {
    const topPx = d * SCALE_FACTOR;
    ticksHTML.push(`
      <div class="depth-tick" style="top:${topPx}px">
        ${d}cm
      </div>
    `);
  }
  if (rulerAxis) {
    rulerAxis.style.height = `${totalHeightPx}px`;
    rulerAxis.innerHTML = ticksHTML.join("");
  }

  // Render Horizon Blocks 100% Proportional
  colVisual.style.height = `${totalHeightPx}px`;
  colVisual.innerHTML = horizontes.map(h => {
    const thickness = Math.max(1, ((h.prof_inf_cm || 0) - (h.prof_sup_cm || 0)));
    const heightPx = thickness * SCALE_FACTOR;
    const bgHex = getMunsellColorHexFromStr(h.color_munsell_humedo || h.color_munsell_seco);

    // Dynamic boundary border style based on limite_nitidez
    let borderStyle = "2px dashed rgba(255,255,255,0.6)";
    if (h.limite_nitidez === "V" || h.limite_nitidez === "A") {
      borderStyle = "2px solid rgba(255,255,255,0.9)";
    } else if (h.limite_nitidez === "G" || h.limite_nitidez === "D") {
      borderStyle = "2px dotted rgba(255,255,255,0.4)";
    }

    return `
      <div class="horizon-block" style="background:${bgHex}; height:${heightPx}px; border-bottom:${borderStyle};">
        <span class="horizon-depth-tag">${h.prof_sup_cm} - ${h.prof_inf_cm} cm (${thickness} cm)</span>
        <h5 class="font-black ${heightPx < 45 ? 'text-xs' : 'text-sm'}">${h.designacion}</h5>
        ${heightPx >= 32 ? `<p class="text-[11px] opacity-95">Munsell: ${h.color_munsell_humedo || h.color_munsell_seco || 'N/A'} | Textura: ${h.textura_campo || 'N/A'}</p>` : ''}
      </div>
    `;
  }).join("");
}


// Munsell Color Helper Parser
function getMunsellColorHexFromStr(str) {
  if (!str) return "#8B7355";
  const parts = str.trim().split(" ");
  if (parts.length >= 2) {
    const hue = parts[0];
    const valChr = parts[1].split("/");
    if (valChr.length === 2) {
      return getMunsellColorHex(hue, valChr[0], valChr[1]);
    }
  }
  return "#8B7355";
}

// Munsell Modal Picker
function openMunsellModal(targetType) {
  state.currentMunsellTarget = targetType;
  document.getElementById("munsell-modal").classList.remove("hidden");
  renderMunsellHueTabs();
  renderMunsellSwatches();
}

function closeMunsellModal() {
  document.getElementById("munsell-modal").classList.add("hidden");
}

function renderMunsellHueTabs() {
  const tabsContainer = document.getElementById("munsell-hue-tabs");
  tabsContainer.innerHTML = MUNSELL_HUES.map(hue => `
    <button onclick="selectMunsellHue('${hue}')" class="px-2.5 py-1 text-xs font-bold rounded-lg border transition ${hue === state.selectedHue ? 'bg-amber-600 text-white border-amber-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
      ${hue}
    </button>
  `).join("");
}

function selectMunsellHue(hue) {
  state.selectedHue = hue;
  renderMunsellHueTabs();
  renderMunsellSwatches();
}

function getMunsellChipsForHue(hue) {
  const chips = [];

  const parseValChr = (h, str) => {
    const parts = str.split("/");
    const v = parseFloat(parts[0]);
    const c = parseFloat(parts[1]);
    const notation = (h === "N" || h.startsWith("N ")) ? `N ${v}/${c}` : `${h} ${v}/${c}`;
    return { val: v, chr: c, hue: h, notation: notation, label: `${v}/${c}` };
  };

  if (hue === "GLEY 1") {
    Object.keys(MUNSELL_SOIL_MATRIX).forEach(key => {
      if (key.startsWith("GLEY 1 - ")) {
        const subHue = key.replace("GLEY 1 - ", "");
        MUNSELL_SOIL_MATRIX[key].forEach(str => {
          const parts = str.split("/");
          const v = parseFloat(parts[0]);
          const c = parseFloat(parts[1]);
          const notat = (subHue === "N") ? `N ${v}/${c}` : `${subHue} ${v}/${c}`;
          chips.push({ val: v, chr: c, hue: subHue, notation: notat, label: notat });
        });
      }
    });
  } else if (hue === "GLEY 2") {
    Object.keys(MUNSELL_SOIL_MATRIX).forEach(key => {
      if (key.startsWith("GLEY 2 - ")) {
        const subHue = key.replace("GLEY 2 - ", "");
        MUNSELL_SOIL_MATRIX[key].forEach(str => {
          const parts = str.split("/");
          const v = parseFloat(parts[0]);
          const c = parseFloat(parts[1]);
          const notat = (subHue === "N") ? `N ${v}/${c}` : `${subHue} ${v}/${c}`;
          chips.push({ val: v, chr: c, hue: subHue, notation: notat, label: notat });
        });
      }
    });
  } else if (hue === "WHITE PAGE") {
    Object.keys(MUNSELL_SOIL_MATRIX).forEach(key => {
      if (key.startsWith("WHITE PAGE - ")) {
        const subHue = key.replace("WHITE PAGE - ", "");
        MUNSELL_SOIL_MATRIX[key].forEach(str => {
          const parts = str.split("/");
          const v = parseFloat(parts[0]);
          const c = parseFloat(parts[1]);
          const notat = (subHue === "N") ? `N ${v}/${c}` : `${subHue} ${v}/${c}`;
          chips.push({ val: v, chr: c, hue: subHue, notation: notat, label: notat });
        });
      }
    });
  } else if (MUNSELL_SOIL_MATRIX[hue]) {
    MUNSELL_SOIL_MATRIX[hue].forEach(str => {
      chips.push(parseValChr(hue, str));
    });
  }

  return chips;
}

function renderMunsellSwatches() {
  const grid = document.getElementById("munsell-swatches-grid");
  const hue = state.selectedHue;
  const chips = getMunsellChipsForHue(hue);

  const countElem = document.getElementById("munsell-chips-count");
  if (countElem) {
    countElem.textContent = `Carta Munsell ${hue} (${chips.length} fichas en filas ordenadas)`;
  }

  // Group chips by Value level (Value)
  const groupedByVal = {};
  chips.forEach(chip => {
    const vKey = String(chip.val);
    if (!groupedByVal[vKey]) {
      groupedByVal[vKey] = { valNum: chip.val, items: [] };
    }
    groupedByVal[vKey].items.push(chip);
  });

  // Sort values descending (highest Value at top of chart, e.g. 8/ down to 2.5/)
  const sortedValKeys = Object.keys(groupedByVal).sort((a, b) => parseFloat(b) - parseFloat(a));

  const rowsHTML = sortedValKeys.map(vKey => {
    const rowObj = groupedByVal[vKey];
    // Sort items in row by Chroma ascending (/1, /2, /3, /4, /6, /8)
    rowObj.items.sort((a, b) => a.chr - b.chr);

    const swatchesHTML = rowObj.items.map(chip => {
      const hex = getMunsellColorHex(chip.hue, chip.val, chip.chr);
      return `
        <div class="munsell-swatch" style="background:${hex}" title="${chip.notation}" onclick="selectMunsellNotation('${chip.notation}', '${hex}')">
          ${chip.label}
        </div>
      `;
    }).join("");

    return `
      <div class="munsell-row">
        <div class="munsell-row-label">${rowObj.valNum}/</div>
        <div class="munsell-swatches-container">
          ${swatchesHTML}
        </div>
      </div>
    `;
  });

  grid.innerHTML = rowsHTML.join("");
}






function selectMunsellNotation(notation, hex) {
  document.getElementById("munsell-selected-notation").textContent = notation;
  document.getElementById("munsell-selected-notation").dataset.hex = hex;
}

function confirmMunsellSelection() {
  const notation = document.getElementById("munsell-selected-notation").textContent;
  const hex = getMunsellColorHexFromStr(notation);

  if (state.currentMunsellTarget === 'seco') {
    document.getElementById("hor-munsell-seco").value = notation;
    document.getElementById("preview-munsell-seco").style.background = hex;
  } else if (state.currentMunsellTarget === 'humedo') {
    document.getElementById("hor-munsell-humedo").value = notation;
    document.getElementById("preview-munsell-humedo").style.background = hex;
  } else if (state.currentMunsellTarget === 'rmf') {
    const rmfInp = document.getElementById("rmf-munsell");
    const rmfPrev = document.getElementById("preview-munsell-rmf");
    if (rmfInp) rmfInp.value = notation;
    if (rmfPrev) rmfPrev.style.background = hex;
  }
  closeMunsellModal();
}

// Standalone Printable HTML Technical Report Generator
function generateProjectHTMLReport(proj, calicatasList) {
  const dateStr = new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const calicatasHTML = calicatasList.map((cal, cIdx) => {
    const horizons = cal.horizontes || [];
    horizons.sort((a,b) => (a.prof_sup_cm || 0) - (b.prof_sup_cm || 0));

    const horizonsRows = horizons.map((h, hIdx) => {
      const hex = getMunsellColorHexFromStr(h.color_munsell_humedo || h.color_munsell_seco || "");
      const rmfs = (h.rasgos_redox || []).map(r => `${r.tipo || 'RMF'} (${r.cantidad || ''} ${r.contraste || ''})`).join(", ");
      return `
        <tr>
          <td style="padding:6px;border:1px solid #cbd5e1;text-align:center;font-weight:bold;">${h.designacion || 'H' + (hIdx+1)}</td>
          <td style="padding:6px;border:1px solid #cbd5e1;text-align:center;">${h.prof_sup_cm || 0} - ${h.prof_inf_cm || 0} cm</td>
          <td style="padding:6px;border:1px solid #cbd5e1;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="display:inline-block;width:16px;height:16px;background:${hex};border:1px solid #94a3b8;border-radius:3px;"></span>
              <span><b>Húm:</b> ${h.color_munsell_humedo || '-'} | <b>Sec:</b> ${h.color_munsell_seco || '-'}</span>
            </div>
          </td>
          <td style="padding:6px;border:1px solid #cbd5e1;">${h.textura_campo || '-'}</td>
          <td style="padding:6px;border:1px solid #cbd5e1;">${h.estructura_tipo || '-'} (${h.estructura_grado || '-'}, ${h.estructura_tamano || '-'})</td>
          <td style="padding:6px;border:1px solid #cbd5e1;">${h.consistencia_humedo || '-'}</td>
          <td style="padding:6px;border:1px solid #cbd5e1;">${h.limite_nitidez || '-'} / ${h.limite_topografia || '-'}</td>
          <td style="padding:6px;border:1px solid #cbd5e1;font-size:11px;">${rmfs || '-'}</td>
        </tr>
      `;
    }).join("");

    return `
      <div style="page-break-inside:avoid;margin-bottom:30px;padding:18px;border:1px solid #cbd5e1;border-radius:10px;background:#ffffff;">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #d97706;padding-bottom:8px;margin-bottom:12px;">
          <h3 style="margin:0;color:#0f172a;font-size:18px;">Calicata ${cal.id_calicata}</h3>
          <span style="background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:6px;font-weight:bold;font-size:12px;">USDA: ${cal.clasificacion_usda || 'No clasificado'}</span>
        </div>

        <table style="width:100%;font-size:12px;border-collapse:collapse;margin-bottom:14px;">
          <tr>
            <td style="padding:4px;width:25%;"><b>Fecha:</b> ${cal.fecha || '-'}</td>
            <td style="padding:4px;width:25%;"><b>Examinador:</b> ${cal.examinador || '-'}</td>
            <td style="padding:4px;width:25%;"><b>Coordenadas:</b> ${cal.coord_y ? cal.coord_y.toFixed(5) : '-'}, ${cal.coord_x ? cal.coord_x.toFixed(5) : '-'}</td>
            <td style="padding:4px;width:25%;"><b>Altitud:</b> ${(cal.elevacion_m !== undefined && cal.elevacion_m !== null) ? cal.elevacion_m + ' m' : (cal.altitud_msnm ? cal.altitud_msnm + ' m' : '-')}</td>
          </tr>
          <tr>
            <td style="padding:4px;"><b>Material Parental:</b> ${cal.material_parental || '-'}</td>
            <td style="padding:4px;"><b>Relieve / Posición:</b> ${cal.forma_relieve || '-'}</td>
            <td style="padding:4px;"><b>Pendiente:</b> ${cal.pendiente_pct ? cal.pendiente_pct + '%' : '-'}</td>
            <td style="padding:4px;"><b>Drenaje:</b> ${cal.drenaje_clase || '-'}</td>
          </tr>
          <tr>
            <td style="padding:4px;"><b>Humedad Perfil:</b> ${cal.estado_humedad || '-'}</td>
            <td style="padding:4px;"><b>Nivel Freático:</b> ${(cal.nivel_freatico_cm !== undefined && cal.nivel_freatico_cm !== null && cal.nivel_freatico_cm !== '') ? cal.nivel_freatico_cm + ' cm' : 'Ausente'}</td>
            <td style="padding:4px;"><b>Límite Raíces:</b> ${(cal.prof_raices_cm !== undefined && cal.prof_raices_cm !== null && cal.prof_raices_cm !== '') ? cal.prof_raices_cm + ' cm' : '-'}</td>
            <td style="padding:4px;"><b>Prof. Efectiva:</b> ${(cal.profundidad_efectiva_cm !== undefined && cal.profundidad_efectiva_cm !== null && cal.profundidad_efectiva_cm !== '') ? cal.profundidad_efectiva_cm + ' cm' : '-'}</td>
          </tr>
        </table>

        <!-- Photos Section (Surface & Soil Profile) -->
        <div style="display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap;">
          ${(cal.foto_superficie || cal.foto_general) ? `
            <div style="flex:1;min-width:260px;border:1px solid #e2e8f0;border-radius:8px;padding:6px;text-align:center;background:#f8fafc;">
              <span style="display:block;font-size:11px;font-weight:bold;color:#475569;margin-bottom:4px;">Foto Superficie / Entorno (Nivel 2)</span>
              <img src="${cal.foto_superficie_rel || cal.foto_superficie || cal.foto_general}" style="max-height:220px;width:100%;object-fit:cover;border-radius:6px;">
            </div>
          ` : ''}
          ${cal.foto_perfil ? `
            <div style="flex:1;min-width:260px;border:1px solid #e2e8f0;border-radius:8px;padding:6px;text-align:center;background:#f8fafc;">
              <span style="display:block;font-size:11px;font-weight:bold;color:#475569;margin-bottom:4px;">Foto del perfil de suelo</span>
              <img src="${cal.foto_perfil_rel || cal.foto_perfil}" style="max-height:220px;width:100%;object-fit:cover;border-radius:6px;">
            </div>
          ` : ''}
        </div>

        <h4 style="margin:10px 0 6px 0;color:#334155;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Estratigrafía de Horizontes (${horizons.length})</h4>
        <table style="width:100%;border-collapse:collapse;font-size:11px;text-align:left;">
          <thead>
            <tr style="background:#f1f5f9;color:#334155;">
              <th style="padding:6px;border:1px solid #cbd5e1;text-align:center;">Horiz.</th>
              <th style="padding:6px;border:1px solid #cbd5e1;text-align:center;">Prof. (cm)</th>
              <th style="padding:6px;border:1px solid #cbd5e1;">Color Munsell</th>
              <th style="padding:6px;border:1px solid #cbd5e1;">Textura</th>
              <th style="padding:6px;border:1px solid #cbd5e1;">Estructura</th>
              <th style="padding:6px;border:1px solid #cbd5e1;">Consistencia</th>
              <th style="padding:6px;border:1px solid #cbd5e1;">Límite</th>
              <th style="padding:6px;border:1px solid #cbd5e1;">Rasgos Redox (RMF)</th>
            </tr>
          </thead>
          <tbody>
            ${horizonsRows || '<tr><td colspan="8" style="padding:8px;text-align:center;color:#94a3b8;">Sin horizontes registrados</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  }).join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Informe Edafológico - ${proj.id_proyecto}: ${proj.nombre}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5; padding: 24px; max-width: 1050px; margin: auto; background: #f8fafc; }
    h1, h2, h3, h4 { color: #0f172a; }
    @media print {
      body { background: #ffffff; padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div style="background:#ffffff;padding:24px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:24px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #d97706;padding-bottom:12px;margin-bottom:16px;">
      <div>
        <span style="font-size:12px;font-weight:bold;color:#d97706;text-transform:uppercase;letter-spacing:1px;">Informe Técnico Edafológico Consolidado</span>
        <h1 style="margin:4px 0 0 0;font-size:24px;">${proj.id_proyecto} - ${proj.nombre}</h1>
      </div>
      <button class="no-print" onclick="window.print()" style="background:#0f172a;color:#ffffff;padding:8px 16px;border-radius:8px;border:none;cursor:pointer;font-weight:bold;">Imprimir / Guardar PDF</button>
    </div>

    ${proj.foto_paisaje ? `
      <div style="margin-bottom:16px;text-align:center;">
        <img src="${proj.foto_paisaje_rel || proj.foto_paisaje}" style="max-height:280px;width:100%;object-fit:cover;border-radius:8px;border:1px solid #cbd5e1;">
        <span style="display:block;font-size:11px;color:#64748b;margin-top:4px;font-style:italic;">Fotografía Panorámica del Paisaje / Predio General (Nivel 1 - ${proj.id_proyecto})</span>
      </div>
    ` : ''}

    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;background:#f8fafc;padding:14px;border-radius:8px;font-size:13px;">
      <div><b>Cliente / Mandante:</b> ${proj.cliente || '-'}</div>
      <div><b>Ubicación:</b> ${proj.ubicacion || '-'}</div>
      <div><b>Responsable / Edafólogo:</b> ${proj.responsable || '-'}</div>
      <div><b>Fecha Estudio:</b> ${proj.fecha_creacion || dateStr}</div>
      <div><b>Superficie Estimada:</b> ${proj.superficie_ha ? proj.superficie_ha + ' ha' : '-'}</div>
      <div><b>Nivel de Detalle:</b> ${proj.nivel_detalle || '-'}</div>
      <div style="grid-column:1/-1;"><b>Objetivo del Estudio:</b> ${proj.objetivo_estudio || '-'}</div>
      ${proj.descripcion ? `<div style="grid-column:1/-1;"><b>Descripción / Notas:</b> ${proj.descripcion}</div>` : ''}
    </div>
  </div>

  <h2 style="font-size:18px;margin-bottom:14px;color:#0f172a;">Fichas Descriptivas de Calicatas (${calicatasList.length} Puntos de Muestreo)</h2>
  ${calicatasHTML || '<p style="color:#94a3b8;">No hay calicatas registradas en este proyecto.</p>'}
</body>
</html>`;
}

// SQL.js WASM Instance Loader Helper (Embedded Binary / Offline First with CDN fallback)
async function getSqlInstance() {
  if (typeof initSqlJs === "undefined") {
    throw new Error("La librería SQLite/GeoPackage WASM no está disponible.");
  }
  if (window.SQL_WASM_BINARY) {
    try {
      return await initSqlJs({
        wasmBinary: window.SQL_WASM_BINARY
      });
    } catch (binErr) {
      console.warn("Fallo carga con wasmBinary, intentando fetch local:", binErr);
    }
  }
  try {
    return await initSqlJs({
      locateFile: file => (file.endsWith('.wasm') ? 'vendor/sql-wasm.wasm' : 'vendor/' + file)
    });
  } catch (wasmLocalErr) {
    console.warn("Fallo carga local de WASM, intentando CDN:", wasmLocalErr);
    return await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });
  }
}

// Consolidated Project ZIP Export (.zip containing fotos/, gis/, informes/, and metadata)
async function exportProjectZIP(targetProjectId) {
  const projId = targetProjectId || state.activeProjectId;
  let activeProj = state.projects.find(p => p.id_proyecto === projId) || getActiveProject();
  if (!activeProj) {
    activeProj = {
      id_proyecto: projId || "PROJ-01",
      nombre: "Proyecto Edafológico",
      cliente: "General",
      ubicacion: "Terreno",
      superficie_ha: null,
      objetivo_estudio: "Descripción Edafológica",
      nivel_detalle: "Semidetallado"
    };
  }

  let projCalicatas = state.calicatas.filter(c => c.proyecto_id === activeProj.id_proyecto);
  if (!projCalicatas.length && state.calicatas.length) {
    projCalicatas = state.calicatas;
  }

  const btnZip = document.getElementById("btn-export-zip");
  const originalText = btnZip ? btnZip.innerHTML : "";
  if (btnZip) {
    btnZip.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i><span>Generando ZIP...</span>';
    btnZip.disabled = true;
  }

  try {
    if (typeof JSZip === "undefined") {
      throw new Error("La librería JSZip no está disponible.");
    }

    const zip = new JSZip();
    const projSlug = `${activeProj.id_proyecto}_${activeProj.nombre}`.replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 40);
    const rootFolder = zip.folder(projSlug);
    const fotosFolder = rootFolder.folder("fotos");
    const gisFolder = rootFolder.folder("gis");
    const informesFolder = rootFolder.folder("informes");

    // Helper: DataURL to Uint8Array binary
    function dataUrlToBinary(dataUrl) {
      if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.includes(',')) return null;
      try {
        const base64 = dataUrl.split(',')[1];
        const binaryStr = atob(base64);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        return bytes;
      } catch (e) {
        console.warn("Error convirtiendo imagen a binario:", e);
        return null;
      }
    }

    // 1. Pack Project Landscape Photo (Level 1)
    let projPhotoRel = "";
    if (activeProj.foto_paisaje) {
      const u8 = dataUrlToBinary(activeProj.foto_paisaje);
      if (u8) {
        const fname = `${activeProj.id_proyecto}_paisaje_general.jpg`;
        fotosFolder.file(fname, u8);
        projPhotoRel = `fotos/${fname}`;
      }
    }

    // 2. Pack Calicata Photos (Level 2: Surface, Level 3: Profile)
    const calicatasWithRelPhotos = projCalicatas.map(c => {
      let surfRel = "";
      let perfRel = "";

      const surfData = c.foto_superficie || c.foto_general;
      if (surfData) {
        const u8 = dataUrlToBinary(surfData);
        if (u8) {
          const fname = `${c.id_calicata}_superficie.jpg`;
          fotosFolder.file(fname, u8);
          surfRel = `fotos/${fname}`;
        }
      }

      if (c.foto_perfil) {
        const u8 = dataUrlToBinary(c.foto_perfil);
        if (u8) {
          const fname = `${c.id_calicata}_perfil_suelo.jpg`;
          fotosFolder.file(fname, u8);
          perfRel = `fotos/${fname}`;
        }
      }

      return {
        ...c,
        foto_superficie_rel: surfRel,
        foto_perfil_rel: perfRel
      };
    });

    // 3. Generate OGC GeoPackage (.gpkg)
    try {
      if (typeof initSqlJs !== "undefined") {
        const SQL = await getSqlInstance();
        const db = new SQL.Database();

      db.run("PRAGMA application_id = 1196444487;");
      db.run("PRAGMA user_version = 10200;");

      db.run(`
        CREATE TABLE gpkg_spatial_ref_sys (
          srs_name TEXT NOT NULL,
          srs_id INTEGER NOT NULL PRIMARY KEY,
          organization TEXT NOT NULL,
          organization_coordsys_id INTEGER NOT NULL,
          definition TEXT NOT NULL,
          description TEXT
        );
      `);

      db.run(`
        INSERT INTO gpkg_spatial_ref_sys VALUES
        ('Undefined cartesian SRS', -1, 'NONE', -1, 'undefined', 'undefined cartesian coordinate reference system'),
        ('Undefined geographic SRS', 0, 'NONE', 0, 'undefined', 'undefined geographic coordinate reference system'),
        ('WGS 84 geodetic', 4326, 'EPSG', 4326, 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","6326"]],AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AXIS["Latitude",NORTH],AXIS["Longitude",EAST],AUTHORITY["EPSG","4326"]]', 'longitude/latitude coordinates in degrees');
      `);

      db.run(`
        CREATE TABLE gpkg_contents (
          table_name TEXT NOT NULL PRIMARY KEY,
          data_type TEXT NOT NULL,
          identifier TEXT UNIQUE,
          description TEXT DEFAULT '',
          last_change DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
          min_x DOUBLE,
          min_y DOUBLE,
          max_x DOUBLE,
          max_y DOUBLE,
          srs_id INTEGER,
          CONSTRAINT fk_gc_r_srs_id FOREIGN KEY (srs_id) REFERENCES gpkg_spatial_ref_sys(srs_id)
        );
      `);

      db.run(`
        CREATE TABLE gpkg_geometry_columns (
          table_name TEXT NOT NULL,
          column_name TEXT NOT NULL,
          geometry_type_name TEXT NOT NULL,
          srs_id INTEGER NOT NULL,
          z TINYINT NOT NULL,
          m TINYINT NOT NULL,
          CONSTRAINT pk_geom_cols PRIMARY KEY (table_name, column_name),
          CONSTRAINT fk_gc_tn FOREIGN KEY (table_name) REFERENCES gpkg_contents(table_name),
          CONSTRAINT fk_gc_srs_id FOREIGN KEY (srs_id) REFERENCES gpkg_spatial_ref_sys(srs_id)
        );
      `);

      db.run(`
        CREATE TABLE calicatas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          geom BLOB,
          id_calicata TEXT,
          proyecto_id TEXT,
          proyecto_nombre TEXT,
          cliente TEXT,
          ubicacion TEXT,
          proyecto_superficie_ha REAL,
          proyecto_objetivo TEXT,
          proyecto_nivel_detalle TEXT,
          fecha TEXT,
          examinador TEXT,
          coord_x REAL,
          coord_y REAL,
          elevacion_m REAL,
          material_parental TEXT,
          forma_relieve TEXT,
          posicion_relieve TEXT,
          pendiente_porc REAL,
          pedregosidad_sup TEXT,
          drenaje_clase TEXT,
          estado_humedad TEXT,
          nivel_freatico_cm REAL,
          prof_raices_cm REAL,
          profundidad_efectiva_cm REAL,
          clasificacion_usda TEXT,
          num_horizontes INTEGER,
          foto_superficie_path TEXT,
          foto_perfil_path TEXT,
          foto_paisaje_path TEXT,
          notas TEXT
        );
      `);

      db.run(`
        CREATE TABLE horizontes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_calicata TEXT,
          proyecto_id TEXT,
          id_horizonte TEXT,
          profundidad_sup REAL,
          profundidad_inf REAL,
          espesor_cm REAL,
          color_humedo_munsell TEXT,
          color_humedo_hex TEXT,
          color_seco_munsell TEXT,
          color_seco_hex TEXT,
          textura_campo TEXT,
          estructura_tipo TEXT,
          estructura_grado TEXT,
          estructura_tamano TEXT,
          consistencia_humedo TEXT,
          efervescencia_hcl TEXT,
          limite_nitidez TEXT,
          limite_topografia TEXT,
          raices_cantidad TEXT,
          raices_tamano TEXT,
          poros_cantidad TEXT,
          poros_tamano TEXT,
          pedregosidad_clase TEXT,
          frag_tipo TEXT,
          rasgos_redox_resumen TEXT,
          notas TEXT
        );
      `);

      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      calicatasWithRelPhotos.forEach(c => {
        if (c.coord_x && c.coord_y) {
          if (c.coord_x < minX) minX = c.coord_x;
          if (c.coord_x > maxX) maxX = c.coord_x;
          if (c.coord_y < minY) minY = c.coord_y;
          if (c.coord_y > maxY) maxY = c.coord_y;
        }
      });
      if (minX === Infinity) { minX = -71.0; maxX = -70.0; minY = -35.0; maxY = -33.0; }

      db.run(`
        INSERT INTO gpkg_contents (table_name, data_type, identifier, description, min_x, min_y, max_x, max_y, srs_id)
        VALUES ('calicatas', 'features', 'calicatas', 'Capa de Calicatas Edafológicas (Puntos)', ${minX}, ${minY}, ${maxX}, ${maxY}, 4326);
      `);

      db.run(`
        INSERT INTO gpkg_contents (table_name, data_type, identifier, description, srs_id)
        VALUES ('horizontes', 'attributes', 'horizontes', 'Tabla Relacional 1:N de Horizontes de Suelo', 0);
      `);

      db.run(`
        INSERT INTO gpkg_geometry_columns (table_name, column_name, geometry_type_name, srs_id, z, m)
        VALUES ('calicatas', 'geom', 'POINT', 4326, 0, 0);
      `);

      function makeGpkgPoint(x, y) {
        const buffer = new ArrayBuffer(29);
        const view = new DataView(buffer);
        view.setUint8(0, 0x47);
        view.setUint8(1, 0x50);
        view.setUint8(2, 0x00);
        view.setUint8(3, 0x01);
        view.setInt32(4, 4326, true);
        view.setUint8(8, 0x01);
        view.setUint32(9, 1, true);
        view.setFloat64(13, x, true);
        view.setFloat64(21, y, true);
        return new Uint8Array(buffer);
      }

      calicatasWithRelPhotos.forEach(c => {
        const geomBlob = (c.coord_x && c.coord_y) ? makeGpkgPoint(c.coord_x, c.coord_y) : null;
        db.run(`
          INSERT INTO calicatas (
            geom, id_calicata, proyecto_id, proyecto_nombre, cliente, ubicacion,
            proyecto_superficie_ha, proyecto_objetivo, proyecto_nivel_detalle,
            fecha, examinador, coord_x, coord_y, elevacion_m, material_parental, forma_relieve, posicion_relieve,
            pendiente_porc, pedregosidad_sup, drenaje_clase, estado_humedad, nivel_freatico_cm, prof_raices_cm, profundidad_efectiva_cm,
            clasificacion_usda, num_horizontes, foto_superficie_path, foto_perfil_path, foto_paisaje_path, notas
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          geomBlob,
          c.id_calicata || "",
          c.proyecto_id || activeProj.id_proyecto,
          activeProj.nombre,
          activeProj.cliente,
          activeProj.ubicacion,
          activeProj.superficie_ha,
          activeProj.objetivo_estudio,
          activeProj.nivel_detalle,
          c.fecha || "",
          c.examinador || "",
          c.coord_x || 0,
          c.coord_y || 0,
          c.elevacion_m || c.altitud_msnm || null,
          c.material_parental || "",
          c.forma_relieve || "",
          c.posicion_relieve || "",
          c.pendiente_pct || null,
          c.pedregosidad_sup || "",
          c.drenaje_clase || "",
          c.estado_humedad || "",
          c.nivel_freatico_cm || null,
          c.prof_raices_cm || null,
          c.profundidad_efectiva_cm || null,
          c.clasificacion_usda || "",
          c.horizontes ? c.horizontes.length : 0,
          c.foto_superficie_rel || "",
          c.foto_perfil_rel || "",
          projPhotoRel || "",
          c.notas || ""
        ]);

        if (c.horizontes && Array.isArray(c.horizontes)) {
          c.horizontes.forEach(h => {
            const hSecoHex = getMunsellColorHexFromStr(h.color_munsell_seco || "");
            const hHumHex = getMunsellColorHexFromStr(h.color_munsell_humedo || "");
            const redoxStr = (h.rasgos_redox || []).map(r => `${r.tipo || ''} (${r.cantidad || ''} ${r.contraste || ''})`).join("; ");
            const espesor = ((h.prof_inf_cm || 0) - (h.prof_sup_cm || 0));

            db.run(`
              INSERT INTO horizontes (
                id_calicata, proyecto_id, id_horizonte, profundidad_sup, profundidad_inf, espesor_cm,
                color_humedo_munsell, color_humedo_hex, color_seco_munsell, color_seco_hex,
                textura_campo, estructura_tipo, estructura_grado, estructura_tamano, consistencia_humedo,
                efervescencia_hcl, limite_nitidez, limite_topografia, raices_cantidad, raices_tamano,
                poros_cantidad, poros_tamano, pedregosidad_clase, frag_tipo, rasgos_redox_resumen, notas
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
              c.id_calicata,
              c.proyecto_id || activeProj.id_proyecto,
              h.designacion || h.id_horizonte || "",
              h.prof_sup_cm || 0,
              h.prof_inf_cm || 0,
              espesor > 0 ? espesor : 0,
              h.color_munsell_humedo || "",
              hHumHex,
              h.color_munsell_seco || "",
              hSecoHex,
              h.textura_campo || "",
              h.estructura_tipo || "",
              h.estructura_grado || "",
              h.estructura_tamano || "",
              h.consistencia_humedo || "",
              h.efervescencia_hcl || "",
              h.limite_nitidez || "",
              h.limite_topografia || "",
              h.raices_cantidad || "",
              h.raices_tamano || "",
              h.poros_cantidad || "",
              h.poros_tamano || "",
              h.pedregosidad_clase || "",
              h.frag_tipo || "",
              redoxStr,
              h.notas || ""
            ]);
          });
        }
      });

        const gpkgBinary = db.export();
        gisFolder.file(`${projSlug}_geopackage.gpkg`, gpkgBinary);
      }
    } catch (gpkgErr) {
      console.warn("Aviso: No se pudo adjuntar GeoPackage al ZIP en este navegador, se incluye GeoJSON y HTML:", gpkgErr);
    }

    // 4. Generate GeoJSON FeatureCollection
    const geojson = {
      type: "FeatureCollection",
      name: `${projSlug}_muestreo`,
      metadata: {
        proyecto_id: activeProj.id_proyecto,
        nombre: activeProj.nombre,
        cliente: activeProj.cliente,
        ubicacion: activeProj.ubicacion,
        superficie_ha: activeProj.superficie_ha,
        objetivo_estudio: activeProj.objetivo_estudio,
        nivel_detalle: activeProj.nivel_detalle,
        foto_paisaje_path: projPhotoRel
      },
      features: calicatasWithRelPhotos.filter(c => c.coord_x && c.coord_y).map(c => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [c.coord_x, c.coord_y]
        },
        properties: {
          id_calicata: c.id_calicata,
          proyecto_id: c.proyecto_id,
          fecha: c.fecha,
          examinador: c.examinador,
          elevacion_m: c.elevacion_m || c.altitud_msnm,
          clasificacion_usda: c.clasificacion_usda,
          material_parental: c.material_parental,
          forma_relieve: c.forma_relieve,
          pendiente_pct: c.pendiente_pct,
          drenaje_clase: c.drenaje_clase,
          estado_humedad: c.estado_humedad || "",
          nivel_freatico_cm: c.nivel_freatico_cm || null,
          prof_raices_cm: c.prof_raices_cm || null,
          profundidad_efectiva_cm: c.profundidad_efectiva_cm || null,
          foto_superficie_path: c.foto_superficie_rel,
          foto_perfil_path: c.foto_perfil_rel,
          num_horizontes: c.horizontes ? c.horizontes.length : 0,
          horizontes: c.horizontes || []
        }
      }))
    };
    gisFolder.file(`${projSlug}_muestreo.geojson`, JSON.stringify(geojson, null, 2));

    // 5. Generate Standalone HTML Report
    const htmlReport = generateProjectHTMLReport({
      ...activeProj,
      foto_paisaje_rel: projPhotoRel
    }, calicatasWithRelPhotos);
    informesFolder.file(`${projSlug}_fichas_tecnicas.html`, htmlReport);

    // 6. Project Database Metadata JSON
    rootFolder.file("metadatos_proyecto.json", JSON.stringify({
      proyecto: activeProj,
      calicatas: projCalicatas,
      fecha_exportacion: new Date().toISOString()
    }, null, 2));

    // 7. Compress & Download ZIP
    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 }
    });

    const dateStr = new Date().toISOString().split('T')[0];
    const zipFilename = `${projSlug}_completo_${dateStr}.zip`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(zipBlob);
    a.download = zipFilename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);

  } catch (err) {
    console.error("Error al exportar paquete ZIP:", err);
    alert("Error al exportar el paquete ZIP: " + err.message);
  } finally {
    if (btnZip) {
      btnZip.innerHTML = originalText;
      btnZip.disabled = false;
    }
  }
}

// OGC GeoPackage (.gpkg) Relational 1:N Export for QGIS
async function exportDataGeoPackage() {
  let activeProj = getActiveProject();
  if (!activeProj) {
    activeProj = {
      id_proyecto: state.activeProjectId || "PROJ-01",
      nombre: "Proyecto Edafológico",
      cliente: "General",
      ubicacion: "Terreno"
    };
  }

  const projCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);
  const dataToExport = projCalicatas.length ? projCalicatas : state.calicatas;

  if (!dataToExport.length) {
    alert("No hay calicatas registradas para exportar a GeoPackage.");
    return;
  }

  const btnGpkg = document.getElementById("btn-export-gpkg");
  const originalBtnText = btnGpkg ? btnGpkg.innerHTML : "";
  if (btnGpkg) {
    btnGpkg.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i><span>Generando...</span>`;
    btnGpkg.disabled = true;
  }

  try {
    const SQL = await getSqlInstance();
    const db = new SQL.Database();

    // 1. OGC Standard PRAGMAs
    db.run("PRAGMA application_id = 1196444487;");
    db.run("PRAGMA user_version = 10200;");

    // 2. Create OGC metadata tables
    db.run(`
      CREATE TABLE gpkg_spatial_ref_sys (
        srs_name TEXT NOT NULL,
        srs_id INTEGER NOT NULL PRIMARY KEY,
        organization TEXT NOT NULL,
        organization_coordsys_id INTEGER NOT NULL,
        definition TEXT NOT NULL,
        description TEXT
      );
    `);

    db.run(`
      INSERT INTO gpkg_spatial_ref_sys VALUES
      ('Undefined cartesian SRS', -1, 'NONE', -1, 'undefined', 'undefined cartesian coordinate reference system'),
      ('Undefined geographic SRS', 0, 'NONE', 0, 'undefined', 'undefined geographic coordinate reference system'),
      ('WGS 84 geodetic', 4326, 'EPSG', 4326, 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AXIS["Latitude",NORTH],AXIS["Longitude",EAST],AUTHORITY["EPSG","4326"]]', 'longitude/latitude coordinates in degrees');
    `);

    db.run(`
      CREATE TABLE gpkg_contents (
        table_name TEXT NOT NULL PRIMARY KEY,
        data_type TEXT NOT NULL,
        identifier TEXT UNIQUE,
        description TEXT DEFAULT '',
        last_change DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
        min_x DOUBLE,
        min_y DOUBLE,
        max_x DOUBLE,
        max_y DOUBLE,
        srs_id INTEGER,
        CONSTRAINT fk_gc_r_srs_id FOREIGN KEY (srs_id) REFERENCES gpkg_spatial_ref_sys(srs_id)
      );
    `);

    db.run(`
      CREATE TABLE gpkg_geometry_columns (
        table_name TEXT NOT NULL,
        column_name TEXT NOT NULL,
        geometry_type_name TEXT NOT NULL,
        srs_id INTEGER NOT NULL,
        z TINYINT NOT NULL,
        m TINYINT NOT NULL,
        CONSTRAINT pk_geom_cols PRIMARY KEY (table_name, column_name),
        CONSTRAINT fk_gc_tn FOREIGN KEY (table_name) REFERENCES gpkg_contents(table_name),
        CONSTRAINT fk_gc_srs_id FOREIGN KEY (srs_id) REFERENCES gpkg_spatial_ref_sys(srs_id)
      );
    `);

    // 3. Create spatial table 'calicatas' (Point) and non-spatial table 'horizontes'
    db.run(`
      CREATE TABLE calicatas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        geom BLOB,
        id_calicata TEXT,
        proyecto_id TEXT,
        proyecto_nombre TEXT,
        cliente TEXT,
        ubicacion TEXT,
        proyecto_superficie_ha REAL,
        proyecto_objetivo TEXT,
        proyecto_nivel_detalle TEXT,
        fecha TEXT,
        examinador TEXT,
        coord_x REAL,
        coord_y REAL,
        elevacion_m REAL,
        material_parental TEXT,
        forma_relieve TEXT,
        posicion_relieve TEXT,
        pendiente_porc REAL,
        pedregosidad_sup TEXT,
        drenaje_clase TEXT,
        estado_humedad TEXT,
        nivel_freatico_cm REAL,
        prof_raices_cm REAL,
        profundidad_efectiva_cm REAL,
        clasificacion_usda TEXT,
        num_horizontes INTEGER,
        notas TEXT
      );
    `);

    db.run(`
      CREATE TABLE horizontes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_calicata TEXT,
        proyecto_id TEXT,
        id_horizonte TEXT,
        profundidad_sup REAL,
        profundidad_inf REAL,
        espesor_cm REAL,
        color_humedo_munsell TEXT,
        color_humedo_hex TEXT,
        color_seco_munsell TEXT,
        color_seco_hex TEXT,
        textura_campo TEXT,
        estructura_tipo TEXT,
        estructura_grado TEXT,
        estructura_tamano TEXT,
        consistencia_humedo TEXT,
        efervescencia_hcl TEXT,
        limite_nitidez TEXT,
        limite_topografia TEXT,
        raices_cantidad TEXT,
        raices_tamano TEXT,
        poros_cantidad TEXT,
        poros_tamano TEXT,
        pedregosidad_clase TEXT,
        frag_tipo TEXT,
        rasgos_redox_resumen TEXT,
        notas TEXT
      );
    `);

    // Calculate bounding box
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    dataToExport.forEach(c => {
      if (c.coord_x && c.coord_y) {
        if (c.coord_x < minX) minX = c.coord_x;
        if (c.coord_x > maxX) maxX = c.coord_x;
        if (c.coord_y < minY) minY = c.coord_y;
        if (c.coord_y > maxY) maxY = c.coord_y;
      }
    });

    if (minX === Infinity) {
      minX = -71.0; maxX = -70.0; minY = -35.0; maxY = -33.0;
    }

    db.run(`
      INSERT INTO gpkg_contents (table_name, data_type, identifier, description, min_x, min_y, max_x, max_y, srs_id)
      VALUES ('calicatas', 'features', 'calicatas', 'Capa de Calicatas Edafológicas (Puntos)', ${minX}, ${minY}, ${maxX}, ${maxY}, 4326);
    `);

    db.run(`
      INSERT INTO gpkg_contents (table_name, data_type, identifier, description, srs_id)
      VALUES ('horizontes', 'attributes', 'horizontes', 'Tabla Relacional 1:N de Horizontes de Suelo', 0);
    `);

    db.run(`
      INSERT INTO gpkg_geometry_columns (table_name, column_name, geometry_type_name, srs_id, z, m)
      VALUES ('calicatas', 'geom', 'POINT', 4326, 0, 0);
    `);

    // Encode GPKG Binary Point BLOB (29 bytes standard)
    function makeGpkgPoint(x, y) {
      const buffer = new ArrayBuffer(29);
      const view = new DataView(buffer);
      view.setUint8(0, 0x47);
      view.setUint8(1, 0x50);
      view.setUint8(2, 0x00);
      view.setUint8(3, 0x01);
      view.setInt32(4, 4326, true);
      view.setUint8(8, 0x01);
      view.setUint32(9, 1, true);
      view.setFloat64(13, x, true);
      view.setFloat64(21, y, true);
      return new Uint8Array(buffer);
    }

    // Insert records
    dataToExport.forEach(c => {
      const proj = state.projects.find(p => p.id_proyecto === c.proyecto_id) || activeProj;
      const geomBlob = (c.coord_x && c.coord_y) ? makeGpkgPoint(c.coord_x, c.coord_y) : null;

      db.run(`
        INSERT INTO calicatas (
          geom, id_calicata, proyecto_id, proyecto_nombre, cliente, ubicacion,
          proyecto_superficie_ha, proyecto_objetivo, proyecto_nivel_detalle,
          fecha, examinador, coord_x, coord_y, elevacion_m, material_parental, forma_relieve, posicion_relieve,
          pendiente_porc, pedregosidad_sup, drenaje_clase, estado_humedad, nivel_freatico_cm, prof_raices_cm, profundidad_efectiva_cm,
          clasificacion_usda, num_horizontes, notas
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        geomBlob,
        c.id_calicata || "",
        c.proyecto_id || state.activeProjectId || "",
        proj ? proj.nombre : "",
        proj ? proj.cliente : "",
        proj ? proj.ubicacion : "",
        proj ? proj.superficie_ha : null,
        proj ? proj.objetivo_estudio : "",
        proj ? proj.nivel_detalle : "",
        c.fecha || "",
        c.examinador || "",
        c.coord_x || 0,
        c.coord_y || 0,
        c.elevacion_m || c.altitud_msnm || null,
        c.material_parental || "",
        c.forma_relieve || "",
        c.posicion_relieve || "",
        c.pendiente_pct || null,
        c.pedregosidad_sup || "",
        c.drenaje_clase || "",
        c.estado_humedad || "",
        c.nivel_freatico_cm || null,
        c.prof_raices_cm || null,
        c.profundidad_efectiva_cm || null,
        c.clasificacion_usda || "",
        c.horizontes ? c.horizontes.length : 0,
        c.notas || ""
      ]);

      if (c.horizontes && Array.isArray(c.horizontes)) {
        c.horizontes.forEach(h => {
          const rmfResumen = (h.rasgos_redox && h.rasgos_redox.length)
            ? h.rasgos_redox.map(r => `${r.tipo || ''} (${r.cantidad || ''}, ${r.munsell_color || ''})`).join('; ')
            : '';

          const sup = parseFloat(h.profundidad_sup) || 0;
          const inf = parseFloat(h.profundidad_inf) || 0;
          const espesor = Math.max(0, inf - sup);

          db.run(`
            INSERT INTO horizontes (
              id_calicata, proyecto_id, id_horizonte, profundidad_sup, profundidad_inf, espesor_cm,
              color_humedo_munsell, color_humedo_hex, color_seco_munsell, color_seco_hex,
              textura_campo, estructura_tipo, estructura_grado, estructura_tamano,
              consistencia_humedo, efervescencia_hcl, limite_nitidez, limite_topografia,
              raices_cantidad, raices_tamano, poros_cantidad, poros_tamano,
              pedregosidad_clase, frag_tipo, rasgos_redox_resumen, notas
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            c.id_calicata || "",
            c.proyecto_id || state.activeProjectId || "",
            h.id_horizonte || "",
            sup,
            inf,
            espesor,
            h.color_humedo_munsell || "",
            h.color_humedo_hex || "",
            h.color_seco_munsell || "",
            h.color_seco_hex || "",
            h.textura_campo || "",
            h.estructura_tipo || "",
            h.estructura_grado || "",
            h.estructura_tamano || "",
            h.consistencia_humedo || "",
            h.efervescencia_hcl || "",
            h.limite_nitidez || "",
            h.limite_topografia || "",
            h.raices_cantidad || "",
            h.raices_tamano || "",
            h.poros_cantidad || "",
            h.poros_tamano || "",
            h.pedregosidad_clase || "",
            h.frag_tipo || "",
            rmfResumen,
            h.notas || ""
          ]);
        });
      }
    });

    // 5. Export binary Uint8Array and trigger GPKG download
    const binaryArray = db.export();
    const blob = new Blob([binaryArray], { type: "application/geopackage+sqlite3" });
    const projSlug = activeProj ? activeProj.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30) : 'calicatas';
    const filename = `${projSlug}_qgis_${new Date().toISOString().split('T')[0]}.gpkg`;

    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = URL.createObjectURL(blob);
    downloadAnchor.download = filename;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setTimeout(() => URL.revokeObjectURL(downloadAnchor.href), 2000);

  } catch (err) {
    console.error("Error al exportar GeoPackage:", err);
    alert("Ocurrió un error al generar el archivo GeoPackage: " + err.message);
  } finally {
    if (btnGpkg) {
      btnGpkg.innerHTML = originalBtnText;
      btnGpkg.disabled = false;
    }
  }
}

// JSON & GeoJSON Export / Import
function exportDataJSON() {
  const activeProj = getActiveProject();
  const projCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);
  const dataToExport = projCalicatas.length ? projCalicatas : state.calicatas;

  // Build GeoJSON FeatureCollection
  const features = dataToExport.map(c => {
    const proj = state.projects.find(p => p.id_proyecto === c.proyecto_id) || activeProj;
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [c.coord_x || 0, c.coord_y || 0]
      },
      properties: {
        ...c,
        proyecto_nombre: proj ? proj.nombre : "",
        proyecto_cliente: proj ? proj.cliente : "",
        proyecto_ubicacion: proj ? proj.ubicacion : "",
        proyecto_superficie_ha: proj ? proj.superficie_ha : null,
        proyecto_objetivo: proj ? proj.objetivo_estudio : "",
        proyecto_nivel_detalle: proj ? proj.nivel_detalle : ""
      }
    };
  });

  const geojson = {
    type: "FeatureCollection",
    metadata: {
      proyecto_activo: activeProj ? activeProj.nombre : "",
      proyecto_id: state.activeProjectId,
      cliente: activeProj ? activeProj.cliente : "",
      superficie_ha: activeProj ? activeProj.superficie_ha : null,
      objetivo_estudio: activeProj ? activeProj.objetivo_estudio : "",
      nivel_detalle: activeProj ? activeProj.nivel_detalle : "",
      fecha_exportacion: new Date().toISOString()
    },
    features: features
  };

  const projSlug = activeProj ? activeProj.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 30) : 'calicatas';
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geojson, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `${projSlug}_export_${new Date().toISOString().split('T')[0]}.geojson`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Import GPX Waypoints from GPS or Desktop GIS Planning (QGIS / BaseCamp)
function importDataGPX(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const text = event.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");

      const parserError = xmlDoc.querySelector("parsererror");
      if (parserError) {
        throw new Error("El archivo no tiene un formato XML/GPX válido.");
      }

      // Find all waypoints (<wpt>)
      const waypoints = Array.from(xmlDoc.querySelectorAll("wpt"));
      if (!waypoints.length) {
        alert("No se encontraron puntos de muestreo o waypoints (<wpt>) en el archivo GPX.");
        return;
      }

      if (!state.activeProjectId || !state.projects.length) {
        alert("Por favor selecciona o crea un proyecto activo antes de importar puntos de muestreo.");
        openProjectsModal("list");
        return;
      }

      const activeProj = getActiveProject();
      let importedCount = 0;
      const existingProjectCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);

      waypoints.forEach((wpt, index) => {
        const lat = parseFloat(wpt.getAttribute("lat"));
        const lon = parseFloat(wpt.getAttribute("lon"));

        if (isNaN(lat) || isNaN(lon)) return;

        const nameElem = wpt.querySelector("name");
        const descElem = wpt.querySelector("desc");
        const eleElem = wpt.querySelector("ele");

        const idCal = (nameElem && nameElem.textContent.trim())
          ? nameElem.textContent.trim()
          : `CAL-${String(existingProjectCalicatas.length + index + 1).padStart(2, '0')}`;

        const elev = eleElem ? parseFloat(eleElem.textContent) || null : null;
        const desc = descElem ? descElem.textContent.trim() : "";

        // Check if calicata already exists in this project
        const existingIdx = state.calicatas.findIndex(c => c.id_calicata === idCal && c.proyecto_id === state.activeProjectId);

        if (existingIdx >= 0) {
          state.calicatas[existingIdx].coord_x = lon;
          state.calicatas[existingIdx].coord_y = lat;
          if (elev) state.calicatas[existingIdx].elevacion_m = elev;
        } else {
          const newCalicata = {
            id_calicata: idCal,
            proyecto_id: state.activeProjectId,
            fecha: new Date().toISOString().split('T')[0],
            examinador: activeProj && activeProj.responsable ? activeProj.responsable : "",
            coord_x: lon,
            coord_y: lat,
            elevacion_m: elev,
            material_parental: "",
            forma_relieve: "",
            posicion_relieve: "",
            pendiente_porc: null,
            pedregosidad_sup: "",
            drenaje_clase: "",
            profundidad_efectiva_cm: null,
            clasificacion_usda: "",
            foto_sitio_url: null,
            notas: desc ? `Punto planificado (GPX): ${desc}` : "Punto de muestreo planificado (GPX)",
            horizontes: []
          };
          state.calicatas.push(newCalicata);
        }
        importedCount++;
      });

      const currentCalicatas = state.calicatas.filter(c => c.proyecto_id === state.activeProjectId);
      if (!state.selectedCalicataId && currentCalicatas.length) {
        state.selectedCalicataId = currentCalicatas[0].id_calicata;
      }

      saveData();
      switchTab('list');

      // Center map on imported points
      const withCoords = currentCalicatas.filter(c => c.coord_y && c.coord_x);
      if (withCoords.length && state.map) {
        if (withCoords.length === 1) {
          state.map.flyTo([withCoords[0].coord_y, withCoords[0].coord_x], 15, { duration: 0.8 });
        } else {
          const bounds = L.latLngBounds(withCoords.map(c => [c.coord_y, c.coord_x]));
          state.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
        }
      }

      alert(`¡Puntos GPX Importados con Éxito!\nSe cargaron ${importedCount} puntos de muestreo al proyecto "${activeProj ? activeProj.nombre : ''}".`);
    } catch (err) {
      console.error("Error al procesar GPX:", err);
      alert("Error al importar archivo GPX: " + err.message);
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

// Service Worker Registration for PWA Offline mode
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('PWA Service Worker registrado:', reg.scope))
      .catch(err => console.log('Registro de Service Worker falló:', err));
  });
}

// Munsell Quick Search
function setupMunsellQuickSearch() {
  const input = document.getElementById("munsell-search-input");
  if (!input) return;

  input.addEventListener("input", (e) => {
    const query = e.target.value.trim().toUpperCase();
    if (!query) {
      renderMunsellSwatches();
      return;
    }

    const allChips = getMunsellChipsForHue(state.selectedHue);
    const matching = allChips.filter(c => c.notation.toUpperCase().includes(query) || c.label.toUpperCase().includes(query));

    const grid = document.getElementById("munsell-swatches-grid");
    const countElem = document.getElementById("munsell-chips-count");
    if (countElem) countElem.textContent = `Resultados para "${query}": ${matching.length} coincidencia(s)`;

    if (!matching.length) {
      grid.innerHTML = `<div class="p-4 text-center text-gray-400 text-xs w-full">No se encontraron notaciones coincidentes con "${query}"</div>`;
      return;
    }

    grid.innerHTML = `<div class="munsell-swatches-container p-2">` + matching.map(chip => {
      const hex = getMunsellColorHex(chip.hue, chip.val, chip.chr);
      return `
        <div class="munsell-swatch" style="background:${hex}" title="${chip.notation}" onclick="selectMunsellNotation('${chip.notation}', '${hex}')">
          ${chip.label}
        </div>
      `;
    }).join("") + `</div>`;
  });
}


// Generate authentic circular percentage estimation dots (USDA / FAO / Folk-Terry visual comparison charts)
function generateCircularVisualChartDots(pct) {
  const cx = 45;
  const cy = 45;
  const maxRadius = 38; // Radius of circular area
  const totalDiskArea = Math.PI * maxRadius * maxRadius;
  const targetArea = totalDiskArea * (pct / 100);

  let currentArea = 0;
  let dots = [];
  let s = pct * 719 + 42;

  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  let attempts = 0;
  while (currentArea < targetArea && attempts < 500) {
    attempts++;

    // Realistic grain/mottle size spectrum
    const sizeType = rnd();
    let rDot;
    if (pct <= 3) {
      rDot = 1.1 + rnd() * 1.3;
    } else if (pct <= 10) {
      rDot = sizeType < 0.6 ? (1.3 + rnd() * 1.2) : (2.4 + rnd() * 1.4);
    } else {
      rDot = sizeType < 0.4 ? (1.4 + rnd() * 1.3) : (sizeType < 0.8 ? (2.6 + rnd() * 1.3) : (3.8 + rnd() * 1.5));
    }

    const dotArea = Math.PI * rDot * rDot;
    if (currentArea + dotArea > targetArea * 1.12 && currentArea > targetArea * 0.88) {
      break;
    }

    // Polar coordinates for uniform disk distribution: r = maxR * sqrt(u), theta = 2*PI*u
    const theta = rnd() * 2 * Math.PI;
    const radialDist = (maxRadius - rDot - 1.2) * Math.sqrt(rnd());

    const x = cx + radialDist * Math.cos(theta);
    const y = cy + radialDist * Math.sin(theta);

    // Natural multi-shade redox / clast tones
    const shade = (rnd() > 0.45) ? "#78350f" : "#92400e";
    dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rDot.toFixed(1)}" fill="${shade}" opacity="0.95" />`);
    currentArea += dotArea;
  }

  return dots.join("");
}

// Visual Comparison Charts (FAO - USDA Soil Survey Manual)
function renderVisualEstimationCharts() {
  const grid = document.getElementById("visual-charts-grid");
  if (!grid) return;

  const percentages = [1, 3, 5, 10, 15, 20, 30, 40, 50];

  const chartsHTML = percentages.map(pct => {
    const dotsSVG = generateCircularVisualChartDots(pct);

    return `
      <div onclick="selectVisualPercentage(${pct})" class="bg-amber-50/70 hover:bg-amber-100/90 border-2 border-amber-300 hover:border-amber-500 rounded-2xl p-2.5 flex flex-col items-center cursor-pointer transition-all transform hover:scale-105 shadow-2xs hover:shadow-md">
        <svg viewBox="0 0 90 90" class="w-18 h-18 sm:w-20 sm:h-20 rounded-full shadow-inner">
          <circle cx="45" cy="45" r="43" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" />
          ${dotsSVG}
        </svg>
        <span class="font-extrabold text-amber-950 text-xs mt-2 tracking-tight">${pct}% Abundancia</span>
      </div>
    `;
  });

  grid.innerHTML = chartsHTML.join("");
}

function selectVisualPercentage(pct) {
  const fragInput = document.getElementById("hor-frag-vol");
  if (fragInput) fragInput.value = pct;

  const claseSelect = document.getElementById("hor-pedregosidad-clase");
  if (claseSelect) {
    if (pct < 15) claseSelect.value = "NONE";
    else if (pct <= 35) claseSelect.value = "GR";
    else if (pct <= 60) claseSelect.value = "VGR";
    else claseSelect.value = "XGR";
  }

  const rmfCant = document.getElementById("rmf-cantidad");
  if (rmfCant) {
    if (pct < 2) rmfCant.value = "F";
    else if (pct <= 20) rmfCant.value = "C";
    else rmfCant.value = "M";
  }

  const modal = document.getElementById("visual-charts-modal");
  if (modal) modal.classList.add("hidden");
}

// Clave Dicotómica de Textura en Campo (Método de Thien / Cordoncillo, 'U' y Anillo)
const THIEN_TREE = {
  start: {
    step: 1,
    title: "1. Cohesión de la Esfera",
    question: "¿La esfera a saturación (~2,5 cm de diámetro) es cohesiva?",
    hint: "Toma una muestra de suelo húmedo y amásala tratando de formar una bola esférica de 2,5 cm.",
    options: [
      { text: "NO (Se deshace / No es cohesiva)", target: "RES_A", style: "border-rose-300 hover:bg-rose-50 text-rose-900" },
      { text: "SÍ (Conserva la forma de esfera)", target: "NODE_DESMORONA", style: "border-emerald-300 hover:bg-emerald-50 text-emerald-950" }
    ]
  },
  NODE_DESMORONA: {
    step: 2,
    title: "2. Resistencia al Desmoronamiento",
    question: "¿Se desmorona con facilidad y no forma un cilindro grueso?",
    hint: "Rueda la esfera entre las manos intentando formar un cilindro o cordón grueso.",
    options: [
      { text: "SÍ (Se desmorona con facilidad / No forma cilindro)", target: "RES_AF", style: "border-amber-300 hover:bg-amber-50 text-amber-950" },
      { text: "NO (Logra moldear un cilindro grueso)", target: "NODE_CIL_FINO", style: "border-emerald-300 hover:bg-emerald-50 text-emerald-950" }
    ]
  },
  NODE_CIL_FINO: {
    step: 3,
    title: "3. Cilindro Fino (~3 mm)",
    question: "¿Logra formar un cilindro fino (~3 mm de espesor)?",
    hint: "Continúa rodando el cordón hasta alcanzar unos 3 mm de grosor sin que se corte.",
    options: [
      { text: "NO (No logra cilindro fino / Se corta)", target: "NODE_TACTO_CIL_NO", style: "border-amber-300 hover:bg-amber-50 text-amber-950" },
      { text: "SÍ (Modela cilindro fino de 3 mm)", target: "NODE_FORMA_U", style: "border-emerald-300 hover:bg-emerald-50 text-emerald-950" }
    ]
  },
  NODE_TACTO_CIL_NO: {
    step: "3A",
    title: "3.1. Prueba al Tacto (Cilindro Grueso)",
    question: "¿Cómo se siente la muestra al frotar entre los dedos con agua?",
    hint: "Frota una pequeña cantidad entre el pulgar y el índice.",
    options: [
      { text: "¿Se siente áspero? → SÍ", target: "RES_FA", style: "border-blue-300 hover:bg-blue-50 text-blue-950" },
      { text: "¿Sedoso o jabonoso? → SÍ", target: "RES_FL", style: "border-blue-300 hover:bg-blue-50 text-blue-950" },
      { text: "Ni áspero ni muy sedoso (Tacto intermedio / franco)", target: "RES_F", style: "border-slate-300 hover:bg-slate-50 text-slate-900" }
    ]
  },
  NODE_FORMA_U: {
    step: 4,
    title: "4. Doblez en 'U'",
    question: "¿Logra doblarse en forma de 'U'?",
    hint: "Toma el cilindro fino de 3 mm y dóblalo suavemente en forma de herradura o 'U'.",
    options: [
      { text: "NO (Se quiebra antes de formar la U)", target: "NODE_TACTO_SUB_A", style: "border-amber-300 hover:bg-amber-50 text-amber-950" },
      { text: "SÍ (Forma la 'U' exitosamente)", target: "NODE_AGRIETA_U", style: "border-emerald-300 hover:bg-emerald-50 text-emerald-950" }
    ]
  },
  NODE_AGRIETA_U: {
    step: 5,
    title: "5. Grietas en la 'U'",
    question: "¿Se agrieta la 'U' al doblarla?",
    hint: "Observa con atención si la superficie externa de la curva presenta fisuras o grietas.",
    options: [
      { text: "SÍ (La 'U' se agrieta)", target: "NODE_TACTO_SUB_A", style: "border-amber-300 hover:bg-amber-50 text-amber-950" },
      { text: "NO (La 'U' es lisa y continua sin grietas)", target: "NODE_FORMA_ANILLO", style: "border-emerald-300 hover:bg-emerald-50 text-emerald-950" }
    ]
  },
  NODE_FORMA_ANILLO: {
    step: 6,
    title: "6. Formación de Anillo",
    question: "¿Es posible formar un anillo cerrado?",
    hint: "Une los dos extremos de la 'U' para cerrar un círculo completo.",
    options: [
      { text: "NO (Se rompe o desmorona al cerrarlo)", target: "NODE_TACTO_SUB_A", style: "border-amber-300 hover:bg-amber-50 text-amber-950" },
      { text: "SÍ (Logra formar el anillo cerrado)", target: "NODE_AGRIETA_ANILLO", style: "border-emerald-300 hover:bg-emerald-50 text-emerald-950" }
    ]
  },
  NODE_TACTO_SUB_A: {
    step: "U/Anillo",
    title: "Prueba al Tacto (U agrietada / Sin anillo)",
    question: "¿Cómo se siente la muestra al frotar con agua?",
    hint: "Frota una pequeña cantidad entre el pulgar y el índice.",
    options: [
      { text: "¿Muy Sedoso o jabonoso? → SÍ", target: "RES_FAL", style: "border-blue-300 hover:bg-blue-50 text-blue-950" },
      { text: "¿Se siente áspero? → SÍ", target: "RES_FAA", style: "border-blue-300 hover:bg-blue-50 text-blue-950" },
      { text: "Ni áspero ni muy sedoso (Tacto intermedio / franco)", target: "RES_F", style: "border-slate-300 hover:bg-slate-50 text-slate-900" }
    ]
  },
  NODE_AGRIETA_ANILLO: {
    step: 7,
    title: "7. Grietas en el Anillo",
    question: "¿Se agrieta el anillo al cerrarlo?",
    hint: "Observa la superficie exterior del anillo circular cerrado.",
    options: [
      { text: "SÍ (El anillo presenta grietas exteriores)", target: "NODE_TACTO_ANILLO_AGRIETA", style: "border-amber-300 hover:bg-amber-50 text-amber-950" },
      { text: "NO (Anillo perfecto continuo sin grietas)", target: "NODE_TACTO_ARCILLAS", style: "border-emerald-300 hover:bg-emerald-50 text-emerald-950" }
    ]
  },
  NODE_TACTO_ANILLO_AGRIETA: {
    step: "7A",
    title: "7.1. Tacto (Anillo Agrietado)",
    question: "¿Cómo se siente la muestra al tacto?",
    hint: "Frota una pequeña cantidad entre los dedos.",
    options: [
      { text: "¿Muy Sedoso o jabonoso? → SÍ", target: "RES_FAL", style: "border-blue-300 hover:bg-blue-50 text-blue-950" },
      { text: "NO (Tacto no muy sedoso / Franco arcilloso)", target: "RES_FA_ARCILLOSO", style: "border-blue-300 hover:bg-blue-50 text-blue-950" }
    ]
  },
  NODE_TACTO_ARCILLAS: {
    step: 8,
    title: "8. Tacto en Arcillas (Anillo Perfecto)",
    question: "¿Cómo se siente la muestra al frotar entre los dedos?",
    hint: "Masa con alta plasticidad que forma anillo cerrado sin grietas.",
    options: [
      { text: "¿Se siente muy áspero? → SÍ", target: "RES_AA", style: "border-blue-300 hover:bg-blue-50 text-blue-950" },
      { text: "¿Muy Sedoso o jabonoso? → SÍ", target: "RES_AL", style: "border-blue-300 hover:bg-blue-50 text-blue-950" },
      { text: "Muy plástico y suave (Arcilla pura)", target: "RES_A_PURO", style: "border-blue-300 hover:bg-blue-50 text-blue-950" }
    ]
  }
};

const THIEN_RESULTS = {
  RES_A: { code: "S", label: "a — Arena (S)", desc: "No cohesiva. No conserva la forma de esfera." },
  RES_AF: { code: "LS", label: "aF — Arena Franca (LS)", desc: "Se desmorona con facilidad, no forma cilindro grueso." },
  RES_FA: { code: "SL", label: "Fa — Franco Arenoso (SL)", desc: "Forma cilindro grueso pero no fino. Tacto áspero." },
  RES_FL: { code: "SIL", label: "FL ó L — Franco Limoso ó Limo (SIL / SI)", desc: "Forma cilindro grueso pero no fino. Tacto sedoso o jabonoso." },
  RES_F: { code: "L", label: "F — Franco (L)", desc: "Tacto balanceado, ni áspero ni muy sedoso." },
  RES_FAA: { code: "SCL", label: "FAa — Franco Arcillo Arenoso (SCL)", desc: "Cilindro fino, U agrietada o sin anillo. Tacto áspero." },
  RES_FAL: { code: "SICL", label: "FAL — Franco Arcillo Limoso (SICL)", desc: "Cilindro fino, U o anillo agrietado. Tacto muy sedoso o jabonoso." },
  RES_FA_ARCILLOSO: { code: "CL", label: "FA — Franco Arcilloso (CL)", desc: "Cilindro fino, forma anillo agrietado. Tacto no muy sedoso." },
  RES_AA: { code: "SC", label: "Aa — Arcillo Arenoso (SC)", desc: "Anillo cerrado continuo sin grietas. Se siente muy áspero." },
  RES_AL: { code: "SIC", label: "AL — Arcillo Limoso (SIC)", desc: "Anillo cerrado continuo sin grietas. Muy sedoso o jabonoso." },
  RES_A_PURO: { code: "C", label: "A — Arcilla (C)", desc: "Anillo cerrado continuo sin grietas. Muy plástico y suave." }
};

state.thienHistory = ['start'];
state.thienResult = null;

function resetLulitoState() {
  state.thienHistory = ['start'];
  state.thienResult = null;
  renderThienDecisionNode();
}

function selectThienOption(target) {
  if (THIEN_RESULTS[target]) {
    state.thienResult = THIEN_RESULTS[target];
    state.thienHistory.push(target);
  } else if (THIEN_TREE[target]) {
    state.thienResult = null;
    state.thienHistory.push(target);
  }
  renderThienDecisionNode();
}

function goBackThienNode() {
  if (state.thienHistory.length > 1) {
    state.thienHistory.pop();
    const current = state.thienHistory[state.thienHistory.length - 1];
    state.thienResult = THIEN_RESULTS[current] || null;
    renderThienDecisionNode();
  }
}

function renderThienDecisionNode() {
  const container = document.getElementById("thien-decision-container");
  if (!container) return;

  const currentId = state.thienHistory[state.thienHistory.length - 1];
  const node = THIEN_TREE[currentId];
  const result = THIEN_RESULTS[currentId] || state.thienResult;

  const resElem = document.getElementById("lul-calc-result");
  const descElem = document.getElementById("lul-calc-desc");
  const applyBtn = document.getElementById("btn-apply-lul-texture");

  if (result) {
    if (resElem) resElem.textContent = result.label;
    if (descElem) descElem.textContent = result.desc;
    if (applyBtn) applyBtn.disabled = false;

    container.innerHTML = `
      <div class="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-2xl text-center space-y-2 shadow-sm animate-fadeIn">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full text-2xl mb-1 shadow-inner">
          <i class="fa-solid fa-check"></i>
        </div>
        <h4 class="font-extrabold text-emerald-950 text-base">${result.label}</h4>
        <p class="text-xs text-emerald-800">${result.desc}</p>
        <div class="pt-2">
          <button type="button" onclick="goBackThienNode()" class="text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs cursor-pointer font-medium">
            <i class="fa-solid fa-arrow-left mr-1"></i> Modificar paso anterior
          </button>
        </div>
      </div>
    `;
    return;
  }

  if (resElem) resElem.textContent = "Responde el paso actual...";
  if (descElem) descElem.textContent = "Sigue las ramas del diagrama de flujo";
  if (applyBtn) applyBtn.disabled = true;

  if (!node) return;

  const optionsHTML = node.options.map(opt => `
    <button type="button" onclick="selectThienOption('${opt.target}')" class="w-full text-left p-3 rounded-xl border-2 font-bold text-xs transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-xs cursor-pointer ${opt.style || 'border-slate-300 hover:bg-slate-50 text-slate-800'} flex items-center justify-between">
      <span>${opt.text}</span>
      <i class="fa-solid fa-chevron-right text-xs opacity-40 ml-2"></i>
    </button>
  `).join("");

  const backBtnHTML = state.thienHistory.length > 1 ? `
    <button type="button" onclick="goBackThienNode()" class="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer">
      <i class="fa-solid fa-arrow-left"></i> Paso anterior
    </button>
  ` : `<span></span>`;

  container.innerHTML = `
    <div class="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl space-y-3 shadow-2xs">
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300/60">
          ${node.title || 'Paso ' + node.step}
        </span>
        ${backBtnHTML}
      </div>

      <div>
        <h4 class="font-black text-slate-900 text-sm leading-snug">${node.question}</h4>
        ${node.hint ? `<p class="text-[11px] text-slate-500 mt-0.5">${node.hint}</p>` : ''}
      </div>

      <div class="space-y-2 pt-1">
        ${optionsHTML}
      </div>
    </div>
  `;
}

function applyLulitoTexture() {
  const currentId = state.thienHistory[state.thienHistory.length - 1];
  const result = THIEN_RESULTS[currentId] || state.thienResult;
  if (result && result.code) {
    const sel = document.getElementById("hor-textura");
    if (sel) {
      sel.value = result.code;
    }
  }
  const modal = document.getElementById("lulito-guide-modal");
  if (modal) modal.classList.add("hidden");
}



