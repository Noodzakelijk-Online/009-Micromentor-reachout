import React from 'react';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import initializeApp from './utils/appInitializer.js';

// Initialize the application with resource monitoring
const session = initializeApp();
console.log('Application initialized with session:', session);

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
