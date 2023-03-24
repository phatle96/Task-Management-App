import React from "react";
import './index.css';
import Checkbox from '../Checkbox/Checkbox'

export default function Task({ data, index }) {
    return (
        data[index].listTask.map(task =>
            <>
                {task.isChecked ? null : (
                    <div key={task.taskID} className = 'task'>
                        <Checkbox/> 
                        <div>
                            <p>{task.taskContent}</p>
                            <button>{task.taskDate}</button>
                        </div>
                    </div>
                )}
            </>
        )
    )
}