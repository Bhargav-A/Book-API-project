const books = [
    {
        ISBN: "3300Book",
        title: "Tesla!!!",
        pubDate: "2021-08-06",
        language: "en",
        numPage: 300,
        author: [1,2],
        publication: [1],
        category: ["tech","space","education"]
    }
]

const author = [
    {
        id: 1,
        name: "Bhargav",
        books: ["3300Book","secretBook"]
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["3300Book"]
    }
]

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["3300Book"]
    },
    {
        id:5,
        name: "writex3",
        books: []
    }
]

module.exports = {books,author,publication};