import app from './app';

const port = process.env.PORT;

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend running on port ${port}`);
});
