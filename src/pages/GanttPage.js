import React, { Component } from 'react';
import Gantt from '../components/Gantt';
import Toolbar from '../components/Toolbar';
import axios from "axios";
import { gantt } from 'dhtmlx-gantt';
import HttpService from '../services/HttpService';

const dataDefault = {
  data: [
    // { id: 1, text: 'client', start_date: '2023-11-22', priority: 'Высокий', owner: 'Алеся', duration: 2, progress: 0.6 },
    // { id: 2, text: 'client', start_date: '2023-11-25', priority: 'Средний', owner: 'Алеся', duration: 3, progress: 0.4 }
  ],
  links: [
    // { id: 1, source: 1, target: 2, type: '0' }
  ]
};
class GanttPage extends Component {
  state = {
    data: dataDefault,
    currentZoom: 'Days',
    // messages: []
  };

  loadData(e) {
    if (!window.localStorage.getItem("reload")) {
      window.localStorage.setItem("reload", "true");
      window.location.reload();
    }
    else {
      window.localStorage.removeItem("reload");
    }
    console.log("Гружу данные")
    gantt.clearAll();
    HttpService.getAxiosClient().get('http://localhost:8080/gantt')
      .then((res) => {
        console.log("Данные загрузил");
        // this.setState({ ...this.state, data: null });
        this.setState({ ...this.state, data: res.data });
        gantt.parse(res.data);
        console.log(this.state);
      })
      .catch((err) => { });

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
    gantt.refreshData();
    this.loadData();
  }
  componentWillUnmount(){
    console.log("сохраняю гант при переходе на исполнители");
    gantt.refreshData();
    this.saveGantt();
}
  saveGantt() {
    console.log('сохраняю гант');
    HttpService.getAxiosClient().post('http://localhost:8080/gantt', {
      data: gantt.getTaskByTime(),
      links: gantt.getLinks()
    })
  }

  export(){
    gantt.plugins({
      export_api: true
  });
    console.log("export")
    gantt.exportToExcel({
      name:"document.xlsx", 
      columns:[
          { id:"text",  header:"Название", width:150 },
          { id:"start_date",  header:"Дата начала", width:250, type:"date" }
      ],
      server:"http://localhost:3000",
      callback: function(res){
          alert(res.url);
      },
      visual:true,
      cellColors:true,
      data:{},
      date_format: "dddd d, mmmm yyyy"
  });
  }
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
           // exportToExcel={this.export}
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


