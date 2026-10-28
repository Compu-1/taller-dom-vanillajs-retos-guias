"use strict";

function inicializarServidor() {
  // CORRECCIÓN 1: Declaración explícita con const
  const maxConexiones = 1000;

  // Objeto inmutable
  const config = Object.freeze({
    puerto: 8080,
    ambiente: "produccion"
  });

  // CORRECCIÓN 2: Inmutabilidad respetada con spread operator
  const configActualizada = { ...config, puerto: 9090 };

  return {
    puerto: configActualizada.puerto,
    maxConexiones: maxConexiones,
    ambiente: configActualizada.ambiente
  };
}

try {
  const resultado = inicializarServidor();
  const output = document.getElementById("audit-output");
  if (output) {
    output.textContent = `Servidor configurado con éxito: Puerto ${resultado.puerto}, Conexiones: ${resultado.maxConexiones}`;
  }
  console.log("✅ Servidor inicializado sin violaciones:", resultado);
} catch (error) {
  const output = document.getElementById("audit-output");
  if (output) {
    output.textContent = `❌ Error: ${error.name} - ${error.message}`;
  }
  console.error("Fallo:", error.name + ": " + error.message);
}
