import React, { Component } from 'react'
import ApiService from "./ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

class EditResourceComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            capacity: '',
            salary: '',
            message: null
        }
        this.saveResource = this.saveResource.bind(this);
        this.loadResource = this.loadResource.bind(this);
    }

    componentDidMount() {
        this.loadResource();
    }

    loadResource() {
        ApiService.fetchResourceById(window.localStorage.getItem("resourceId"))
            .then((res) => {
                let resource = res.data.result;
                this.setState({
                    id: resource.id,
                    name: resource.name,
                    capacity: resource.capacity,
                    salary: resource.salary,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

        saveResource = (e) => {
            e.preventDefault();
            let resource = {id: this.state.id, name: this.state.name, capacity: this.state.capacity, salary: this.state.salary};
            console.log(resource);
            ApiService.editResource(resource, window.localStorage.getItem("userId"))
                .then(res => {
                    this.setState({ message: 'Resource added successfully.' });
                    this.props.history('/resources');
                });
        }

    render() {
        return (
            <div  style={containerStyle}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4" style={style}>Изменение данных исполнителя</Typography>
                    <form>

                        <TextField type="text" placeholder="Имя" fullWidth margin="normal" name="name" value={this.state.name} onChange={this.onChange} />

                        <TextField type="number" placeholder="Ёмкость" fullWidth margin="normal" name="capacity" inputProps={{ min: 0 }} value={this.state.capacity} onChange={this.onChange} />

                        <TextField type="number" placeholder="Стоимость в день" fullWidth margin="normal" name="salary" inputProps={{ min: 0 }} value={this.state.salary} onChange={this.onChange} />

                        <Button variant="contained" color="primary" onClick={this.saveResource}>Сохранить</Button>

                    </form>
                </ThemeProvider>
            </div>
        );
    }
}
const theme = createTheme({
    palette: {
        primary: {
            main: '#3db9d3',
            contrastText: '#ffffff', // Используйте желаемый цвет текста
        },
    },
});
const style = {
    display: 'flex',
    justifyContent: 'center'
}

const containerStyle = {
    width: '40%',
    margin: '50px auto 0',
};

export default (props) => (
    <EditResourceComponent history={useNavigate()} />
  );