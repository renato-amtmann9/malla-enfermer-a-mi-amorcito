document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".course");

  cursos.forEach((curso, index) => {
    const clave = `curso-enfermeria-${index}`;

    if (localStorage.getItem(clave) === "true") {
      curso.classList.add("aprobado");
    }

    curso.addEventListener("click", () => {
      curso.classList.toggle("aprobado");
      const aprobado = curso.classList.contains("aprobado");
      localStorage.setItem(clave, aprobado);
    });
  });
});

