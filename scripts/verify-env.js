#!/usr/bin/env node

/**
 * Environment Variable Verification Script
 * Run this before deployment to ensure all required env vars are set
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_ADMIN_PASSWORD'
];

console.log('🔍 Verifying environment variables...\n');

let hasErrors = false;

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value.trim() === '') {
    console.error(`❌ Missing: ${varName}`);
    hasErrors = true;
  } else {
    console.log(`✅ Found: ${varName}`);
  }
});

console.log('');

if (hasErrors) {
  console.error('❌ Some environment variables are missing!');
  console.error('\nPlease set them in:');
  console.error('  - Local: .env.local file');
  console.error('  - Vercel: Project Settings → Environment Variables');
  console.error('\nSee .env.example for reference.');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set!');
  process.exit(0);
}
