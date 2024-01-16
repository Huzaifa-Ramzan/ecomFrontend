import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate , useParams} from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { json } from "stream/consumers";
import AddProduct from "./AddProduct";

var UpdateProduct = (props: any)=> {
    var routeParams = useParams();
    var [data, setdata] = useState(null);

    useEffect(() => {
        var product = async ()=> {
            try{
                var id = routeParams.id;
                var response = await fetch('http://localhost:8000/api/getProduct/'+id);
                var result = await response.json();
                setdata(result);
                }
            catch(error) {
                console.error(error);
            }
        }
        product();
    }, [routeParams.id]);
      

    return (
    
        <>
            <AddProduct product={data} />
        </>
    )

}

export default UpdateProduct;