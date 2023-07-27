import connectDb from './connectDb';

const connectTestDb = async () => {
    const uri = process.env.MONGO_TEST_URI as string;
    await connectDb(uri);
};

export default connectTestDb;
