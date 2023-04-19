import { useState, useEffect} from 'react';
import "./navBar.css";
import "../App.css";
import {auth} from "../firebase-config";
import { createUserWithEmailAndPassword,
     signOut, 
     onAuthStateChanged, 
     signInWithEmailAndPassword } from "firebase/auth";

const NavBar = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])
    
    //console.log(auth?.currentUser?.email);
    //console.log(user.email);
 
    const  [isLogged, setIsLogged] = useState(false);

    const checkLog = () =>{
        return isLogged;
    }

    const login = async () => {
        try{ 
        const user = await signInWithEmailAndPassword(
            auth, 
            email, 
            password
            );
        console.log(user);
        setIsLogged(true);
        setEmail('');
        setPassword('');
        }
        catch(err){
            console.error(err);
        }
    };

    const logout = async () => {
        try{
            await signOut(auth);
        }
        catch(err){
         console.error(err);
        }
        setEmail('');
        setPassword('');
        setIsLogged(false);
    };

    const register = async () => {
        try{ 
            const user = await createUserWithEmailAndPassword(auth, email, password);
        }
        catch(err){
            console.error(err);
        }
    };

    return (
        <div className="navBar">
            <ul className="navBarUl">
                <li>
                <h1>MAELSTRÖM 2</h1>
                </li>
                <li>
                <p className='navBarMessage'>{user ? "Logged as "+user.email : "Not Logged In"}</p>
                </li>
                {!isLogged && <><li>
                <input placeholder='Email' 
                className="inputForm"
                value={email}
                //defaultValue={''}
                onChange={(e) => setEmail(e.target.value)}
                />
                </li>
                <li>
                <input placeholder='Password' 
                className="inputForm"
                value={password}
                //defaultValue={''}
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                />
                </li>
                <li>
                <button className="showButton"
                onClick={login}
                >LOGIN</button>
                </li></>}
                {isLogged && <><li>
                <button className="showButton"
                onClick={logout}
                >LOGOUT</button>
                </li></>}
            </ul>
        </div>
      );
    };

export default NavBar;