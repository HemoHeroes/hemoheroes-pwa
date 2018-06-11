"use strict";

const urlBase = "http://localhost:8080/api/v1/";

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
            
            showToast("Foi registrado com sucesso!", 1000);
        })
        .catch(err => {
            console.log(err);
            showToast("Ocorreu algum erro e não foi possível!", 1000);
        })
    } else {
        showToast("Favor preencha todos os campos!", 1000);
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
            
            showToast("Foi registrado com sucesso!", 1000);
        })
        .catch(
            (err) => {
                console.log(err);
                showToast("Ocorreu algum erro tente novametne daqui alguns instantes!", 1000);
            }
        )
    } else {
        showToast("Favor preencha todos os campos!", 1000);
    }
};

function showToast (message, time) {
    M.toast({html: message, inDuration: time, classes: 'rounded'})
}

const login = () => {
    let hasChecked = $('input[name=who]:checked')[0] || null;
    if( !hasChecked ) {
        showToast("Favor selecionar se é doador ou um hospital!", 1000);
    }else{
        let checked = $('input[name=who]:checked')[0].id;
        let url = urlBase + checked + "/login";
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
                showToast("Erro ao logar, favor informe suas credencias corretamente!", 1000);
            }else {
                showToast("Você foi logado com sucesso!", 1000);
                let result = response;
                result["checked"] = $('input[name=who]:checked')[0].id;
                console.log("response => ::: ", response)
                window.localStorage.setItem("login", JSON.stringify(response))
                changePage("myPerfil");
                window.location = "/";
            }
        })
        .catch(err => {
            console.log("err ", err);
            showToast("Ocorreu algum erro, tente novamente mais tarde!", 1000);
        })
    }
};

const saveDataDonator = () => {
    let storage = JSON.parse(window.localStorage.getItem("login"));
    let fields = {
        name : $('#name')[0].value || "",
        password : $('#password1')[0].value || "",
        password2 : $('#password2')[0].value || ""
    }
    if (storage.token) {
        let data = {
            _id: storage["_id"],
            data: {}
        };
        if (fields.name !== "") data.data.name = fields.name; 
        if (fields.password !== "" && fields.password2 !== ""){
            if (fields.password == fields.password2) {
                data.data.password = fields.password; 
                data.data.password2 = fields.password2;
            }
        }
        let options = {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        };
        if (Object.keys(data.data).length > 0) { 
            post(urlBase + "donators/change?token=" + storage.token, options)
            .then(response => {
                let result = Object.assign(storage, data.data);
                result = JSON.stringify(result);
                window.localStorage.setItem("login", result);
                setTimeout(()=>{
                    window.location = "/";
                    showToast("Foi alterado com sucesso suas informações!", 1000);
                }, 500)
            })
            .catch(error => {
                console.log("ERROR save Donator => ", error);
                showToast("Ocorreu algum erro e não foi possível!", 1000);
            });
        } else {
            showToast("Para salvar, precisa informar o que deseja alterar!", 1000);
        }
    }
};

const saveDataBank = () => {
    let storage = JSON.parse(window.localStorage.getItem("login"));
    let fields = {
        name : $('#name')[0].value || "",
        phone1 : $('#phone1')[0].value || "",
        phone2 : $('#phone2')[0].value || "",
        password : $('#password1')[0].value || "",
        password2 : $('#password2')[0].value || ""
    }
    if (storage.token) {
        let data = {
            _id: storage["_id"],
            data: {}
        };
        if (fields.name !== "") data.data.name = fields.name; 
        if (fields.phone1 != "" || fields.phone2 != "") {
            data.data.phones = [];
            if (fields.phone1 !== "") data.data.phones.push(fields.phone1);
            if (fields.phone2 !== "") data.data.phones.push(fields.phone2);
        }
        if (fields.password !== "" && fields.password2 !== ""){
            if (fields.password == fields.password2) {
                data.data.password = fields.password; 
                data.data.password2 = fields.password2;
            }
        }
        let options = {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        };
        if (Object.keys(data.data).length > 0) { 
            fetch(urlBase + "banks/change?token=" + storage.token, options)
            .then(response => {
                let result = Object.assign(storage, data.data);
                result = JSON.stringify(result);
                window.localStorage.setItem("login", result);
                setTimeout(()=>{
                    window.location = "/";
                    showToast("Foi alterado com sucesso suas informações!", 1000);
                }, 500)
            })
            .catch(error => {
                console.log("ERROR save Donator => ", error);
                showToast("Ocorreu algum erro e não foi possível!", 1000);
            });
        } else {
            showToast("Para salvar, precisa informar o que deseja alterar!", 1000);
        }
    }
};

const requireBlood = (title, message) => {
    var typesBlood = $('[type=number]');

    for(var i=0; i<$('[type=number]').length; i++){
        console.log(typesBlood[i].id, typesBlood[i].value);
    }

    let data = {
        "push": {
            "title": title || "Solicitamos sua colaboração.", 
            "body": message || "Nossos hemocentros estão precisando de doadores, nos ajude."
        },
        "bloods": []
    };

    for(var i=0; i<$('[type=number]').length; i++){
        if (typesBlood[i].value) {
            data.bloods.push(typesBlood[i].id);
        }
    }

    let options = {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    };
    fetch(urlBase + "banks/notifications", options)
    .then(response => {
        if(response.status == 201) {
            showToast("Foi solicitado com sucesso!", 1000);
        }
    })
    .catch(error => {
        console.log("error push => ", error)
        showToast("Ocorreu algum erro, tente novamente mais tarde!", 1000);
    });
};

// requireBlood("testando 1", "my browser 1 push")
// requireBlood();