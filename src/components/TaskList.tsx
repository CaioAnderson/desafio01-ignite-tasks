import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle !== '') {

      const id = Date.now();

      const taskCreate = {
        id,
        title: newTaskTitle,
        isComplete: false
      }

      const addTask = [...tasks, taskCreate];
      setTasks(addTask);

    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    //copiando lista de tasks
    const taskCopy = [...tasks];

    //Pegando valores da lista pelo id
    const findTask = taskCopy.find(task => task.id === id) as Task;

    //Retornando indice da task que quero editar
    const indexTaskToEdit = taskCopy.findIndex(task => task.id === id);

    //Atualizando lista pelo indice da task
    taskCopy.splice(indexTaskToEdit, 1, {  id: findTask.id, title: findTask.title, isComplete: !findTask.isComplete});

    //salvando task
    setTasks(taskCopy);

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const taskCopy = [...tasks];
    const indexTaskToDelete = taskCopy.findIndex(task => task.id === id);

    taskCopy.splice(indexTaskToDelete, 1);

    setTasks(taskCopy);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}