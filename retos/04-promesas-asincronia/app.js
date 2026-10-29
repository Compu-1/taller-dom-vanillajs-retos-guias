"use strict";

const healthBox = document.getElementById("health-box");
const btnOk = document.getElementById("btn-check-ok");
const btnFail = document.getElementById("btn-check-fail");
const mockPing = window.mockPing;

/**
 * Reto 4: Flujo Asíncrono con async / await
 * @param {string} endpoint - URL del servicio a probar
 * @param {boolean} simulateError - Forzar fallo para probar el bloque catch
 */
async function checkHealth(endpoint, simulateError = false) {
  const triggerBtn = simulateError ? btnFail : btnOk;

  try {
    // 1. Estado PENDING: Deshabilitar botones y mostrar feedback visual
    if (triggerBtn) triggerBtn.disabled = true;
    if (healthBox) {
      healthBox.className = "health-display loading";
      healthBox.textContent = `⏳ Consultando ${endpoint} (esperando microtareas)...`;
    }
    console.log("Iniciando petición asíncrona...");

    // TODO 1: Espera la resolución de mockPing(endpoint, simulateError) usando 'await'
    // const result = await ...;

    // TODO 2: Estado FULFILLED: Si la promesa resuelve con éxito, asigna a healthBox:
    // healthBox.className = "health-display success";
    // healthBox.textContent = `✅ 200 OK | Latencia: ${result.latencyMs} ms | Hora: ${result.timestamp}`;

  } catch (error) {
    // TODO 3: Estado REJECTED: Si la promesa falla, captura el error y asigna a healthBox:
    // healthBox.className = "health-display error";
    // healthBox.textContent = `❌ Fallo de red: ${error.message}`;
    console.error("Error capturado en el catch:", error.message);

  } finally {
    // TODO 4: Estado FINALLY: Re-habilita el botón triggerBtn.disabled = false
    console.log("Ciclo de petición completado.");
  }
}

if (btnOk) btnOk.addEventListener("click", () => checkHealth("https://api.icesi.edu.co/v1/health", false));
if (btnFail) btnFail.addEventListener("click", () => checkHealth("https://api.icesi.edu.co/v1/failing-node", true));

console.log("Listeners asíncronos configurados. Prueba ambos botones.");
