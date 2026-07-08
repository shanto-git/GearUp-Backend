import { Status } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"


const getMyProfileFromDb = async(userId:string)=>{
    const user = await prisma.user.findFirstOrThrow({
        where:{
            id:userId
        },
        omit:{
            password:true
        },
        include:{
            profile:true,
        }
    })
    return user
}

const updateMyProfileIntoDb = async (userId:string, payload:any)=>{
    const {name,email,profilePhoto,bio}= payload;

    const updateUser= await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            name,
            email,
            profile:{
                update:{
                    profilePhoto,
                    bio
                }
            }
        },
        omit:{
            password:true
        },
        include:{
            profile:true
        }
    })
    return updateUser
}

const getAllUsersFromDb = async () => {
  const result = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      activeStatus: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserStatusIntoDb = async (
  userId: string,
  payload: { activeStatus: string } 
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      activeStatus: payload.activeStatus as Status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      activeStatus: true,
      updatedAt: true,
    },
  });

  return result;
};

export const userService ={
    getMyProfileFromDb,
    updateMyProfileIntoDb,
    getAllUsersFromDb,
    updateUserStatusIntoDb,
}