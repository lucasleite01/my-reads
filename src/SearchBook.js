import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookContent from './BookContent.js'
// import If from './If.js'

class SearchBook extends Component {
  constructor() {
    super();
    this.state = {
      searchList: [],
      hasError: false
    }
    this.searchBook = this.searchBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  handleChange(event) {
    this.searchBook(event.target.value);
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  //search for books that match the search text
  searchBook(text) {
    if (typeof text !== "undefined") {
      BooksAPI.search(text).then((data) => {
        if (typeof data !== "undefined" && typeof data.length !== "undefined") {
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
          {this.state.hasError ?
          (
            <div>
              No results...
            </div>
          ) :
          (
            <BookContent
              bookList={this.state.searchList}
              onUpdateBookShelf={onUpdateBookShelf}
              defaultShelf='none'
            />
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
