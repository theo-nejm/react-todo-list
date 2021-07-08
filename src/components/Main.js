import React, { Component } from 'react';
import './Main.css';

// Form ===========================================
import { FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa';

export default class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    index: -1,
  };

  handleInputChange = (event) => {
    this.setState({
      newTask: event.target.value,
    });
  }

  handleEdit = (event, index) => {
    const { tasks } = this.state;

    this.setState({
      index,
      newTask: tasks[index],
    });
  }

  handleDelete = (event, index) => {
    const { tasks } = this.state;
    const newTasks = [...tasks];
    newTasks.splice(index, 1);

    this.setState({
      tasks: [...newTasks],
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { tasks, index } = this.state;
    let { newTask } = this.state;

    newTask = newTask.trim();

    if (tasks.indexOf(newTask) !== -1 || !newTask) return;

    const newTasks = [...tasks];

    if (index === -1) {
      this.storeTasks(tasks);
      this.setState({
        tasks: [...newTasks, newTask],
        newTask: '',
      });
    } else {
      tasks[index] = newTask;
      this.storeTasks(tasks);
      this.setState({
        tasks,
        index: -1,
        newTask: '',
      });
    }
  }

  storeTasks = (tasks) => {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJSON);
  }

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>
        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input
            onChange={this.handleInputChange}
            type="text"
            value={newTask}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tasks">
          {tasks.map((task, index) => (
            <li key={task}>
              {task}
              <span>
                <FaEdit
                  onClick={(e) => this.handleEdit(e, index)}
                  className="edit"
                />
                <FaWindowClose
                  onClick={(e) => this.handleDelete(e, index)}
                  className="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
