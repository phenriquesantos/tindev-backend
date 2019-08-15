const Dev = require('../models/Dev');
module.exports = {
    async store(req, res){

        // Usuario que quero dar Like
        const { devId } = req.params;

        // Usuario que está dando like
        const { user } = req.headers;

        // Busca o Usuario logado pelo ID
        const loggedDev = await Dev.findById(user);

        // Busca o usuario que vai receber o Like
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists' });
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log('Deu Match !');
        }

        //Salva o like que o usuario deu
        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev);

    }
};