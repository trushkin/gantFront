import React, { Component } from 'react'
import ApiService from "./ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

class AddResourceComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            capacity: '',
            salary: '',
            message: null
        }
        this.saveResource = this.saveResource.bind(this);
    }

    saveResource = (e) => {
        e.preventDefault();
        let resource = { name: this.state.name, capacity: this.state.capacity, salary: this.state.salary};
        console.log(resource);
        ApiService.addResource(resource)
            .then(res => {
                this.setState({ message: 'Resource added successfully.' });
                this.props.history('/resources');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div style={containerStyle}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4" style={style}>Добавление исполнителя</Typography>
                    <form style={formContainer}>

                        <TextField type="text" placeholder="Имя" fullWidth margin="normal" name="name" value={this.state.name} onChange={this.onChange} />

                        <TextField type="number" placeholder="Ёмкость" fullWidth margin="normal" name="capacity" inputProps={{ min: 0 }} value={this.state.capacity} onChange={this.onChange} />

                        <TextField type="number" placeholder="Стоимость в день" fullWidth margin="normal" name="salary" inputProps={{ min: 0 }} value={this.state.salary} onChange={this.onChange} />

                        <Button variant="contained" color="primary" onClick={this.saveResource}>Добавить</Button>
                    </form>
                </ThemeProvider>
            </div >
        );
    }
}
const theme = createTheme({
    palette: {
        primary: {
            main: '#3db9d3',
            contrastText: '#ffffff',
        },
    },
});
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};
const style = {
    display: 'flex',
    justifyContent: 'center'

}
const containerStyle = {
    width: '40%',
    margin: '50px auto 0',
};

export default (props) => (
    <AddResourceComponent history={useNavigate()} />
  );