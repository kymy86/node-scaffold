import mongoose, {Schema} from 'mongoose'

var TestSchema = new Schema({
    name: {type: String, required:[true, "Name cannot be blank"]},
    lastname: String,
    email: {type: String, lowercase: true, required:[true, "Email cannot be blank"]},
    createdAt: Date
})

TestSchema.virtual('profile').get(function(){
    return `${this.name} ${this.surname}`
})

TestSchema.path('email')
    .validate({
        isAsync: true,
        validator: function(value, respond){
         this.constructor.findOne({email:value}).exec()
            .then((test)=>{
                if(test){
                    if(this.email === test.email)
                        respond(false)
                    respond(false)
                }
                respond(true)
            }).catch((err)=>{ throw err });
        },
        message: 'The email is already in used'
    })


TestSchema.pre('save', function(next){
    if(!this.isNew){
        this.createdAt = new Date()
        return next()
    }
    return next()
})

export default mongoose.model('Test', TestSchema)