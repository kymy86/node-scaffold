import apiTest from './test'

export default (app)=>{

    app.get('/health', (req, res) => res.status(200).send('ok'))
    app.use('/api/test', apiTest)
    //app.use('/doc', express.static(__dirname + '/../doc'))
};