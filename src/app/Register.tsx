import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

var Register = ()=> {

    var [name,setname] = useState('');
    var [email,setemail] = useState('');
    var [password,setpassword] = useState('');
    var [successMessage, setSuccessMessage] = useState(false);
    var [error, seterror] = useState('');
    var navigate = useNavigate();


    useEffect(()=>{
        localStorage.getItem('userInfo')?
        navigate('/add') : '';
    },[]);

    var  signUp = async ()=> {
        try {
            var data = {name,email,password};
            
            var result = await fetch('http://127.0.0.1:8000/api/register',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                },
                body:JSON.stringify(data)
            });

            console.warn(result);

            switch(result.status) {

                case 201: 
                    result = await result.json();
                    SusseccfullyRegister(result); 
                    break;
                case 500:
                    seterror(result.statusText);
                    break;
                default:
                    seterror('Not abble to Register right Now');
                    break;
            }
        } catch (error) {
            console.error('Error during registration:', error);
            seterror('An unexpected error occurred.');
        }


    }

    var SusseccfullyRegister = (data : Response)=> {
        var result = data ? true : false;
        setSuccessMessage(result);
        ()=>clearTimeout(timeoutId);
        setname('');
        setemail('');
        setpassword('');
        navigate('/add');
    }
    
    const timeoutId = setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);

    useEffect(() => {
        const errorTimeoutId = setTimeout(() => {
          seterror('');
        }, 3000);
    
        return () => clearTimeout(errorTimeoutId);
      }, [error]);

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                {successMessage == true || error ?
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white ${error ? 'bg-red-500' : 'bg-green-300'}`}>
                    {error || 'Successfully Registered'}
                    </h2>
                </div>: ''
                }

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for Login</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST">
                    <div>
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div className="mt-2">
                        <input id="name" name="name" value={name} onChange={(e)=>setname(e.target.value)} type="text" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <label  className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                        <input id="email" name="email" value={email} onChange={(e)=>setemail(e.target.value)} type="email" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password"  value={password} onChange={(e)=>setpassword(e.target.value)} required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="button" onClick={()=>{signUp()}} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                    </form>

                </div>
            </div>
        </>
    )

}

export default Register;