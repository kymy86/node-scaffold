
export const mongo = {
    seedDb: true,
    options:{
        user: process.env.MONGO_DB_USER,
        pass: process.env.MONGO_DB_PASS,
    },
    uri: `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DATABASE}`
};
export const cors = {
    origin: '*'
};