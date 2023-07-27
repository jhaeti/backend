import User from '../models/User';
import save from './save';

const defaultAdmin = async function (adminInputs: {
    name: string;
    email: string;
    password: string;
}) {
    try {
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            const defaultAdminUser = new User({
                name: adminInputs.name,
                email: adminInputs.email,
                password: adminInputs.password,
                role: 'admin',
            });
            await save(defaultAdminUser);
        }
        console.log('Admin Present');
    } catch (e) {
        console.log('not connect to db');
    }
};

export default defaultAdmin;
