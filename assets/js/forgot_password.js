var sendlink = document.getElementById("sendlink");
var email = document.getElementById("email");
sendlink.addEventListener("click", async function() {
    fetch('/auth/forgot-password/?email='+email.value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // body: data
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
})