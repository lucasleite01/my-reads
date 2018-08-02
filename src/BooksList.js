import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import BookContent from './BookContent.js'

class BooksList extends Component {
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    listTitle: PropTypes.string.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {bookList, listTitle, onUpdateBookShelf} = this.props
    return (
      <div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">
                {
                  //choose the title according the listTitle sent to BooksList
                  listTitle === 'currentlyReading' ? 'Currently Reading' :
                  listTitle === 'wantToRead' ? 'Want to Read' :
                  listTitle === 'read' ? 'Read' : ''
                }
              </h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  bookList.filter(book => book.shelf === listTitle).map(book => (
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
          </div>
        </div>
      </div>
    )
  }
}


export default BooksList
