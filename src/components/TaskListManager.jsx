import { useEffect, useState } from 'react';
import { Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import AddNewTask from './AddNewTask';
import TaskCount from './TaskCount';

const TaskListManager = () => {
    const [tasks, setTasks] = useState([]);
    const [table, setTable] = useState(null);
    const [statusCount, setStatusCount] = useState({ toDo: 0, inProgress: 0, done: 0 });


    useEffect(() => {
        // dummy data
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => {
                const formattedTasks = data.slice(0, 20).map((task) => ({
                    id: task.id,
                    title: task.title,
                    description: '',
                    status: task.completed ? 'Done' : 'To Do',
                }));
                setTasks(formattedTasks);
            })
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    const updateTaskCounts = (tasksList) => {
        const toDo = tasksList.filter((task) => task.status === 'To Do').length;
        const inProgress = tasksList.filter((task) => task.status === 'In Progress').length;
        const done = tasksList.filter((task) => task.status === 'Done').length;

        setStatusCount({ toDo, inProgress, done });
    };

    useEffect(() => {
        if (tasks.length > 0 && !table) {
            const taskTable = new Tabulator('#task-table', {
                height: '100%',
                data: tasks,
                responsiveLayout: 'hide',
                layout: "fitColumns",
                columns: [
                    { title: 'Task ID', field: 'id', editor: false },
                    { title: 'Title', field: 'title', editor: 'input' },
                    { title: 'Description', field: 'description', editor: 'input' },
                    {
                        title: 'Status',
                        field: 'status',
                        editor: 'select',
                        editorParams: {
                            values: ['To Do', 'In Progress', 'Done'],
                        },
                    },
                    {formatter: 'buttonCross', align: 'center', title: 'Delete', width: 60, cellClick: (e, cell) => cell.getRow().delete()},
                ],
            });
            setTable(taskTable);
        }
    }, [tasks, table]);

    const filterTasks = (event) => {
        const selectedStatus = event.target.options[event.target.selectedIndex].value;
        console.log(selectedStatus);

        if (tasks.length > 0 && table) {
            if (selectedStatus === 'All') {
                table.clearFilter();
            } else {
                table.setFilter('status', '=', selectedStatus);
            }
        }
    };

    // document.getElementById('status-filter').addEventListener('click', filterTasks);

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-center lg:text-3xl text-md uppercase font-bold tracking-wide'>Task List Manager</h1>
            <hr className='mx-auto my-3 w-1/2 ' />

            <AddNewTask table={table} tasks={tasks} setTasks={setTasks} updateTaskCounts={updateTaskCounts} />

            <div className='flex justify-between items-center text-xl mt-8 mb-4'>
                <div>
                    <label className='font-semibold opacity-50 uppercase line-through mr-4' htmlFor="status-filter">Filter by Status: </label>
                    <select 
                    className='p-2 bg-orange-800 opacity-70 w-[15vw] outline-none rounded-md text-gray-100 ' id="status-filter" onChange={filterTasks}>
                        <option className='lg:text-xl text-sm md:text-md' value="All">All</option>
                        <option className='lg:text-xl text-sm md:text-md' value="To Do">To Do</option>
                        <option className='lg:text-xl text-sm md:text-md' value="In Progress">In Progress</option>
                        <option className='lg:text-xl text-sm md:text-md' value="Done">Done</option>
                    </select>
                </div>
                <TaskCount statusCount={statusCount} />
            </div>

            <div id="task-table"></div>
        </div>
    );
};

export default TaskListManager;
