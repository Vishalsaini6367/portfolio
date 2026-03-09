import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    try {
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        return NextResponse.json(projects);
    } catch (err: any) {
        console.error('Error fetching projects:', err);
        return NextResponse.json({ error: 'Failed to fetch projects.' }, { status: 500 });
    }
}
