const reader = new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();
        mapContainer.style.display ="none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display ="block";
        btn.innerText ="SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
            const place = JSON.parse(text);
            showMarkerAt(place.top, place.left);
            toggleScanner();
            console.log(place)
            showList(place)
        }
    ).catch(function (err) {
        console.error(err);
    });
}

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}

function showList(place) {
    document.getElementById("yes").innerHTML = "item = " + place.name
    document.getElementById("yes2").innerHTML = "price = " + place.price + " €"
    document.getElementById("yes3").innerHTML = "instock = " + place.inStock
    no.style.display = "block";
}