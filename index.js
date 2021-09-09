require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


//Database

const database = require("./database/database");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//Initialise express
 const booky = express();
 booky.use(bodyParser.urlencoded({ extended: true }));
 booky.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(() => console.log("Connection Established"))

/*
Route             /
Description       Get all the books
Access            Public
Parameter         NONE
Methods           Get
*/

 booky.get('/', async (req,res) => {
     const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
 });

/*
Route             /is
Description       Get all the book on ISBN
Access            Public
Parameter         isbn
Methods           Get
*/

 booky.get('/is/:isbn', async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    
    if(!getSpecificBook){
        return res.json({error: 'No Book found for the ISBN of $ {req.params.isbn}'});
    }
    return res.json({book: getSpecificBook});
 });

 /*
Route             /c
Description       Get all the book on category
Access            Public
Parameter         category
Methods           Get
*/

booky.get('/c/:category', async(req,res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category});

    if(!getSpecificBook){
        return res.json({error:'No book found for the category of ${req.params.category}'})
    }

    return res.json({book: getSpecificBook})
});

/*
Route             /lan
Description       Get all the book on language
Access            Public
Parameter         language
Methods           Get
*/

booky.get('/lan/:language',async(req,res) => {
    const getSpecificBook = await BookModel.findOne({lan: req.params.language});

    if(!getSpecificBook){
        return res.json({error: 'No Book found for the language of ${req.params.language}'})
    }
    
    return res.json({books: getSpecificBook})
    /*
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );
    if(getSpecificBook.length === 0){
        return res.json({error:'No Book found on this language ${req.params.language}'})
    }
    return res.json({book: getSpecificBook})*/
});

/*
Route             /author
Description       Get all the book on author
Access            Public
Parameter         author
Methods           Get
*/

booky.get('/author', async(req,res) => {
    const getAllAuthor = await AuthorModel.find();
    return res.json({author: getAllAuthor})
});

/*
Route             /author
Description       Get all the book on specific author
Access            Public
Parameter         id
Methods           Get
*/

booky.get('/author/:id',async(req,res) => {

    const getSpecificAuthor = await AuthorModel
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );
    if(getSpecificAuthor === 0){
        return res.json({error:'No Author found of ${req.params.id}'})
    }
    return res.json({author: getSpecificAuthor})
});

/*
Route             /author/book
Description       Get all the book on language
Access            Public
Parameter         language
Methods           Get
*/

booky.get('/author/book/:isbn',(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor === 0){
        return res.json({error:'No Author found of ${req.params.books}'})
    }
    return res.json({author: getSpecificAuthor})
});

/*
Route             /publications
Description       Get all the book on publication
Access            Public
Parameter         None
Methods           Get
*/

booky.get('/publications', async(req,res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json({publication: getAllPublication})
});

/*
Route             /publication
Description       Get all the book on publication
Access            Public
Parameter         id
Methods           Get
*/

booky.get('/publications/:id',(req,res) => {
    const getSpecificPublication = database.publication.filter(
        (book) => book.id.toString() === req.params.id
    );
    if(getSpecificPublication.length === 0){
        return res.json({error:'No publication found ${req.params.id}'})
    }
    return res.json({publication: getSpecificPublication})
});

/*
Route             /lan
Description       Get all the book on language
Access            Public
Parameter         language
Methods           Get
*/

booky.get('/publications/book/:isbn',(req,res) => {
    const getSpecificPublication = database.publication.filter(
        (book) => book.books.ISBN === req.params.isbn
    );
    if(getSpecificPublication.length === 0){
        return res.json({error:'NO publication found ${req.params.isbn}'})
    }
    return res.json({publication: getSpecificPublication})
});

//POST

/*
Route             /book/new
Description       Add new book
Access            Public
Parameter         none
Methods           POST
*/

booky.post('/book/new',async(req,res) => {
    const { newBook }= req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books: addNewBook,
        message: "Book was added!!!!"
    });


});

/*
Route             /author/new
Description       Add new author
Access            Public
Parameter         none
Methods           POST
*/

booky.post('/author/new',(req,res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({updatedAuthor: database.author});
});

/*
Route             /publication/new
Description       Add new publication
Access            Public
Parameter         none
Methods           POST
*/

booky.post('/publication/new',(req,res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json(database.publication);
});

/*
Route             /publication/update/book
Description       Update or Add new publication
Access            Public
Parameter         isbn
Methods           PUT
*/

booky.put('/publication/update/book/:isbn',(req,res) => {
    //Update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn);
        }
    });

    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json(
        {
            books: database.books,
            publications: database.publication,
            message: "Successfully updated publication"
        }
    )
});

/******Delete*******/

/*
Route             /book/delete
Description       Delete a book
Access            Public
Parameter         isbn
Methods           DELETE
*/

booky.delete("/book/delete/:isbn",(req,res) => {
    //whichever book that doesnot match with isbn , just send it to database array
    //rest will be filtered

    const updatedBookDatabase = dabase.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );
    database.books = updatedBookDatabase;

    return res.json({books: database.books});
});


/*
Route             /book/delete/author
Description       Delete an author from a book and vice vers
Access            Public
Parameter         isbn, authorID
Methods           PUT
*/

booky.delete("/book/delete/author/:isbn/:authoId",(req,res) => {
    //Update the book database
     database.books.forEach((book) => {
         if(book.ISBN === req.params.isbn) {
             const newAuthorList = book.author.filter(
                 (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
             );
             book.author = newAuthorList;
             return;
         }
     });

    //Update the author database
     database.author.forEach((eachAuthor) => {
         if(eachAuthor.id === parseInt(req.params.authoId)) {
             const newBoookList = eachAuthor.books.filter(
                 (book) => book !== req.params.isbn
             );
        eachAuthor.books = newBoookList;
        return;
        }
        return res.json({
            book: database.books,
            author: database.author,
            message: "Updated Successfully"
        })
    })

});



 booky.listen(3000,() => {
     console.log("Server is Running.......")
 });