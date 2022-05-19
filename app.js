const express = require('express');
const req = require('express/lib/request');
const app = express();

const mysql = require("mysql");

//Using View Engine 
app.set('view engine', 'ejs'); //gonna look for views folder by default 

//Static files
app.use(express.static('public'));

//middleware to access info from forms POST etc 
app.use(express.urlencoded({ extended: true }));


//Database connection
const pool = mysql.createPool({ //Pool of connections to the database 
    connectionLimit: 10, //save 10 connection
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'survey-result-db'
})

//Main Page
app.get('/', (req, res) => {
    // res.send("Hello from server");
    res.render('index');
})

app.get('/file-upload', (req, res) => {
    // res.send("Hello file");
    res.render('fileUpload');
})
// Get all survey results
app.get('/all-results', (req, res) => {
    
    pool.getConnection((err, connection) => { //Getting a connection from the pool
        if (err) {
            console.log("Database connection failed", err);
        }
        else {
            console.log("Database Connected!...Connection thread Id " + connection.threadId);

            connection.query('SELECT * FROM csat', (err, data) => {
            // connection.release() //returning connection to pool

            if(err) {
                console.log("Couldn't retrieve data!");
                throw err
            }
            else{
                
                // function onlyUnique(value, index, self) 
                // {
                //     return self.indexOf(value) === index;
                // }
                // if(data.length) {
                //     for (var i = 0; i < data.length; i++) { 
                //       var a = data[i].country; 
                //       var countryData = a.filter(onlyUnique); 
                //     }
                // } 
                // res.send(data);
                // var data = JSON.stringify(rows) //Converting to a JSON string 
                res.render('allSurveyData', {data});
                // console.log(data);
            }
            })
        }
    }) 
    console.log(req.url);
})

//Getting filtered results
app.post('/filtered-result', (req, res) => {
    //Work on excuting SQL queries with respect to data recieved from the POST request, and render results to respective page
    // res.send("HI");
    console.log(req.url)
    var country = req.body.country;
    var company = req.body.company;
    var quarter = req.body.quarter;
    console.log("Country: " + country);
    console.log("Company: " + company);
    console.log("Quarter: " + quarter);
    
    // Quarter selection 
    // Quarter 1 -> Oct to Dec
    // Quarter 2 -> Jan to March  
    // Quarter 3 -> Apr to Jun
    // Qaurter 4 -> Jul to Sept

    
    pool.getConnection((err, connection) => { //Getting a connection from the pool
        if (err) {
            res.send("Connection failed")
            console.log("Database connection failed", err);
        }
        else {
            console.log("Database Connected!...Connection thread Id " + connection.threadId);


            // ENTIRE LOGIC
            if(country && company && quarter){

                        if (quarter === 'All'){
                            console.log("Everything is selected, " + company + ", " + country + " from " + quarter + " Quarters");
                            connection.query(`SELECT * FROM csat WHERE country = '${country}' AND company = '${company}' AND monthname(completion_time) IN ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');`, (err, data) => {
                                connection.release() //returning connection to pool
                            
                                if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                }
                                else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                        }
                        else if (quarter === 'Quarter-1'){
                            console.log("Everything is selected, " + company + ", " + country + " from " + quarter);
                            connection.query(`SELECT * FROM csat WHERE country = '${country}' AND company = '${company}' AND monthname(completion_time) IN ('October', 'November', 'December');`, (err, data) => {
                                connection.release() //returning connection to pool
                            
                                if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                }
                                else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                        }
                        else if (quarter === 'Quarter-2'){
                            console.log("Everything is selected, " + company + ", " + country + " from " + quarter);
                            connection.query(`SELECT * FROM csat WHERE country = '${country}' AND company = '${company}' AND monthname(completion_time) IN ('January', 'February', 'March');`, (err, data) => {
                                connection.release() //returning connection to pool
                            
                                if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                }
                                else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                        }
                        else if (quarter === 'Quarter-3'){
                            console.log("Everything is selected, " + company + ", " + country + " from " + quarter);
                            connection.query(`SELECT * FROM csat WHERE country = '${country}' AND company = '${company}' AND monthname(completion_time) IN ('April', 'May', 'June');`, (err, data) => {
                                connection.release() //returning connection to pool
                            
                                if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                }
                                else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                        }
                        else if (quarter === 'Quarter-4'){
                            console.log("Everything is selected, " + company + ", " + country + " from " + quarter);
                            connection.query(`SELECT * FROM csat WHERE country = '${country}' AND company = '${company}' AND monthname(completion_time) IN ('July', 'August', 'September');`, (err, data) => {
                                connection.release() //returning connection to pool
                            
                                if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                }
                                else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                        }
            }
            else{
                if(country==='')
                {
                        if (company && quarter){

                            if (quarter === 'All'){
                                console.log("Company and Quarter is selected: " + company + " from " + quarter + " Quarters");
                                connection.query(`SELECT * FROM csat WHERE company = '${company}' AND monthname(completion_time) IN ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                            console.log("Couldn't retrieve data!");
                                            throw err
                                    }
                                    else{
                                            res.render('filteredData', {data});
                                            // console.log(data);
                                        }
                                    })
                            }
                            else if (quarter === 'Quarter-1'){
                                console.log("Company and Quarter is selected: " + company + " from " + quarter);
                                connection.query(`SELECT * FROM csat WHERE company = '${company}' AND monthname(completion_time) IN ('October', 'November', 'December');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                            console.log("Couldn't retrieve data!");
                                            throw err
                                    }
                                    else{
                                            res.render('filteredData', {data});
                                            // console.log(data);
                                        }
                                    })
                            }
                            else if (quarter === 'Quarter-2'){
                                console.log("Company and Quarter is selected: " + company + " from " + quarter);
                                connection.query(`SELECT * FROM csat WHERE company = '${company}' AND monthname(completion_time) IN ('January', 'February', 'March');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                            console.log("Couldn't retrieve data!");
                                            throw err
                                    }
                                    else{
                                            res.render('filteredData', {data});
                                            // console.log(data);
                                        }
                                    })
                            }
                            else if (quarter === 'Quarter-3'){
                                console.log("Company and Quarter is selected: " + company + " from " + quarter);
                                connection.query(`SELECT * FROM csat WHERE company = '${company}' AND monthname(completion_time) IN ('April', 'May', 'June');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                            console.log("Couldn't retrieve data!");
                                            throw err
                                    }
                                    else{
                                            res.render('filteredData', {data});
                                            // console.log(data);
                                        }
                                    })
                            }
                            else if (quarter === 'Quarter-4'){
                                console.log("Company and Quarter is selected: " + company + " from " + quarter);
                                connection.query(`SELECT * FROM csat WHERE company = '${company}' AND monthname(completion_time) IN ('July', 'August', 'September');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                            console.log("Couldn't retrieve data!");
                                            throw err
                                    }
                                    else{
                                            res.render('filteredData', {data});
                                            // console.log(data);
                                        }
                                    })
                            }
                        }
                        else {
                            if(company){
                                console.log("Only Company is selected: " + company);
                                connection.query(`SELECT * FROM csat WHERE company = '${company}';`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                            console.log("Couldn't retrieve data!");
                                            throw err
                                    }
                                    else{
                                            res.render('filteredData', {data});
                                            // console.log(data);
                                        }
                                    })
                            }
                            else if(quarter){
                                if (quarter === 'All'){
                                    console.log("Only Quarter is selected: " + quarter + " Quarters");
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        
                                        }
                                    })
                                }
                                else if (quarter === 'Quarter-1'){
                                    console.log("Only Quarter is selected: " + quarter);
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('October', 'November', 'December');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        
                                        }
                                    })
                                }
                                else if (quarter === 'Quarter-2'){
                                    console.log("Only Quarter is selected: " + quarter);
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('January', 'February', 'March');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        
                                        }
                                    })
                                }
                                else if (quarter === 'Quarter-3'){
                                    console.log("Only Quarter is selected: " + quarter);
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('April', 'May', 'June');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        
                                        }
                                    })    
                                }
                                else if (quarter === 'Quarter-4'){
                                    console.log("Only Quarter is selected: " + quarter);
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('July', 'August', 'September');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        }
                                    })
                                }
                            }
                        }
                }
                else if(company==='')
                {
                        if (country && quarter){
                            if (quarter === 'All'){
                                console.log("Country and Quarter is selected: " + country + " from " + quarter + " Quarters");
                                connection.query(`SELECT * FROM csat WHERE country = '${country}' AND monthname(completion_time) IN ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                    }
                                    else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                            }
                            else if (quarter === 'Quarter-1'){
                                console.log("Country and Quarter is selected: " + country + " from " + quarter);
                                connection.query(`SELECT * FROM csat WHERE country = '${country}' AND monthname(completion_time) IN ('October', 'November', 'December');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                    }
                                    else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                            }
                            else if (quarter === 'Quarter-2'){
                                console.log("Country and Quarter is selected: " + country + " from " + quarter);
                                connection.query(`SELECT * FROM csat WHERE country = '${country}' AND monthname(completion_time) IN ('January', 'February', 'March');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                    }
                                    else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                            }
                            else if (quarter === 'Quarter-3'){
                                console.log("Country and Quarter is selected: " + country + " from " + quarter);
                                connection.query(`SELECT * FROM csat WHERE country = '${country}' AND monthname(completion_time) IN ('April', 'May', 'June');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                    }
                                    else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                            }
                            else if (quarter === 'Quarter-4'){
                                console.log("Country and Quarter is selected: " + country + " from " + quarter);
                                connection.query(`SELECT * FROM csat WHERE country = '${country}' AND monthname(completion_time) IN ('July', 'August', 'September');`, (err, data) => {
                                    connection.release() //returning connection to pool
                                
                                    if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                    }
                                    else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                    }
                                })
                            }
                        }
                        else {
                            if(country){
                                console.log("Only Country is selected: " + country);
                                connection.query(`SELECT * FROM csat WHERE country = '${country}';`, (err, data) => {
                                    connection.release() //returning connection to pool
                                    
                                    if(err){
                                        console.log("Couldn't retrieve data!");
                                        throw err
                                    }
                                    else{
                                        res.render('filteredData', {data});
                                        // console.log(data);
                                        }
                                })
                            }
                            else if(quarter){
                                if (quarter === 'All'){
                                    console.log("Only Quarter is selected: " + quarter + " Quarters");
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        
                                        }
                                    })
                                }
                                else if (quarter === 'Quarter-1'){
                                    console.log("Only Quarter is selected: " + quarter);
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('October', 'November', 'December');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        
                                        }
                                    })
                                }
                                else if (quarter === 'Quarter-2'){
                                    console.log("Only Quarter is selected: " + quarter);
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('January', 'February', 'March');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        
                                        }
                                    })
                                }
                                else if (quarter === 'Quarter-3'){
                                    console.log("Only Quarter is selected: " + quarter);
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('April', 'May', 'June');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        
                                        }
                                    })    
                                }
                                else if (quarter === 'Quarter-4'){
                                    console.log("Only Quarter is selected: " + quarter);
                                    connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('July', 'August', 'September');`, (err, data) => {
                                        connection.release() //returning connection to pool
                                        if(err){
                                            console.log("Couldn't retrieve data!");
                                        throw err
                                        }
                                        else{
                                            res.render('filteredData', {data});
                                        }
                                    })
                                }
                            }
                        }
                        // console.log("Company is not selected...either Quarter and/or Country")
                }
            }
    
            //SINGLE SELECTION LOGIC
            // if (country) {

            //     console.log("Only Country is selected");
            //     connection.query(`SELECT * FROM csat WHERE country = '${country}';`, (err, data) => {
            //     connection.release() //returning connection to pool
            
            //     if(err){
            //             console.log("Couldn't retrieve data!");
            //             throw err
            //     }
            //     else{
            //             res.render('filteredData', {data});
            //             // console.log(data);
            //         }
            //     })
            // }
            // else if (company) {

            //     console.log("Only Company is selected");
                // connection.query(`SELECT * FROM csat WHERE company = '${company}';`, (err, data) => {
                // connection.release() //returning connection to pool
            
                // if(err){
                //         console.log("Couldn't retrieve data!");
                //         throw err
                // }
                // else{
                //         res.render('filteredData', {data});
                //         // console.log(data);
                //     }
                // })

            // }
            // else if (quarter){

            //     if (quarter === 'All'){

            //         console.log("All Quarters are selected");

            //         connection.query(`SELECT * FROM csat`, (err, data) => {
            //             connection.release() //returning connection to pool
                
            //             if(err){
            //                 console.log("Couldn't retrieve data!");
            //                 throw err
            //             }
            //             else{
            //                 res.render('filteredData', {data});
            //                 // console.log(data);
            //             }
            //         })

            //     }
            //     else if (quarter === 'Quarter-1'){

            //         console.log("Quarter-1 selected");

            //         connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('October', 'November', 'December');`, (err, data) => {
            //             connection.release() //returning connection to pool
                
            //             if(err){
            //                 console.log("Couldn't retrieve data!");
            //                 throw err
            //             }
            //             else{
            //                 res.render('filteredData', {data});
            //                 // console.log(data);
            //             }
            //         })
            //     }
            //     else if (quarter === 'Quarter-2'){

            //         console.log("Quarter-2 selected");

            //         connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('January', 'February', 'March');`, (err, data) => {
            //             connection.release() //returning connection to pool
                
            //             if(err){
            //                 console.log("Couldn't retrieve data!");
            //                 throw err
            //             }
            //             else{
            //                 res.render('filteredData', {data});
            //                 // console.log(data);
            //             }
            //         })
            //     }
            //     else if (quarter === 'Quarter-3'){

            //         console.log("Quarter-3 selected");
                    
            //         connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('April', 'May', 'June');`, (err, data) => {
            //             connection.release() //returning connection to pool
                
            //             if(err){
            //                 console.log("Couldn't retrieve data!");
            //                 throw err
            //             }
            //             else{
            //                 res.render('filteredData', {data});
            //                 // console.log(data);
            //             }
            //         })
            //     }
            //     else if (quarter === 'Quarter-4'){

            //         console.log("Quarter-4 selected");

            //         connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('July', 'August', 'September');`, (err, data) => {
            //             connection.release() //returning connection to pool
                
            //             if(err){
            //                 console.log("Couldn't retrieve data!");
            //                 throw err
            //             }
            //             else{
            //                 res.render('filteredData', {data});
            //                 // console.log(data);
            //             }
            //         })
            //     }
            //     else {
            //         res.send('Please select a quarter option');
            //     }

            // }
            // else {
            //     res.send("You have selected nothing or more than 1 option");
            // }
            // if (quarter === 'All'){

            //     console.log("All Quarters are selected");

            //     connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('October', 'November', 'December');`, (err, data) => {
            //         connection.release() //returning connection to pool
            
            //         if(err){
            //             console.log("Couldn't retrieve data!");
            //             throw err
            //         }
            //         else{
            //             res.render('filteredData', {data});
            //             // console.log(data);
            //         }
            //     })

            // }
            // else if (quarter === 'Quarter-1'){

            //     console.log("Quarter-1 selected");

            //     connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('October', 'November', 'December');`, (err, data) => {
            //         connection.release() //returning connection to pool
            
            //         if(err){
            //             console.log("Couldn't retrieve data!");
            //             throw err
            //         }
            //         else{
            //             res.render('filteredData', {data});
            //             // console.log(data);
            //         }
            //     })
            // }
            // else if (quarter === 'Quarter-2'){

            //     console.log("Quarter-2 selected");

            //     connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('January', 'February', 'March');`, (err, data) => {
            //         connection.release() //returning connection to pool
            
            //         if(err){
            //             console.log("Couldn't retrieve data!");
            //             throw err
            //         }
            //         else{
            //             res.render('filteredData', {data});
            //             // console.log(data);
            //         }
            //     })
            // }
            // else if (quarter === 'Quarter-3'){

            //     console.log("Quarter-3 selected");
                
            //     connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('April', 'May', 'June');`, (err, data) => {
            //         connection.release() //returning connection to pool
            
            //         if(err){
            //             console.log("Couldn't retrieve data!");
            //             throw err
            //         }
            //         else{
            //             res.render('filteredData', {data});
            //             // console.log(data);
            //         }
            //     })
            // }
            // else if (quarter === 'Quarter-4'){

            //     console.log("Quarter-4 selected");

            //     connection.query(`SELECT * FROM csat WHERE monthname(completion_time) IN ('July', 'August', 'September');`, (err, data) => {
            //         connection.release() //returning connection to pool
            
            //         if(err){
            //             console.log("Couldn't retrieve data!");
            //             throw err
            //         }
            //         else{
            //             res.render('filteredData', {data});
            //             // console.log(data);
            //         }
            //     })
            // }
            // else {
            //     alert('Please select a quarter option');
            // }
       
        }
    })
})

const port = 4000;

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})



