const URL = window.location.origin; // get current url

function submitForm(id) {
    if (checkform(document.getElementById(id))) {
        document.getElementById(id).submit();
        document.getElementById(id).reset();
    }
    
}

function checkform(form) {
    // get all the inputs within the submitted form
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        // only validate the inputs that have the required attribute
        if(inputs[i].hasAttribute("required")){
            if(inputs[i].value == ""){
                // found an empty field that is required
                alert("Please fill all required fields");
                return false;
            }
        }
    }
    return true;
}

function logout() {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    window.location.href = URL;
}

function removeItem(itemID) {
    fetch(`${URL}/api/item`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: itemID})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        window.location.href = URL;
    })
    .catch(err => console.log(err));
}

// Progressive image load

let imagesToLoad = document.querySelectorAll('img[data-src]');

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });

    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}

// PWA service worker

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/public/js/service-worker.js')
        .then(reg => {
            console.log('Service worker registered', reg);
        })
        .catch(err => {
            console.log('Service worker not registered', err);
        });
}