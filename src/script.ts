function getNavItems() {
    
}

function setActive(id) {
    let navbar = document.getElementsByClassName("active");
    for (let i = 0; i < navbar.length; i++)
    {
        navbar.item(i).classList.remove("active");
    }
    
    let item = document.getElementById(id);
    item.classList.add("active");
}

