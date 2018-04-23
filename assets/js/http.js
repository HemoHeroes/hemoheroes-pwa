"use strict";

const urlBase = "./api/v1/";

let post = (url, param) => fetch(url, param).then(response => response.json());

const registerDonator = () => {
    let data = {
        name : $('#name')[0].value,
        password : $('#password1')[0].value,
        password2 : $('#password2')[0].value,
        email : $('#email')[0].value,
        // dateOfBirth: $('#dateOfBirth')[0].value,
        bloodType : $('#bloodType')[0].value,
        genre : $('input[name=genre]:checked')[0].id || null
    };
    if(
        data.name != "" && 
        data.password != "" && 
        data.password2 != "" &&
        data.email != "" && 
        // data.dateOfBirth != "" && 
        data.bloodType != "" && 
        data.genre != ""
    ){
        let url = urlBase + "donators";
        let options = {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        };
        post(url, options)
        .then(response => {
            $('#name')[0].value = "";
            $('#password1')[0].value = "";
            $('#password2')[0].value = "";
            $('#email')[0].value = "";
            // $('#dateOfBirth')[0].value = "";
            $('#bloodType')[0].value = "";
            
            alert("VOCÊ FOI CADASTRADO COM SUCESSO!");
        })
        .catch(err => {
            console.log(err);
        })
    }
};

const registerBank = () => {
    //name, email, cnpj, phone1, phone2, street,password1, password1
    let data = {
        name : $('#name')[0].value,
        password : $('#password1')[0].value,
        email : $('#email')[0].value,
        cnpj: $('#cnpj')[0].value,
        phone1 : $('#phone1')[0].value,
        phone2 : $('#phone2')[0].value,
        address : $('#street')[0].value,
    };
    if(
        data.name != "" && 
        data.password != "" && 
        data.email != "" && 
        data.cnpj != "" && 
        data.phone1 != "" && 
        data.address != ""
    ){
        data.phones = [data.phone1, data.phone2];
        let url = urlBase + "banks";
        let options = {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        };
        post(url, options)
        .then( (response) => {
            $('#name')[0].value = "";
            $('#password1')[0].value = "";
            $('#email')[0].value = "";
            $('#cnpj')[0].value = "";
            $('#phone1')[0].value = "";
            $('#phone2')[0].value = "";
            $('#street')[0].value = "";
            
            alert("Cadastrado com sucesso");
        })
        .catch(
            (err) => console.log(err)
        )
    }
};

const login = () => {
    if(! $('input[name=who]:checked')[0].id ) {
        alert("favor selecionar se é doador ou hospital")
    }else{
        let url = urlBase + $('input[name=who]:checked')[0].id + "/login";
        let data = {};
        data['email'] = $('#email')[0].value;
        data['password'] = $('#password')[0].value;
        let options = {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        };
        post(url, options)
        .then(response => {
            if(!response) {
                alert("erro ao logar, favor informe suas credenciais corretamente")
            }else {
                alert("você foi logado com sucesso, estamos contruindo seu dashboard!")
                window.localStorage.setItem("login", JSON.stringify(response))
            }
        })
        .catch(err => console.log("err ", err))
    }
};