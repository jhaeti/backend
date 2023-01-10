import { ConnectOptions, connect } from 'mongoose';

import User from '../models/User';

const uri =
    (process.env.NODE_ENV === 'test' && process.env.MONGO_TEST_URI) || process.env.MONGO_URI;

console.log(uri);
connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(async () => {
        console.info('Mongodb Connected...');
    })
    .catch(() => console.log('not connected'));

(async function () {
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
        const {
            DEFAULT_ADMIN_NAME: name,
            DEFAULT_ADMIN_EMAIL: email,
            DEFAULT_ADMIN_PASSWORD: password,
        } = process.env;
        const defaultAdminUser = new User({
            name,
            email,
            password,
            role: 'admin',
        });
        await defaultAdminUser.save();
    }
    console.log('Admin Present');
})();
