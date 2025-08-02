import 'dotenv/config';   

import {app} from './src/app.js'
import {connectDB} from './src/config/db.config.js'



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(` Server is running at port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGO db conneection failed !!!",err); 
    
})