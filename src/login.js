import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import UserService from "./services/UserService";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    const onButtonClick = () => {
        UserService.doLogin();
        setEmailError("")
        setPasswordError("")
      
        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Пожалуйста, введите email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Пожалуйста, введите корректный email")
            return
        }

        if ("" === password) {
            setPasswordError("Пожалуйста, введите пароль")
            return
        }
//window.localStorage.clear()
        if (password.length < 7) {
            setPasswordError("Пароль должен содержать не менее 7 символов")
            return
        }
        axios.post('http://localhost:8080/login', {
            email: email,
            password: password
        })
            .then((res) => {
                if(res.data === -1){
                    console.log(res.data)
                    setPasswordError("Неверный пароль")
                    setEmailError("Неверный email")
                } else{
                    window.localStorage.setItem("userId", res.data);
                    navigate("/gantt")
                }
                // this.props.history('/edit-resource');
            })
        // axios({
        //     url: "http://localhost:8080/login",
        //     method: "POST",
        //   })
        //     .then((res) => {

        //     })
        // navigate("/gantt")
        //   {window.location.reload()}
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            {window.localStorage.clear()}
          
            <div>Вход в систему</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Введите email"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
            type="password"
                value={password}
                placeholder="Введите пароль"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"input1"}
                type="button"
                onClick={onButtonClick}
                value={"Войти"} />
        </div>
    </div>
}

export default Login