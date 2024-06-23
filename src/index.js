import app from "./app.js";
import {PORT} from "./config.js";
import {connectDB} from "./db.js";


async function main () {
    try {
        await connectDB();
        app.listen(PORT || process.env.PORT || 3000);
        console.log(`Listening on port http://localhost:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV_TEST}`)
    } catch (error) {
        console.error(error);
    }
}

main();