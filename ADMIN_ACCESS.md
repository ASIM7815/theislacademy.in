# Admin Dashboard Access

## URL
**Admin Dashboard:** `https://yourdomain.com/islacademyadminpage7815`

Replace `yourdomain.com` with your actual domain:
- **Local Development:** `http://localhost:3000/islacademyadminpage7815`
- **Production:** `https://theislacademy.in/islacademyadminpage7815`

## Features

### 📊 Dashboard Overview
- **Total registrations count**
- **Source breakdown** (Popup vs Landing Page)
- **Real-time statistics cards**

### 🔍 Search & Filter
- Search by name, email, or phone number
- Filter by source:
  - All registrations
  - Popup only
  - Landing page only

### 📋 Registration Table
Displays all registration data:
- Name (with message if provided)
- Email (clickable mailto link)
- Phone (clickable tel link)
- Education level
- Source (Popup or Landing Page)
- Registration date & time

### 📥 Export Data
- **Export to CSV** button
- Downloads all filtered registrations
- Filename includes current date
- Opens in Excel/Google Sheets

### 🔄 Refresh Data
- Manual refresh button
- Fetches latest data from Supabase
- Updates statistics automatically

## Security Notes

⚠️ **Important:** This admin page is currently **publicly accessible** to anyone who knows the URL.

### Recommended Security Enhancements:

1. **Add Password Protection** (Simple)
   - Add a password prompt before showing data
   - Store password in environment variables

2. **Add Supabase Auth** (Recommended)
   - Implement proper authentication
   - Only allow authenticated admin users
   - Use Supabase Auth for user management

3. **Use Middleware** (Advanced)
   - Add Next.js middleware to protect the route
   - Redirect unauthorized users

4. **IP Whitelisting** (Enterprise)
   - Restrict access to specific IP addresses
   - Configure at hosting provider level

## Quick Start

1. **Run the SQL setup:**
   ```bash
   # Copy contents of supabase-setup.sql
   # Paste in Supabase SQL Editor
   # Click Run
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access admin dashboard:**
   ```
   http://localhost:3000/islacademyadminpage7815
   ```

4. **Test registration forms:**
   - Fill out popup form (appears on page load)
   - Fill out landing page form (scroll to Register section)
   - Check admin dashboard for new entries

## Troubleshooting

### "Failed to load registrations"
- Verify Supabase credentials in `.env.local`
- Check that the `registrations` table exists
- Ensure RLS policies are set correctly

### No data showing
- Submit a test registration first
- Click "Refresh Data" button
- Check browser console for errors

### CSV export not working
- Check browser's download settings
- Ensure pop-ups are not blocked
- Try a different browser

## Data Structure

Each registration contains:
```typescript
{
  id: string;              // UUID
  name: string;            // Full name
  email: string;           // Email address
  phone: string;           // Phone number
  education: string;       // Education level
  message: string | null;  // Optional message (landing page only)
  source: string;          // "popup" or "landing_page"
  created_at: string;      // ISO timestamp
}
```

## Next Steps

### Enhance Security:
See "Security Notes" section above

### Add Features:
- Email notifications for new registrations
- Delete/edit functionality
- Bulk actions
- Advanced filtering (date range, education level)
- Charts and analytics
- Print functionality

### Integrate with Other Tools:
- Google Sheets sync
- Email marketing platforms (Mailchimp, SendGrid)
- CRM systems
- Slack/Discord notifications
