# Reto 1: 1. Manipulación Segura del DOM y Prevención XSS

> **Insignia:** `DOM & Seguridad`  
> **Área Clave:** Vanilla JavaScript (ES6+), DOM y Arquitectura Web

---

## 🎯 Misión
Implementa la función createSafeServiceCard(service) para renderizar una tarjeta en #sandbox-root sin usar innerHTML, neutralizando un intento de inyección de código malicioso.

## 📋 Descripción
Aprende a construir elementos en el DOM de forma programática utilizando document.createElement(), configurando atributos y protegiendo la aplicación de vulnerabilidades de Cross-Site Scripting (XSS) mediante textContent.

## 💡 Tips y Buenas Prácticas
- Nunca uses innerHTML para datos provistos por el usuario o backend.
- Usa document.createElement("article") y asigna className = "service-card".
- Usa nodo.textContent para asignar strings que contengan caracteres potencialmente peligrosos (<, >, &).

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
