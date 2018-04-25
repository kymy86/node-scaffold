import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiAsPromised from 'chai-as-promised'

import mongo from '../config/mongo'
import Test from '../src/test/test.model'

chai.use(chaiHttp)
chai.use(chaiAsPromised)
global.expect = chai.expect
global.request = chai.request
global.should = chai.should

global.testHost ='http://'+process.env.SERVER_HOST+':'+process.env.PORT;

describe('Api', ()=>{
    
    let testModel
    before((done)=>{
        Test.remove().then(()=>{
            testModel = new Test({
                name:'test_name',
                lastname:'test_lastname',
                email: 'test@test.com'
            })
            testModel.save() 
            done()
        });
    })

    after((done)=>{
        Test.remove().exec()
        done()
    })

    it('GET /api/test - single object', (done)=>{
        let idTest = testModel._id.toString()
        request(testHost)
            .get(`/api/test/${idTest}`)
            .end((err, res)=>{
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('POST /api/test', (done)=>{
        request(testHost)
            .post('/api/test')
            .send({
                name:'test test name',
                lastname:'test test lastname',
                email: 'test-test@test.com'
            })
            .end((err, res)=>{
                expect(res).to.have.status(201)
                expect(res).to.be.a('object')
                expect(res.body).to.have.property('_id')
                done()
            })
    })

    it('POST /api/test - existing user', (done)=>{
        request(testHost)
            .post('/api/test')
            .send({
                name:'test test name',
                lastname:'test test lastname',
                email:'test@test.com'
            })
            .end((err, res)=>{
                expect(res).to.have.status(500)
                expect(res.body.errors).to.have.property('email')
                expect(res.body.errors.email.kind).to.equal('user defined')
                done()
            })
    })

    it('POST /api/test - required email', (done)=>{
        request(testHost)
            .post('/api/test')
            .send({
                name:'test test name',
                lastname:'test test lastname'
            })
            .end((err, res)=>{
                expect(res).to.have.status(500)
                expect(res.body.errors).to.have.property('email')
                expect(res.body.errors.email.kind).to.equal('required')
                done()
            })
    })

    it('POST /api/test - required name', (done)=>{
        request(testHost)
            .post('/api/test')
            .send({
                lastname:'test test lastname',
                email:'test@test.com'
            })
            .end((err, res)=>{
                expect(res).to.have.status(500)
                expect(res.body.errors).to.have.property('name')
                expect(res.body.errors.name.kind).to.equal('required')
                done()
            })
    })
    
    it('POST /api/test - required name & email', (done)=>{
        request(testHost)
            .post('/api/test')
            .send({
                lastname:'test test lastname',
            })
            .end((err, res)=>{
                expect(res).to.have.status(500)
                expect(res.body.errors).to.have.property('name')
                expect(res.body.errors.name.kind).to.equal('required')
                expect(res.body.errors).to.have.property('email')
                expect(res.body.errors.email.kind).to.equal('required')
                done()
            })
    })

    it('PUT /api/test', (done)=>{
        let idTest = testModel._id.toString()
        request(testHost)
            .put(`/api/test/${idTest}`)
            .send({
                name: 'test2',
                lastname:'test test lastname',
                email:'test3@test.com'
            })
            .end((err, res)=>{
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body.email).to.equal('test3@test.com')
                done()
            })
    })

    it('PUT /api/test - with no last name', (done)=>{
        let idTest = testModel._id.toString()
        request(testHost)
            .put(`/api/test/${idTest}`)
            .send({
                name: 'test2',
                email:'test3@test.com'
            })
            .end((err, res)=>{
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body.lastname).to.equal('test test lastname')
                done()
            })
    })

    it('DELETE /api/test', (done)=>{
        let idTest = testModel._id.toString()
        request(testHost)
            .delete(`/api/test/${idTest}`)
            .end((err, res)=>{
                expect(res).to.have.status(200)
                done()
            })
    })

})