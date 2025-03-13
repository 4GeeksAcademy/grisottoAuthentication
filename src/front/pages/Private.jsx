import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Private = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let authenticate = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/private', {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                if (!response.ok) {
                    console.log("Authentication Failed", response.status);

                } else {
                    const data = await response.json();
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("error during authentication", error);
            } finally {
                setLoading(false);
            }
        }

        authenticate();
    }, []);


    if (loading) {
        return (
            <div className="container text-center mt-5" >
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Checking Credentials...</p>
            </div>
        )
    }
    return (
        <div className="container text-center mt-5">
            {isAuthenticated ? (
                <>
                    <h1>Private Page 🔐</h1>
                    <p>Welcome to the private area! This page is only accessible to authenticated users.</p>
                    <div className="mt-4">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h1>Access Denied ⛔</h1>
                    <p>Only logged in users can access this page.</p>
                    <div className="mt-3">
                        <Link to="/login" className="btn btn-dark">
                            Go to Login
                        </Link>
                    </div>
                </>
            )}
        </div>
    )

}
