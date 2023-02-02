import { ConnectOptions, connect } from 'mongoose';

import User from '../models/User';

const connectDb = (uri: string) => {
    connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
        .then(() => {
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
};

export default connectDb;
