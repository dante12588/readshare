const btn = document.querySelectorAll('#exchange-book');
var modal = document.getElementById("tradeModal");
var span = document.getElementsByClassName("close")[0];
const selectBooks = document.querySelector("#bookSelect");
const proposeTrade = document.querySelector("#proposeTrade");
let bookId = 0;

async function islogged() {
    try {
        const response = await $.ajax({
            url: '/users/isLogged',
            type: 'GET'
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

islogged().then((data) => {
    if (data == true) {
        console.log('Zalogowany');
    } else {
        console.log('Nie zalogowany');
        $('.actions .exchange-book').hide();
    }
});


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

proposeTrade.addEventListener('click', () =>{
    $.ajax({
        url: '/trade',
        type: 'POST',
        data: {
            book1Id: selectBooks.value,
            book2Id: bookId
        },
        success: function (data) {
            modal.style.display = "none";
        },
    });
});


btn.forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = "block";
        bookId = el.dataset.bookid;
        
    });
});

span.addEventListener('click', () => {
    modal.style.display = "none";
});