let inputs = document.querySelectorAll('.input input');

inputs.forEach(input => {
    input.addEventListener('keyup', function(e) {
        let ele = e.target;
        if(ele.value != "") {
            ele.labels[0].classList.add('label-active');
            ele.labels[0].classList.remove('label-unactive');
            console.log(ele.labels[0]);
        }
        else{
            ele.labels[0].classList.remove('label-active');
            ele.labels[0].classList.add('label-unactive');
        }
    });
});