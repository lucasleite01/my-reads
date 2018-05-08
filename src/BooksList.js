import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

class BooksList extends Component {
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    listTitle: PropTypes.string.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {bookList, listTitle, onUpdateBookShelf} = this.props
    //let currentlyReadingBooks = this.props.bookList.filter(book => book.shelf === 'currentlyReading')
    return (
      <div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">
                {
                  //choose the title according the listTitle sent to BooksList
                  listTitle === 'currentlyReading' ? 'Currently Reading' :
                  listTitle === 'wantToRead' ? 'Want to Read' : 'Read'
                }
              </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {bookList.filter(book => book.shelf === listTitle).map(book => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select id={book.id} defaultValue={book.shelf} onChange={() => onUpdateBookShelf(book)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.author}</div>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default BooksList
