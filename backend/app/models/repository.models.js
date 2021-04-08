module.exports = mongoose => {
    var schema = mongoose.Schema(
      { 
        name: String,
        full_name: String,
        created_at: String,
        url: String,
        owner_id: Number,
        languages: String,
        repo_id: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Repository = mongoose.model("repository", schema);
    return Repository;
  };
  