import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css"

export const Signup = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.emailInput.value;
        const password = event.target.passwordInput.value;
        const confirmPassword = event.target.confirmPasswordInput.value;

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return
        }

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    password: password
                })
            });
    
            const data = await response.json();
            
            if (!response.ok) {
                alert(data.msg || "Sign up failed. Please try again.");
                return;
            }
    
            console.log("data from signup", data);
            alert("signup successful please login");
            navigate("/login");
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup");
        }
    }

    return (
        <div className="authDiv">
            <h2> Sign Up </h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="emailInput" placeholder="enter email" required />
                <input type="password" name="passwordInput" placeholder="enter password" required />
                <input type="password" name="confirmPasswordInput" placeholder="confirm password" required />
                <button className="btn btn-dark mt-2" type="submit">
                    SignUp
                </button>

            </form>
        </div>
    );
};