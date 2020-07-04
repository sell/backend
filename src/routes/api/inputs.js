const express = require('express')
const router = express.Router();
const {mongoose, schema} = require('mongoose');

const Item = require('../../models/input');


router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    const name = req.body.name;
    const maybeResult = await Item.findOne({ name });

    if(maybeResult) {
        maybeResult.lastSearched = Date.now();
        maybeResult.amount++;

        await maybeResult.save()
        .catch(console.error);

        return res.end();
    }

    const now = Date.now();

    const dataset = await Item.create({
        lastSearched: now,
        firstSearched: now,
        amount: 1,
        name,
    });

    return res.json(dataset)
})

router.delete('/:id', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    const { id } = req.params;

    const dataset = await Item.findById(id);

    if(!dataset) {
        return res.status(404).json({success: false});
    }

    await dataset.remove()
        .catch(console.error);

    return res.status(200).json({success: true });
})
module.exports = router;