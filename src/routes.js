const { Router } = require('express');
const routes = Router();

routes.post('/sales', (req, res) => {
  const { productName, infos } = req.body;

  if (!productName) {
    // return res
    //   .status(400)
    //   .json({ message: 'O campo productName é obrigatório' });
    throw { status: 400, message: 'O campo productName é obrigatório' };
  }
  if (productName.length < 4) {
    return res.status(400).json({
      message: 'O campo productName deve ter pelo menos 4 caracteres',
    });
  }
  if (!infos) {
    return res.json({ message: 'O campo infos é obrigatório' });
  }
  if (!infos.saleDate) {
    return res.status(400).json({
      message: 'O campo saleDate é obrigatório',
    });
  }
  if (!infos.warrantyPeriod) {
    return res.status(400).json({
      message: 'O campo warrantyPeriod é obrigatório',
    });
  }
  if (!infos.saleDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    return res.status(400).json({
      message:
        'O campo saleDate deve conter uma data válida no padrão dd/mm/aaaa',
    });
  }

  if (infos.warrantyPeriod < 1 || infos.warrantyPeriod > 3) {
    return res.status(400).json({
      message: 'O campo warrantyPeriod deve ser um número inteiro entre 1 e 3',
    });
  }

  const sale = { productName, infos };
  return res.json(sale);
});

module.exports = routes;
