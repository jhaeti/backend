import { ConnectOptions, connect } from 'mongoose';
const uri = String(process.env.MONGO_URI);

connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions)
    .then(() => console.log('connected'))
    .catch(() => console.log('not connected'));
