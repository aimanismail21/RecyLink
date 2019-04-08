var map;
var vancouver = {lat: 49.2827, lng: -123.1207};
var markers = [];
var clickHandler = [];
function initMap() {
    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {
    center: vancouver,
    zoom: 13,
    mapTypeId: 'roadmap'
    });
    var service = new google.maps.places.PlacesService(map);
    var directionsDisplay = new google.maps.DirectionsRenderer;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        // Get user location from device.
        navigator.geolocation.getCurrentPosition(function(position) {
        var userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        // Set Current Location.
        map.setCenter(userPosition);

        markers.push(new google.maps.Marker({
            position: userPosition,
            map: map
        }));

        var request = {
            location: userPosition,
            radius: '2000',
            query: 'recycle'
        };

        // Perform a Recycle search.
        service.textSearch(request, callback);

        clickHandler.push(new ClickEventHandler(map, userPosition, directionsDisplay));
    }, function() {
        // Set Location to Vancouver.
        map.setCenter(vancouver);

        markers.push(new google.maps.Marker({
            position: vancouver,
            map: map
        }));

        clickHandler.push(new ClickEventHandler(map, vancouver, directionsDisplay));

        var request = {
            location: vancouver,
            radius: '2000',
            query: 'recycle'
        };

        // Perform a Recycle search.
        service.textSearch(request, callback);
    });
    } else {
    // Browser doesn't support Geolocation
    // Set Location to Vancouver.
    map.setCenter(vancouver);

    // Add Marker.
    markers.push(new google.maps.Marker({
        position: vancouver,
        map: map
    }));
    }

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();

        places.forEach(function(place) {
            if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
            };

            if (places.length == 1){         
                // var service = new google.maps.places.PlacesService(map);
                resetList();
                var request = {
                    location: place.geometry.location,
                    radius: '2000',
                    query: 'recycle'
                };
                // Perform a Recycle search.
                service.textSearch(request, callback);
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
            }));
            
            clickHandler[0].origin = place.geometry.location;

            if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
            } else {
            bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

function callback(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK){
        createMarkers(results);
    }
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.createElement('ul');
    document.getElementById('right-panel').appendChild(placesList);
    placesList.id = 'places';

    for (var i = 0, place; place = places[i]; i++) {
        var marker = new google.maps.Marker({
            map: map,
            icon: "https://www.google.com/mapfiles/arrow.png",
            title: place.name,
            position: place.geometry.location
        });

        markers.push(marker);
        
        let lat = marker.getPosition().lat()
        let lng = marker.getPosition().lng()

        marker.addListener('click', function(){
            map.setZoom(20);
            map.setCenter({lat, lng});
        });

        var li = document.createElement('li');
        li.textContent = place.name;
        li.className = 'place';
        placesList.appendChild(li);

        li.addEventListener('click', function(){
            map.setZoom(20);
            map.setCenter({lat, lng});
        })

        bounds.extend(place.geometry.location);
    };
}

function resetList() {
    var placesList = document.getElementById('places');
    var parent = document.getElementById('right-panel');
    parent.removeChild(placesList);
}

var ClickEventHandler = function(map, origin, directionsDisplay) {
    this.origin = origin;
    this.map = map;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = directionsDisplay;
    this.directionsDisplay.setMap(map);
    this.placesService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow;
    this.infowindowContent = document.getElementById('infowindow-content');
    this.infowindow.setContent(this.infowindowContent);

    // Listen for clicks on the map.
    this.map.addListener('click', this.handleClick.bind(this));
};

ClickEventHandler.prototype.handleClick = function(event) {
    // map.setMap(null);
    console.log('You clicked on: ' + event.latLng);
    // If the event has a placeId, use it.
    if (event.placeId) {
    console.log('You clicked on place:' + event.placeId);

    // Calling e.stop() on the event prevents the default info window from
    // showing.
    // If you call stop here when there is no placeId you will prevent some
    // other map click event handlers from receiving the event.
    event.stop();
    this.calculateAndDisplayRoute(event.placeId);
    this.getPlaceInformation(event.placeId);
    }
};

ClickEventHandler.prototype.calculateAndDisplayRoute = function(placeId) {
    var me = this;
    this.directionsService.route({
    origin: this.origin,
    destination: {placeId: placeId},
    travelMode: 'DRIVING'
    }, function(response, status) {
    if (status === 'OK') {
        me.directionsDisplay.setDirections(response);
    } else {
        window.alert('Directions request failed due to ' + status);
    }
    });
};

ClickEventHandler.prototype.getPlaceInformation = function(placeId) {
    var me = this;
    this.placesService.getDetails({placeId: placeId}, function(place, status) {
    if (status === 'OK') {
        me.infowindow.close();
        me.infowindow.setPosition(place.geometry.location);
        me.infowindowContent.children['place-icon'].src = place.icon;
        me.infowindowContent.children['place-name'].textContent = place.name;
        me.infowindowContent.children['place-id'].textContent = place.place_id;
        me.infowindowContent.children['place-address'].textContent =
            place.formatted_address;
        me.infowindow.open(me.map);
    }
    });
};