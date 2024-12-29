import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user } = await req.json();

  console.log({user})

  try {
    const userInDb = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress.emailAddress));

    console.log({userInDb});

    if (userInDb.length === 0) {
      const results = await db.insert(Users).values({
        name: user?.fullName,
        email: user?.primaryEmailAddress.emailAddress,
        imageUrl: user?.imageUrl,
        // credits: 0,
      }).returning({ users: Users.id });

      console.log(results);

      return NextResponse.json({ result: results });
    }

    return NextResponse.json({ result: userInDb[0] });

  } catch (error) {
    return NextResponse.json({ error });
  }
}