import mongoose from 'mongoose';

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://Rmnops:123123123@cluster0.dmkys6s.mongodb.net/UMKC-Marketplace').then(()=>console.log("DB connected"));
}

