import React from "react";
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar";
import Button from './components/Button/Button';
import {
	AddButton,
	UserButton,
	SortButton,
	FilterButton,
	CalendarButton,
	EditListButton,
	NotificationButton
} from "./components/ButtonIcon/ButtonIcon";
import ButtonList from './components/ButtonList/ButtonList'
import Task from './components/Task/Task'
import ListBreadcrumb from "./components/ListBreadcrumb/ListBreadcrumb";
import { data } from './data/data'
import { useState } from "react";

function App() {
	const [list, setList] = useState(data[0].listID);

	return (
		<main>
			<div className='top'>
				<SearchBar />
				<UserButton />
				<NotificationButton />
			</div>
			<div className='function_bar'>
				<Button name='Task' />
				<CalendarButton />
			</div>
			<div className='task-list'>
				<div className='task-tool'>
					<AddButton />
					<EditListButton />
				</div>
				<div className="lists">
					<ButtonList data={data} onClick = {()=> alert('test')}/>
				</div>
			</div>
			<div className='list-status'>
				<ListBreadcrumb data={data} index='0' />
			</div>
			<div className='tool_bar'>
				<SortButton />
				<FilterButton />
			</div>
			<div className='tasks'>
				<Task data={data} index='0' />
			</div>
		</main>
	);
}

export default App;
