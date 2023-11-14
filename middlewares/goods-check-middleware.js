const {Goods} = require('../models/')

module.exports = async (req, res, next) => {
    const {goodsID} = req.params
    const existGoods = await Goods.findOne({where: {goodsID}})
    if (!existGoods)
        return res
            .status(400)
            .json({errorMessage: '해당 상품이 존재하지 않습니다.'})
    res.locals.goods = existGoods
    next()
}
