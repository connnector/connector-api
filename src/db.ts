import mongoose from "mongoose";
import chalk from "chalk";
const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });
    console.log(
      chalk.hex("#FAFAD2").bold(`mongodb connected :${conn.connection.host}`)
    );
  } catch (error) {
    console.log(chalk.hex("#ff6347").bold(`Error:${error.message}`));
    process.exit(1);
  }
};

const databse: { connect } = {
  connect,
};

export { databse as default };
