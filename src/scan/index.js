const app = require('./app');
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Scan service running on port ${port}`);
});
