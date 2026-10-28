"use strict";

const servicesList = document.getElementById("services-list");

if (servicesList) {
  servicesList.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;

    const row = actionButton.closest(".service-row");
    const serviceId = row ? row.dataset.id : "desconocido";
    const action = actionButton.dataset.action;

    console.log(`🎯 Delegación capturada: acción="${action}" en id="${serviceId}"`);

    if (action === "toggle") {
      row.classList.toggle("paused");
      const isPaused = row.classList.contains("paused");
      const badge = row.querySelector(".badge-state");
      if (badge) {
        badge.className = isPaused ? "badge-state offline" : "badge-state online";
        badge.textContent = isPaused ? "PAUSADO" : "ONLINE";
      }
      actionButton.textContent = isPaused ? "Reanudar" : "Pausar";
    } else if (action === "remove") {
      row.remove();
      console.log(`🗑️ Servicio ${serviceId} eliminado del DOM.`);
    }
  });
}

console.log("Delegación de eventos activa.");
