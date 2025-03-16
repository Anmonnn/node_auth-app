import { User } from '../models/User.js';
import { userService } from '../services/user.service.js';
import { jwtService } from '../services/jwt.service.js';
import { ApiError } from '../exeption/api.error.js';
import bcrypt from 'bcrypt';
import { tokenService } from '../services/token.service.js';
//npm i jsonwebtoken
//npm i bcrypt
//npm i 'cookie-parser'

function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

function validatePassword(value) {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password)
  }

  if (errors.email || errors.password) {
    throw ApiError.badRequest('Bad request', errors)
  }

  const hashedPass = await bcrypt.hash(password, 5)
  await userService.register(email, hashedPass)

  res.send({ message: 'OK' });
};

const activate = async (req, res) => {
  const { activationToken } = req.params;
  const user = await User.findOne({ where: { activationToken } })

  if (!user) {
    res.sendStatus(404);
    return;
  }

  user.activationToken = null;
  user.save() // щоб зберегти зміни а саме значення нулл

  res.send(user)
}

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);

  if (!user) {
    throw ApiError.badRequest('No such user')
  }

  const isPasswordValid = bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw ApiError.badRequest('Wrong password')
  }

  //npm i jsonwebtoken
  //npm i bcrypt

  await generateTokens(res, user)
}

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  const userData = await jwtService.verifyRefresh(refreshToken);
  const token = await tokenService.getByToken(refreshToken);

  if (!userData || !token) {
    throw ApiError.unauthorized()
  }

  const user = await userService.findByEmail(userData.email)
  await generateTokens(res, user)
}

const generateTokens = async (res, user) => {
  const normalaizedUser = userService.normalize(user)
  const accessToken = jwtService.sign(normalaizedUser)
  const refreshAccessToken = jwtService.signRefresh(normalaizedUser)

  await tokenService.save(normalaizedUser.id, refreshAccessToken);

  res.cookie('refreshToken', refreshAccessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    HttpOnly: true,
  })
  res.send({ user: normalaizedUser, accessToken })
}

const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  const userData = await jwtService.verifyRefresh(refreshToken);

  if (!userData || !refreshToken) {
    throw ApiError.unauthorized()
  }

  await tokenService.remove(userData.id)

  res.sendStatus(204);
}

export const authController = {
  register,
  activate,
  login,
  refresh,
  logout
};
