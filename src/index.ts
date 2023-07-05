import { taskRouter } from "./routes/task";
import { userRouter } from "./routes/user";

import App from "./server";

const port = process.env.PORT || 3001

const app: App = new App([userRouter, taskRouter])

app.start(port)