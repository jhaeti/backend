import { ConnectOptions, connect } from 'mongoose';
const uri =
    (process.env.NODE_ENV === 'test' && process.env.MONGO_TEST_URI) || process.env.MONGO_URI;

console.log(uri);

connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(() => console.log('connected'))
    .catch(() => console.log('not connected'));
