import React from "react";
import './index.css';

export default function ListBreadcrumb({data, index}) {
	return (
		<h4>
			{data[index].listName} / All
		</h4>
	)
}