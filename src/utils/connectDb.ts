import { ConnectOptions, connect } from 'mongoose';

const connectDb = async (uri: string) => {
    try {
        await connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.info('Mongodb Connected...');
    } catch (e) {
        console.log('not connected');
    }
};

export default connectDb;
