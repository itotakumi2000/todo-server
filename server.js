const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/todoapp")

const Todo = require("./models/user")

require("dotenv").config();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const port = process.env.PORT || 3000
const port = process.env.PORT || 3001

const router = express.Router()

router.get("/", function (req, res) {
  res.json({
    message: "成功！"
  })
})



router.route("/todos")
  .post(function (req, res) {
    const todo = new Todo()

    todo.title = req.body.title
    todo.desc = req.body.desc
    todo.isDone = false


    todo.save(function (err) {
      if (err) {
        return res.send(err)
      }
      res.json({
        message: "Userを作成しました！"
      })
    })
  }).get(function (req, res) {
    Todo.find(function (err, todos) {
      if (err) {
        res.send(err)
      }
      res.json(todos)
    })
  })

router.route("/todos/:todo_id")
  .get(function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
      if (err) {
        res.send(err)
      }
      res.json(todo)
    })
  })
  .put(function (req, res) {
    User.findById(req.params.todo_id, function (err, todo) {
      todo.title = req.body.title
      todo.desc = req.body.desc
      todo.isDone = req.body.isDone

      todo.save(function (err) {
        res.json({
          message: "更新しました！"
        })
      })
    })
  })
  .delete(function (req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function (err, user) {
      if (err) {
        res.send(err)
      }
      res.json({
        message: "削除完了！"
      })
    })
  })


app.use("/api", router)

app.listen(port, () => {
  console.log("listenning!")
})

// proxyは3000サーバーと3001サーバーをつなげるもの