import { prisma } from "../../lib/prisma";
const getMyProfileFromDb = async (userId) => {
    const user = await prisma.user.findFirstOrThrow({
        where: {
            id: userId
        },
        omit: {
            password: true
        },
        include: {
            profile: true,
        }
    });
    return user;
};
const updateMyProfileIntoDb = async (userId, payload) => {
    const { name, email, profilePhoto, bio } = payload;
    const updateUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name,
            email,
            profile: {
                update: {
                    profilePhoto,
                    bio
                }
            }
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    });
    return updateUser;
};
export const userService = {
    getMyProfileFromDb,
    updateMyProfileIntoDb,
};
