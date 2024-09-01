
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCK_SECRET_KEY!
});

export async function POST(request: Request) {
    console.log("Liveblocks auth request", request);
    const authorization = await auth();
    const user = await currentUser();

    console.log("Authorization", authorization);
    console.log("User", user);

    if (!authorization || !user) {
        console.log("Unauthorized");
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json()
    console.log("Room", room);

    const board = await convex.query(api.board.get, { id: room })

    console.log("Board", board);

    if (board?.orgId !== authorization.orgId) {
        console.log("Unauthorized");
        return new Response("Unauthorized", { status: 403 });
    }


    const session = liveblocks.prepareSession(
        user.id,
        {
            userInfo: {
                name: user.firstName,
                picture: user.imageUrl
            }
        }
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();

    console.log("Session authorization response", status, body);

    return new Response(body, { status });
}
