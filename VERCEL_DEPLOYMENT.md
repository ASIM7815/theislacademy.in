# 🚀 Vercel Deployment Guide

## ⚠️ Current Deployment Issue

The build is failing because **environment variables are missing** on Vercel.

---

## ✅ Fix Steps

### 1. Add Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `theislacademy.in`
3. Click **Settings** → **Environment Variables**
4. Add these 4 variables:

#### Variable 1:
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `your_supabase_project_url` (from .env.local)
- **Environment:** Production, Preview, Development (select all)

#### Variable 2:
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `your_supabase_anon_key` (from .env.local)
- **Environment:** Production, Preview, Development (select all)

#### Variable 3:
- **Name:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** `your_supabase_service_role_key` (from .env.local)
- **Environment:** Production, Preview, Development (select all)

#### Variable 4:
- **Name:** `NEXT_PUBLIC_ADMIN_PASSWORD`
- **Value:** `your_admin_password` (from .env.local)
- **Environment:** Production, Preview, Development (select all)

### 2. Redeploy

After adding all environment variables:

1. Go to **Deployments** tab
2. Click the **three dots (...)** on the latest deployment
3. Click **Redeploy**
4. Wait for the build to complete

---

## 🔍 Troubleshooting

### If build still fails:

1. **Check Build Logs:**
   - Go to the failed deployment
   - Click on "Building" to see detailed logs
   - Look for specific error messages

2. **Common Issues:**

   **Issue:** "Module not found: echarts"
   **Solution:** The dependencies should install automatically. If not, try:
   - Delete `node_modules` and `package-lock.json` from your local
   - Run `npm install`
   - Commit and push again

   **Issue:** "Environment variable not found"
   **Solution:** Make sure all 4 variables are added in Vercel settings

   **Issue:** "Build timeout"
   **Solution:** Increase build timeout in Vercel settings

3. **Force Clean Build:**
   - In Vercel dashboard, go to Settings
   - Scroll to "Build & Development Settings"
   - Enable "Override" for Build Command
   - Set to: `npm run build`
   - Save and redeploy

---

## 📋 Verification Checklist

After successful deployment:

- [ ] Website loads at your domain
- [ ] Homepage shows correctly
- [ ] Registration popup appears
- [ ] Landing page registration form works
- [ ] Admin page accessible at `/islacademyadminpage7815`
- [ ] Admin login works with password
- [ ] Charts display correctly
- [ ] Data saves to Supabase
- [ ] Export CSV works

---

## 🎯 Quick Commands

### Local Testing:
```bash
npm run build
npm start
```

### Check Environment Variables:
```bash
# In Vercel CLI
vercel env ls
```

---

## 📞 Need Help?

If deployment continues to fail:

1. Share the **build logs** from Vercel
2. Check if all environment variables are set
3. Verify Supabase credentials are correct
4. Try deploying from a fresh branch

---

## ✅ Expected Result

After successful deployment, your site will be live at:
- **Main Site:** `https://theislacademy.in`
- **Admin Dashboard:** `https://theislacademy.in/islacademyadminpage7815`

**Password:** `ISLACADEMY7815@islec#`

---

**Good luck with your deployment! 🚀**
