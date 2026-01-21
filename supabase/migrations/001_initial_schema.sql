-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "moddatetime";

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMP WITH TIME ZONE,
  gift_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gifts table
CREATE TABLE public.gifts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  recipient_name VARCHAR(100) NOT NULL,
  sender_name VARCHAR(100) NOT NULL,
  story TEXT,
  event_date DATE NOT NULL,
  theme VARCHAR(50) DEFAULT 'simple' CHECK (theme IN ('romantic', 'simple', 'playful')),
  slug VARCHAR(200) UNIQUE NOT NULL,
  music_url TEXT,
  music_source VARCHAR(20) CHECK (music_source IN ('spotify', 'youtube', 'upload')),
  is_public BOOLEAN DEFAULT TRUE,
  has_watermark BOOLEAN DEFAULT TRUE,
  views_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Photos table
CREATE TABLE public.photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  gift_id UUID REFERENCES public.gifts(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption VARCHAR(200),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Premium packages
CREATE TABLE public.premium_packages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  duration_days INTEGER,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_gifts_slug ON public.gifts(slug);
CREATE INDEX idx_gifts_user_id ON public.gifts(user_id);
CREATE INDEX idx_gifts_created_at ON public.gifts(created_at DESC);
CREATE INDEX idx_photos_gift_id ON public.photos(gift_id);

-- Triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.gifts
  FOR EACH ROW EXECUTE PROCEDURE moddatetime (updated_at);

-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Policies for gifts
CREATE POLICY "Gifts are viewable by everyone if public"
  ON public.gifts FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create gifts"
  ON public.gifts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gifts"
  ON public.gifts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own gifts"
  ON public.gifts FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for photos
CREATE POLICY "Photos are viewable with gift"
  ON public.photos FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.gifts 
    WHERE gifts.id = photos.gift_id 
    AND (gifts.is_public = true OR gifts.user_id = auth.uid())
  ));

CREATE POLICY "Users can manage photos of own gifts"
  ON public.photos FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.gifts 
    WHERE gifts.id = photos.gift_id 
    AND gifts.user_id = auth.uid()
  ));

-- Insert default premium packages
INSERT INTO public.premium_packages (name, price, duration_days, features) VALUES
  ('Basic', 10000, 30, '["Semua Template", "Hapus Watermark", "5GB Storage"]'),
  ('Pro', 25000, 90, '["Semua Template", "Hapus Watermark", "20GB Storage", "Analytics", "Priority Support"]'),
  ('Lifetime', 50000, NULL, '["Semua Template", "Hapus Watermark", "Unlimited Storage", "Analytics", "Priority Support", "Custom Domain"]');
