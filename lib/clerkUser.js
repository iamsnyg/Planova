import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    try {
        const loggedInUser = await db?.user.findUnique({
            where: {
                clerkUserId: user.id,
            },
        });
        // console.log("db:", db.user.clerkUserId);
        // console.log("User:", user.id);
        // console.log("Logged in user:", loggedInUser?.clerkUserId);
        // console.log("-------------------------------------------------------")
        if(loggedInUser) {
            return loggedInUser;
        }

        // console.log("===================================================")
        const name = `${user.firstName} ${user.lastName}`;

        // console.log("Creating new user with name:", name);
        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name: name,
                email: user.emailAddresses[0]?.emailAddress ,
                imageUrl: user.imageUrl ,
                username: user.username ,
            },
        });

        return newUser;
    } catch (error) {
        console.error("Error fetching logged in user:", error);
        throw new Error("Unable to fetch user");
    }
}







// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "./prisma";

// export const checkUser = async () => {
//     const user = await currentUser();
//     // console.log("Current user:", user);

//     if (!user) {
//         return null;
//     }

//     // console.log("db.user.findUnique called with clerkUserId:", user.id);

//     const loggedInUser = await db.user.findUnique({
//         where: {
//             clerkUserId: user.id,
//         },
//     });

//     if (loggedInUser) {
//         return loggedInUser;
//     }

//     // console.log("Creating new user in the database...");
//     const name = `${user.firstName} ${user.lastName}`.trim() || "Anonymous";

//     const newUser = await db.user.create({
//         data: {
//             clerkUserId: user.id,
//             name,
//             email: user.emailAddresses[0]?.emailAddress || "",
//             username: user.username || "",
//             imageUrl: user.imageUrl || "",
//         },
//     });
//     return newUser;
// };