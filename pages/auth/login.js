import React, {useState} from "react";
import "./index.css"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        navigate('/');
    }

    return (
        <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Log In</h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                    </p>
                </div>

                <form class="mt-8 space-y-6" onSubmit={handleSubmit} action="news" method="POST">
                    <input type="hidden" name="remember" value="true"/>
                    <div class="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label for="email-address" class="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"/>
                        </div>
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <input id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"/>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-800 py-2 px-4 text-sm font-medium text-white hover:shadow-lg hover:shadow-green-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"> 
                        Log In
                    </button>

                </form>
            </div>
        </div>    
    )
}

export default LoginForm