const express=require('express');
//import express
const app=express();
//create express app
const port=3000;
//port number
app.use(express.json());
//to parse JSON body
//In memory array to store books
let books=[];
//GET /books ->Return all books
app.get('/books',(req,res)=>{
    res.json(books);
});
//POST /books->Add a new book
app.post('/books',(req,res)=>{
  const{id,title,author }=req.body;
  if(!id||!title||!author){
    return res.status(400).json({message:"Please provide id,title and author"});
  }
  books.push({id,title,author});
  res.status(201).json({message:"Books added successfully",book:{id,title,author}});
});
//PUT /books/:id->update books by ID
app.put('/books/:id',(req,res)=>{
    const bookId=req.params.id;
    const{title,author}=req.body;
    const book=books.find(b=>b.id===bookId);
    if(!book){
        return res.status(404).json({message:"Book not found"});
    }
    if(title)book.title=title;
    if(author)book.author=author;
    res.json({message:"Book updated successfully",book});
});
//Delete/books/:id->Delete book by ID 
app.delete('/books/:id',(req,res)=>{
    const bookId=req.params.id;
    books=books.filter(b=>b.id!==bookId);
    res.json({message:"Book deleted successfully"});

});
//Start the server
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});



