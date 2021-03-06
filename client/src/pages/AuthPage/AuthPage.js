import React, { useState, useContext } from "react";
import "./AuthPage.css"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext'

const AuthPage = () => {


    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const { login } = useContext(AuthContext);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => { loginHandler() })
        } catch (error) {
            console.log(error);
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    login(response.data.token, response.data.userId)
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Router>
            <Switch>
                <React.Fragment>
                    <div className="container flex items-center justify-center h-screen ">
                        <div className="auth-page w-full max-w-xs ">
                            <Route path="/login">
                                <h3 className="maintext">Авторизация</h3>
                                <form
                                    className="form form-login bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                    onSubmit={e => e.preventDefault()}>
                                    <div className="row mb-4">
                                        <div className="input-field">
                                            <input
                                                type="email"
                                                name="email"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 textOnYellow2" >Email</label>
                                        </div>
                                        <div className="input-field">
                                            <input
                                                type="password"
                                                name="password"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 textOnYellow2">Пароль</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button
                                            className="animated-border-button textOnYellow2 border-2 mr-4 text-md font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                                            onClick={loginHandler}>
                                            Войти
                                        </button>
                                        <Link to="/registration" className="inline-block align-baseline font-bold text-sm no-underline">Нет Аккаунта?</Link>
                                    </div>
                                </form>
                            </Route>
                            <Route path="/registration">
                                <h3 className="maintext text-2xl">Регистрация</h3>
                                <form
                                    className="form form-login bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                    onSubmit={e => e.preventDefault()}>
                                    <div className="row mb-4">
                                        <div className="input-field">
                                            <input
                                                type="email"
                                                name="email"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="email" className="textOnYellow2 block text-gray-700 text-sm font-bold mb-2">Email</label>
                                        </div>
                                        <div className="input-field">
                                            <input
                                                type="password"
                                                name="password"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="password" className="textOnYellow2 block text-gray-700 text-sm font-bold mb-2">Пароль</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button
                                            className="animated-border-button regBut textOnYellow2 border-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={registerHandler}
                                        >
                                            Регистрация
                                        </button>
                                        <Link to="/login" className="inline-block text- align-baseline no-underline font-bold text-sm ">Уже c нами?</Link>
                                    </div>
                                </form>
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </Router>
    );
}

export default AuthPage;