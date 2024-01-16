"use client";
import React, { useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProductList from './ProductList';


var Header = (props:any) => {

    var user;
    var [userItem, setuserItem] = useState(false);
    try {
        user = JSON.parse(localStorage.getItem('userInfo'));
    } catch (error) {
        console.error('Error parsing userInfo:', error);
        user = {}; // Provide a default value in case of an error
    }

    var location = useLocation();
    const isRootPath = location.pathname === '/'?? null;

    var navigation = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigation('/login');
    };

    var Search = async (key: String) => {
        isRootPath ? "" : navigation('/');

        try {
            var response = await fetch('http://localhost:8000/api/search/' + key);
            var result = await response.json();
            props.searchquery(result);
        }
        catch (error) {
            props.searchquery('');
            console.error(error);
        }
    }

    return (
        <nav className="z-0 relative" x-data="{open:false,menu:false, lokasi:false}">
            <div className="relative z-10 bg-gray-200 shadow">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex items-center px-2 lg:px-0">
                            <a className="flex-shrink-0" href="#"></a>
                            <div className="hidden lg:block lg:ml-2">

                                <div className="flex">
                                    <Link to="/" className='px-3 py-2 text-xl font-bold  leading-5 font-medium text-gray-800 font-semibold'>Navbar</Link>
                                    {user ? (
                                        <>
                                            <Link to="/add" className="ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-white hover:text-black transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-black focus:bg-white">
                                                Add Product
                                            </Link>

                                        </>) :
                                        (<><Link to="/login" className="ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-white hover:text-black transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-black focus:bg-white">
                                            Login
                                        </Link>
                                            <Link to="/register" className="ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-white hover:text-black transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-black focus:bg-white">
                                                Register
                                            </Link></>)}
                                </div>

                            </div>
                        </div>
                        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                            <div className="max-w-lg w-full lg:max-w-xs">
                                <label className="sr-only">Search </label>
                                <form method="get" action="#" className="relative z-50">
                                    <button type="submit" id="searchsubmit" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                    <input
                                        onChange={(e) => Search(e.target.value)}
                                        type="text"
                                        name="s"
                                        id="s"
                                        className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-300 text-gray-400 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                                        placeholder="Search"
                                    />
                                </form>
                            </div>
                        </div>
                        {
                            user ?
                                <div className='relative flex align-center focus:bg-white' onClick={() => (setuserItem(!userItem))}>
                                    <Link to="" className={`ml-4 px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-white hover:text-black transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-black ${userItem ? 'bg-white' : ' '}`}>
                                        {user.name}
                                    </Link>
                                    <div className={`p-2 bg-gray-300 absolute top-14 w-full border-1 rounded ${userItem == true ? 'block' : 'hidden'}`}>
                                        <Link to="" onClick={() => { handleLogout() }} className={`flex w-full whitespace-nowrap px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-800 font-semibold hover:bg-white hover:text-black transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-black bg-gray-300`}>
                                            Log out
                                        </Link>
                                    </div>
                                </div> : ''
                        }
                        <div className="flex lg:hidden"></div>
                    </div>
                </div>
                <div x-show="menu" className="block md:hidden">
                    <div className="px-2 pt-2 pb-3">
                        <a href="#" className="mt-1 block px-3 py-2 rounded-md text-white font-semibold font-medium hover:bg-yellow-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                            Location
                        </a>
                        <a href="#" className="mt-1 block px-3 py-2 rounded-md text-white font-semibold font-medium hover:bg-yellow-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                            Article
                        </a>
                        <a href="#" className="mt-1 block px-3 py-2 rounded-md text-white font-semibold font-medium hover:bg-yellow-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                            Recipe
                        </a>
                        <a href="#" className="mt-1 block px-3 py-2 rounded-md text-white font-semibold font-medium hover:bg-yellow-500 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                            Promo
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
