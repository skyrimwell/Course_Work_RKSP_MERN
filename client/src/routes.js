import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from './pages/mainpage/MainPage';
import AuthPage from './pages/AuthPage/AuthPage';
//const MainPage = require("./pages/mainpage/MainPage.jsx")
//const AuthPage = require("./pages/AuthPage/AuthPage.jsx")

export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Redirect to="/" />
            </Switch>
        )
    }


    return (
        <Switch>
            <Route path="/login" exact component={AuthPage} />
            <Redirect to="/login" />
        </Switch>
    )
}