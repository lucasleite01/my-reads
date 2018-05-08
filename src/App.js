import React from 'react'
import BooksList from './BooksList.js'
import If from './If.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(){
    super()
    this.state = {
      bookList: [],
      showSearchPage: false
    }
    this.updateBook = this.updateBook.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({ bookList: data })
    })
  }

  //this method updates the book shelf on server and the BookList state
  updateBook(book) {
    console.log("updating book on server...")
    //changing book shelf
    let e = document.getElementById(book.id)
    let shelf = e.options[e.selectedIndex].value
    BooksAPI.update(book, shelf)
    console.log("updating bookList state...")
    //updating the bookList
    BooksAPI.getAll().then((data) => {
      this.setState({ bookList: data })
    })
    console.log("book updated")
  }

  render() {
    return (
      <div className="app">
        <If test={this.state.showSearchPage}>

          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        </If>

        <If test={this.state.showSearchPage === false}>
        {
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
          </div>
        }
        </If>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BooksApp
