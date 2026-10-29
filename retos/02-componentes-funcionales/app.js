"use strict";

const root = document.getElementById("sandbox-root");

// ==========================================
// 1. COMPONENTE HIJO (Funcional y Reutilizable)
// ==========================================
/**
 * Reto 2: Componente Funcional Reutilizable
 * @param {Object} props
 * @param {string} props.title - Título de la métrica
 * @param {number} props.count - Valor cuantitativo actual
 * @param {string} props.unit - Unidad de medida
 * @param {Function} props.onIncrement - Callback hacia el padre
 * @param {Function} props.onReset - Callback hacia el padre
 * @returns {HTMLElement}
 */
function createMetricCard({ title, count, unit, onIncrement, onReset }) {
  const card = document.createElement("article");
  card.className = "metric-card";

  const titleEl = document.createElement("div");
  titleEl.className = "metric-title";
  titleEl.textContent = title;

  const valueEl = document.createElement("div");
  valueEl.className = "metric-value";
  valueEl.textContent = count;

  const unitSpan = document.createElement("span");
  unitSpan.className = "metric-unit";
  unitSpan.textContent = unit;
  valueEl.appendChild(unitSpan);

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  // Botón 1: Incrementar
  const incBtn = document.createElement("button");
  incBtn.className = "btn btn-primary";
  incBtn.textContent = "+ Subir";
  // TODO: Registra el addEventListener para invocar onIncrement() al hacer clic

  // Botón 2: Reiniciar
  const resetBtn = document.createElement("button");
  resetBtn.className = "btn btn-secondary";
  resetBtn.textContent = "Reset";
  // TODO: Registra el addEventListener para invocar onReset() al hacer clic

  btnGroup.append(incBtn, resetBtn);
  card.append(titleEl, valueEl, btnGroup);
  return card;
}

// ==========================================
// 2. CONTROLADOR PADRE (Dueño del Estado)
// ==========================================
let state = window.__state || {
  peticionesPorSegundo: 450,
  erroresDetectados: 3
};

function renderDashboard() {
  if (!root) return;
  root.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "metrics-dashboard";

  // Instancia 1 de la tarjeta: Carga de Peticiones
  const card1 = createMetricCard({
    title: "Carga de Peticiones",
    count: state.peticionesPorSegundo,
    unit: "req/s",
    onIncrement: () => {
      state.peticionesPorSegundo += 50;
      console.log("⚡ [Estado Padre] Peticiones incrementadas a:", state.peticionesPorSegundo);
      renderDashboard();
    },
    onReset: () => {
      state.peticionesPorSegundo = 0;
      console.log("🔄 [Estado Padre] Peticiones reiniciadas a 0");
      renderDashboard();
    }
  });

  // Instancia 2 de la tarjeta: Tasa de Errores
  const card2 = createMetricCard({
    title: "Tasa de Errores HTTP",
    count: state.erroresDetectados,
    unit: "err/s",
    onIncrement: () => {
      state.erroresDetectados += 1;
      console.log("⚠️ [Estado Padre] Errores incrementados a:", state.erroresDetectados);
      renderDashboard();
    },
    onReset: () => {
      state.erroresDetectados = 0;
      console.log("🔄 [Estado Padre] Errores reiniciados");
      renderDashboard();
    }
  });

  grid.append(card1, card2);
  root.appendChild(grid);
}

// Iniciar renderizado
renderDashboard();
console.log("Dashboard renderizado. Haz clic en los botones para probar los callbacks.");
