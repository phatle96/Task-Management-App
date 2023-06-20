import { useState, useEffect, createContext } from "react";
import useAxiosFetch from "../services/useAxiosFetch";

export const DataContext = createContext({});

export function DataContextProvider({ children }) {

	//data
	const [lists, setLists] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [subtasks, setSubtasks] = useState([]);
	const [people, setPeople] = useState([]);

	//filter
	const [filter, setFilter] = useState({ list_name: '', list_id: '' });
	const [filterResults, setFilterResults] = useState([]);

	//List
	const [postList, setPostList] = useState({ payload: {} });
	const [putList, setPutList] = useState({ id: "", payload: {} });
	const [deleteList, setDeleteList] = useState({ id: "" });

	const [selectList, setSelectList] = useState("")

	//Refetch data
	const [reFetchLists, setReFetchLists] = useState(false);
	const [reFetchTasks, setReFetchTasks] = useState(false);
	const [reFetchPerson, setReFetchPerson] = useState(false);

	//Task
	const [postTask, setPostTask] = useState({ payload: {} });
	const [putTask, setPutTask] = useState({ id: "", payload: {} });
	const [deleteTask, setDeleteTask] = useState({ id: "" });

	//Subtask
	const [postSubtask, setPostSubtask] = useState({ payload: {} });
	const [putSubtask, setPutSubtask] = useState([{ id: "", payload: {} }]);
	const [deleteSubtask, setDeleteSubtask] = useState({ id: "" });

	//Person
	const [postPerson, setPostPerson] = useState({ payload: {} });
	const [putPerson, setPutPerson] = useState({ id: "", payload: {} });
	const [deletePerson, setDeletePerson] = useState({ id: "" });


	// fetch hook
	const {
		data: listsData,
		fetchError: listsError,
		isLoading: listsLoading } = useAxiosFetch('http://localhost:8080/api/list/all', reFetchLists);

	const {
		data: tasksData,
		fetchError: tasksError,
		isLoading: tasksLoading } = useAxiosFetch('http://localhost:8080/api/task/all', reFetchTasks);

	const {
		data: subtasksData,
		fetchError: subtasksError,
		isLoading: subtasksLoading } = useAxiosFetch('http://localhost:8080/api/subtask/all', reFetchTasks);

	const {
		data: peopleData,
		fetchError: peopleError,
		isLoading: peopleLoading } = useAxiosFetch('http://localhost:8080/api/person/all', reFetchPerson);

	//Fetch data
	useEffect(() => {
		setLists(listsData);
		setTasks(tasksData);
		setSubtasks(subtasksData);
		setPeople(peopleData);
	}, [listsData, tasksData, subtasksData, peopleData]);

	//Filtering data
	useEffect(() => {
		setFilterResults(() => {
			if (filter.list_id !== '') {
				return tasks.filter(task => task.list.list_id === filter.list_id)
			} else {
				return tasks
			}
		});
	}, [tasks, filter])


	//Send data


	return (
		<DataContext.Provider value={{
			lists, setLists,
			tasks, setTasks,
			subtasks, setSubtasks,
			people, setPeople,

			listsError, tasksError, subtasksError, peopleError,
			listsLoading, tasksLoading, subtasksLoading, peopleLoading,

			filter, setFilter,
			filterResults,

			postList, setPostList,
			putList, setPutList,
			deleteList, setDeleteList,

			postTask, setPostTask,
			putTask, setPutTask,
			deleteTask, setDeleteTask,

			postSubtask, setPostSubtask,
			putSubtask, setPutSubtask,
			deleteSubtask, setDeleteSubtask,

			postPerson, setPostPerson,
			putPerson, setPutPerson,
			deletePerson, setDeletePerson,

			selectList, setSelectList,

			reFetchLists, setReFetchLists,
			reFetchTasks, setReFetchTasks,
			reFetchPerson, setReFetchPerson

		}}>
			{children}
		</DataContext.Provider>
	);
}
