
# WebGL 2D Letter Transformations

This project is a midterm assignment developed for the **CSE 3219 Computer Graphics** course (Spring 2025). It showcases how to model and manipulate 2D geometric shapes (specifically the letters **'E'** and **'A'**) using **WebGL**, custom shaders, and real-time user interactions.

## 🎯 Project Objectives

- ✅ Understand WebGL’s rendering pipeline and coordinate system.
- ✅ Learn to define 2D shapes using triangle vertices.
- ✅ Gain hands-on experience with vertex and fragment shaders.
- ✅ Implement interactive transformation controls (translation, scaling, coloring).
- ✅ Apply GPU programming fundamentals with GLSL and JavaScript.

---

## ✨ Features

- 🔺 **Triangle-Based Shape Modeling**: The letters 'E' and 'A' are manually constructed using sets of `vec2` vertices grouped into triangles.
- 🧠 **Custom Shader Programs**:
  - **Vertex Shader** handles translation and scaling transformations.
  - **Fragment Shader** applies RGB color settings to the rendered shapes.
- 🧰 **Interactive UI with Sliders**:
  - Real-time control over:
    - 🔄 **Position (X, Y)**
    - 🔍 **Scale (X, Y)**
    - 🎨 **Color (RGB)**
- ♻️ **Live Rendering Loop** using `requestAnimFrame()` for continuous updates.
- 🎨 **Opposing Colors**: Letter 'A' is automatically rendered with the inverse color of letter 'E'.

---

## 🧩 Technologies Used

- **WebGL** – Low-level 2D and 3D graphics API for rendering within HTML5 canvas.
- **JavaScript** – For DOM manipulation, shader control, and GPU communication.
- **GLSL (OpenGL Shading Language)** – To write the vertex and fragment shaders.
- **HTML & CSS** – UI and layout design.

---

## 📁 Project Structure

```bash
📦 webgl-2d-letter-transformations
├── midterm.html           # Main HTML file with UI and shaders
├── midterm.js             # WebGL logic, shape data, and rendering
└── Common/                # Utility scripts provided by course (webgl-utils.js, initShaders.js, MV.js)
