import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter(); 
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, [])
    
    const handleLogout = async () => {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
        setTimeout(() => {
            router.push("/");
        }, 500);
        
    }
    return ( 
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                {isLoggedIn && <Link className="navbar-brand" href="/notes">Notery</Link>}
                {!isLoggedIn && <Link className="navbar-brand" href="/">Notery</Link>}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                </ul>
                <div className="d-flex align-items-center">
                    {!isLoggedIn && (
                    <>
                    <Link href="/login" className="btn btn-primary m-1" type="submit">Login</Link>
                    <Link href="/register" className="btn btn-secondary m-1" type="submit">Register</Link>
                    </>
                    )}
                    {isLoggedIn &&
                    <>
                    <p className="m-0 me-3">Logged in: <span className="fw-bold">{sessionStorage.getItem("username")}</span></p>
                    <button onClick={handleLogout} className="btn btn-dark m-1" type="button">Logout</button>
                    </>
                    }
                </div>
                </div>
            </div>
        </nav>
    )
}