document.addEventListener("DOMContentLoaded", () => {
  const semestres = document.querySelectorAll(".semester");

  semestres.forEach((semestre, sIndex) => {
    const cursos = semestre.querySelectorAll(".course");

    cursos.forEach((curso, cIndex) => {
      const clave = `curso-${sIndex}-${cIndex}`;

      // Restaurar estado
      if (localStorage.getItem(clave) === "true") {
        curso.classList.add("aprobado");
      }

      curso.addEventListener("click", () => {
        curso.classList.toggle("aprobado");
        const aprobado = curso.classList.contains("aprobado");
        localStorage.setItem(clave, aprobado);

        // Verificar todos los cursos del semestre
        const todosCursos = semestre.querySelectorAll(".course");
        const aprobados = semestre.querySelectorAll(".course.aprobado");

        if (todosCursos.length === aprobados.length) {
          const yaMostrado = localStorage.getItem(`semestre-${sIndex}-completado`);
          if (!yaMostrado) {
            const titulo = semestre.querySelector("h2").textContent;
            alert(`🎉 ¡Felicidades! Completaste ${titulo}. ¡Sigue brillando futura enfermera! 🩺💖`);
            localStorage.setItem(`semestre-${sIndex}-completado`, "true");
          }
        } else {
          localStorage.removeItem(`semestre-${sIndex}-completado`);
        }
      });
    });
  });
});


