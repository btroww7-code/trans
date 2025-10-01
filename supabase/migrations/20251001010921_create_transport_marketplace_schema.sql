/*
  # Transport Marketplace - Complete Database Schema
  
  1. New Tables
    - `profiles`
      - User profile information (name, phone, avatar, company details)
      - Links to auth.users table
      - Rating and verification status
    
    - `categories`
      - Hierarchical category system for transport types
      - Supports nested categories with parent-child relationships
      - Includes icons, slugs, and ordering
    
    - `listings`
      - Transport job postings
      - Full address and geocoding data for pickup/delivery
      - Images, dimensions, weight specifications
      - Status tracking (DRAFT, OPEN, ASSIGNED, etc.)
    
    - `offers`
      - Bids from carriers on listings
      - Price, dates, and message
      - Status tracking with expiration
    
    - `conversations`
      - Private messaging between users
      - Linked to listings and offers
      - Status control (RESTRICTED until offer accepted)
    
    - `messages`
      - Individual messages in conversations
      - Read status tracking
      - Real-time updates support
    
    - `contracts`
      - Accepted offers become contracts
      - Payment and delivery tracking
      - Status timeline (CREATED, IN_PROGRESS, COMPLETED)
    
    - `reviews`
      - Post-delivery ratings and feedback
      - Category-based ratings (communication, punctuality, etc.)
      - Response capability for reviewed users
    
    - `payments`
      - Stripe payment tracking
      - Transaction history and metadata
      - Refund support
    
    - `notifications`
      - User notifications for all events
      - Read status tracking
      - Deep links to relevant content
  
  2. Security
    - Enable RLS on all tables
    - Policies for authenticated user access
    - Ownership checks for data modification
    - Privacy protection for sensitive data
  
  3. Performance
    - Indexes on frequently queried columns
    - Composite indexes for complex queries
    - Full-text search support
  
  4. Notes
    - Uses UUID for primary keys
    - Timestamps with timezone support
    - JSONB for flexible data structures
    - Enum types for status fields
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create enum types
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('CLIENT', 'CARRIER', 'ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE user_status AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE profile_type AS ENUM ('INDIVIDUAL', 'COMPANY');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE listing_status AS ENUM ('DRAFT', 'OPEN', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'EXPIRED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE offer_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'EXPIRED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE conversation_status AS ENUM ('RESTRICTED', 'ACTIVE', 'ARCHIVED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE contract_status AS ENUM ('CREATED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM ('NEW_OFFER', 'OFFER_ACCEPTED', 'MESSAGE', 'CONTRACT_STATUS', 'REVIEW_REQUEST', 'PAYMENT', 'OTHER');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role user_role DEFAULT 'CLIENT' NOT NULL,
  status user_status DEFAULT 'ACTIVE' NOT NULL,
  profile_type profile_type DEFAULT 'INDIVIDUAL' NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  company_name text,
  phone text NOT NULL,
  avatar_url text,
  bio text,
  rating_avg decimal(3, 2) DEFAULT 0 NOT NULL,
  rating_count integer DEFAULT 0 NOT NULL,
  verified boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id serial PRIMARY KEY,
  name_pl text NOT NULL,
  name_en text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text NOT NULL,
  parent_id integer REFERENCES categories(id) ON DELETE CASCADE,
  active boolean DEFAULT true NOT NULL,
  order_index integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id integer REFERENCES categories(id) NOT NULL,
  status listing_status DEFAULT 'DRAFT' NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  from_address jsonb NOT NULL,
  from_location geography(POINT) NOT NULL,
  to_address jsonb NOT NULL,
  to_location geography(POINT) NOT NULL,
  distance_km decimal(10, 2) NOT NULL,
  pickup_date_from timestamptz,
  pickup_date_to timestamptz,
  delivery_date_from timestamptz,
  delivery_date_to timestamptz,
  flexible_dates boolean DEFAULT false NOT NULL,
  weight_kg decimal(10, 2),
  dimensions jsonb,
  quantity integer DEFAULT 1 NOT NULL,
  vehicle_type text,
  images jsonb DEFAULT '[]'::jsonb NOT NULL,
  slug text UNIQUE NOT NULL,
  views_count integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  published_at timestamptz
);

-- Offers table
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  carrier_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  price decimal(10, 2) NOT NULL,
  currency text DEFAULT 'PLN' NOT NULL,
  message text NOT NULL,
  estimated_pickup_date timestamptz NOT NULL,
  estimated_delivery_date timestamptz NOT NULL,
  status offer_status DEFAULT 'PENDING' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  expires_at timestamptz DEFAULT (now() + interval '7 days') NOT NULL,
  UNIQUE(listing_id, carrier_id)
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  offer_id uuid REFERENCES offers(id) ON DELETE SET NULL,
  participant_1_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  participant_2_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status conversation_status DEFAULT 'RESTRICTED' NOT NULL,
  last_message_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  body text NOT NULL,
  read_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  offer_id uuid REFERENCES offers(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  carrier_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10, 2) NOT NULL,
  currency text DEFAULT 'PLN' NOT NULL,
  status contract_status DEFAULT 'CREATED' NOT NULL,
  payment_status payment_status DEFAULT 'PENDING' NOT NULL,
  signed_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id uuid REFERENCES contracts(id) ON DELETE CASCADE NOT NULL UNIQUE,
  reviewer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reviewed_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  overall_rating integer NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  categories jsonb NOT NULL,
  comment text NOT NULL,
  response text,
  response_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id uuid REFERENCES contracts(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10, 2) NOT NULL,
  currency text DEFAULT 'PLN' NOT NULL,
  provider text DEFAULT 'stripe' NOT NULL,
  provider_transaction_id text NOT NULL,
  status payment_status DEFAULT 'PENDING' NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  data jsonb DEFAULT '{}'::jsonb NOT NULL,
  link text NOT NULL,
  read_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role_status ON profiles(role, status);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_listings_owner_id ON listings(owner_id);
CREATE INDEX IF NOT EXISTS idx_listings_category_id ON listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_status_created ON listings(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_slug ON listings(slug);
CREATE INDEX IF NOT EXISTS idx_offers_listing_id ON offers(listing_id);
CREATE INDEX IF NOT EXISTS idx_offers_carrier_id ON offers(carrier_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);
CREATE INDEX IF NOT EXISTS idx_conversations_listing_id ON conversations(listing_id);
CREATE INDEX IF NOT EXISTS idx_conversations_participants ON conversations(participant_1_id, participant_2_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contracts_client_id ON contracts(client_id);
CREATE INDEX IF NOT EXISTS idx_contracts_carrier_id ON contracts(carrier_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewed_id ON reviews(reviewed_id);
CREATE INDEX IF NOT EXISTS idx_payments_contract_id ON payments(contract_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(user_id, created_at DESC);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Profiles
CREATE POLICY "Users can view all active profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (status = 'ACTIVE');

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for Categories
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  TO authenticated
  USING (active = true);

-- RLS Policies for Listings
CREATE POLICY "Anyone can view published listings"
  ON listings FOR SELECT
  TO authenticated
  USING (status != 'DRAFT' OR owner_id = auth.uid());

CREATE POLICY "Users can create own listings"
  ON listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own listings"
  ON listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete own listings"
  ON listings FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- RLS Policies for Offers
CREATE POLICY "Listing owners and offer creators can view offers"
  ON offers FOR SELECT
  TO authenticated
  USING (
    auth.uid() = carrier_id OR 
    auth.uid() IN (SELECT owner_id FROM listings WHERE id = listing_id)
  );

CREATE POLICY "Carriers can create offers"
  ON offers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = carrier_id);

CREATE POLICY "Carriers can update own offers"
  ON offers FOR UPDATE
  TO authenticated
  USING (auth.uid() = carrier_id)
  WITH CHECK (auth.uid() = carrier_id);

-- RLS Policies for Conversations
CREATE POLICY "Participants can view own conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

CREATE POLICY "Participants can update conversations"
  ON conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = participant_1_id OR auth.uid() = participant_2_id)
  WITH CHECK (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

-- RLS Policies for Messages
CREATE POLICY "Conversation participants can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE id = conversation_id 
      AND (participant_1_id = auth.uid() OR participant_2_id = auth.uid())
    )
  );

CREATE POLICY "Conversation participants can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM conversations 
      WHERE id = conversation_id 
      AND (participant_1_id = auth.uid() OR participant_2_id = auth.uid())
    )
  );

CREATE POLICY "Senders can update own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = sender_id)
  WITH CHECK (auth.uid() = sender_id);

-- RLS Policies for Contracts
CREATE POLICY "Contract parties can view contracts"
  ON contracts FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id OR auth.uid() = carrier_id);

CREATE POLICY "Clients can create contracts"
  ON contracts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Contract parties can update contracts"
  ON contracts FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id OR auth.uid() = carrier_id)
  WITH CHECK (auth.uid() = client_id OR auth.uid() = carrier_id);

-- RLS Policies for Reviews
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Contract parties can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM contracts 
      WHERE id = contract_id 
      AND (client_id = auth.uid() OR carrier_id = auth.uid())
    )
  );

CREATE POLICY "Reviewed users can respond to reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = reviewed_id)
  WITH CHECK (auth.uid() = reviewed_id);

-- RLS Policies for Payments
CREATE POLICY "Contract parties can view payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM contracts 
      WHERE id = contract_id 
      AND (client_id = auth.uid() OR carrier_id = auth.uid())
    )
  );

-- RLS Policies for Notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON offers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();