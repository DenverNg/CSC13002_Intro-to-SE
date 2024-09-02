document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const mainToggle = document.querySelector(".main");
  const tabToggle = document.querySelector(".tab-pane");

  sidebar.addEventListener("mouseover", () => {
    mainToggle.classList.add("active");
  });

  sidebar.addEventListener("mouseout", () => {
    mainToggle.classList.remove("active");
  });


}); 