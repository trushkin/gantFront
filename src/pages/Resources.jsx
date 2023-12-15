import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';
// import ApiService from "../../service/ApiService";
import ApiService from "./ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
class ListResourcesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            resources: [],
            message: null
        }
        this.deleteResource = this.deleteResource.bind(this);
        this.editResource = this.editResource.bind(this);
        this.addResource = this.addResource.bind(this);
        this.reloadResourceList = this.reloadResourceList.bind(this);
    }

    componentDidMount() {
        this.reloadResourceList();
    }

    reloadResourceList() {
        ApiService.fetchResources()
            .then((res) => {
                this.setState({ resources: res.data.result, message: res.data.message })
                //this.setState({resources: res.data.result}) //на бэке api service, где собирается JSON
            });
    }

    deleteResource(resourceId) {
        ApiService.deleteResource(resourceId)
            .then(res => {
                this.setState({ message: 'Resource deleted successfully.' });
                this.setState({ resources: this.state.resources.filter(resource => resource.id !== resourceId) });
            })
    }

    editResource(id) {
        window.localStorage.setItem("resourceId", id);
        this.props.history('/edit-resource');
    }

    addResource() {
        window.localStorage.removeItem("resourceId");

        this.props.history('/add-resource');

    }

    render() {
        const containerStyle = {
            width: '80%',
            margin: '50px auto 0',
        };
        console.log(this.state);
        return (
            <div style={containerStyle}>
                <Typography variant="h4" style={style}>Исполнители</Typography>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" onClick={() => this.addResource()}>
                        Добавить
                    </Button>
                </ThemeProvider>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Имя</TableCell>
                            <TableCell align="center">Ёмкость</TableCell>
                            <TableCell align="center">Занятость</TableCell>
                            <TableCell align="center">Стоимость в день</TableCell>
                            <TableCell align="center">Общая стоимость</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.resources?.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.capacity}</TableCell>
                                <TableCell align="center">{row.occupancy}</TableCell>
                                <TableCell align="center">{row.salary}</TableCell>
                                <TableCell align="center">{row.totalCost}</TableCell>
                                <TableCell align="center" onClick={() => this.editResource(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="center" onClick={() => this.deleteResource(row.id)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

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
export default (props) => (
    <ListResourcesComponent history={useNavigate()} />
  );