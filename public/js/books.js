window.addEventListener('load', ()=>{
    displayBooks();
});

const button = document.querySelector('#button');
button.addEventListener('click', (e)=>{
    e.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const year = document.querySelector('input[name="year"]').value;
    const description = document.querySelector('input[name="description"]').value;

   $.ajax({
        url: '/books',
        method: 'POST',
        data: {
            title: title,
            author: author,
            year: year,
            description: description
            },
        success: (res)=>{
            displayBooks();
            console.log(res);
        }
   });
})

function displayBooks(){
    const books = document.querySelector('.books');
    books.innerHTML = '';
    $.ajax({
        url: '/books/byid',
        method: 'GET',
        success: (res)=>{
            res.forEach(book=>{
                const div = document.createElement('div');
                div.innerHTML = `<p>${book.title} - ${book.author} - ${book.year} - ${book.description}</p>`;
                books.appendChild(div);
            })
        }
    })
}