const express = require("express");
const { Db } = require("mongodb-legacy");

const app = express.Router();

const DBO = require("../database/conn");
const DB_NAME = process.env.PORT.DB_NAME;

const ObjectId = require("mongodb").ObjectId;

// -------- SUPERADMIN ---------
app.route("/superadmin/login").get((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  DB_CONNECT.collection("admin")
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

app.route("/superadmin/books").get((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  DB_CONNECT.collection("books")
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

app.route("/superadmin/addbooks").post((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  let myData = {
    img: req.body.img,
    title: req.body.title,
    description: req.body.description,
    isbn: req.body.isbn,
    author: req.body.author,
    year: req.body.year,
    qty: req.body.qty,
    isDeleted: req.body.isDeleted,
    date_created: req.body.date_created,
  };
  DB_CONNECT.collection("books").insertOne(myData, (err, res) => {
    if (err) throw err;
    response.json([myData]);
  });
});

app.route("/superadmin/updatebooks/:id").post((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  let paramID = { _id: ObjectId(req.params.id) };
  let myData = {
    $set: {
      img: req.body.img,
      title: req.body.title,
      description: req.body.description,
      isbn: req.body.isbn,
      author: req.body.author,
      year: req.body.year,
      qty: req.body.qty,
      isDeleted: req.body.isDeleted,
      date_created: req.body.date_created,
    },
  };
  DB_CONNECT.collection("books").updateOne(paramID, myData, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

app.route("/superadmin/reserved").get(async (req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  await DB_CONNECT.collection("reserved")
    .aggregate([
      {
        $lookup: {
          from: "books",
          localField: "reserved.book_id",
          foreignField: "books._id",
          as: "book_reserved",
        },
      },
    ])
    .toArray((err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

app.route("/superadmin/tempdelete/:id").post((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  let paramID = { _id: ObjectId(req.params.id) };
  let myData = {
    $set: {
      isDeleted: req.body.isDeleted,
    },
  };
  DB_CONNECT.collection("books").updateOne(paramID, myData, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

app.route("/superadmin/deletebooks/:id").delete((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  let paramID = { _id: ObjectId(req.params.id) };
  DB_CONNECT.collection("books").deleteOne(paramID, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// --------- CLIENT PAGE ---------
app.route("/books").get((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  DB_CONNECT.collection("books")
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

app.route("/books/detail/:id").get((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  let myId = { _id: ObjectId(req.params.id) };
  DB_CONNECT.collection("books").findOne(myId, (err, result) => {
    if (err) throw err;
    response.json(result);
  });
});

app.route("/create/account").post((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  let myData = {
    email: req.body.email,
    password: req.body.password,
    fullname: req.body.fullname,
    contact: req.body.contact,
    address: req.body.address,
  };
  DB_CONNECT.collection("user").insertOne(myData, (err, res) => {
    if (err) throw err;
    response.json([myData]);
  });
});

app.route("/user/login").get((req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  DB_CONNECT.collection("user")
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

app.route("/books/reservation").post(async (req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  let myData = {
    book_id: req.body._id,
    qty: req.body.qty,
    email: req.body.email,
    fullname: req.body.fullName,
    contact: req.body.contact,
    address: req.body.address,
    date_created: req.body.date,
  };
  let book_id = { _id: ObjectId(req.body._id) };
  let updateData = {
    $set: {
      qty: req.body.updatedQty,
    },
  };

  await DB_CONNECT.collection("books").updateOne(book_id, updateData);

  await DB_CONNECT.collection("reserved").insertOne(myData);
});

app.route("/reserved").get(async (req, response) => {
  let DB_CONNECT = DBO.getDb(DB_NAME);
  await DB_CONNECT.collection("reserved")
    .aggregate([
      {
        $lookup: {
          from: "books",
          localField: "reserved.book_id",
          foreignField: "books._id",
          as: "book_reserved",
        },
      },
    ])
    .toArray((err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

module.exports = app;
