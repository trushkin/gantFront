import React, { Component } from 'react';
export default class Toolbar extends Component {
  handleZoomChange = (e) => {
    if (this.props.onZoomChange) {
      this.props.onZoomChange(e.target.value)
    }
  }
  render() {
    // const zoomRadios = ['Hours', 'Days', 'Months'].map((value) =>
    const zoomRadios = ['Days', 'Months'].map((value) => {
      const russianLabel = value === 'Days' ? 'Дни' : 'Месяцы';
      const isActive = this.props.zoom === value;
      return (
        <label key={value} className={`radio-label ${isActive ? 'radio-label-active' : ''}`}>
          <input type='radio'
            checked={isActive}
            onChange={this.handleZoomChange}
            value={value} />
          {russianLabel}
        </label>
      );
    });

    return (
      <div>
        <div className="tool-bar">
          <b>Масштаб: </b>
          {zoomRadios}
        </div>
      </div>
    );
  }
}
