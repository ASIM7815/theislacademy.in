#!/usr/bin/env node

console.log('🔍 Verifying Deployment Configuration\n');

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_ADMIN_PASSWORD'
];

let allPresent = true;

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: MISSING`);
    allPresent = false;
  }
});

console.log('\n' + (allPresent ? '✅ All environment variables are set!' : '❌ Some environment variables are missing!'));

if (!allPresent) {
  console.log('\n📝 Add missing variables in Vercel:');
  console.log('   1. Go to https://vercel.com/dashboard');
  console.log('   2. Select your project');
  console.log('   3. Settings → Environment Variables');
  console.log('   4. Add each missing variable for Production, Preview, and Development');
  process.exit(1);
}
