import logger from '../../config/logger'
import Test from './test.model'

export function index(req, res){
    res.json({'msg':'ok'})
}

export function create(req, res){

    let test = new Test(req.body)
    test.save().then((test)=>{
        res.status(201).json(test)
    }).catch((err)=>{
        logger.info(err)
        res.status(500).json(err)
    })
}

export function update(req, res){
    let id = req.params.id
    Test.findByIdAndUpdate(id, req.body, {new: true},(err, test)=>{
        if(err)
            res.status(500).json(err)
        else
            res.status(200).json(test)
    })
}

export function remove(req, res){
    let id = req.params.id
    Test.findByIdAndRemove(id, (err, test)=>{
        if(err)
            res.status(500).json(err)
        else
            res.status(200).end()
    })
}

export function get(req, res) {
    let id = req.params.id

    Test.findById(id, (err, test)=>{
        if(err)
            res.status(500).json(err)
        else
            res.status(200).json(test)
    })
}