function myMap() {
    if(navigator.onLine == true){
        navigator.geolocation.getCurrentPosition(function(position) {
            let mapProp = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 8,
            };
            
            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            
            fetch("./api/v1/banks")
            .then(res=>res.json())
            .then(data => {
                data.forEach((element, index) => {
                    if(element.address[0].latitude && element.address[0].longitude){
                        let bankLocation = new google.maps.LatLng(element.address[0].latitude, element.address[0].longitude);
                        let bankMarker = new google.maps.Marker({
                            position: bankLocation,
                            title: element.name
                        });
                        let bankInfoWindow = new google.maps.InfoWindow({
                            content: `<p>${element.name}</p><br><span>${element.address[0].street}</span>`
                        });
                        google.maps.event.addListener(bankMarker, 'click', () => {
                            bankInfoWindow.open(map, bankMarker);
                        });
                        bankMarker.setMap(map);
                    }
                });
            })
            .catch(error => {
                console.log("ASDAS :: ", error)
                document.getElementById("googleMap").innerHTML = "Desculpe, houve algum erro para carregar o mapa, tente daqui alguns instantes."
                console.log(error)
            })
        });
        
    }else{
        console.log("off")
        document.getElementById("googleMap").innerHTML = "Desculpe, mas sua conexão estão lenta ou indisponível."
    }
}

myMap();