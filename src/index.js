
// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import $ from 'jquery';

// Import CSS
import './css/main.css';
import 'react-select/dist/react-select.css';

// Import App
import App from './App';

// Global jQuery
$(document).ready(function () {

	// Push view beneath header
	$(".view").css("padding-top", $("header").height());

});

// Render routed App at root
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));