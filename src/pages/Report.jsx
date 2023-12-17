import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';
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
import axios from 'axios';
class ReportComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            report: [],
        }
        this.getReport = this.getReport.bind(this);
    }
    componentDidMount() {
        if (!window.localStorage.getItem("reload")) {
            window.localStorage.setItem("reload", "true");
            window.location.reload();
        }
        else {
            window.localStorage.removeItem("reload");
        }
        this.getReport(window.localStorage.getItem("userId"));
    }
    getReport(userId) {
        axios.get('http://localhost:8080/report/' + userId)
        .then((res) => {
            this.setState({ report: res.data })  
        })
    }

    render() {
        const containerStyle = {
            width: '45%',
            margin: '50px auto 0',
        };
        console.log(this.state);
        return (
            <div style={containerStyle}>
                <Typography variant="h4" style={style}>Статистика по проекту</Typography>
                <br></br>
                <br></br>
                <Table>
                    <TableBody>
                        {this.state.report?.map(row => (
                            // <TableRow key={row.id}></TableRow>
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">{row.value}</TableCell>
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
    <ReportComponent history={useNavigate()} />
);

