const Dev = require('../models/Dev');
module.exports = {
    async store(req, res){

        // Usuario que quero dar deslike
        const { devId } = req.params;

        // Usuario que está dando deslike
        const { user } = req.headers;

        // Busca o Usuario logado pelo ID
        const loggedDev = await Dev.findById(user);

        // Busca o usuario que vai receber o deslike
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists' });
        }
        //Salva o deslike que o usuario deu
        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);

    }
};