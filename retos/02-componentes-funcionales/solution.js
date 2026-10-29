"use strict";

const root = document.getElementById("sandbox-root");

// ==========================================
// 1. COMPONENTE HIJO (Funcional y Reutilizable)
// ==========================================
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

  const incBtn = document.createElement("button");
  incBtn.className = "btn btn-primary";
  incBtn.textContent = "+ Subir";
  incBtn.addEventListener("click", () => {
    if (typeof onIncrement === "function") onIncrement();
  });

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn btn-secondary";
  resetBtn.textContent = "Reset";
  resetBtn.addEventListener("click", () => {
    if (typeof onReset === "function") onReset();
  });

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

  const card1 = createMetricCard({
    title: "Carga de Peticiones",
    count: state.peticionesPorSegundo,
    unit: "req/s",
    onIncrement: () => {
      state.peticionesPorSegundo += 50;
      console.log("⚡ [Estado Padre] Peticiones:", state.peticionesPorSegundo);
      renderDashboard();
    },
    onReset: () => {
      state.peticionesPorSegundo = 0;
      console.log("🔄 [Estado Padre] Peticiones reiniciadas");
      renderDashboard();
    }
  });

  const card2 = createMetricCard({
    title: "Tasa de Errores HTTP",
    count: state.erroresDetectados,
    unit: "err/s",
    onIncrement: () => {
      state.erroresDetectados += 1;
      console.log("⚠️ [Estado Padre] Errores:", state.erroresDetectados);
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

renderDashboard();
console.log("Dashboard renderizado con callbacks bidireccionales.");
