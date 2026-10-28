ALTER TABLE users ADD COLUMN phone text;
ALTER TABLE users ADD COLUMN age integer;
ALTER TABLE users ADD COLUMN referral_code text;
ALTER TABLE users ADD COLUMN referred_by_id text;
ALTER TABLE users ADD COLUMN wallet_balance integer NOT NULL DEFAULT 0;
CREATE UNIQUE INDEX IF NOT EXISTS users_referral_code_unique ON users(referral_code);
CREATE INDEX IF NOT EXISTS users_referred_by_idx ON users(referred_by_id);
CREATE TABLE IF NOT EXISTS withdrawals (
  id text PRIMARY KEY NOT NULL,
  user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  account_number text NOT NULL,
  account_name text NOT NULL,
  status text NOT NULL DEFAULT 'PENDING',
  admin_note text,
  created_at integer NOT NULL DEFAULT (unixepoch()),
  processed_at integer
);
CREATE INDEX IF NOT EXISTS withdrawals_user_id_idx ON withdrawals(user_id);
CREATE INDEX IF NOT EXISTS withdrawals_status_idx ON withdrawals(status);
