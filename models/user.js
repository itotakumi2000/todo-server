const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
  title: {
    // 以下、文字列に関するバリデーション
    type: String,

    // required: 無いとダメ！
    // required: true,

    // // enum: リストにない値はだめ！
    // enum: ["titleA", "titleB"],

    // // matchはパターンを記述することができる
    // match: /正規表現/,

    // maxlength: 50,
    // minlength: 5,

    // // uniqueは一意（保存されている値はだめ）でないといけない
    // unique: true

  },
  desc: {
    type: String
    // 以下、数に関するバリデーション
    // type: Number,
    // max: 50,
    // min: 0
  },
  isDone: Boolean
})

module.exports = mongoose.model("TodoItem", TodoSchema)

// DOMで操作するやつはクライアント側のバリデーション
// mongooseは第二関門、appのところでかける
// DBをobject指向的にいじることができる→ORmapper