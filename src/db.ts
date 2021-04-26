import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const databse: { connect } = {
  connect,
};

export { databse as default };
