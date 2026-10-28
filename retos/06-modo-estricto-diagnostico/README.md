# Reto 6: 6. Modo Estricto ("use strict") y Depuración Temprana

> **Insignia:** `Modo Estricto & ES6`  
> **Área Clave:** Vanilla JavaScript (ES6+), DOM y Arquitectura Web

---

## 🎯 Misión
Identifica y corrige la variable no declarada y el intento de mutar un objeto congelado bajo "use strict".

## 📋 Descripción
Comprende el impacto de "use strict" en la prevención de fallos silenciosos. En este ejercicio, un módulo contiene 2 malas prácticas que el modo estricto convierte en errores explícitos (ReferenceError / TypeError). Corrige el código para lograr una ejecución limpia.

## 💡 Tips y Buenas Prácticas
- Declara siempre tus variables con const o let (evita asignar a variables no declaradas).
- Si un objeto está protegido con Object.freeze(), clónalo con { ...objeto, prop: nuevoValor } en vez de mutarlo directamente.
- Asegúrate de no usar identificadores reservados ni duplicar parámetros de función.

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
