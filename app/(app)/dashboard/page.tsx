import { createServerClient } from '@/src/utils/supabase/server';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabaseClient = createServerClient(cookieStore);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  return (
    <div className="flex flex-col gap-l">
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
