"use strict";

const healthBox = document.getElementById("health-box");
const btnOk = document.getElementById("btn-check-ok");
const btnFail = document.getElementById("btn-check-fail");
const mockPing = window.mockPing;

async function checkHealth(endpoint, simulateError = false) {
  const triggerBtn = simulateError ? btnFail : btnOk;
  try {
    if (triggerBtn) triggerBtn.disabled = true;
    if (healthBox) {
      healthBox.className = "health-display loading";
      healthBox.textContent = `⏳ Consultando ${endpoint}...`;
    }

    const result = await mockPing(endpoint, simulateError);

    if (healthBox) {
      healthBox.className = "health-display success";
      healthBox.textContent = `✅ 200 OK | Latencia: ${result.latencyMs} ms | Hora: ${result.timestamp}`;
    }
    console.log("Respuesta:", result);
  } catch (error) {
    if (healthBox) {
      healthBox.className = "health-display error";
      healthBox.textContent = `❌ Error: ${error.message}`;
    }
    console.error("Fallo:", error.message);
  } finally {
    if (triggerBtn) triggerBtn.disabled = false;
    console.log("Ciclo de petición finalizado.");
  }
}

if (btnOk) btnOk.addEventListener("click", () => checkHealth("https://api.icesi.edu.co/v1/health", false));
if (btnFail) btnFail.addEventListener("click", () => checkHealth("https://api.icesi.edu.co/v1/failing-node", true));
