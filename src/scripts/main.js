const mobileMenu = document.getElementById("mobile-menu");
mobileMenu.style.display = "none";

const openMenuButton = document.getElementById("open-menu");
openMenuButton.addEventListener("click", openMenu);
function openMenu() {
  mobileMenu.style.display = "block";
}

const closeMenuButton = document.getElementById("close-menu");
closeMenuButton.addEventListener("click", closeMenu);
function closeMenu() {
  mobileMenu.style.display = "none";
}
