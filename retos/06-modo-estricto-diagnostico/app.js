"use strict";

/**
 * Reto 6: Diagnóstico de Errores en Modo Estricto
 *
 * En "use strict", JavaScript convierte malas prácticas silenciosas en errores explícitos.
 * Al ejecutar este código tal como está, fallará inmediatamente.
 *
 * TU MISIÓN:
 * 1. Observa el error en la consola y en el panel.
 * 2. Corrige el ERROR 1 (variable no declarada).
 * 3. Corrige el ERROR 2 (mutación directa de objeto congelado con Object.freeze).
 */
function inicializarServidor() {
  // ERROR 1: Asignación a variable no declarada (lanza ReferenceError en modo estricto)
  // TODO: Corrige declarándola con let o const
  maxConexiones = 1000;

  // Objeto inmutable protegido contra escritura
  const config = Object.freeze({
    puerto: 8080,
    ambiente: "produccion"
  });

  // ERROR 2: Mutación directa de un objeto congelado (lanza TypeError en "use strict")
  // TODO: En lugar de mutar config.puerto, crea un nuevo objeto derivado: { ...config, puerto: 9090 }
  config.puerto = 9090;

  return {
    puerto: config.puerto,
    maxConexiones: maxConexiones,
    ambiente: config.ambiente
  };
}

try {
  const resultado = inicializarServidor();
  const output = document.getElementById("audit-output");
  if (output) {
    output.textContent = `Servidor configurado con éxito: Puerto ${resultado.puerto}, Conexiones: ${resultado.maxConexiones}`;
  }
  console.log("✅ Servidor inicializado sin violaciones de modo estricto:", resultado);
} catch (error) {
  const output = document.getElementById("audit-output");
  if (output) {
    output.textContent = `❌ Error: ${error.name} - ${error.message}`;
  }
  console.error("Fallo detectado por el motor estricto:", error.name + ": " + error.message);
}
