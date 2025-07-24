document.addEventListener("DOMContentLoaded", () => {
  const semestres = document.querySelectorAll(".semester");

  semestres.forEach((semestre, sIndex) => {
    const cursos = semestre.querySelectorAll(".course");

    cursos.forEach((curso, cIndex) => {
      const clave = `curso-${sIndex}-${cIndex}`;

      // Restaurar estado guardado
      if (localStorage.getItem(clave) === "true") {
        curso.classList.add("aprobado");
      }

      curso.addEventListener("click", () => {
        curso.classList.toggle("aprobado");
        const aprobado = curso.classList.contains("aprobado");
        localStorage.setItem(clave, aprobado);

        // Verificar si todos los cursos del semestre están aprobados
        const todos = semestre.querySelectorAll(".course");
        const aprobados = semestre.querySelectorAll(".course.aprobado");

        if (todos.length === aprobados.length) {
          const titulo = semestre.querySelector("h2").textContent;
          if (!semestre.classList.contains("completado")) {
            alert(`🎉 ¡Felicidades! Completaste ${titulo}. ¡Sigue así futura enfermera! 👩‍⚕️💖`);
            semestre.classList.add("completado");
          }
        } else {
          semestre.classList.remove("completado");
        }
      });
    });
  });
});


