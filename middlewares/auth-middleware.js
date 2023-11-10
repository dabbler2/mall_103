const {Users} = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req,res,next) => {
	const {authorization} = req.cookies
	try{
		const [authType,token] = authorization.split(' ')
		if(authType!=='Bearer' || !token)
			return res.status(401).json({errorMessage: '로그인이 필요한 페이지입니다.'})
		const {userId} = jwt.verify(token,process.env.TOKENKEY)
		const existUser = await Users.findByPk(userId)
		if(!existUser)
			return res.status(401).json({errorMessage: '로그인이 필요한 페이지입니다.'})
		res.locals.user = existUser
		next()
	}catch(e){
		//console.log(e)
		return res.status(401).json({errorMessage: '로그인이 필요한 페이지입니다.'})
	}
}