// public/js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('pantallainicio.html')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
    });

    const data = await res.json();
    console.log(data); // Puedes redirigir según token o mensaje
    });
  }

  if (path.includes('simulacionrealnofake.html')) {
    inicializarSimulacion();
  }
});

function inicializarSimulacion() {
  const selectEscuela = document.getElementById("escuelaSelect");
  selectEscuela.addEventListener("change", () => {
    const idCarrera = selectEscuela.value;
    if (idCarrera) {
      cargarCursos(idCarrera);
    }
  });
}

async function cargarCursos(idCarrera) {
  try {
    const res = await fetch(`/api/simulacion/cursos/${idCarrera}`);
    const cursos = await res.json();

    const tbody = document.querySelector("#modalCursos tbody");
    tbody.innerHTML = "";

    cursos.forEach(curso => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="checkbox" value="${curso.idAsignatura}" onchange="actualizarContador(this, ${curso.creditos})"></td>
        <td>${curso.nombre}</td>
        <td>${curso.creditos}</td>
        <td>${curso.horasTeoricas}</td>
        <td>${curso.horasPracticas}</td>
        <td>${curso.semestre}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Error al cargar cursos:", err);
  }
}

let totalCreditos = 0;
let totalCursos = 0;
let cursosSeleccionados = [];

function actualizarContador(checkbox, creditos) {
  if (checkbox.checked) {
    totalCreditos += creditos;
    totalCursos++;
    cursosSeleccionados.push(parseInt(checkbox.value));
  } else {
    totalCreditos -= creditos;
    totalCursos--;
    cursosSeleccionados = cursosSeleccionados.filter(id => id !== parseInt(checkbox.value));
  }

  document.getElementById("totalCursos").textContent = totalCursos;
  document.getElementById("totalCreditos").textContent = totalCreditos;

  if (totalCreditos > 26) {
    alert("¡Has superado el límite de 26 créditos permitidos!");
  }
}

