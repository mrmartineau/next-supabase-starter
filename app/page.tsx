import { Container } from '@/src/components/Container';
import { Flex } from '@/src/components/Flex';
import { Link } from '@/src/components/Link';
import { SidebarLink } from '@/src/components/SidebarLink';
import { CONTENT, ROUTES } from '@/src/constants';
import { createServerClient } from '@/src/utils/supabase/server';
import { UserCircle } from '@phosphor-icons/react/dist/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Index() {
  const cookieStore = cookies();
  const supabaseClient = createServerClient(cookieStore);
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  // If there is a session, redirect to the app home page
  // if (session) {
  //   redirect(ROUTES.DASHBOARD);
  // }

  return (
    <Container variant="auth" className="text-center">
      <h2 className="mt-s">{CONTENT.appName}</h2>
      <Flex align="center" justify="center" gapX="xs" className="my-s">
        {session ? (
          <SidebarLink href={ROUTES.DASHBOARD}>
            <UserCircle weight="duotone" width="18" height="18" />
            {CONTENT.appNav}
          </SidebarLink>
        ) : (
          <>
            <SidebarLink href={ROUTES.SIGNIN}>
              <UserCircle weight="duotone" width="18" height="18" />
              {CONTENT.signInTitle}
            </SidebarLink>
            <SidebarLink href={ROUTES.SIGNUP}>
              <UserCircle weight="duotone" width="18" height="18" />
              {CONTENT.signupTitle}
            </SidebarLink>
          </>
        )}
      </Flex>
    </Container>
  );
}
