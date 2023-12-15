import React, { Component } from 'react';
import Gantt from '../components/Gantt';
import Toolbar from '../components/Toolbar';
// import MessageArea from './components/MessageArea';
//import '../App.css';
import axios from "axios";
import { gantt } from 'dhtmlx-gantt';

const dataDefault = {
  data: [
    { id: 1, text: 'Задача #1', start_date: '2023-11-22', priority: 'Высокий', owner: 'Василий', duration: 2, progress: 0.6 },
    { id: 2, text: 'Задача #2', start_date: '2023-11-25', priority: 'Средний', owner: 'Петр', duration: 3, progress: 0.4 }
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' }
  ]
};
class GanttPage extends Component {
  state = {
    data: dataDefault,
    currentZoom: 'Days',
    // messages: []
  };

  loadData(e) {
    console.log("Гружу данные")
    {
      axios({
        url: "http://localhost:8080/gantt",
        method: "GET",
      })
        .then((res) => {
          console.log("Данные загрузил");
          console.log(this.state);
          this.setState({ ...this.state, data: res.data });
          gantt.parse(res.data);
          console.log(this.state);
        })
        .catch((err) => { });
    }
  }


  addMessage(message) {
    const maxLogLength = 5;
    const newMessage = { message };
    const messages = [
      newMessage,
      ...this.state.messages
    ];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    this.setState({ messages });
  }

  logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    this.addMessage(message);
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom
    });
  }
  componentDidMount() {
    this.loadData();
  }
  saveGantt() {
    // this.state.data;
    console.log('сохраняю гант');
    // const ganttToBack = {
    //   data: gantt.getTaskByTime(),
    //   links: gantt.getLinks(),
    //   userId: 123
    // }
    // console.log(ganttToBack);
    axios.post('http://localhost:8080/gantt', {
      data: gantt.getTaskByTime(),
      links: gantt.getLinks(),
      userId: 123
  })
    // console.log(gantt.getTaskByTime());
    // console.log(gantt.getLinks());
    //console.log(data);
    //this.state.data  отправить на сервер
  }
  // taskSave(task) {
  //   console.log('сохраняю таск');

  //   //обновить this.state.data 
  // }

  render() {
    // const { currentZoom, messages, data } = this.state;
    const { currentZoom, data } = this.state;
    console.log("зашел в рендер");
    console.log(data);
    return (
      <div>
        <div className="zoom-bar">
          <Toolbar
            zoom={currentZoom}
            onZoomChange={this.handleZoomChange}
            saveGantt={this.saveGantt}
          />

        </div>
        <div className="gantt-container">
          <Gantt
            tasks={data}
            zoom={currentZoom}
            onDataUpdated={this.logDataUpdate}
          // onTaskSave={this.taskSave}
          />
        </div>
        {/* <MessageArea
          messages={messages}
        /> */}
      </div>
    );
  }
}

export default GanttPage;

