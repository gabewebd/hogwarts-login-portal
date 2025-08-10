// const express = require('express');
import express, {response} from 'express'; // Same thing
const __dirname = import.meta.dirname;

const app = express();
app.use(express.static('public'));

// Page Routes
// home
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html')
});

// student
app.get('/studentForm',(req, res) => {
    res.sendFile(__dirname + '/pages/studentForm.html')
});

// admin
app.get('/adminForm',(req, res) => {
    res.sendFile(__dirname + '/pages/adminForm.html')
});

// API Routes
// student
app.get('/getStudent',(req, res) => {
    var response = {
        studentID: req.query.studentID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        house: req.query.house,
    }
    if (response.studentID && response.firstName && response.lastName && response.house) {
        console.log("Student Login: ", response);
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Student Dashboard - Hogwarts</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body class="response-page">
                <div class="magical-container single-column">
                    <img src="/images/Hogwartscrest.webp" alt="Hogwarts Crest" class="hogwarts-crest" />
                    <h1>Welcome Back, Student!</h1>
                    <p class="magical-text">Login Successful</p>
                    <p>Welcome back to your Hogwarts student dashboard! You have successfully logged into your account and can now access all your magical academic resources.</p>
                    <p class="spell-text">Your magical journey continues!</p>
                    
                    <div class="registration-details">
                        <p><strong>Student ID:</strong> ${response.studentID}</p>
                        <p><strong>Name:</strong> ${response.firstName} ${response.lastName}</p>
                        <p><strong>House:</strong> ${response.house}</p>
                    </div>
                    
                    <nav>
                        <a href="/" class="magical-button">Return to Hogwarts Portal</a>
                    </nav>
                </div>
            </body>
            </html>
        `);
    } else {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error - Hogwarts Portal</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body class="response-page error-page">
                <div class="magical-container single-column">
                    <img src="/images/Hogwartscrest.webp" alt="Hogwarts Crest" class="hogwarts-crest" />
                    <h1>Access Denied!</h1>
                    <p class="magical-text">Student Authentication Failed</p>
                    <p>All student credentials are required for magical authentication!</p>
                    <p class="spell-text">Please provide complete information to access your student dashboard.</p>
                    
                    <div class="error-details">
                        <h2>Missing Information</h2>
                        <p>Please ensure you provide your Student ID, First Name, Last Name, and House to access the student portal.</p>
                    </div>
                    
                    <nav>
                        <a href="/studentForm" class="magical-button">Try Again</a>
                    </nav>
                </div>
            </body>
            </html>
        `);
    }
});

// admin
app.get('/getAdmin',(req, res) => {
    var response = {
        adminID: req.query.adminID,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        subject: req.query.subject,
        house: req.query.house,
    }
    
    if (response.adminID && response.firstName && response.lastName && response.house) {
        console.log("Admin Login: ", response);
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Admin Dashboard - Hogwarts</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body class="response-page">
                <div class="magical-container single-column">
                    <img src="/images/Hogwartscrest.webp" alt="Hogwarts Crest" class="hogwarts-crest" />
                    <h1>Welcome Back, Admin!</h1>
                    <p class="magical-text">Faculty Login Successful</p>
                    <p>Welcome back to your Hogwarts faculty dashboard! You have successfully accessed your admin account and can now manage your classes and students.</p>
                    <p class="spell-text">Ready to inspire young magical minds!</p>
                    
                    <div class="registration-details">
                        <p><strong>Admin ID:</strong> ${response.adminID}</p>
                        <p><strong>Name:</strong> Prof. ${response.firstName} ${response.lastName}</p>
                        <p><strong>House Head:</strong> ${response.house}</p>
                    </div>
                    
                    <nav>
                        <a href="/" class="magical-button">Return to Hogwarts Portal</a>
                    </nav>
                </div>
            </body>
            </html>
        `);
    } else {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error - Hogwarts Portal</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body class="response-page error-page">
                <div class="magical-container single-column">
                    <img src="/images/Hogwartscrest.webp" alt="Hogwarts Crest" class="hogwarts-crest" />
                    <h1>Access Denied!</h1>
                    <p class="magical-text">Faculty Authentication Failed</p>
                    <p>All admin credentials are required for magical authentication!</p>
                    <p class="spell-text">Please provide complete information to access your faculty dashboard.</p>
                    
                    <div class="error-details">
                        <h2>Missing Information</h2>
                        <p>Please ensure you provide your Admin ID, First Name, Last Name, and House Affiliation to access the faculty portal.</p>
                    </div>
                    
                    <nav>
                        <a href="/adminForm" class="magical-button">Try Again</a>
                    </nav>
                </div>
            </body>
            </html>
        `);
    }
});

// 404 Error Handler
app.use((req, res, next) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Page Not Found - Hogwarts Portal</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body class="response-page error-page">
            <div class="magical-container single-column">
                <img src="/images/Hogwartscrest.webp" alt="Hogwarts Crest" class="hogwarts-crest" />
                <h1 class="error-404">404</h1>
                <h2>Page Not Found!</h2>
                <p class="magical-text">The magical page you seek does not exist</p>
                <p>It seems you've wandered into the Room of Requirement, but this particular room hasn't been created yet. The page you're looking for cannot be found in our magical database.</p>
                <p class="spell-text">Perhaps it was hidden by a Disillusionment Charm?</p>
                
                <div class="error-details">
                    <h2>What happened?</h2>
                    <p><strong>Requested Path:</strong> ${req.originalUrl}</p>
                    <p>The path you're trying to access doesn't exist in our magical portal. Please check the URL for any spelling mistakes or return to the main portal.</p>
                </div>
                
                <nav>
                    <a href="/" class="magical-button">Return to Hogwarts Portal</a>
                </nav>
            </div>
        </body>
        </html>
    `);
});

const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Hogwarts Portal running at http://${host}:${port}`);
    console.log(`Welcome to the magical world of Hogwarts!`);
})
