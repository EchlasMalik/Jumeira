import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

const token = process.env.SANITY_API_READ_TOKEN;

export async function GET(request: Request) {
    await (await draftMode()).disable();
    return NextResponse.redirect(new URL("/", request.url));
}