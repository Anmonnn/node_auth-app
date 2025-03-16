import { ApiError } from "../exeption/api.error.js";
import { User } from "../models/User.js";
import { emailService } from "./email.service.js";
import { v4 as uuidv4 } from "uuid";

export async function getAllActivated() {
  return User.findAll({
    where: {
      activationToken: null
    }
  })
}

function normalize({ id, email }) {
  return { id, email }
}

function findByEmail(email) {
  return User.findOne({ where: { email: email } })
}

async function register(email, password) {
  const activationToken = uuidv4();

  const existUser = await findByEmail(email)

  if (existUser) {
    throw ApiError.badRequest('User already exist', {
      email: "User already exist"
    })
  }

  await User.create({ email, password, activationToken });
  await emailService.sendActivationEmail(email, activationToken);
}

export const userService = {
  getAllActivated,
  normalize,
  findByEmail,
  register
}

