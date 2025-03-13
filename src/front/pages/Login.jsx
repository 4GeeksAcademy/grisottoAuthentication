import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css"


export const Login = () => {
    const navigate = useNavigate();
    const {dispatch} = useGlobalReducer();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.emailInput.value;
        const password = event.target.passwordInput.value;

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    password: password
                })
            });
    
            
            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                alert("LogIn successful");
                navigate("/private")
            } else if(response.status === 401) {
                alert("invalid email or password");
            }else {
                console.log("there was an error during login:", response.status);
                alert("unexpected error occurred in login");
            }

            if (!response.ok) {
                alert(data.msg || "Login failed. Please try again.");
                return;
            }
    
            console.log("data from signup", data);
            alert("signup successful please login");
            navigate("/login");
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login");
        }
    }

    return (
        <div className="authDiv">
            <h2> Login </h2>
            <form onSubmit={handleSubmit}>
                <input type = "email" name="emailInput" placeholder="enter email" required />
                <input type = "password" name="passwordInput" placeholder="enter password" required />
                <button className="btn btn-dark mt-2" type="submit">
                    LogIn
                    </button> 

            </form>
        </div>
    );
};