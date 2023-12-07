const btn = document.querySelectorAll('#exchange-book');
var modal = document.getElementById("tradeModal");
var span = document.getElementsByClassName("close")[0];
const selectBooks = document.querySelector("#bookSelect");

$.ajax({
    url: '/books//byid',
    type: 'GET',
    success: function (data) {
        data.forEach((el) => {
            let option = document.createElement("option"); // Tworzenie nowego elementu <option> w każdej iteracji
            console.log(el.title, el.idbooks);
            option.innerHTML = el.title;
            option.setAttribute("value", el.idbooks);
            selectBooks.appendChild(option);
        });
    },
});


btn.forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = "block";
        // alert(el.dataset.bookid);
        
    });
});

span.addEventListener('click', () => {
    modal.style.display = "none";
});