const mongoose = require("mongoose");

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const fallbackUri = process.env.LOCAL_MONGO_URI || "mongodb://127.0.0.1:27017/socialsphere";
  const uri = primaryUri || fallbackUri;

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    console.error("DB connection error:", error.message);

    if (primaryUri && primaryUri.startsWith("mongodb+srv://")) {
      console.error(
        "Atlas SRV failed. Confirm DNS/network access, and consider using a local MongoDB URI via LOCAL_MONGO_URI."
      );
    }

    if (primaryUri && fallbackUri && uri !== fallbackUri) {
      console.error(`Attempting fallback MongoDB URI: ${fallbackUri}`);
      try {
        const fallbackConn = await mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 5000,
        });
        console.log(`MongoDB Connected: ${fallbackConn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error("Fallback DB connection error:", fallbackError.message);
      }
    }

    process.exit(1);
  }
};

module.exports = connectDB;