const mongoose = require('mongoose')

const mahasiswaSchema = new mongoose.Schema({
    nim: {
        type: String,
        required : true
    },
    nama: {
        type: String,
        required : true
    },
    alamat: {
        type: String,
        required : true
    },
    no_hp: {
        type: String,
        required : true
    }
    
})

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema)