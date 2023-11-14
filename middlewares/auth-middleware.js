const {Users} = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req,res,next) => {
	const {authorization} = req.cookies
	try{
		const [authType,token] = authorization.split(' ')
		if(authType!=='Bearer' || !token)
			return res.status(401).json({message: '로그인이 필요한 페이지입니다.'})
		const {userID} = jwt.verify(token,process.env.TOKEN_KEY)
		const existUser = await Users.findByPk(userID)
		if(!existUser)
			return res.status(401).json({message: '로그인이 필요한 페이지입니다.'})
		res.locals.user = existUser
		next()
	}catch(e){
		//console.log(e)
		return res.status(401).json({message: '로그인이 필요한 페이지입니다.'})
	}
}