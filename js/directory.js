var allServices;
var currentServices;

$.getJSON('assets/directory.json', function (responseObject) {
    allServices = responseObject;
    currentServices = allServices;
});

function updateModal(service) {
    document.getElementById("serviceModalLabel").innerHTML = service.name;
    document.getElementById("service-type").innerHTML = "Service Type: " + service.service;
    document.getElementById("description").innerHTML = service.desc;
    document.getElementById("address").innerHTML = service.address;
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
    card.classList.add("service-item");
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = service.name;
    var cardText = document.createElement("p");
    cardText.className = "card-text";
    if(service.desc.length > cutoff) {
        cardText.innerHTML = service.desc.substring(0, cutoff) + "...";
    } else {
        cardText.innerHTML = service.desc;
    }
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

var renderServices = function () {
    for (var i = 0; i < currentServices.length; i++) {
        renderCard(currentServices[i]);
    }
}

function clearServices() {
    var content = document.getElementById("content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

function filterServices(service) {
    clearServices();
    currentServices = allServices;
    var checkedServices = document.querySelectorAll(".service-card input[type='checkbox']:checked");
    var values = Array.prototype.map.call(checkedServices, function (checkbox) {
        return checkbox.value;
    });
    if (values.length > 0) {
        currentServices = currentServices.filter(function (service) {
            return values.includes(service.service);
        });
    }

    var checkedTags = document.querySelectorAll(".tag-card input[type='checkbox']:checked");
    var tags = Array.prototype.map.call(checkedTags, function (checkbox) {
        return checkbox.value;
    });
    currentServices = currentServices.filter(function (service) {
        for(var i = 0; i < tags.length; i++) {
            if(!service.tags.includes(tags[i])) {
                return false;
            }
        }
        
        return true;
    });

    if(values.length == 0 && tags.length == 0) {
        currentServices = allServices;
    }
    renderServices();
}

$(document).ready(function () {
    renderServices();
});