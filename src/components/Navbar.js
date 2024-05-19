import React from "react";
import UserService from "../services/UserService";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
    useTheme,
    useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(5),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        borderBottom: "1px solid transparent",
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

function Navbar() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const handleLogout = () => {
        UserService.doLogout();
       // navigate('/login'); // или любая другая страница после logout
    };
    return (
        <AppBar position="static" style={{ backgroundColor: "#3db9d3" }} className={classes.appBar}>

            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    Планирование


                </Typography>
                {isMobile ? (
                    <DrawerComponent />
                ) : (
                    <div className={classes.navlinks}>
                        {UserService.isLoggedIn && (
                            <>
                                <Link to="/gantt" className={classes.link}>
                                    Диаграмма Ганта
                                </Link>
                                <Link to="/resources" className={classes.link}>
                                    Исполнители
                                </Link>
                                <Link to="/report" className={classes.link}>
                                    Статистика
                                </Link>
                                <button onClick={handleLogout} className={classes.link} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
                                    Выйти
                                </button>

                            </>
                        )}
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;