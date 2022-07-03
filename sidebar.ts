const sidebar = document.getElementById("mySidebar") as HTMLDivElement;
const sidebarOpenButton = document.getElementById(
  "sidebarOpenButton"
) as HTMLSpanElement;
const sidebarCloseButton = document.getElementById(
  "sidebarCloseButton"
) as HTMLSpanElement;
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

sidebarOpenButton.onclick = function openNav() {
  sidebar.classList.add("sidebar-open");
  canvas.classList.add("canvas-sidebar-open");
};

sidebarCloseButton.onclick = function closeNav() {
  sidebar.classList.remove("sidebar-open");
  canvas.classList.remove("canvas-sidebar-open");
};
