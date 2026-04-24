# 🚀 Quick Start Guide

## 1️⃣ Create Database Table (5 minutes)

1. Open **Supabase Dashboard**: https://app.supabase.com
2. Go to **SQL Editor**
3. Copy all content from `supabase-setup.sql`
4. Paste and click **Run**
5. ✅ Done! Table created.

## 2️⃣ Start Development Server

```bash
npm run dev
```

Open: http://localhost:3000

## 3️⃣ Test Registration Forms

### Test Popup Form:
1. Wait for popup to appear (auto-opens after 1.3 seconds)
2. Fill out: Name, Email, Phone, Education
3. Click "Register Now"
4. ✅ WhatsApp opens + Data saved to Supabase

### Test Landing Page Form:
1. Scroll to "Register Now" section
2. Fill out: Name, Email, Phone, Education, Message (optional)
3. Click "Register Now"
4. ✅ WhatsApp opens + Data saved to Supabase

## 4️⃣ View Registrations

### Admin Dashboard:
http://localhost:3000/islacademyadminpage7815

Features:
- View all registrations
- Search & filter
- Export to CSV
- Real-time stats

### Supabase Dashboard:
1. Go to **Table Editor**
2. Click **registrations** table
3. See all data

---

## 🎯 That's It!

You're ready to collect registrations!

### Production Deployment:
1. Deploy to Vercel/Netlify
2. Add environment variables in hosting dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Access admin at: `https://yourdomain.com/islacademyadminpage7815`

### Need Help?
- See `SETUP_COMPLETE.md` for detailed checklist
- See `SUPABASE_SETUP.md` for troubleshooting
- See `ADMIN_ACCESS.md` for admin features

---

**🎉 Happy registering!**
