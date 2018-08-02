import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookContent from './BookContent.js'

class SearchBook extends Component {
  constructor() {
    super();
    this.state = {
      searchList: []
    }
    this.searchBook = this.searchBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    bookList: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  handleChange(event) {
    this.searchBook(event.target.value);
  }

  //search for books that match the search text
  searchBook(text) {
    if (typeof text !== "undefined") {
      BooksAPI.search(text).then((data) => {
        if (typeof data !== "undefined" && typeof data.length !== "undefined") {
          //verifying books to match in both pages
          data.forEach((book) => {
            this.props.bookList.forEach((bl) => {
              if (book.id === bl.id)
                book.shelf = bl.shelf;
              else if (typeof book.shelf === "undefined")
                book.shelf = "none";
            });
            console.log(book.shelf);
          });

          this.setState({searchList: data});
        }
        else {
          this.setState({searchList: []})
        }
      });
    }
    else {
      this.setState({searchList: []});
    }
  }

  render() {
    const{onUpdateBookShelf} = this.props

    if (this.state.hasError) {
      console.log("teste");
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.searchList.map(book => (
                <BookContent
                  key={book.id}
                  book={book}
                  onUpdateBookShelf={onUpdateBookShelf}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
