const express = require('express')
//const {Op} = require('sequelize')
const {Users} = require('../models/')
const sha256 = require('js-sha256').sha256
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')
require('dotenv').config()

const router = express.Router()

// 전체 유저 확인용
router.get('/0', async(req,res) => {
	const userList = await Users.findAll()
	res.json({userList})
})

// 비밀번호 해시 생성
let hash = (pw,key) => sha256(String.fromCharCode(...[...pw].map((c,i) => c.charCodeAt()+key.charCodeAt(i%key.length))))

// 회원가입
router.post('/users', async(req,res) => {
	const {email,name,password,confirmPW} = req.body
	if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) || email.length>100)
		return res.status(400).json({errorMessage: "이메일이 형식에 맞지 않거나 100글자를 초과합니다."})
	if(!name || name.length>50)
		return res.status(400).json({errorMessage: "이름은 1글자 이상 50글자 이하여야 합니다."})
	if(password.length<6 || password.length>20)
		return res.status(400).json({errorMessage: "비밀번호는 6글자 이상 20글자 이하여야 합니다."})
	if(password!==confirmPW)
		return res.status(400).json({errorMessage: "확인용 비밀번호가 일치하지 않습니다."})
	const existUser = await Users.findOne({where:{email}})
	if(existUser)
		return res.status(400).json({errorMessage: (existUser.email===email? "이메일이":"ID가")+" 이미 사용중입니다."})
	const hashPW = hash(password,process.env.HASHKEY)
	await Users.create({email,name,hashPW})
	res.json({email,name,message:"회원가입이 완료되었습니다."})
})

// 로그인
router.post('/auth', async(req,res) => {
	const {email,password} = req.body
	console.log(process.env.TOKENKEY)
	const existUser = await Users.findOne({where:{email}})
	if(!existUser)
		return res.status(400).json({errorMessage: "이메일이나 비밀번호를 확인해주세요."})
	const hashPW = hash(password,process.env.HASHKEY)
	if(existUser.hashPW!==hashPW)
		return res.status(400).json({errorMessage: "이메일이나 비밀번호를 확인해주세요."})
	const token = jwt.sign({userId:existUser.userId},process.env.TOKENKEY,{expiresIn: '12h'})
	res.cookie("authorization",`Bearer ${token}`)
	res.json({message:"로그인에 성공했습니다."})
})

// 내 정보
router.get('/users/me', authMiddleware, async(req,res) => {
	const {email,name,createdAt,updatedAt} = res.locals.user
	res.json({email,name,createdAt,updatedAt})
})

module.exports = router