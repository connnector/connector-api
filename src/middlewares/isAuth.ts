import jwt from "jsonwebtoken";

const isAuth = (req) => {
  // This checks to see if there is an authorization field within the incoming request
  const authHeader: string = req.headers.authorization;
  let isAuth: boolean = false;

  // if there is no token
  if (!authHeader) {
    return {
      isAuth,
    };
  }

  // format of request sent will be Bearer tokenvalue
  // this splits it into two values bearer and the token
  const token: string = authHeader.split(" ")[1];

  // if the token is null or an empty string
  if (!token || token === "") {
    return {
      isAuth,
    };
  }
  // console.log(token);

  let decodedToken: { id; userName };
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken) {
      return {
        isAuth,
      };
    }
  } catch (e) {
    return {
      isAuth,
    };
  }

  // shows the user is an authenticated user
  // pulls data off the token
  const { id } = decodedToken;
  isAuth = true;

  return {
    isAuth,
    id,
  };
};

export { isAuth as default };
