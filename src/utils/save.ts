import { Document } from 'mongoose';

const save = async (input: Document) => {
    return await input.save();
};

export default save;
