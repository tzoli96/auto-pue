const express = require('express');
const connectToDatabase = require('./db/db');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const { port, mongoUri } = require('./config/config');
const initializeConfigurations = require('./init/initializeConfigurations');

const app = express();

async function startServer() {
    try {
        await connectToDatabase(mongoUri);

        await initializeConfigurations();

        app.use(express.json());

        app.use('/', indexRouter);
        app.use('/api', apiRouter);

        app.listen(port, () => {
            console.log(`Backend service running on port ${port}`);
        });

    } catch (error) {
        console.error('Error during server initialization:', error);
        process.exit(1); // Leállítja az alkalmazást, ha hiba történik
    }
}

startServer();
