import React, { useState, useEffect } from 'react'
import axios from "./tasks";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  let [tasks, setTasks] = useState({});
  const [task, setTask] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get('/api/tasks')
      setTasks(request.data);
    }
    fetchData()
  }, [])

  const addTask = async (task) => {
    const req = {
      "id": tasks.length + 1,
      "task": task
    }
    setTasks([req, ...tasks]);
    axios.post('/api/tasks', req)
  }
  const deleteTask = (task) => {
    tasks = tasks.filter(function (item) {
      return item !== task
    })
    axios.delete('/api/tasks/' + task.id);
    setTasks(tasks);
  }


  return (
    <div className="App" >

      <section className=""   >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">

              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">

                  <h6 className="mb-3">Todo List</h6>
                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input type="text" id="form1" placeholder="What do you need to do today?" className="form-control form-control-lg" value={task} onChange={(e) => setTask(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg ms-2" onClick={() => {
                      task && addTask(task)
                      setTask('')
                    }}><i class="bi bi-plus-circle"></i> Add</button>
                  </form>
                  <ul className="list-group mb-0">
                    {
                      tasks.length > 0 &&
                      tasks.map(item => (
                        <li className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2" key={item.id}>
                          <div className="d-flex align-items-center" >
                            <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." />
                            {item.task}
                          </div>
                          <a href="# " data-mdb-toggle="tooltip" title="Remove item" >
                            <i className="bi bi-trash-fill" onClick={() => deleteTask(item)}></i>
                          </a>
                        </li>))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
