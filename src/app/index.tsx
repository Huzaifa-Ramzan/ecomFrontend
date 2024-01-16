"use client";
import React, { useState } from "react";
import Header from "./Header";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import Register from './Register';
import Login from './Login';
import Protected from "./Protected";
import ProductList from "./ProductList";


var Index = ()=> {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query:any) => {
        setSearchQuery(query);
        return query;
      };

    return (
        <>
        <BrowserRouter>
            <Header searchquery={handleSearch} />
            <Routes>
                <Route path="/login" element={<Protected com={Login} />} />
                <Route path="/update/:id" element={<Protected com={UpdateProduct} />} />
                <Route path="/add" element={<Protected com={AddProduct} />} />
                <Route path="/register" element={<Protected com={Register} />} />
                <Route path="/" element={<Protected com={ProductList} searchQuery={searchQuery} />} />
            </Routes>
        </BrowserRouter>
        
        </>
    );
}

export default Index;