import authRouter from "./authRouter";
import userRouter from "./userRouter";
import categoryRouter from "./categoryRouter";
import blogRouter from "./blogRouter";
import commentRouter from "./commentRouter";
import followRouter from "./followRouter";
import balanceRouter from "./balanceRouter";
import notificationRouter from "./notificationRouter";
import draftrouter from "./draftRouter";
const routes = [
  authRouter,
  userRouter,
  categoryRouter,
  blogRouter,
  commentRouter,
  followRouter,
  balanceRouter,
  notificationRouter,
  draftrouter,
];

export default routes;
