import { connect, ConnectOptions } from "mongoose";
const MONGO_URI =
  "mongodb+srv://minti:1Q5zKGGGsjpPbfuu@cluster1.k3ghmhs.mongodb.net/mufs?retryWrites=true&w=majority";
export const dbConnect = () => {
  connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions).then(
    () => console.log("connect successfully"),
    (error) => console.log(error)
  );
};
