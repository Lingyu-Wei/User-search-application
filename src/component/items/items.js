import React, { Component } from "react";
 
class Items extends Component {
  addNewTask(item) {
    return (
      <ul>{item.taskDescription}</ul>
    
    );
  }
 
  render() {
    var addedTask = this.props.entries;
    var taskList = addedTask.map(this.addNewTask);
 
    return (
      <ul className="theList">
          {taskList}
      </ul>
    );
  }
};
 
export default Items;