const express = require('express')
const router = express.Router()
const {Goods} = require('../models/')
const authMiddleware = require('../middlewares/auth-middleware')
const goodsCheckMiddleware = require('../middlewares/goods-check-middleware') // 해당 상품이 있는지 확인

// 전체 상품 목록 조회
router.get('/goods', async(req, res) => {
	const {sort} = req.query
	const goods = await Goods.findAll({order: [['createdAt', sort==='ASC'? 'ASC':'DESC']], attributes: {exclude: ['UserId']}})
	res.json({goods})
})

// 상품 상세 조회
router.get('/goods/:goodsId', goodsCheckMiddleware, async(req, res) => {
	const {UserId,...item} = res.locals.goods.dataValues
	res.json({item})
})

// 상품 등록
router.post('/goods', authMiddleware, async(req,res) => {
	const {goodsName,comment} = req.body
	if(!goodsName)
		return res.status(400).json({message: '상품명을 입력해주세요.'})
	const {userId,userName} = res.locals.user
	await Goods.create({goodsName,comment:(comment || ''),UserName:userName,UserId:userId})
	res.status(201).json({message: '상품이 등록되었습니다.'})
})

// 상품 수정
router.put('/goods/:goodsId', authMiddleware, goodsCheckMiddleware, async(req, res) => {
	const {userId} = res.locals.user
	const existGoods = res.locals.goods
	if(userId!=existGoods.UserId)
		return res.status(401).json({message: '수정 권한이 없습니다.'})
	const {goodsName,comment,isAvailable} = req.body
	await existGoods.update({
		goodsName: goodsName || existGoods.goodsName,
		isAvailable: isAvailable==undefined? existGoods.isAvailable:Boolean(isAvailable),
		comment: comment || existGoods.comment
	})
	res.status(201).json({message: '상품 수정이 완료되었습니다.'})
})

// 상품 삭제
router.delete('/goods/:goodsId', authMiddleware, goodsCheckMiddleware, async(req, res) => {
	const {userId} = res.locals.user
	const existGoods = res.locals.goods
	if(userId!=existGoods.UserId)
		return res.status(401).json({message: '삭제 권한이 없습니다.'})
	await existGoods.destroy()
	res.method = 'GET'
	res.redirect(303,'/api/goods') // 삭제하고 상품 목록 조회로 넘어감
})

module.exports = router