const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "13141314",
    database: "test_crud_app_db",
});

app.use(cors());

/** middle layer */
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

/**
 *  Read Data
 *  HTTP: Get
 *  SQL: Select
 *
 *  http://localhost:3001/api/get
 * */

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews;";
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);
    });
});

/**
 *  Create Data
 *  HTTP: POST
 *  SQL: INSERT
 *
 *  http://localhost:3001/api/insert
 * */

app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert =
        "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});

/**
 *  Delete Data
 *  HTTP: DELETE
 *  SQL: DELETE
 *
 *  http://localhost:3001/api/delete/:object
 * */

app.delete("/api/delete/:movieName", (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    });
});

/**
 *  Update Data
 *  HTTP: put
 *  SQL: UPDATE
 *
 *  http://localhost:3001/api/delete/:object
 * */

app.put("/api/update", (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate =
        "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    });
});
