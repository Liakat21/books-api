// load the data
const loadBooks = () => {
    const searchText = document.getElementById('input').value;
    // for empty search
    if (searchText === '') {
        const resultFound = document.getElementById('result-found')
        resultFound.innerHTML = `Please search any book for result`;
    }
    // for search books
    else {
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => displayBooks(data))
    }
}
// showing result
const displayBooks = (books) => {
    // showing no result found
    const resultFound = document.getElementById('result-found')
    if (books.numFound === 0) {
        resultFound.innerHTML = `No Result Found for '${document.getElementById('input').value}'`;
        document.getElementById('input').value = ''
    }
    else {
        resultFound.innerHTML = `Here ${books.docs.length} books are shown from ${books.numFound} result for '${document.getElementById('input').value}'`
        document.getElementById('input').value = ''
    }
    // showing books details in website
    const booksDiv = document.getElementById('books-container')
    booksDiv.textContent = ''
    books.docs.forEach(book => {
        const div = document.createElement('div')
        div.classList.add('innerDiv')
        div.innerHTML = `
        <img style="width: 100%;height:250px; margin-top:15px; border-radius:10px" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg">
                    <h3>Name: ${book.title}</h3>
                    <h4>Author Name: ${book.author_name}</h4>
                    <h4>First Publisher: ${book.publisher}</h4>
                    <h3>First Publish: ${book.first_publish_year}</h3>`
        booksDiv.appendChild(div)
    })
}