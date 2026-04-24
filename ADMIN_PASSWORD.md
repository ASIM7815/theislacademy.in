# 🔐 Admin Dashboard - Password Protected

## Access Information

### URL
**Admin Dashboard:** `https://yourdomain.com/islacademyadminpage7815`

### Password
```
ISLACADEMY7815@islec#
```

**IMPORTANT:** Keep this password secure and do not share publicly!

---

## Features

### 🔒 Password Protection
- Secure login screen on first access
- Password stored in environment variables
- Session persists in browser localStorage
- Logout button to clear session

### 📊 Analytics & Charts (Apache ECharts)

#### 1. **Daily Registrations Line Chart**
- Shows registration trends over time
- Smooth line with gradient area fill
- Coral/pink color scheme
- Helps identify growth patterns

#### 2. **Peak Registration Hours Bar Chart**
- 24-hour breakdown of registrations
- Gradient bars (coral to gold)
- Identifies best times for engagement
- Useful for scheduling campaigns

#### 3. **Registration Source Pie Chart**
- Donut chart showing popup vs landing page
- Purple gradient colors
- Percentage breakdown
- Helps measure form effectiveness

#### 4. **Education Level Distribution Pie Chart**
- Shows which education levels register most
- Colorful gradient palette
- Helps target marketing efforts
- Identifies primary audience

### 📈 Statistics Cards
- **Total Registrations** (Purple gradient)
- **Popup Form Count** (Blue gradient)
- **Landing Page Count** (Green gradient)

### 🔍 Search & Filter
- Search by name, email, or phone
- Filter by source (All/Popup/Landing Page)
- Real-time filtering

### 📋 Data Table
- Complete registration details
- Clickable email (mailto:) and phone (tel:) links
- Shows optional messages
- Sortable and filterable

### 📥 Export
- Export filtered data to CSV
- Includes all registration fields
- Filename with current date

### 🔄 Refresh
- Manual data refresh button
- Updates all charts and statistics

---

## Setup Instructions

### 1. Environment Variable
The password is stored in `.env.local`:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=ISLACADEMY7815@islec#
```

### 2. Change Password (Optional)
To change the password:
1. Edit `.env.local`
2. Update `NEXT_PUBLIC_ADMIN_PASSWORD` value
3. Restart development server
4. For production, update environment variable in hosting platform

### 3. Database Setup
Run the SQL script in Supabase to create the `registrations` table:
```bash
# Copy contents of supabase-setup.sql
# Paste in Supabase SQL Editor
# Click Run
```

---

## Usage

### First Time Access
1. Go to `https://yourdomain.com/islacademyadminpage7815`
2. Enter password: `ISLACADEMY7815@islec#`
3. Click "Access Dashboard"
4. Session will be saved in browser

### Subsequent Access
- If you haven't logged out, you'll go directly to dashboard
- If you logged out or cleared browser data, enter password again

### Logout
- Click the "Logout" button in top-right corner
- Clears session from browser
- Redirects to login screen

---

## Chart Details

### Color Schemes Used

**Daily Registrations:**
- Line: `#e94560` (Coral)
- Area: `rgba(233, 69, 96, 0.2)` (Coral with transparency)

**Hourly Registrations:**
- Gradient: Coral (`#e94560`) to Gold (`#f5a623`)

**Source Distribution:**
- Popup: `#667eea` (Purple)
- Landing Page: `#764ba2` (Deep Purple)

**Education Distribution:**
- Multiple vibrant colors: Pink, Red, Blue, Cyan, Green

### Responsive Design
- All charts are responsive
- Adapts to screen size
- Mobile-friendly layout
- Touch-enabled interactions

---

## Security Best Practices

### Current Security
✅ Password protection
✅ Environment variable storage
✅ Session management
✅ No password in source code

### Recommended Enhancements
1. **Add rate limiting** - Prevent brute force attacks
2. **Add 2FA** - Two-factor authentication
3. **Add IP whitelisting** - Restrict to specific IPs
4. **Add audit logs** - Track who accessed when
5. **Add Supabase Auth** - Full authentication system

---

## Troubleshooting

### "Incorrect password" error
- Verify password is exactly: `ISLACADEMY7815@islec#`
- Check for extra spaces
- Password is case-sensitive

### Charts not showing
- Ensure registrations exist in database
- Check browser console for errors
- Verify ECharts library loaded correctly

### Can't access after logout
- This is normal behavior
- Enter password again to access

### Password not working after deployment
- Verify environment variable is set in hosting platform
- Check variable name is exactly: `NEXT_PUBLIC_ADMIN_PASSWORD`
- Restart/redeploy application

---

## Production Deployment

### Vercel
1. Go to Project Settings → Environment Variables
2. Add: `NEXT_PUBLIC_ADMIN_PASSWORD` = `ISLACADEMY7815@islec#`
3. Redeploy

### Netlify
1. Go to Site Settings → Environment Variables
2. Add: `NEXT_PUBLIC_ADMIN_PASSWORD` = `ISLACADEMY7815@islec#`
3. Redeploy

### Other Platforms
Add the environment variable in your platform's dashboard and redeploy.

---

## Analytics Insights

### What to Look For

**Daily Registrations Chart:**
- Upward trends = growing interest
- Spikes = successful campaigns
- Dips = need more promotion

**Hourly Chart:**
- Peak hours = best time to engage
- Low hours = avoid scheduling campaigns
- Pattern recognition for optimization

**Source Distribution:**
- Higher popup % = effective popup timing
- Higher landing % = good page content
- Balance both for best results

**Education Distribution:**
- Target marketing to dominant groups
- Create content for underrepresented groups
- Adjust messaging per education level

---

**🎉 Your admin dashboard is now fully secured and analytics-ready!**
