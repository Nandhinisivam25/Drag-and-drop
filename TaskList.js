import React from "react";

class TaskList extends React.Component {
  state = { tasks: [] };
  componentDidMount() {
    const { tasks } = this.props;
    this.setState({
      tasks
    });
  }
  onDragStart = evt => {
    let element = evt.target;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text", evt.target.id);
    evt.dataTransfer.effectAllowed = "move";
  };
  onDragEnd = evt => {
    evt.target.classList.remove("dragged");
  };
  onDragEnter = evt => {
    evt.preventDefault();
    let element = evt.target;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  onDragLeave = evt => {
    let Target = evt.target;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === Target || newTarget === Target)
      return;
    evt.preventDefault();
    let element = evt.target;
    element.classList.remove("dragged-over");
  };
  onDragOver = evt => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  onDrop = (evt, value) => {
    evt.preventDefault();
    evt.target.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
    let tasks = this.state.tasks;
    let updated = tasks.map(task => {
      if (task.id == data) task.status = value;
      return task;
    });
    this.setState({ tasks: updated });
  };
  render() {
    const { tasks } = this.state;
    let ideas = tasks.filter(t =>t.status==1);
    let done = tasks.filter(t =>t.status==2 );
    let Ass = tasks.filter(t =>t.status==3 );

    return (
      <div className="container">
        <div
          className="ideas small-box"
          onDragLeave={e => this.onDragLeave(e)}
          onDragEnter={e => this.onDragEnter(e)}
          onDragEnd={e => this.onDragEnd(e)}
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, 1)}
        >
          <h3>Ideas</h3>
          {ideas.map(task => (
            <div
              className="task"
              key={task.name}
              id={task.id}
              draggable
              onDragStart={e => this.onDragStart(e)}
              onDragEnd={e => this.onDragEnd(e)}
            >
              {task.name}
            </div>
          ))}
        </div>
        <div
          className="done small-box"
          onDragLeave={e => this.onDragLeave(e)}
          onDragEnter={e => this.onDragEnter(e)}
          onDragEnd={e => this.onDragEnd(e)}
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, 2)}
        >
          <h3>Task proposed</h3>
          {done.map(task => (
            <div
              className="task"
              key={task.name}
              id={task.id}
              draggable
              onDragStart={e => this.onDragStart(e)}
              onDragEnd={e => this.onDragEnd(e)}
            >
              {task.name}
            </div>
          ))}
        </div>
        <div
          className="ideas small-box"
          onDragLeave={e => this.onDragLeave(e)}
          onDragEnter={e => this.onDragEnter(e)}
          onDragEnd={e => this.onDragEnd(e)}
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, 3)}
        >
          <h3>Task Assigned</h3>
          {Ass.map(task => (
            <div
              className="task"
              key={task.name}
              id={task.id}
              draggable
              onDragStart={e => this.onDragStart(e)}
              onDragEnd={e => this.onDragEnd(e)}
            >
              {task.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TaskList;
