import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fail soft in local/dev if env vars are missing, instead of crashing every route.
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          supabaseResponse = NextResponse.next({
            request,
          });
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isPublicPage = pathname === '/' || pathname.startsWith('/legal') || pathname.startsWith('/api') || pathname.startsWith('/auth/callback');
  const isAdminRoute = pathname.startsWith('/admin');

  // Not logged in — redirect to login (unless public/auth page)
  if (!user && !isAuthPage && !isPublicPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Logged in user
  if (user) {
    // Redirect away from auth pages
    if (isAuthPage) {
      const url = request.nextUrl.clone();
      // Check if superadmin to redirect to correct area
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_superadmin')
        .eq('id', user.id)
        .single();

      url.pathname = profile?.is_superadmin ? '/admin' : '/dashboard';
      return NextResponse.redirect(url);
    }

    // Role-based routing
    if (isAdminRoute || (!isPublicPage && !isAuthPage)) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_superadmin')
        .eq('id', user.id)
        .single();

      const isSuperAdmin = profile?.is_superadmin === true;

      // Superadmin trying to access regular app → redirect to /admin
      if (isSuperAdmin && !isAdminRoute && !isPublicPage) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      }

      // Non-superadmin trying to access admin → redirect to /dashboard
      if (!isSuperAdmin && isAdminRoute) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
