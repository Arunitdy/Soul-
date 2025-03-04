console.log("menu");

const menu = document.querySelector(".menu");
menu.addEventListener("click", menuPopUp);

//menu from left side

function menuPopUp() {
    console.log("menuPopUp start");
    const menuDiv = document.createElement("div");
    menuDiv.classList.add("menuDiv");
    document.querySelector(".m").appendChild(menuDiv);
    const menuCloseButton = document.createElement("button");
    menuCloseButton.classList.add("menuCloseButton");
    menuCloseButton.innerHTML = "&times";
    menuCloseButton.onclick = closeMenu;
    menuDiv.appendChild(menuCloseButton);

    const menuList = document.createElement("ul");
    menuList.classList.add("menuList");
}

function closeMenu() {
    const menuDiv = document.querySelector(".menuDiv");
    menuDiv.remove();
    console.log("Menu section closed");
}