var sendotp = document.getElementById('sendotp');
var mobile = document.getElementById('mobile');
var verifyotp = document.getElementById("verifyotp");
var otp = document.getElementById("otp");

sendotp.addEventListener('click', async function() {
    mobile = mobile.value;
    console.log(mobile);
    const data = new URLSearchParams();
    data.append('mobileNumber', mobile);
    console.log(data);
    const user_id = window.localStorage.getItem("user_id");
    data.append("user_id", user_id);
    fetch('/auth/mobile/sendotp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
});

verifyotp.addEventListener("click", async function() {
    otp = otp.value;
    console.log(otp);
    const data = new URLSearchParams();
    data.append('otp', otp);
    const user_id = window.localStorage.getItem("user_id");
    data.append("user_id", user_id);
    console.log(data);
    fetch('/auth/mobile/verifyotp/?otp='+OTP+'&user_id='+user_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // body: data
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
});