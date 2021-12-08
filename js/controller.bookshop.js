'use strict'

function onInit() {
    createBooks()
    renderBooks();
}

function renderBooks() {
    const books = getBooks();
    const strHTMLs = books.map((book) => {
        var priceSign = priceAndSign(book.price);
        return `<tr>
        <!-- <td>${book.id}</td> -->
        <td>${book.title}</td>
        <td>${priceSign}</td>
        <td><button onclick="onBookDetails('${book.id}')" data-trans="read">Read</button></td>
        <td><button onclick="onUpdateBook('${book.id}')" data-trans="update">Update</button></td>
        <td><button onclick="onRemoveBook('${book.id}')" data-trans="remove">Remove</button></td>
        </tr>`
    })
    document.querySelector('.table-body').innerHTML = strHTMLs.join('');
    doTrans()
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks();
}

function onTuggleAddDiv() {
    document.querySelector('.add-new-book').classList.toggle('open');
    document.querySelector('.book-title').value = '';
    document.querySelector('.book-price').value = '';
}

function onAddBook() {
    const title = document.querySelector('.add-new-book .book-title').value;
    const price = document.querySelector('.add-new-book .book-price').value;
    addBook(title, price);
    onTuggleAddDiv();
    renderBooks();
}

function onUpdateBook(bookId) {
    const newPrice = +prompt('Enter new price:')
    updateBook(bookId, newPrice);
    renderBooks();
}

function onBookDetails(bookId) {
    const book = getBookById(bookId);
    document.querySelector('.modal h2').innerText = book.title;
    document.querySelector('.modal p').innerText = book.desc;
    document.querySelector('.modal').classList.add('shown');

    document.querySelector('.modal .rate-controler').innerHTML = `
    <button onclick="onChangeRate('-', '${bookId}')">-</button>
    <span class="rate">${book.rate}</span>
    <button onclick="onChangeRate('+', '${bookId}')">+</button>`;

}

function onChangeRate(sign, bookId) {
    const newRate = updateRate(sign, bookId);
    document.querySelector('.modal .rate').innerText = newRate;
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('shown');
}

function onSetLang(lang) {      //////
    changeLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else  document.body.classList.remove('rtl');
    renderBooks();
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    //    get the data-trans and use getTrans to replace the innerText 
    els.forEach(el => {
        const transKey = el.dataset.trans
        // console.dir(el)
        if (el.nodeName === 'INPUT') {
            //    ITP: support placeholder    
            el.placeholder = getTrans(transKey)
        } else {
            el.innerText = getTrans(transKey)
        }
    })

}

function priceAndSign(price) {
    if(document.getElementById('languages').value === 'he'){
        var shekel = Number.parseFloat(price*3.1).toFixed(2);
        return `${shekel} ₪`
    } else return `$${price}`
}