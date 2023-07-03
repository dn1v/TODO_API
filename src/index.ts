import { App } from "./server"
import { userRouter } from './routes/user'
import { taskRouter } from './routes/task'

const port = process.env.port || 3001
const app = new App([userRouter, taskRouter], port)

app.start()
// app.listen(port, () => {
//     console.log(`The server is now running on port ${port}. Base URL: http://localhost:${port}`)
// }).on('error', (error: Error) => {
//     console.error('Error while starting server:', error.message)
// })