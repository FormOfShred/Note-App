import Head from "next/head";
import Header from "../../components/Header";
import { useState } from "react";
import UserService from "../../services/UserService";
import { StatusMessage } from "../../types";
import { useRouter } from "next/router";

const Login: React.FC = () => {
    const [username, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [usernameError, setUserNameError] = useState(""); 
    const [passwordError, setPasswordError] = useState(""); 
    const [statusMessage, setStatusMessage] = useState<StatusMessage>(null);
    const router = useRouter(); 

    const validate = (): boolean => {
        let valid = true; 

        setUserNameError(""); 
        setPasswordError("");
        setStatusMessage(null); 

        if (!username && username.trim() === "") {
            setUserNameError("Username cannot be empty.");
            valid = false;
        }

        if (!password && password.trim() === "") {
            setPasswordError("Password cannot be empty.");
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return; 
        }

        const response = await UserService.loginUser({username, password}); 
        const data = await response.json();
       
        if (response.status === 200) {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("id", data.userId)
            setStatusMessage({ type: "success", message: data.message});
            setTimeout(() => {
                router.push("/notes");
            }, 1000);
        } else if (response.status === 401) {
            setStatusMessage({ type: "error", message: data.message})
        }
    };

    return (
        <>
        <Head>
            <title>Log in</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header></Header>
        <main className="container-fluid">
            <div className="card mx-auto mt-5 col-md-3 col-sm-5">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h1 className="card-title text-center mb-3" style={{fontSize:"1.8rem"}}>Log in</h1>
                        {statusMessage && (
                        <div className={`alert ${statusMessage.type === "success" ? "alert-success" : "alert-danger"}`} role="alert">
                            {statusMessage.message}
                        </div>)}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(event) => setUserName(event.target.value)} />
                            {   usernameError && <div className="text-danger">{usernameError}</div>}
                        </div>
                        <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password"
                                className="form-control" 
                                id="password" 
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}></input>
                                {passwordError && <div className="text-danger">{passwordError}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Log in</button>
                   </form>
                </div>
            </div>
        </main>
        </>
    )
}

export default Login;