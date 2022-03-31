const locationButton = document.getElementById('get-location');
const locationDetails = document.getElementById('location-details');


locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, checkError);
    } else {
        locationDetails.innerText = "The browser does not support geolocation"
    }
});

const checkError = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationDetails.innerText = "To browser get your location, you need  to allow tit get you location"
            break;
        case error.PERMISSION_UNAVAILABLE:
            locationDetails.innerText = "Location Information Unvailable"
            break;
        case error.TIMEOUT:
            locationDetails.innerText = "The request to gewt you location timed out"
            break;
    }
}

const showLocation = async (position) => {
    try {
        let response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
        let data = await response.json()
        console.log(data)
        locationDetails.innerText = await `${data.address.state} - ${data.address.city}, ${data.address.suburb} `

    } catch (err) {
        console.log("Tente novamente")
    }
}