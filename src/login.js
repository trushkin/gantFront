import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {
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

        if (password.length < 7) {
            setPasswordError("Пароль должен содержать не менее 7 символов")
            return
        }
        navigate("/gantt")
    }

    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
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