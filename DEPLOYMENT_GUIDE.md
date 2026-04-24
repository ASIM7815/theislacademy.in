# 🚀 Deployment Guide (Public Version)

## Overview

This guide helps you deploy the ISL Academy website to Vercel with Supabase integration.

---

## 🔧 What Was Fixed

1. **Supabase client initialization** - Added fallback values to prevent crashes
2. **TypeScript warnings** - Fixed deprecated FormEvent imports
3. **Environment variable handling** - Made it more robust
4. **Next.js configuration** - Explicitly configured env vars

---

## 📋 Required Environment Variables

You need to set these 4 environment variables in Vercel:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Your Supabase project URL
   - Format: `https://[project-id].supabase.co`
   - Get from: Supabase Dashboard → Settings → API

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public key
   - Get from: Supabase Dashboard → Settings → API

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Your Supabase service role key (keep secret!)
   - Get from: Supabase Dashboard → Settings → API

4. **NEXT_PUBLIC_ADMIN_PASSWORD**
   - Password for admin dashboard access
   - Choose a strong password

---

## 🚀 Deployment Steps

### Step 1: Set Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add all 4 variables listed above
5. For each variable, check all 3 environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Step 2: Deploy

#### Option A: Git Push (Recommended)
```bash
git add .
git commit -m "fix: deployment configuration"
git push origin main
```

Vercel will automatically deploy.

#### Option B: Manual Redeploy
1. Go to **Deployments** tab in Vercel
2. Click **...** on the latest deployment
3. Click **Redeploy**

---

## ✅ Verification

After deployment, test:

1. **Homepage** - Should load without errors
2. **Registration Popup** - Should appear and work
3. **Landing Page Form** - Should submit successfully
4. **Admin Dashboard** - Should be accessible at `/islacademyadminpage7815`
5. **Data Saving** - Check Supabase Dashboard for new registrations

---

## 🔍 Troubleshooting

### Build Fails with "supabaseUrl is required"

**Solution:**
- Verify all 4 environment variables are set in Vercel
- Make sure they're enabled for Production environment
- Redeploy after adding variables

### Build Succeeds but Site Doesn't Work

**Solution:**
1. Check browser console (F12) for errors
2. Verify environment variables have `NEXT_PUBLIC_` prefix for client-side access
3. Check Network tab for failed API calls

### Data Not Saving to Supabase

**Solution:**
1. Verify Supabase API keys are correct
2. Check that `registrations` table exists
3. Verify RLS policies allow public inserts

---

## 📁 Files Modified

- `src/lib/supabase.ts` - Better error handling
- `src/components/RegistrationPopup.tsx` - Fixed TypeScript warning
- `src/app/islacademyadminpage7815/page.tsx` - Fixed TypeScript warning
- `next.config.ts` - Explicit env var configuration
- `package.json` - Added verification script
- `scripts/verify-env.js` - Environment variable checker
- `.env.example` - Template for environment variables

---

## 🛠️ Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in your actual values
3. Run `npm run verify-env` to check
4. Run `npm run dev` to start development server

---

## 📞 Support

If you encounter issues:

1. Check Vercel build logs for specific errors
2. Verify all environment variables are set correctly
3. Test locally first with `npm run build`
4. Clear Vercel build cache and redeploy

---

**Good luck! 🚀**
