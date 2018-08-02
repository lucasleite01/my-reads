import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BooksList from './BooksList.js'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook.js'

class BooksApp extends React.Component {
  constructor(){
    super();
    this.state = {
      bookList: [],
      showSearchPage: false
    }
    this.updateBook = this.updateBook.bind(this);
  }

  //get all the books from the server and store at BookList state
  componentWillMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({ bookList: data });
    })
  }

  //this method updates the book shelf on server and the BookList state
  updateBook(book) {
    //changing book shelf
    let e = document.getElementById(book.id);
    let shelf = e.options[e.selectedIndex].value;
    BooksAPI.update(book, shelf);
    //updating the bookList
    BooksAPI.getAll().then((data) => {
      this.setState({ bookList: data });
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path='/search' render={() => (
            <SearchBook
              onUpdateBookShelf={this.updateBook}
            />
          )}/>
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BooksList
                bookList={this.state.bookList}
                listTitle={'currentlyReading'}
                onUpdateBookShelf={this.updateBook}
              />
              <BooksList
                bookList={this.state.bookList}
                listTitle={'wantToRead'}
                onUpdateBookShelf={this.updateBook}
              />
              <BooksList
                bookList={this.state.bookList}
                listTitle={'read'}
                onUpdateBookShelf={this.updateBook}
              />
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
