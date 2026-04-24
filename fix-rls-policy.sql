-- Fix RLS policy to allow anon users to read registrations
-- This allows the dashboard to display data using the anon key

-- Drop the old policy that only allows authenticated users
DROP POLICY IF EXISTS "Allow authenticated reads" ON registrations;

-- Create new policy to allow anon users to read (for dashboard)
CREATE POLICY "Allow anon reads" ON registrations
  FOR SELECT
  TO anon
  USING (true);
