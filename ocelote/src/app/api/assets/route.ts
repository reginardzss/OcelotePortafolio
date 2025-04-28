// ocelote/src/app/api/assets/route.ts
import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const media_type = searchParams.get('media_type');
  const filter = searchParams.get('filter');

  let query = supabase
    .from('assets')
    .select('*')
    .eq('media_type', media_type)
    .order('created_at', { ascending: false });

  if (filter === 'last_year') {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    query = query.gte('created_at', lastYear.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
