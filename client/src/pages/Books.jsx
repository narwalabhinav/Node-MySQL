import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:3000/books")
                setBooks(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])

const handleDelete = async (id) => {
    try{
        await axios.delete("http://localhost:3000/books/"+id)
        window.location.reload()
    }catch(err){
        console.log(err)
    }
}

  return (
    <div>
        <div className='title'>
        <h1>Book Shop</h1>
        </div>
    
    <div className='books'>
        {books.map(book => (
            <div className='book' key={book.id}>
                <img src={book.cover} alt=""/>
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>{book.price}</span>
                <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
            </div>
        ))}
    </div>
    <button>
        <Link to="/add">Add new book</Link>
    </button>
    </div>
  )
}

export default Books