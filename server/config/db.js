const mongoose=require('mongoose');
const connectDB= async()=>{
    
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        
    }
}
module.exports=connectDB

// async function dropUsernameIndex() {
//     try {
//       await mongoose.connect('mongodb+srv://aghilpsstackup:VMbOKvmHblYF4uJI@cluster0.mntnr.mongodb.net/blog', { useNewUrlParser: true, useUnifiedTopology: true });
//       console.log('Connected to MongoDB');
  
//       // Drop the unique index on 'username'
//       await LoginUser.collection.dropIndex('username_1');
//       console.log('Unique index on username removed successfully');
//     } catch (error) {
//       console.error('Error dropping index:', error);
//     } finally {
//       mongoose.connection.close();
//     }
//   }
  
//   dropUsernameIndex();