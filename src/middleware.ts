import { type NextRequest, NextResponse } from "next/server";
import moment from "moment";

export function middleware(req: NextRequest) {
  console.info(
    `[DEBUG:NEXT] ${moment().utc().format("YYYY-MM-DD HH:mm:ss")} INFO: [${req.method}]: ${req.nextUrl.pathname}`
  );

  return NextResponse.next();
}
