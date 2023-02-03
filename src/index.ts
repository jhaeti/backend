import app from './app';
import User from './models/User';
import connectDb from './utils/connectDb';
import defaultAdmin from './utils/defaultAdmin';

const port = process.env.PORT;

app.listen(port, '0.0.0.0', async () => {
    console.log(`Backend running on port ${port}`);
    const uri = process.env.MONGO_URI;
    await connectDb(uri);

    const {
        DEFAULT_ADMIN_NAME: name,
        DEFAULT_ADMIN_EMAIL: email,
        DEFAULT_ADMIN_PASSWORD: password,
    } = process.env;
    await defaultAdmin({ name, email, password });
});
