import { NextResponse } from 'next/server';

interface RequestWithUrl {
    nextUrl: {
        pathname: string;
    };
    cookies: {
        get(name: string): { value: string } | undefined;
    };
}

export function middleware(req: RequestWithUrl) {
    const { pathname } = req.nextUrl;
    const userID = req.cookies.get('userID');

    if (pathname.startsWith('/quiz') || pathname.startsWith('/result')) {
        if (!userID) {
            return NextResponse.redirect('/form');
        }
    }

    return NextResponse.next();
}