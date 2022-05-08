import React, {useContext} from "react";
import {AuthContext} from '../../context/AuthContext'
const Navbar = () => {
    const {logout, isLogin} = useContext(AuthContext);

    return (
        <div className = " font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full" >
            <div class ="mb-2 sm:mb-0">
                <a href="/" className="logo">Logo</a>
            </div>

            {
                isLogin
                ?   <div>
                        <a href="sass.html" className ="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2" onClick={logout}>Выйти</a>
                    </div>
                :   <div>
                        <a href="sass.html" className ="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2" >Войти</a>
                    </div>
            }
            
        </div>  
    );
}

export default Navbar;