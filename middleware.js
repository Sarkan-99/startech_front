import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/auth') {
    console.log('Request from /auth:', request.cookies);

    const token = request.nextUrl.searchParams.get('token');

    if (token) {
      console.log('Token found:', token);

      const response = NextResponse.next();
      response.cookies.set('google_access_token', token, {
        path: '/',
        secure: true,
        sameSite: 'Strict',
      });

      console.log('Token stored in cookie:', response.cookies.get('google_access_token'));
      return response;
    } else {
      console.log('No token in the URL query, redirecting to login');
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    const cookieToken = request.cookies.get('google_access_token');

    if (cookieToken) {
      console.log('Token found in cookies:', cookieToken.value);

      try {
        // Verify the token
        const response = await axios.post('http://127.0.0.1:8000/api/token_verify', {}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieToken.value}`
          },
        });

        if (response.data.success) {
          console.log('Token is valid');

          // Check the role and restrict access to certain pages
          const userRole = response.data.user.role; // Assuming the role is included in the response

          if (userRole === 'admin' && (pathname.startsWith('/home') || pathname.startsWith('/home/show'))) {
            console.log('Admin cannot access Professors pages, redirecting to forbidden');
            return NextResponse.redirect(new URL('/forbidden', request.url));
          }

          if (userRole === 'professor' && (pathname.startsWith('/admin-home') || pathname.startsWith('/admin-home/admin-show'))) {
            console.log('Professor cannot access Admins pages, redirecting to forbidden');
            return NextResponse.redirect(new URL('/forbidden', request.url));
          }

          if(pathname.startsWith('/home/show') && !request.nextUrl.searchParams.get('project_id')){
            return NextResponse.redirect(new URL('/home', request.url))
          }

          if(pathname.startsWith('/admin-home/admin-show') && !request.nextUrl.searchParams.get('project_id')){
            return NextResponse.redirect(new URL('/admin-home', request.url))
          }

          return NextResponse.next();
        } else {
          console.log('Token is invalid, redirecting to login');
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch (error) {
        console.error('Error verifying token:', error.message);
        return NextResponse.redirect(new URL('/', request.url));
      }
    } else {
      console.log('No token in cookies, redirecting to login');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/home', '/home/show', '/admin-home', '/admin-home/admin-show', '/auth'],
};
