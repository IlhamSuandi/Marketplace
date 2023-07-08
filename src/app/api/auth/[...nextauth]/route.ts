import { authOptions } from "@/app/utils/authOptions";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
