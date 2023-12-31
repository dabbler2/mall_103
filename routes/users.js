const express = require('express')
//const {Op} = require('sequelize')
const {Users} = require('../models/')
const sha256 = require('js-sha256').sha256
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')
require('dotenv').config()

const router = express.Router()

// 회원가입
router.post('/users', async (req, res) => {
    const {email, userName, password, confirmPW} = req.body
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) || email.length > 100)
        return res.status(400).json({
            message: '이메일이 형식에 맞지 않거나 100글자를 초과합니다.'
        })
    if (!userName || userName.length > 50)
        return res
            .status(400)
            .json({message: '이름은 1글자 이상 50글자 이하여야 합니다.'})
    if (password.length < 6 || password.length > 20)
        return res
            .status(400)
            .json({message: '비밀번호는 6글자 이상 20글자 이하여야 합니다.'})
    if (password !== confirmPW)
        return res
            .status(400)
            .json({message: '확인용 비밀번호가 일치하지 않습니다.'})
    const existUser = await Users.findOne({where: {email}})
    if (existUser)
        return res.status(400).json({message: '이메일이 이미 사용중입니다.'})
    const hashPW = sha256(password)
    await Users.create({email, userName, hashPW})
    res.status(201).json({
        email,
        userName,
        message: '회원가입이 완료되었습니다.'
    })
})

// 로그인
router.post('/auth', async (req, res) => {
    const {email, password} = req.body
    const existUser = await Users.findOne({where: {email}})
    if (!existUser)
        return res
            .status(400)
            .json({message: '이메일이나 비밀번호를 확인해주세요.'})
    const hashPW = sha256(password)
    if (existUser.hashPW !== hashPW)
        return res
            .status(400)
            .json({message: '이메일이나 비밀번호를 확인해주세요.'})
    const token = jwt.sign({userID: existUser.userID}, process.env.TOKEN_KEY, {
        expiresIn: '12h'
    })
    res.cookie('authorization', `Bearer ${token}`)
    res.json({message: '로그인에 성공했습니다.'})
})

// 내 정보
router.get('/users/me', authMiddleware, async (req, res) => {
    const {email, userName, createdAt, updatedAt} = res.locals.user
    res.json({email, userName, createdAt, updatedAt})
})

module.exports = router
