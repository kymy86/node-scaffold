
export const mongo = {
    seedDb: true,
    options:{
        user: `${process.env.MONGO_DB_USER}-test`,
        pass: `${process.env.MONGO_DB_PASS}-test`,
    },
    uri: `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DATABASE}_test`
};

export const cors = {
    origin: '*'
};