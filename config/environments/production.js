
export const mongo = {
    seedDb: false,
    options:{
        user: process.env.MONGO_DB_USER,
        pass: process.env.MONGO_DB_PASS,
    },
    uri: `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DATABASE}`
};

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",")

export const cors = {
    origin: (origin, callback)=>{
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = "The CORS policy for this site does not "+
                      "allow access from the specified Origin"
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    }
};