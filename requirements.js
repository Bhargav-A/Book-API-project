

//Requirement for our project
	
	//We are a book management company 
	
	//BOOKS 
	//ISBN, title, pub date, language, num page, author[], category[]
	
	//AUTHORS
	//id, name, books[]
	
	//PUBLICATIONS
	//id, name, books[]
	
	//We have to design and code an API over this . 
	
	//1. BOOKS 
	//We need an API :- 
	//To get all the books - DONE
	//To get specific book - DONE
	//To get a list of books based on category - DONE
	//To get a list of books based on languages - DONE
	
	//2. AUTHORS
	//We need an API :-
	//To get all the authors - DONE
	//To get a specific author - DONE
	//To get a list of authors based on books - DONE
	
	//3. PUBLICATIONS
	//We need an API :-
	//To get all the publications - DONE
	//To get a specific publication - 
	//To get a list of publications based on a book

    //POST REQUEST
    //1.Add new book
    //2.Add new publication
	//3. Add new author

	/*********PUT***********/
	//Update book details if author is changed

	/*******DELETE********/
	//1.Delete a book
	//2.Delete author from book
	//3.Delete author from book and related book frm author

	//Schema - Blueprint of how data has to be constructed
	//MongoDB is schemaless
	//mongoose has schema
	//mongoose - validation , relationship with other data.
	//model -> document model of MongoDB
	//Schema -> Model -> use them .
