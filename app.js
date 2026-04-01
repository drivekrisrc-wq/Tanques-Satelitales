// ============================================================
//  app.js  –  Lógica del dashboard de Tanques Satelitales
//  Depende de: data.js (debe cargarse antes)
// ============================================================

// ── Helpers ──────────────────────────────────────────────────────────────────

function getEstado(pct) {
  if (pct >= UMBRALES.urgente) return "RETIRO URGENTE";
  if (pct >= UMBRALES.proximo) return "RETIRO PRÓXIMO";
  if (pct >= UMBRALES.medio)   return "NIVEL MEDIO";
  return "NIVEL BAJO";
}

function getEstadoClass(estado) {
  const map = {
    "RETIRO URGENTE": "urgente",
    "RETIRO PRÓXIMO": "proximo",
    "NIVEL MEDIO":    "medio",
    "NIVEL BAJO":     "bajo",
  };
  return map[estado] || "bajo";
}

function fmtPct(pct) {
  return (pct * 100).toFixed(1) + "%";
}

function fmtM3(val) {
  return val.toFixed(2) + " m³";
}

// Filtra tanques según el filtro activo de tipo
let filtroActivo = "todos";

function tanquesFiltrados() {
  if (filtroActivo === "todos") return TANQUES;
  return TANQUES.filter(t => t.tipo === filtroActivo);
}

// ── Tarjetas de resumen ───────────────────────────────────────────────────────

function renderResumen() {
  const conteos = { "RETIRO URGENTE": 0, "RETIRO PRÓXIMO": 0, "NIVEL MEDIO": 0, "NIVEL BAJO": 0 };
  TANQUES.forEach(t => conteos[getEstado(t.pct)]++);

  document.getElementById("card-urgente").querySelector(".card-numero").textContent = conteos["RETIRO URGENTE"];
  document.getElementById("card-proximo").querySelector(".card-numero").textContent = conteos["RETIRO PRÓXIMO"];
  document.getElementById("card-medio").querySelector(".card-numero").textContent   = conteos["NIVEL MEDIO"];
  document.getElementById("card-bajo").querySelector(".card-numero").textContent    = conteos["NIVEL BAJO"];

  const volTotal = TANQUES.reduce((s, t) => s + t.capacidad, 0);
  const volActual = TANQUES.reduce((s, t) => s + t.nivel, 0);
  document.getElementById("vol-actual").textContent  = volActual.toFixed(1) + " m³";
  document.getElementById("vol-total").textContent   = volTotal.toFixed(1) + " m³";
  document.getElementById("pct-global").textContent  = fmtPct(volActual / volTotal);
}

// ── Barras de tanques ─────────────────────────────────────────────────────────

function renderBarras() {
  const contenedor = document.getElementById("barras-container");
  contenedor.innerHTML = "";

  const lista = [...tanquesFiltrados()].sort((a, b) => b.pct - a.pct);

  lista.forEach(t => {
    const estado     = getEstado(t.pct);
    const estadoClass = getEstadoClass(estado);
    const pctDisplay = fmtPct(t.pct);
    const pctWidth   = Math.max(t.pct * 100, 1).toFixed(1);

    const row = document.createElement("div");
    row.className = "barra-row";
    row.innerHTML = `
      <div class="barra-label">
        <span class="barra-id">TS-${t.id}</span>
        <span class="barra-tipo">${t.tipo}</span>
      </div>
      <div class="barra-track">
        <div class="barra-fill ${estadoClass}" style="width: ${pctWidth}%"></div>
      </div>
      <div class="barra-meta">
        <span class="barra-pct">${pctDisplay}</span>
        <span class="badge ${estadoClass}">${estado}</span>
      </div>
    `;
    contenedor.appendChild(row);
  });
}

// ── Tabla detalle ─────────────────────────────────────────────────────────────

function renderTabla() {
  const tbody = document.getElementById("tabla-body");
  tbody.innerHTML = "";

  const lista = [...tanquesFiltrados()].sort((a, b) => b.pct - a.pct);

  lista.forEach(t => {
    const estado      = getEstado(t.pct);
    const estadoClass = getEstadoClass(estado);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>TS-${t.id}</strong></td>
      <td>${t.tipo}</td>
      <td>${fmtM3(t.capacidad)}</td>
      <td>${fmtM3(t.nivel)}</td>
      <td>
        <div class="tabla-barra-wrap">
          <div class="tabla-barra-fill ${estadoClass}" style="width:${(t.pct*100).toFixed(1)}%"></div>
          <span class="tabla-barra-label">${fmtPct(t.pct)}</span>
        </div>
      </td>
      <td><span class="badge ${estadoClass}">${estado}</span></td>
      <td>${t.diasDesdeRetiro} días</td>
      <td>${t.fechaRegistro}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Gráfica de tendencia (canvas) ─────────────────────────────────────────────

let chartInstance = null;

function renderTendencia() {
  const tanqueId = parseInt(document.getElementById("select-tanque").value);
  const datos = HISTORIAL
    .filter(h => h.tanque === tanqueId)
    .sort((a, b) => parseFecha(a.fecha) - parseFecha(b.fecha));

  const labels = datos.map(d => d.fecha);
  const valores = datos.map(d => +(d.pct * 100).toFixed(1));

  const colores = valores.map(v =>
    v >= 90 ? "#e53935" :
    v >= 75 ? "#fb8c00" :
    v >= 50 ? "#fdd835" : "#43a047"
  );

  const ctx = document.getElementById("chart-tendencia").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "% Llenado",
        data: valores,
        backgroundColor: colores,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        y: {
          min: 0, max: 100,
          ticks: { callback: v => v + "%" },
          grid: { color: "rgba(0,0,0,0.06)" }
        },
        x: { grid: { display: false } }
      }
    }
  });

  // Líneas de umbral dibujadas sobre el canvas
  Chart.register({
    id: "umbrales",
    afterDraw(chart) {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;
      [[90, "#e53935"], [75, "#fb8c00"], [50, "#fdd835"]].forEach(([v, color]) => {
        const yPos = y.getPixelForValue(v);
        ctx.save();
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(left, yPos);
        ctx.lineTo(right, yPos);
        ctx.stroke();
        ctx.restore();
      });
    }
  });
}

function parseFecha(str) {
  const [d, m, y] = str.split("/");
  return new Date(`${y}-${m}-${d}`);
}

function poblarSelectTanques() {
  const sel = document.getElementById("select-tanque");
  const ids = [...new Set(HISTORIAL.map(h => h.tanque))].sort((a, b) => a - b);
  ids.forEach(id => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = `TS-${id}`;
    sel.appendChild(opt);
  });
}

// ── Filtros de tipo ───────────────────────────────────────────────────────────

function initFiltros() {
  document.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      filtroActivo = btn.dataset.tipo;
      renderBarras();
      renderTabla();
    });
  });
}

// ── Fecha de actualización ────────────────────────────────────────────────────

function renderFecha() {
  document.getElementById("ultima-actualizacion").textContent = ULTIMA_ACTUALIZACION;
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  renderFecha();
  renderResumen();
  renderBarras();
  renderTabla();
  poblarSelectTanques();
  renderTendencia();

  document.getElementById("select-tanque").addEventListener("change", renderTendencia);
});
