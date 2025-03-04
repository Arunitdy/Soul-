console.log("menu");

// Toggle the sliding menu
function toggleMenu() {
    const menu = document.getElementById("menu");
    const menuButton = document.querySelector(".menu-toggle-button-close");
    menu.classList.toggle("menu-open");

    if (menuButton) {
        console.log("close");
        menuButton.classList.toggle("menu-toggle-button-close");
    }
}