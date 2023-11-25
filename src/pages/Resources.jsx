import React, { Component } from 'react'
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
class ListResourcesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        ApiService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data})
            });
            console.log(this.state);
    }

    deleteUser(userId) {
        ApiService.deleteUser(userId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.id !== userId)});
           })
    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-resource');

    }

    render() {
        const containerStyle = {
            width: '80%', 
            margin: '50px auto 0', 
        };
        return (
            <div style={containerStyle}>
                <Typography variant="h4" style={style}>Исполнители</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addUser()}>
                    Добавить
                </Button>

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
                        {this.state.users?.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.capacity}</TableCell>
                                <TableCell align="center">{row.occupancy}</TableCell>
                                <TableCell align="center">{row.salary}</TableCell>
                                <TableCell align="center">{row.totalCost}</TableCell>
                                <TableCell align="center" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>
                                <TableCell align="center" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListResourcesComponent;