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

const sidebarResetButton = document.getElementsByClassName(
  "resetBtn"
)[0] as HTMLSpanElement;
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

sidebarResetButton.addEventListener("click", () => {
  window.location.replace("https://hitomezashi.krastan.com?isSidebarOpen=true");
});

const isSidebarOpen = getUrlParam("isSidebarOpen");
if (isSidebarOpen && convertBooleanUrlParam(isSidebarOpen)) {
  openNav();
}
