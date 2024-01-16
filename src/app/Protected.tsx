import { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

var Protected = (props: any)=> {
    var navigate = useNavigate();
    var Component = props.com;
    var searchQuery = props.searchQuery;

    useEffect(()=>{
        localStorage.getItem('userInfo')? ''
        :navigate('/register');
    },[]);

    return (
        <>
            <Component searchQuery={searchQuery} />
        </>
    )

}

export default Protected;