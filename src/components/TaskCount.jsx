const TaskCount = ({ statusCount }) => {

    return (
        <div>
            <div className='lg:flex block gap-6 opacity-50'>
                <p>To Do Count: <span className='lg:text-xl md:text-md text-sm font-semibold text-red-500' id="todoTasksCount">{statusCount.toDo}</span></p>
                <p>In Progress Count: <span className='lg:text-xl md:text-md text-sm font-semibold text-yellow-500' id="inProgressCount">{statusCount.inProgress}</span></p>
                <p>Done Count: <span className='lg:text-xl md:text-md text-sm font-semibold text-green-400' id="doneCount">{statusCount.done}</span></p>
            </div>
        </div>
    )
}

export default TaskCount