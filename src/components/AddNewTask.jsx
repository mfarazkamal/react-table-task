import toast, { Toaster } from "react-hot-toast";

const AddNewTask = ({ tasks, setTasks, table, updateTaskCounts }) => {


    const addTask = (event) => {
        event.preventDefault();

        const title = event.target.elements['title'].value;
        const description = event.target.elements['description'].value;
        const status = event.target.elements['status'].value;

        const newTask = {
            id: tasks.length + 1, // Temporary ID
            title,
            description,
            status,
        };

        if (table) {
            table.addData([newTask]);
            toast.success('Task added successfully!');
        }

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        updateTaskCounts(updatedTasks);

        event.target.reset();
    };

    return (

        <div>
            <Toaster position="top-right" />
            <form className='hidden lg:flex flex-row justify-center gap-4 my-4' id="add-task-form" onSubmit={addTask}>
                <input className='p-4 w-[20vw] rounded-md text-gray-800 lg:text-2xl text-lg' type="text" name="title" placeholder="Task Title" required />
                <input className='p-4 rounded-md w-[30vw] text-gray-800 text-2xl' type="text" name="description" placeholder="Task Description" required />
                <select className='p-4 bg-gray-500 w-[15vw] rounded-md text-gray-100 text-2xl' name="status" required>
                    <option value="category">Select Status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button className='p-4 bg-blue-500 hover:bg-blue-900 hover:outline w-[10vw] rounded-md text-gray-100 lg:text-2xl text-lg' type="submit">Add Task</button>
            </form>


            {/* FORM FOR MOBILE LAYOUT */}
            <form
                className="flex flex-col lg:flex-row lg:hidden justify-center gap-4 my-4"
                id="add-task-form"
                onSubmit={addTask}
            >
                <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/3">
                    <label htmlFor="task-title" className="font-semibold opacity-70">Task Title</label>
                    <input
                        type="text"
                        id="task-title"
                        name="title"
                        className="p-2 text-gray-800 bg-gray-200 rounded-md text-lg"
                        placeholder="Enter task title"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/3">
                    <label htmlFor="task-description" className="font-semibold opacity-70">Description</label>
                    <textarea
                        id="task-description"
                        name="description"
                        className="p-2 text-gray-800 bg-gray-200 rounded-md text-lg"
                        rows="2"
                        placeholder="Enter task description"
                        required
                    ></textarea>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/3">
                    <label htmlFor="task-status" className="font-semibold opacity-70">Status</label>
                    <select
                        id="task-status"
                        name="status"
                        className="p-2 text-gray-800 bg-gray-200 rounded-md text-lg"
                        required
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full sm:w-1/2 lg:w-auto bg-blue-600 text-white py-2 rounded-md mt-4"
                >
                    Add Task
                </button>
            </form>

        </div>
    )

}

export default AddNewTask