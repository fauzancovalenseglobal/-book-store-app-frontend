import './App.css';
import Navbar from './component/Nav';
import Book from './component/Book';
import Author from './component/Author';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';


function App() {


  return (

    <Router>
    <Navbar/>

    <Routes>
    <Route exact path="/" element={<Book  isActive={true} />    } />
    <Route path="/author"  element={<Author isActive={true}  />}  />
    </Routes>
    </Router>
  );
}

export default App;
