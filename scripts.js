function toggleSemester(element) {
  const semesterDiv = element.querySelector(".semester");
  if (semesterDiv.style.display === "block") {
    semesterDiv.style.display = "none";
  } else {
    semesterDiv.style.display = "block";
  }
}
