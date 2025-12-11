import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq, ilike, and, sql } from 'drizzle-orm';

/**
 * GET /api/users
 * Retrieve all users with optional filters for report_status and name
 * Query params:
 * - report_status: Filter by report status (PENDING or DONE)
 * - name: Filter by name (case-insensitive partial match)
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const reportStatus = searchParams.get('report_status');
        const nameFilter = searchParams.get('name');

        // Build filter conditions
        const conditions = [];

        if (reportStatus) {
            // Validate report_status value
            if (!['PENDING', 'DONE'].includes(reportStatus.toUpperCase())) {
                return NextResponse.json({
                    status: 'error',
                    message: 'Invalid report_status value. Must be PENDING or DONE',
                    timestamp: new Date().toISOString(),
                }, { status: 400 });
            }
            conditions.push(eq(users.report_status, reportStatus.toUpperCase()));
        }

        if (nameFilter) {
            // Use sql template for case-insensitive partial matching
            conditions.push(sql`${users.name} ILIKE ${`%${nameFilter}%`}`);
        }

        // Query database with filters
        let result;
        if (conditions.length > 0) {
            result = await db.select().from(users).where(and(...conditions));
        } else {
            result = await db.select().from(users);
        }

        return NextResponse.json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: result,
            count: result.length,
            filters: {
                report_status: reportStatus || null,
                name: nameFilter || null,
            },
            timestamp: new Date().toISOString(),
        }, { status: 200 });

    } catch (error) {
        console.error('Error retrieving users:', error);

        return NextResponse.json({
            status: 'error',
            message: 'Failed to retrieve users',
            error: error.message,
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}

/**
 * POST /api/users
 * Create a new inauguration user with comprehensive validation
 */
export async function POST(request) {
    try {
        // Parse request body
        const body = await request.json();

        // Validation object to collect all errors
        const errors = {};

        // Required field validations
        if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
            errors.name = 'Name is required and must be a non-empty string';
        }

        if (body.email) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
                errors.email = 'Email must be a valid email address';
            } else if (body.email.length > 256) {
                errors.email = 'Email must not exceed 256 characters';
            }
        }

        // Birth date validations (day, month, year)
        if (body.day === undefined || body.day === null) {
            errors.day = 'Day is required';
        } else if (!Number.isInteger(body.day) || body.day < 1 || body.day > 31) {
            errors.day = 'Day must be an integer between 1 and 31';
        }

        if (body.month === undefined || body.month === null) {
            errors.month = 'Month is required';
        } else if (!Number.isInteger(body.month) || body.month < 1 || body.month > 12) {
            errors.month = 'Month must be an integer between 1 and 12';
        }

        if (body.year === undefined || body.year === null) {
            errors.year = 'Year is required';
        } else if (!Number.isInteger(body.year) || body.year < 1900 || body.year > new Date().getFullYear()) {
            errors.year = `Year must be an integer between 1900 and ${new Date().getFullYear()}`;
        }

        // Birth time validations (hour, minute)
        if (body.hour === undefined || body.hour === null) {
            errors.hour = 'Hour is required';
        } else if (!Number.isInteger(body.hour) || body.hour < 0 || body.hour > 23) {
            errors.hour = 'Hour must be an integer between 0 and 23';
        }

        if (body.minute === undefined || body.minute === null) {
            errors.minute = 'Minute is required';
        } else if (!Number.isInteger(body.minute) || body.minute < 0 || body.minute > 59) {
            errors.minute = 'Minute must be an integer between 0 and 59';
        }

        // Optional field validations
        if (body.gender !== undefined && body.gender !== null) {
            if (typeof body.gender !== 'string') {
                errors.gender = 'Gender must be a string';
            } else if (body.gender.length > 10) {
                errors.gender = 'Gender must not exceed 10 characters';
            }
        }

        if (body.language !== undefined && body.language !== null) {
            if (typeof body.language !== 'string') {
                errors.language = 'Language must be a string';
            } else if (body.language.length > 20) {
                errors.language = 'Language must not exceed 20 characters';
            }
        }

        // Geographic coordinates validations
        if (body.lat !== undefined && body.lat !== null) {
            const lat = parseFloat(body.lat);
            if (isNaN(lat) || lat < -90 || lat > 90) {
                errors.lat = 'Latitude must be a number between -90 and 90';
            }
        }

        if (body.lon !== undefined && body.lon !== null) {
            const lon = parseFloat(body.lon);
            if (isNaN(lon) || lon < -180 || lon > 180) {
                errors.lon = 'Longitude must be a number between -180 and 180';
            }
        }

        // Timezone validation
        if (body.tzone !== undefined && body.tzone !== null) {
            const tzone = parseFloat(body.tzone);
            if (isNaN(tzone) || tzone < -12 || tzone > 14) {
                errors.tzone = 'Timezone must be a number between -12 and 14';
            }
        }

        // If there are any validation errors, return them
        if (Object.keys(errors).length > 0) {
            return NextResponse.json({
                status: 'error',
                message: 'Validation failed',
                errors: errors,
                timestamp: new Date().toISOString(),
            }, { status: 400 });
        }

        // Prepare data for insertion
        const userData = {
            name: body.name.trim(),
            day: body.day,
            month: body.month,
            year: body.year,
            hour: body.hour,
            minute: body.minute,
        };

        // Add email if provided
        if (body.email !== undefined && body.email !== null) {
            userData.email = body.email.trim().toLowerCase();
        }

        // Add optional fields if provided
        if (body.birthPlace !== undefined && body.birthPlace !== null) {
            userData.birthPlace = body.birthPlace;
        }
        if (body.country !== undefined && body.country !== null) {
            userData.country = body.country;
        }
        if (body.gender !== undefined && body.gender !== null) {
            userData.gender = body.gender;
        }
        if (body.language !== undefined && body.language !== null) {
            userData.language = body.language;
        }
        if (body.tzone !== undefined && body.tzone !== null) {
            userData.tzone = parseFloat(body.tzone);
        }
        if (body.lat !== undefined && body.lat !== null) {
            userData.lat = parseFloat(body.lat);
        }
        if (body.lon !== undefined && body.lon !== null) {
            userData.lon = parseFloat(body.lon);
        }
        if (body.contact !== undefined && body.contact !== null) {
            userData.contact = body.contact;
        }

        // Insert into database
        const result = await db.insert(users).values(userData).returning();

        return NextResponse.json({
            status: 'success',
            message: 'User created successfully',
            data: result[0],
            timestamp: new Date().toISOString(),
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating user:', error);

        // Handle unique constraint violations (e.g., duplicate email)
        if (error.code === '23505') {
            return NextResponse.json({
                status: 'error',
                message: 'A user with this email already exists',
                timestamp: new Date().toISOString(),
            }, { status: 409 });
        }

        // Handle other database errors
        return NextResponse.json({
            status: 'error',
            message: 'Failed to create user',
            error: error.message,
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}

/**
 * PATCH /api/users
 * Update report_status for a specific user
 * Request body:
 * - id: User ID (required)
 * - report_status: New status value - PENDING or DONE (required)
 */
export async function PATCH(request) {
    try {
        const body = await request.json();

        // Validation
        if (!body.id) {
            return NextResponse.json({
                status: 'error',
                message: 'User ID is required',
                timestamp: new Date().toISOString(),
            }, { status: 400 });
        }

        if (!body.report_status) {
            return NextResponse.json({
                status: 'error',
                message: 'report_status is required',
                timestamp: new Date().toISOString(),
            }, { status: 400 });
        }

        // Validate report_status value
        const validStatuses = ['PENDING', 'DONE'];
        const reportStatus = body.report_status.toUpperCase();

        if (!validStatuses.includes(reportStatus)) {
            return NextResponse.json({
                status: 'error',
                message: `Invalid report_status. Must be one of: ${validStatuses.join(', ')}`,
                timestamp: new Date().toISOString(),
            }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.id, body.id));

        if (existingUser.length === 0) {
            return NextResponse.json({
                status: 'error',
                message: 'User not found',
                timestamp: new Date().toISOString(),
            }, { status: 404 });
        }

        // Update the report_status
        const result = await db
            .update(users)
            .set({ report_status: reportStatus })
            .where(eq(users.id, body.id))
            .returning();

        return NextResponse.json({
            status: 'success',
            message: 'Report status updated successfully',
            data: result[0],
            timestamp: new Date().toISOString(),
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating report status:', error);

        return NextResponse.json({
            status: 'error',
            message: 'Failed to update report status',
            error: error.message,
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}
