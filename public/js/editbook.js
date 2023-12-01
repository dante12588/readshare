const btn = document.querySelector('input[type="submit"]');

btn.addEventListener('click', (e)=>{
    e.preventDefault();

    const id = window.location.href.split('/').pop();
    const file = document.querySelector('input[type="file"]').files[0];
    const title = document.querySelector('input[name="title"]');
    const author = document.querySelector('input[name="author"]');
    const year = document.querySelector('input[name="year"]');
    const description = document.querySelector('input[name="descrition"]');

    let formData = new FormData();
    formData.append('title', title.value);
    formData.append('author', author.value);
    formData.append('year', year.value);
    formData.append('description', description.value);
    formData.append('file', file);

    $.ajax({
        type: 'POST',
        url: `/books/edit/${id}`,
        processData: false,
        contentType: false,
        data: formData,
        success: (data) => {
            window.location.reload();
            console.log(data);
        },

    });
   
})