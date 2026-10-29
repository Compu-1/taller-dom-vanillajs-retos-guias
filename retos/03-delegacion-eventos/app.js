"use strict";

const servicesList = document.getElementById("services-list");

/**
 * Reto 3: Listener Único Delegado
 * En vez de adjuntar listeners a cada botón, registramos un único listener en el contenedor padre.
 */
if (servicesList) {
  servicesList.addEventListener("click", (event) => {
    // 1. Encuentra el botón que disparó el evento mediante closest('[data-action]')
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return; // Si el clic no fue en un botón de acción, no hacemos nada

    // 2. Encuentra la fila padre asociada con closest('.service-row')
    const row = actionButton.closest(".service-row");
    const serviceId = row ? row.dataset.id : "desconocido";
    const action = actionButton.dataset.action;

    console.log(`🎯 Delegación capturada: acción="${action}" en id="${serviceId}"`);

    // TODO: Maneja las acciones según actionButton.dataset.action:
    // - Si action === "toggle": alterna la clase "paused" en row (row.classList.toggle("paused")),
    //   actualiza el badge .badge-state a "PAUSADO" (offline) o "ONLINE" (online), y el texto del botón a "Reanudar"/"Pausar".
    // - Si action === "remove": elimina la fila del DOM con row.remove()
  });
}

console.log("Delegación de eventos activa. Prueba hacer clic en Pausar, Eliminar o Agregar Dinámico.");
