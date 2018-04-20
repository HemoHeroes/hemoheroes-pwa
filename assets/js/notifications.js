(function(){
    "use strict";
    
    function notifique(){
        var op = {
            body: 'Você irá receber as noticações desse jeito!', 
            icon:'./assets/images/Logo-email.png'
        };
        var title = "HemoHeroes Notifica";
        var offline = {
            body: "Olá, você está offline. assim que tiver online acesse novamente!",
            icon:'./assets/images/Logo-email.png'
        };
        if('Notification' in window){
            
            if(Notification.permission === 'granted'){
                if(!navigator.onLine) {
                    new Notification(title, offline);
                }
                
            }
            if(Notification.permission === 'denied' || Notification.permission === 'default'){
                Notification.requestPermission(function(permission){
                    if(permission === 'granted'){
                        new Notification(title, op);
                    }
                });
            }

        }
    };
    
    notifique();
    
})();