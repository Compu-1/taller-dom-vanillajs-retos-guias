# Reto 4: 4. Asincronía: Promesas, Async/Await y Manejo de Errores

> **Insignia:** `Asincronía & Red`  
> **Área Clave:** Vanilla JavaScript (ES6+), DOM y Arquitectura Web

---

## 🎯 Misión
Completa la función checkHealth(endpoint) para mostrar un spinner de carga, consultar la función asíncrona mockPing(endpoint), actualizar el DOM con el resultado y restaurar el botón en el bloque finally.

## 📋 Descripción
Aprende a coordinar peticiones asíncronas no bloqueantes con Promesas y async/await. Actualiza la interfaz en cada fase del ciclo de vida: estado de carga (Pending), resolución exitosa (Fulfilled) y captura de fallos (Rejected) con bloque finally.

## 💡 Tips y Buenas Prácticas
- Usa async/await dentro de un bloque try...catch...finally.
- En try: muestra estado de carga y espera el resultado con const res = await mockPing(endpoint).
- En finally: asegúrate de re-habilitar el botón button.disabled = false independientemente de si hubo error o éxito.

---

## 🛠️ Estructura de Archivos
* **`index.html`**: Interfaz web interactiva del reto con consola en vivo integrada.
* **`app.js`**: Código inicial de trabajo con guías y `// TODO:`.
* **`solution.js`**: Solución de referencia documentada.
* **`styles.css`**: Estilos CSS del componente.

## 🚀 Cómo Ejecutar este Reto
Abre directamente `index.html` en tu navegador web, o sirve la carpeta con:
```bash
npx serve .
# o con la extensión Live Server de VS Code
```
En la parte superior de `index.html` encontrarás botones para alternar entre tu código (`app.js`) y la solución oficial (`solution.js`).
