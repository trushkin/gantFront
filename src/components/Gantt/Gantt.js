import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
export default class Gantt extends Component {

  // instance of gantt.dataProcessor
  dataProcessor = null;

  initZoom() {
    gantt.i18n.setLocale("ru");
    gantt.config.columns = [
      { name: "text", tree: true, width: 150, align: "center", resize: true },
      { name: "start_date", align: "center", resize: true },
      { name: "owner", label: "Исполнитель", align: "center", width: 100 },
      { name: "priority", label: "Приоритет", align: "center", width: 100 },
      { name: "duration", align: "center", width: 80 },
      {
        name: "progress", label: "Прогресс", width: 80, resize: true, align: "center", template: function (task) {
          return Math.round(task.progress * 100) + "%"
        }
      },
      { name: "add", width: 44 }
    ]
    var owners = [
      { key: "1", label: "Василий1" },
      { key: "2", label: "Петр" },
      { key: "3", label: "Ирина" }
    ];
    var priorities = [
      { key: "Низкий", label: "Низкий" },
      { key: "Средний", label: "Средний" },
      { key: "Высокий", label: "Высокий" }
    ];
    gantt.config.lightbox.sections = [
      { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
      { name: "owner", height: 22, map_to: "owner", type: "select", options: owners },
      { name: "priority", height: 22, map_to: "priority", type: "select", options: priorities },
      { name: "time", height: 72, type: "duration", map_to: "auto" }
    ];
    gantt.locale.labels.section_owner = "Исполнитель";
    gantt.locale.labels.section_priority = "Приоритет";
    gantt.ext.zoom.init({
      levels: [
        // {
        //   name: 'Hours',
        //   scale_height: 60,
        //   min_column_width: 30,
        //   scales: [
        //     { unit: 'day', step: 1, format: '%d %M' },
        //     { unit: 'hour', step: 1, format: '%H' }
        //   ]
        // },
        {
          name: 'Days',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'week', step: 1, format: 'Неделя #%W' },
            { unit: 'day', step: 1, format: '%d %M' }
          ]
        },
        {
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "month", step: 1, format: '%F' },
            { unit: 'week', step: 1, format: 'Неделя #%W' }
          ]
        }
      ]
    });
  }

  setZoom(value) {
    if (!gantt.ext.zoom.getLevels()) {
      this.initZoom();
    }
    gantt.ext.zoom.setLevel(value);
  }

  initGanttDataProcessor() {
    /**
     * type: "task"|"link"
     * action: "create"|"update"|"delete"
     * item: data object object
     */
    const onDataUpdated = this.props.onDataUpdated;
    this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(type, action, item, id);
        }

        // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
        // resolve({id: databaseId});
        return resolve();
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidMount() {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    const { tasks } = this.props;
    // const { tasks, onTaskSave } = this.props;
    gantt.init(this.ganttContainer);
    this.initGanttDataProcessor();
    // var inlineEditors = gantt.ext.inlineEditors;

    // inlineEditors.attachEvent("onSave", function (state) {
    //   console.log(state);
    //   onTaskSave(state);
    //   // -> { id: itemId, 
    //   //      columnName: columnName, 
    //   //      oldValue: value, 
    //   //      newValue: value
    //   //    };
    // });
    gantt.parse(tasks);
  }

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor();
      this.dataProcessor = null;
    }
  }

  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <div
        ref={(input) => { this.ganttContainer = input }}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );
  }
}
