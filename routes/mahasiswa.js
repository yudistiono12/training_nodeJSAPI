const express = require('express')
const router = express.Router()
const Mahasiswa = require('../models/mahasiswa')



// Getting All 
router.get('/', async (req, res) =>{
    try {
        const mahasiswa = await Mahasiswa.find()
        res.json(mahasiswa)
    } catch (err) {
        res.status(500).json({message: err.message})
    }  
})
// Getting One
router.get('/:id', getMahasiswa, (req, res) =>{
    res.send(res.mahasiswa)
})

// Creating One
router.post('/', async (req, res) =>{
    const mahasiswa = new Mahasiswa({
        nim : req.body.nim,
        nama : req.body.nama,
        alamat : req.body.alamat,
        no_hp: req.body.no_hp
    })
    try {
        const newMahasiswa = await mahasiswa.save()
        res.status(201).json(newMahasiswa)
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})
// Update One
router.patch('/:id', getMahasiswa, async(req, res) =>{
    if (req.body.nim != null) {
        res.mahasiswa.nim = req.body.nim
    }
    if (req.body.nama != null) {
        res.mahasiswa.nama = req.body.nama
    }
    if (req.body.alamat != null) {
        res.mahasiswa.alamat = req.body.alamat
    }
    if (req.body.no_hp != null) {
        res.mahasiswa.no_hp = req.body.no_hp
    }
    try {
        const updateMahasiswa = await res.mahasiswa.save()
        res.json(updateMahasiswa)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
// Delete One
router.delete('/:id', getMahasiswa, async (req, res) =>{
    try {
        await res.mahasiswa.remove()
        res.json({ message: 'menghapus mahasiswa'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getMahasiswa(req, res, next) {
    let mahasiswa
    try {
        mahasiswa = await Mahasiswa.findById(req.params.id)
        if (mahasiswa == null) {
            return res.status(404).json({ message: 'tidak dapat menemukan mahasiswa tersebut'})
        }
    } catch (err) {
        return res.status(500).json({message : err.message})        
    }
    
    res.mahasiswa = mahasiswa
    next()
}


module.exports = router