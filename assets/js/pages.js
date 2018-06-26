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
    whatMenu();
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
            
            document.getElementById("dateOfBirth").addEventListener('keydown', maskDate, true);
            document.getElementById("lastDonate").addEventListener('keydown', maskDate, true);
        });
        break;
        case "iHospital":
        add_content(page)
        .then(()=>{
            view.style.display = "";
            home.style.display = "none";
            
            document.getElementById("cnpj").addEventListener('keydown', mCnpj, true);
            document.getElementById("phone1").addEventListener('keydown', mTel, true);
            document.getElementById("phone2").addEventListener('keydown', mTel, true);
            
            let autocomplete = new google.maps.places.Autocomplete((document.getElementById('street')), {
                types: ['geocode', 'establishment']
            });
            
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                console.log(place)
                var address =  [
                    {
                        "latitude": place.geometry.location.lat(),
                        "longitude": place.geometry.location.lng(),
                        "street": place.formatted_address
                    }
                ];
                console.log("address ==> ", address)
                window.localStorage.setItem('address', JSON.stringify(address));               
            });
            
            
        });
        break;
        case "myPerfil":
        let storage = JSON.parse(localStorate.get("login"));
        if (storage.checked == "donators") {
            let data = `
            <div id="perfil" class="container row">
            <form class="col s12">
            <div class="row">
            <div class="input-field col s12">
            <input id="name" type="text" class="validate">
            <label for="name">${storage.name}</label>
            </div>
            </div>
            <div class="row">
            <div class="input-field col s12">
            <p>
            <label for="">
            <span>Data de Nascimento</span>
            <input id="dateOfBirth" type="date" class="datepicker" value="${storage.dateOfBirth}">
            </label>
            </p>
            </div>
            </div>
            <div class="row">
            <div class="input-field col s12">
            <p>
            <label for="">
            <span>Última doação</span>
            <input id="lastDonate" type="date" class="datepicker" value="${storage.lastDonate}">
            </label>
            </p>
            </div>
            </div>
            <div class="row">
            <div class="input-field col s12">
            <p>
            <label>
            <input type="checkbox" id="push" ${storage.push == true ? "checked='checked'" : ""} />
            <span>Desejo receber notificações</span>
            </label>
            </p>
            </div>
            </div>
            <div class="row">
            <div class="input-field col s6">
            <input id="password1" type="password" class="validate">
            <label for="password1">Informe uma nova senha</label>
            </div>
            <div class="input-field col s6">
            <input id="password2" type="password" class="validate">
            <label for="password2">Confirme sua nova senha</label>
            </div>
            </div>
            <div class="center">
            <a class="btn red darken-5" onclick="saveDataDonator()"> Salvar <i class="material-icons right">send</i> </a>
            </div>
            </form>
            </div>
            `;
            view.innerHTML = data;
            view.style.display = "";
            home.style.display = "none";
        } else if (storage.checked == "banks") {
            let data = `
            <div id="perfil" class="container row">
            <form class="col s12">
            <div class="row">
            <div class="input-field col s12">
            <input id="name" type="text" class="validate">
            <label for="name">${storage.name}</label>
            </div>
            </div>
            <div class="row">
            <div class="input-field col s6">
            <input id="phone1" type="text" class="validate">
            <label for="phone1">${storage.phones.length > 0 ? storage.phones[0] : ""}</label>
            </div>
            <div class="input-field col s6">
            <input id="phone2" type="text" class="validate">
            <label for="phone2">${storage.phones.length > 1 ? storage.phones[1] : ""}</label>
            </div>
            </div>
            <div class="row">
            <div class="input-field col s6">
            <input id="password1" type="password" class="validate">
            <label for="password1">Informe uma senha</label>
            </div>
            <div class="input-field col s6">
            <input id="password2" type="password" class="validate">
            <label for="password2">Confirme sua senha</label>
            </div>
            </div>
            <div class="center">
            <button class="btn red darken-5" onclick="saveDataBank()"> Salvar <i class="material-icons right">send</i> </button>
            </div>
            </form>
            </div>
            `;
            view.innerHTML = data;
            view.style.display = "";
            home.style.display = "none";
        }
        break;
        case "requireDonate":
        add_content(page)
        .then(()=>{
            view.style.display = "";
            home.style.display = "none";
        });
        break;
        case 'solicitacao':
        let lastsRequest = JSON.parse(localStorate.get("login")).requestOfBlood;
        let data = '<div id="solicitacao" class="container row"><ul class="collection">';
        lastsRequest.forEach(
            item => {
                let myDate = item.data || "-";
                let splitDate = myDate.split('-');
                myDate = splitDate.length > 1 ? myDate.split('-').reverse().join('/') : myDate;
                data += `
                <li class="collection-item avatar">
                <img src="./assets/images/Logo-email.png" alt="" class="circle">
                <span class="title">${item.name}</span>
                <p>Endereço: ${item.address}<br>
                Telefone: ${item.phone}<br>
                Data da solicitação: ${myDate}
                </p>
                </li>
                `
            }
        )
        data += "</ul></div>";
        view.innerHTML = data;
        view.style.display = "";
        home.style.display = "none";
        break;
        default:
        view.style.display = "none";
        home.style.display = "";
        break;
    };
};