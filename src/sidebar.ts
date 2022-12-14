import {
  convertBooleanUrlParam,
  getUrlParam,
  insertUrlParam,
  removeUrlParam,
} from "./utils.js";

const sidebar = document.getElementById("mySidebar") as HTMLDivElement;
const sidebarOpenButton = document.getElementById(
  "sidebarOpenButton"
) as HTMLSpanElement;
const sidebarCloseButton = document.getElementById(
  "sidebarCloseButton"
) as HTMLSpanElement;
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

function openNav() {
  sidebar.classList.add("sidebar-open");
  canvas.classList.add("canvas-sidebar-open");
  insertUrlParam("isSidebarOpen", encodeURIComponent(true));
}

function closeNav() {
  sidebar.classList.remove("sidebar-open");
  canvas.classList.remove("canvas-sidebar-open");
  removeUrlParam("isSidebarOpen");
}

sidebarOpenButton.addEventListener("click", openNav);

sidebarCloseButton.addEventListener("click", closeNav);

const isSidebarOpen = getUrlParam("isSidebarOpen");
if (isSidebarOpen && convertBooleanUrlParam(isSidebarOpen)) {
  openNav();
}
