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