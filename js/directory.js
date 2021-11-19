var allServices;
var currentServices;
$.getJSON('assets/directory.json', function (responseObject) {
    allServices = responseObject;
    currentServices = allServices;
    renderCard(currentServices[0]);
});

function updateModal(service) {
    document.getElementById("serviceModalLabel").innerHTML = service.name;
    document.getElementById("service-type").innerHTML = service.service;
    document.getElementById("description").innerHTML = service.desc;
    document.getElementById("address").src = service.address;
    var phone = document.getElementById("phone");
    phone.href = "tel:" + service.phone;
    phone.innerHTML = service.phone;
    var map = document.getElementById("location");
    var address = service.address.replaceAll(" ", "%20");
    var url = "https://maps.google.com/maps?q=" + address + "&t=&z=13&ie=UTF8&iwloc=&output=embed";
    map.src = url;
}

var renderCard = function (service) {
    var cutoff = 400; //character cut off
    var content = document.getElementById("content");
    var card = document.createElement("div");
    card.className = "card";
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = service.name;
    var cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerHTML = service.desc.substring(0, cutoff) + "...";
    var cardButton = document.createElement("button");
    cardButton.className = "btn btn-primary";
    cardButton.innerHTML = "Learn More";
    cardButton.type = "button";
    cardButton.setAttribute("data-toggle", "modal");
    cardButton.setAttribute("data-target", "#serviceModal");
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    card.appendChild(cardBody);
    content.appendChild(card);
    cardButton.addEventListener('click', updateModal(service));
};


