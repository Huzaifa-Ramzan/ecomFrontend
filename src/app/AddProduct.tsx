import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { json } from "stream/consumers";
var AddProduct = (props:any)=> {

    var navigate = useNavigate();
    var [error,seterror] = useState('');
    var [id, setid] = useState(null);
    var [name, setname] = useState('');
    var [price, setprice] = useState('');
    var [description, setdesc] = useState('');
    var [file_path, setfile] = useState('');
    var fileTypes = ['jpg', 'jpeg', 'png','webp'];
    var [img, setimage] = useState('');
    var [success,setSuccessValue] = useState('');
    var product = props.product;

    useEffect(()=>{
        localStorage.getItem('userInfo')?
         '':navigate('/register') ;
    },[]);

    useEffect(()=>{
        if (props.product) {
            updateProduct();
          }
    },[props.product]);

    var handlefile = (e: any)=> {
        setfile(e);
    }

    var updateProduct = () => {
        if (product) {
            setid(product.id ?? null)
            setname(product.name ?? '');
            setprice(product.price ?? '');
            setdesc(product.description ?? '');
            setimage(product.file_path ?"http://127.0.0.1:8000/" + product.file_path : '');
        }
    };

    var AddProduct = async ()=> {
        
        var formData = new FormData();
            id ? formData.append('id', id):null;
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('file', file_path);
            var data = {'name': name,'price': price,'description': description,'file_path': file_path};

        try {
            var result = await fetch('http://127.0.0.1:8000/api/addproduct', {
                method: 'POST',
                body: formData,
            });
    
            if (result.ok) {
                var responseData = await result.json();
                console.warn(JSON.stringify(responseData.name));
                setSuccessValue(id ?'Product Updated':'Product Added');
                navigate('/');
            } else {

                console.error('Failed to fetch:', result.status, result.statusText);
                seterror('An unexpected error occurred.');
            }
        } catch (error:any) {
            console.error('Error:', error.message);
            seterror('An error occurred while adding the product.');
        }

    }

    useEffect(()=>{
        var sucTimeout = setTimeout(()=>{
            setSuccessValue('');
        },3000);

        return () => clearTimeout(sucTimeout);

    },[success]);

    return (
        <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {error || success ?
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white ${error ? 'bg-red-500' : ''} ${success ? 'bg-green-400': '' }`}>
                {error}{success}
                </h2>
            </div>: ''
            }

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{product ? 'Update Product' : 'Add Product'}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6"  encType="multipart/form-data" method="POST">


                <div>
                    <label  className="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                    <div className="mt-2">
                    <input id="email" name="name" value={name} onChange={(e)=>setname(e.target.value)} type="text" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                    </div>
                    <div className="mt-2">
                        <input id="password" name="price" type="text"  value={price} onChange={(e)=>setprice(e.target.value)} required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Image</label>
                    </div>
                    <div className="mt-2">
                        <FileUploader handleChange={handlefile} name='file' maxSize={1} type={fileTypes}></FileUploader>
                        {img? <div className="w-20 border mt-5"><img className="w-full" src={img} alt="Product Image" /> </div>: ''}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Product Descriptoin</label>
                    </div>
                    <div className="mt-2">
                        <textarea id="password" name="price" rows={4} cols={50} value={description} onChange={(e)=>setdesc(e.target.value)} required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                        </textarea>
                    </div>
                </div>

                <div>
                    <button type="button" onClick={()=>{AddProduct()}} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{product ?'Update':'Add'} Product</button>
                </div>
                </form>

            </div>
        </div>

    </>
    )

}

export default AddProduct;