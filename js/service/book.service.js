'use strict'
const STORAGE_KEY = 'booksDB'
var gBooks;
var gCurrLang = 'en';
const gTranslation = {
    title: {
        en: 'Welcome to my bookshop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    'choose-lang': {
        en: 'Choose a language:',
        he: 'בחר שפה:'
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'book-title': {
        en: 'Title',
        he: 'שם הספר'
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'Actoins': {
        en: 'Actoins',
        he: 'פעולות'
    },
    'add-book-title': {
        en: 'Books Title',
        he: 'שם הספר'
    },
    'add-price': {
        en: 'Books Price',
        he: 'מחיר הספר' 
    },
    'add-btn': {
        en: 'Add',
        he: 'הוסף' 
    },
    'add-close': {
        en: 'Close',
        he: 'סגור' 
    },
    'read': {
        en: 'Read',
        he: 'פרטים' 
    },
    'update': {
        en: 'Update',
        he: 'עדכן' 
    },
    'remove': {
        en: 'Remove',
        he: 'הסר' 
    },
    'placeH-title': {
        en: 'Enter Book Title',
        he: 'הכנס שם ספר' 
    },
    'placeH-price': {
        en: 'Enter Price',
        he: 'הכנס מחיר' 
    },
}

function changeLang(lang) {
    gCurrLang = lang;       //call 
}

function getTrans(transKey) {
    return gTranslation[transKey][gCurrLang];
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => {
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function getBooks() {
    return gBooks;
}

function addBook(title, price) {
    const newBook = {
        id: makeId(),
        title,
        price,
        desc: makeLorem(),
        rate: 0
    }
    gBooks.unshift(newBook);
    _saveBooksToStorage();
}

function updateRate(sign, bookId) {
    const bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    if (sign === '+' && gBooks[bookIdx].rate < 10) gBooks[bookIdx].rate++;
    if (sign === '-' && gBooks[bookIdx].rate > 0) gBooks[bookIdx].rate--;
    _saveBooksToStorage();
    return gBooks[bookIdx].rate;
}

function updateBook(bookId, newPrice) {
    const bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks[bookIdx].price = newPrice;
    _saveBooksToStorage();
}

function getBookById(bookId) {
    const bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    return gBooks[bookIdx];
}

function _createBook(title) {
    return {
        id: makeId(),
        title,
        price: getRandomIntInclusive(7, 40) + getRandomIntInclusive(0, 99) / 100,
        desc: makeLorem(),
        rate: 0
    }
}

function createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []

        for (let i = 0; i < 5; i++) {
            var title = makeLorem(1);
            books.push(_createBook(title))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
