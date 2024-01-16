import { useState } from "react";

var Delete = async (props:any)=> {
    try {
        var id = props;
        var result = await fetch('http://localhost:8000/api/delete/'+id,{
            method:'DELETE'
        });
        result = await result.json();
        return result;
    } 
    catch (error) {
        console.error("Error deleting data:", error);
        throw error; 
    }
}

export default Delete;