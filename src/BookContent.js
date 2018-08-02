import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'
// import If from './If.js'

class BookContent extends Component {

  constructor() {
    super();
    this.state = {
      hasError: false
    };
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render () {
    const {book, onUpdateBookShelf} = this.props

    if (this.state.hasError) {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <li>
          <div className="book">
            <div className="book-top">
              {typeof book.imageLinks !== "undefined" ? (
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              ) :
              (
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(./img/sem_capa.jpg)` }}></div>
              )}
              <div className="book-shelf-changer">
                <select id={book.id} defaultValue={book.shelf} onChange={() => onUpdateBookShelf(book)}>
                  <option value="disabled" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            {typeof book.authors !== "undefined" ? (
              book.authors.map(author => (
                <div key={author} className="book-authors">{author}</div>
              ))
            ) :
            (
              <div>
              </div>
            )}
          </div>
        </li>
      )
    }
  }
}

export default BookContent
