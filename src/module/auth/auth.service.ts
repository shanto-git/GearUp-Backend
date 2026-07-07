import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { ILoginUser, RegisterUserPayload } from "./auth.interface";

const registerUserIntoDb = async (payload: RegisterUserPayload) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isUserExist) {
        throw new Error("User with this email already exists");
    }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where:{
        id: createUser.id,
        email: createUser.email || email,
    },
    omit:{
        password: true,
    },
    include:{
        profile: true,
    }
  })
  return user;
};

const loginUserIntoDb = async (payload: ILoginUser) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where:{email},
    })

    if(user.activeStatus === "SUSPENDED"){
        throw new Error("Your account has been suspended. Please contact support for assistance.");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
        throw new Error("Password does not match");
}
}

export const authService = {
    registerUserIntoDb,
    loginUserIntoDb,
}
