import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

async function startServer(){
    try{
        app.listen(process.env.PORT, () => {
            console.log(`Server started on ${process.env.PORT}`);
        });
    } catch (e){
        console.error("Cant start server")
    }
}

startServer();