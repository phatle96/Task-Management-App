import React from "react";
import './index.css';

export default function ButtonList({data, onClick}) {

	return (
        data.map((item, index) => 
        <button key ={item.listID} class = 'button' id = {index} onClick = {onClick}>
            {item.listName}
        </button>)
	);
}