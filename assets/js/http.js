"use strict";

const urlBase = "https://hemoheros-api.herokuapp.com/api/v1/";

let post = (url, param) => fetch(url, param).then(response => response.json());

const register = (who) => {
    let url = urlBase + who;
    let data = validData();
    let options = {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    };
    if(data != null) {
        post(url, options)
        .then(data => console.log(data))
        .catch(err => console.log("err ", err))
    }
};

const validData = () => {
    let data = [];
    let validated = {};
    let fields = document.querySelectorAll('input');
    let fieldsValues = [].slice.call(fields);
    fieldsValues.forEach(element => {
        data.push({
            id: element.id,
            value: element.value
        });
    });
    data = data.filter(item => item.value.length>0)
    if(data.length != fieldsValues.length){
        alert("favor preencher todos os campos");
    }else{
        data.forEach(item=> validated[item.id] = item.value)
        if(validated['password1'] && validated['password2'] && validated['password1'] == validated['password2']){
            validated['password'] = validated['password1']
            return validated;
        }
        return null;
    }
};

const registerDonator = () => {
    let data = {
        name : $('#name')[0].value,
        password : $('#password')[0].value,
        email : $('#email')[0].value,
        dateOfBirth: $('#dateOfBirth')[0].value,
        bloodType : $('#bloodType')[0].value,
        genre : $('#genre')[0].value
    };
    if(
        data.name != "" && 
        data.password != "" && 
        data.email != "" && 
        data.dateOfBirth != "" && 
        data.bloodType != "" && 
        data.genre != ""
    ){
        //Chama Post
    }
};

const registerBank = () => {
    let data = {
        name : $('#name')[0].value,
        password : $('#password')[0].value,
        email : $('#email')[0].value,
        cnpj: $('#dateOfBirth')[0].value,
        phones : $('#bloodType')[0].value,
        address : $('#genre')[0].value
    };
    if(
        data.name != "" && 
        data.password != "" && 
        data.email != "" && 
        data.cnpj != "" && 
        data.phones != "" && 
        data.address != ""
    ){
        //Chama Post
    }
};

const login = (who) => {
    let url = urlBase + who + "/login";
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
    if(data != null) {
        post(url, options)
        .then(data => {
            console.log(data)
            window.localStorage.setItem("login", JSON.stringify(data))
        })
        .catch(err => console.log("err ", err))
    };
};