import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('contacts')
            .insert([{ name, email, message }]);

        if (error) throw error;

        console.log(`Contact message saved from ${name} (${email}): ${message}`);
        return NextResponse.json({ success: true, message: 'Message sent and stored successfully.' }, { status: 200 });
    } catch (err: any) {
        console.error('Error saving contact:', err);
        return NextResponse.json({ error: 'Failed to process message.' }, { status: 500 });
    }
}
