import React, {useContext} from "react";
import {AuthContext} from '../../context/AuthContext'
import './Navbar.css'
const Navbar = () => {
    const {logout, isLogin} = useContext(AuthContext);

    return (
        <div className = "navbar font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 shadow sm:items-baseline w-full" >
            <div className ="mb-2 sm:mb-0 text-2xl">
                <button className ="navBut text-2xl "><a href="/" className="no-underline font-bold logo">ОДР Блокнот - "Он Должен Работать"</a></button>
            </div>

            {
                isLogin
                // ?   <div>
                //         <a href="sass.html" className ="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2" onClick={logout}>Выйти</a>
                //     </div>

                ?   <div>
                        <button className ="animated-border-button navBut text-lg " onClick={logout} >Выйти</button>
                    </div>
                :   <div>
                        <button className ="animated-border-button navBut text-lg "><a href="/login" className ="text-lg no-underline   ml-2" >Войти</a></button>
                    </div>
            }
            
        </div>  
    );
}

export default Navbar;