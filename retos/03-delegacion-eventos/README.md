# Reto 3: 3. Delegación de Eventos con closest()

> **Insignia:** `Eventos & Rendimiento`  
> **Área Clave:** Vanilla JavaScript (ES6+), DOM y Arquitectura Web

---

## 🎯 Misión
Implementa el manejador de clics delegado sobre #services-list para capturar las acciones "toggle" y "remove" de cualquier servicio, incluso los añadidos posteriormente de forma dinámica.

## 📋 Descripción
Evita registrar listeners individuales en cientos de elementos dinámicos. Utiliza el patrón de Delegación de Eventos: un único listener en el contenedor padre inspecciona el origen del evento con event.target.closest("[data-action]").

## 💡 Tips y Buenas Prácticas
- event.target.closest("[data-action]") asciende desde el elemento clicado buscando el botón más cercano con ese atributo.
- Si el usuario hace clic fuera de un botón de acción, closest retornará null; usa if (!btn) return;.
- Obtén el ID del servicio con card.dataset.id.

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
