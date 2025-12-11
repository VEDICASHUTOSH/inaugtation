import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function GET() {
    try {
        // Test database connection with a simple query
        // postgres-js returns results as an array directly
        const result = await db.execute(sql`SELECT version()`);

        // Get the PostgreSQL version - result is an array
        const version = result[0]?.version || 'Unknown';

        return NextResponse.json({
            status: 'success',
            message: 'Database connection successful',
            database: {
                host: process.env.PG_HOST_DEV,
                database: process.env.DB_NAME_DEV,
                version: version,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Database connection error:', error);

        return NextResponse.json({
            status: 'error',
            message: 'Database connection failed',
            error: error.message,
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}
