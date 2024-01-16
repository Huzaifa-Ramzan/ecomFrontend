import { useEffect, useImperativeHandle, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Delete from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

var ProductList = (props:any)=> {
    var navigate = useNavigate();
    var [data, setdata] = useState([]);
    var searchQuery = props.searchQuery;

    useEffect(()=>{
        localStorage.getItem('userInfo')? '' : navigate('/register');
    },[navigate]);

    useEffect( () => {
        searchQuery? setdata(searchQuery) : fetchData();
    },[searchQuery])

    useEffect( () => {
        fetchData();
    },[])

    var DeleteProduct = (id:any) => {
        Delete(id);
        fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/list");
            const result = await response.json();
            setdata(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl m-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any, i: number)=>
                            <tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th  className="px-6 py-4">
                                    {item.id}
                                </th>
                                <td className="px-6 py-4">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4">
                                    {item.price}
                                </td>
                                <td className="px-6 py-4 w-20">
                                   <img className="w-full" src={"http://127.0.0.1:8000/" + item.file_path} alt="Product Image" />
                                </td>
                                <td className="px-6 py-4 flex gap-1">
                                <button onClick={()=>{DeleteProduct(item.id)}} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 text-xl rounded">
                                    X
                                </button>
                                <Link to={"update/"+item.id}>
                                    <button  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 h-full text-sm rounded">
                                        Edit
                                    </button>
                                </Link>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

        </>
    )

}

export default ProductList;