import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {book, onUpdateBookShelf} = this.props
    return (
      <li>
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
    )
  }
}

export default Book
