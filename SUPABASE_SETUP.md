# Supabase Integration Setup Guide

## 1. Database Setup

### Step 1: Create the Table
1. Go to your Supabase Dashboard: https://app.supabase.com
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-setup.sql`
4. Click **Run** to execute the SQL

This will create:
- `registrations` table with all necessary columns
- Indexes for better performance
- Row Level Security (RLS) policies
- Automatic timestamp updates

### Step 2: Verify Table Creation
1. Go to **Table Editor** in Supabase Dashboard
2. You should see the `registrations` table with these columns:
   - `id` (UUID, Primary Key)
   - `name` (VARCHAR)
   - `email` (VARCHAR)
   - `phone` (VARCHAR)
   - `education` (VARCHAR)
   - `message` (TEXT, nullable)
   - `source` (VARCHAR - either 'popup' or 'landing_page')
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

## 2. Environment Variables

The `.env.local` file has been created with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Note:** This file is already in `.gitignore` and won't be committed to Git.

## 3. Installation

The Supabase client has been installed:
```bash
npm install @supabase/supabase-js
```

## 4. How It Works

### Registration Flow:
1. User fills out the form (popup or landing page)
2. Form data is validated
3. Data is saved to Supabase `registrations` table
4. WhatsApp link opens with pre-filled message
5. Success/error message is shown to user

### Data Stored:
- **Popup Form**: name, email, phone, education, source='popup'
- **Landing Page Form**: name, email, phone, education, message (optional), source='landing_page'

### Files Modified:
- `src/lib/supabase.ts` - Supabase client configuration
- `src/components/RegistrationPopup.tsx` - Popup form with Supabase integration
- `src/components/Registration.tsx` - Landing page form with Supabase integration

## 5. Testing

### Test the Integration:
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Fill out either form (popup or landing page)

4. Check Supabase Dashboard → Table Editor → registrations
   - You should see the new entry

### Verify Data:
- Check that all fields are populated correctly
- Verify `source` field shows 'popup' or 'landing_page'
- Confirm timestamps are set automatically

## 6. Viewing Registrations

### Admin Dashboard:
Access the admin dashboard at: **https://yourdomain.com/islacademyadminpage7815**

Features:
- View all registrations in a table
- Filter by source (popup or landing page)
- Search by name, email, or phone
- Export data to CSV
- Real-time statistics
- Clickable email and phone links

### In Supabase Dashboard:
1. Go to **Table Editor**
2. Select `registrations` table
3. View all submissions with filters and sorting

### Query Examples:
```sql
-- Get all registrations
SELECT * FROM registrations ORDER BY created_at DESC;

-- Get only popup registrations
SELECT * FROM registrations WHERE source = 'popup';

-- Get registrations from last 7 days
SELECT * FROM registrations 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Count registrations by source
SELECT source, COUNT(*) as count 
FROM registrations 
GROUP BY source;
```

## 7. Security

### Row Level Security (RLS):
- **Public Insert**: Anyone can submit registration forms
- **Authenticated Read**: Only authenticated users can view registrations
- This prevents unauthorized access to user data

### Best Practices:
- Never commit `.env.local` to Git (already in .gitignore)
- Use the anon key for client-side operations
- Keep the service role key secure (server-side only)

## 8. Troubleshooting

### Issue: "Failed to save registration"
- Check Supabase Dashboard → Settings → API to verify credentials
- Ensure the table was created successfully
- Check browser console for detailed error messages

### Issue: RLS Policy Errors
- Verify RLS policies are enabled
- Check that the "Allow public inserts" policy exists
- Test with Supabase SQL Editor

### Issue: Environment Variables Not Loading
- Restart the development server after creating `.env.local`
- Verify file name is exactly `.env.local` (not `.env`)
- Check that variables start with `NEXT_PUBLIC_` for client-side access

## 9. Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Never expose the service role key in client-side code

3. Consider adding rate limiting for form submissions

## 10. Next Steps

### Optional Enhancements:
- Add email notifications when new registrations arrive
- Create an admin dashboard to view registrations
- Add duplicate email detection
- Implement form validation with Zod or Yup
- Add reCAPTCHA to prevent spam
- Export registrations to CSV/Excel

### Supabase Features to Explore:
- **Realtime**: Get live updates when new registrations arrive
- **Storage**: Store uploaded documents (if needed)
- **Auth**: Add admin authentication for viewing registrations
- **Edge Functions**: Add server-side validation or email sending
