module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      brokerName: String,
      accountNumber: Number,
      currentEquity: Number,
      threshold: Number,
      topUpAmount: Number,
      activeStatus: Boolean,
      totalSwap: Number,
      longSwap: Number,
      shortSwap: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
