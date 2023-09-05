module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      loginName: String,
      loginEmail: String,
      loginPassWord: String,
      isAdmin: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const loginInfo = mongoose.model("loginInfo", schema);
  return loginInfo;
};
