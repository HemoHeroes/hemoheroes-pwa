"use strict";

let view = document.querySelector("#content");
let home = document.querySelector("#home");

const add_content = (name, path) => fetch(`./${path || 'views'}/${name}.html`)
.then(res=>res.text())
.then(value=> view.innerHTML = `<div class="container row">${value}</div>`);

const localStorate = {
    get: (key) => {
        return window.localStorage.getItem(key);
    },
    set: (key, value) => {
        window.localStorage.setItem(key, value);
    }
};

const currentPage = localStorate.get("currentPage");

if(currentPage) changePage(currentPage);
else changePage("home");

function changePage(page){
    localStorate.set("currentPage", page);
    switch(page){
        case "home":
            view.style.display = "none";
            home.style.display = "";
        break;
        case "canDonate":
            add_content(page)
            .then(()=>{
                view.style.display = "";
                home.style.display = "none";
            });
        break;
        case "about":
            add_content(page)
            .then(()=>{
                view.style.display = "";
                home.style.display = "none";
            });
        break;
        case "login":
            add_content(page)
            .then(()=>{
                view.style.display = "";
                home.style.display = "none";
            });
        break;
        case "wantDonate":
            add_content(page)
            .then(()=>{
                view.style.display = "";
                home.style.display = "none";
            });
        break;
        case "iHospital":
            add_content(page)
            .then(()=>{
                view.style.display = "";
                home.style.display = "none";
            });
        break;
        default:
            view.style.display = "none";
            home.style.display = "";
        break;
    };
};