(function(){
    "use strict";
    
    function notifique(){
        var op = {
            body: 'Você irá receber as noticações desse jeito!', 
            icon:'./assets/images/Logo-email.png'
        };
        var title = "HemoHeroes notifica";
        if(!('Notification' in window)){
            alert("nao suporta notificação");
        }
        else if(Notification.permission === 'granted'){
            var notif = new Notification(title, op);
        }
        else if(Notification.permission !== 'denied'){
            Notification.requestPermission(function(permission){
                if(permission === 'granted'){
                    var notif = new Notification(title, op);
                }
            });
        }
    };
    
    notifique();
    
})();