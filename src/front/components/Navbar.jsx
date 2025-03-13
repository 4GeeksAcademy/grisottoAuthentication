import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		console.log('Token removed from localStorage')
		navigate('/');
	};

	const isLoggedIn = !!localStorage.getItem('token');
		

	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><i class="fa-solid fa-igloo"></i></span>
				</Link>
				<div className="ms-auto">
					{isLoggedIn ? (
				    		<button className="btn btn-dark" onClick={handleLogout}>Logout</button>
				  	) : (
							<>
							
				    		<Link to="/signup">
				      			<button className="btn btn-dark me-2">Register</button>
				    		</Link>
				    		<Link to="/login">
				      			<button className="btn btn-dark">Log In</button>
				    		</Link>
							</>
				  	)}
				</div>
			</div>
		</nav>
	);
};