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

      // Verificar si completó el semestre
      const semestre = curso.closest(".semester");
      const todos = semestre.querySelectorAll(".course");
      const completados = semestre.querySelectorAll(".course.aprobado");

      if (todos.length === completados.length) {
        const titulo = semestre.querySelector("h2").textContent;
        alert(`🎉 ¡Felicidades! Completaste ${titulo}. ¡Sigue así futura enfermera! 👩‍⚕️💖`);
      }
    });
  });
});

