import React from "react";
import './index.css';

export default function Button({name}) {
	return (
		<button className='Button'>
			{name}
		</button>
	)
}

