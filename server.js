//Connexion à la base de données
const express =require('express');
const app = express();
const PORT= 3000;
var sql = require('mysql2');
var sqlConfig = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Admin1234',
    database: `RESTaurant-API`
})

//Confirmation de la connexion dans la console
sqlConfig.connect((err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log("CONNECTED")
    }
})

//Permet d'exploiter les données sous format JSON
app.use(express.json());

//-------
//ITEMS
//-------

//READ des items
app.get("/items", (req, res) => {
    try {
        const parameters = req.query.parameters;
        //READ des items sans filtre paramètre
        if (!parameters) {
            sqlConfig.query('SELECT * FROM `RESTaurant-API`.items', function (err, result, fields) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
            });
        } 
        //READ des items avec filtre paramètre
        else {
            const text = 'SELECT * FROM `RESTaurant-API`.items WHERE ' + parameters;
            sqlConfig.query(text, function (err, result, fields) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//READ selon l'id de l'item
app.get("/items/:id", (req,res)=> {
    const item= req.params.id;
    const text = 'SELECT * FROM `RESTaurant-API`.items WHERE id= ' + item;
            sqlConfig.query(text, function (err, result, fields) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
            });

})

//CREATE
app.post('/items',(req, res) => {
    try {
        const data = req.body;
        const sqlQuery = 'INSERT INTO `RESTaurant-API`.`items` (`name`, `description`, `price`,`category_id`) VALUES (?, ?, ?, ?)';
        const values = [data.name, data.description, data.price, data.category_id];
        sqlConfig.query(sqlQuery,values, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Created');
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//DELETE selon l'id de l'item
app.delete('/items/:id',(req, res) => {
    try {
        const data = req.params.id;
        const sqlQuery = 'DELETE FROM `items` WHERE id='+data;
        sqlConfig.query(sqlQuery, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Deleted');
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//UPDATE selon l'id de l'item
app.put("/items/:id", (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = req.body;
        const sqlQuery = 'UPDATE `RESTaurant-API`.`items` SET name=?, description=?, price=?, category_id=? WHERE id=?';
        const values = [updatedItem.name, updatedItem.description, updatedItem.price,updatedItem.category_id, itemId];
        sqlConfig.query(sqlQuery, values, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send("Updated");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//-------
//CATEGORIES
//-------

app.get("/categories", (req, res) => {
    try {
        const parameters = req.query.parameters;
        //READ des items sans filtre paramètre
        
            sqlConfig.query('SELECT * FROM `RESTaurant-API`.categories', function (err, result, fields) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
            });
        }
        
        
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//READ selon l'id de l'item
app.get("/categories/:id", (req,res)=> {
    const item= req.params.id;
    const text = 'SELECT * FROM `RESTaurant-API`.categories WHERE category_id= ' + item;
            sqlConfig.query(text, function (err, result, fields) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
            });

})

//CREATE
app.post('/categories',(req, res) => {
    try {
        const data = req.body;
        const sqlQuery = 'INSERT INTO `RESTaurant-API`.`categories` (`category_name`, `category_description`) VALUES (?, ?)';
        const values = [data.category_name, data.category_description];
        sqlConfig.query(sqlQuery,values, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Created');
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//DELETE selon l'id de l'item
app.delete('/categories/:id',(req, res) => {
    try {
        const data = req.params.id;
        const sqlQuery = 'DELETE FROM `categories` WHERE category_id='+data;
        sqlConfig.query(sqlQuery, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Deleted');
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//UPDATE selon l'id de l'item
app.put("/categories/:id", (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = req.body;
        const sqlQuery = 'UPDATE `RESTaurant-API`.`categories` SET category_name=?,category_description=? WHERE category_id=?';
        const values = [updatedItem.category_name, updatedItem.category_description,itemId];
        sqlConfig.query(sqlQuery, values, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send("Updated");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//-------
//FORMULAS
//-------
app.get("/formulas", (req, res) => {
    try {
        const parameters = req.query.parameters;
        //READ des items sans filtre paramètre
        if (!parameters) {
            sqlConfig.query('SELECT * FROM `RESTaurant-API`.formulas', function (err, result, fields) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
            });
        } 
        //READ des items avec filtre paramètre
        else {
            const text = 'SELECT * FROM `RESTaurant-API`.formulas WHERE ' + parameters;
            sqlConfig.query(text, function (err, result, fields) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//READ selon l'id de l'item
app.get("/formulas/:id", (req,res)=> {
    const item= req.params.id;
    const text = 'SELECT * FROM `RESTaurant-API`.formulas WHERE formula_id= ' + item;
            sqlConfig.query(text, function (err, result, fields) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.send(result);
                }
            });

})

//CREATE
app.post('/formulas',(req, res) => {
    try {
        const data = req.body;
        const sqlQuery = 'INSERT INTO `RESTaurant-API`.`formulas` (`formula_name`,`formula_description`,`formula_price`) VALUES (?, ?, ?)';
        const values = [data.formula_name, data.formula_description, data.formula_price];
        sqlConfig.query(sqlQuery,values, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Created');
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//DELETE selon l'id de l'item
app.delete('/formulas/:id',(req, res) => {
    try {
        const data = req.params.id;
        const sqlQuery = 'DELETE FROM `formulas` WHERE formula_id='+data;
        sqlConfig.query(sqlQuery, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Deleted');
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//UPDATE selon l'id de l'item
app.put("/formulas/:id", (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = req.body;
        const sqlQuery = 'UPDATE `RESTaurant-API`.`formulas` SET formula_name=?, formula_description=?, formula_price=? WHERE formula_id=?';
        const values = [updatedItem.formula_name,updatedItem.formula_description,updatedItem.formula_price,itemId];
        sqlConfig.query(sqlQuery, values, function (err, result, fields) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send("Updated");
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});