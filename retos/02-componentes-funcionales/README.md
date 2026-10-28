# Reto 2: 2. Componentes Funcionales (Props Down, Callbacks Up)

> **Insignia:** `Arquitectura Modular`  
> **Área Clave:** Vanilla JavaScript (ES6+), DOM y Arquitectura Web

---

## 🎯 Misión
Completa la función componente createMetricCard({ title, count, unit, onIncrement, onReset }) para que dispare los callbacks del padre al hacer clic en sus respectivos botones.

## 📋 Descripción
Domina el diseño de componentes en Vanilla JavaScript como funciones puras reutilizables. Aplica el flujo unidireccional de datos: el padre pasa configuración por props y los hijos notifican eventos mediante callbacks ascendentes.

## 💡 Tips y Buenas Prácticas
- El componente hijo nunca muta directamente la variable de estado del padre.
- Asocia addEventListener("click", () => onIncrement()) a los botones creados.
- Verifica si el callback recibido es una función antes de invocarlo con typeof onIncrement === "function".

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
