import { useState } from 'react'
import { TaskFormModal } from './components/TaskFormModal'


function App() {
  const [count, setCount] = useState({})

  const [task, setTask] = useState({
    name: '',
    description: '',
  })


  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      completed: false,
      px: 0,
      py: 0
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description 2',
      completed: false,
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description 3',
      completed: false,
    },
  ])


  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('submitted')

    const name = e.target.name.value
    const description = e.target.description.value

    const newTask = {
      id: tasks.length + 1,
      name,
      description,
      completed: false,
    }

    setTasks([...tasks, newTask])

    e.target.reset()


  }

  return (
    <>
    <div className="flex flex-grid p-4">
      <TaskFormModal  handleSubmit={handleSubmit} task={setTask}/>
    </div>

    <div className='grid grid-cols-3 gap-4'>
      {tasks.map((task) => (
        <div key={task.id} className='card'>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>

    </>
  )
}

export default App
