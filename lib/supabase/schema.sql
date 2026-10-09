-- ==============================================================================
-- Listone.ai Production Database Schema (Supabase / PostgreSQL)
-- Description: Users, Projects, Products, Images, A+ Designs, Chat, Credits, Jobs
-- Row Level Security (RLS) enabled on all tables
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  store_name TEXT,
  default_marketplace TEXT DEFAULT 'Amazon',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CREDITS WALLET
CREATE TABLE IF NOT EXISTS public.credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  balance INTEGER DEFAULT 150 NOT NULL,
  tier TEXT DEFAULT 'starter' NOT NULL, -- starter, pro, business
  renews_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL,
  provider TEXT NOT NULL, -- stripe or razorpay
  subscription_id TEXT NOT NULL,
  status TEXT DEFAULT 'active' NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'USD' NOT NULL,
  current_period_start TIMESTAMPTZ DEFAULT NOW(),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  brand_name TEXT,
  marketplace TEXT DEFAULT 'Amazon' NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  asin TEXT,
  sku TEXT,
  category TEXT,
  target_audience TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  raw_image_urls JSONB DEFAULT '[]'::jsonb,
  clean_cutout_url TEXT,
  color_palette JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GENERATED IMAGES (15 Shots + Layers)
CREATE TABLE IF NOT EXISTS public.generated_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  shot_index INTEGER NOT NULL, -- 1 to 15
  shot_type TEXT NOT NULL,     -- main_hero, infographic_features, lifestyle_1, etc.
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  layers_json JSONB NOT NULL,   -- Fabric / Konva layer graph (background, cutout, text, stickers)
  status TEXT DEFAULT 'completed', -- pending, generating, completed, failed
  marketplace TEXT DEFAULT 'Amazon',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. A+ CONTENT DESIGNS
CREATE TABLE IF NOT EXISTS public.a_plus_designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  module_type TEXT NOT NULL, -- hero_banner, brand_story, four_grid, comparison_chart, specs_table, faq
  headline TEXT,
  body_text TEXT,
  image_urls JSONB DEFAULT '[]'::jsonb,
  layers_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. AI CHAT THREADS & MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES public.chat_threads(id) ON DELETE CASCADE NOT NULL,
  sender TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ASYNC JOBS (Inngest / BullMQ queue audit)
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  job_type TEXT NOT NULL, -- 'image_15_pack', 'aplus_gen', 'asin_import'
  status TEXT DEFAULT 'pending' NOT NULL, -- pending, processing, completed, failed
  progress INTEGER DEFAULT 0,
  error_message TEXT,
  input_payload JSONB NOT NULL,
  output_payload JSONB,
  credits_deducted INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.a_plus_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own profile
CREATE POLICY "Users view own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

-- Users can only view their own credits
CREATE POLICY "Users view own credits" ON public.credits FOR SELECT USING (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "Users manage own projects" ON public.projects FOR ALL USING (auth.uid() = user_id);

-- Products policies
CREATE POLICY "Users manage own products" ON public.products FOR ALL USING (auth.uid() = user_id);

-- Generated Images policies
CREATE POLICY "Users manage own images" ON public.generated_images FOR ALL USING (auth.uid() = user_id);

-- A+ Designs policies
CREATE POLICY "Users manage own a_plus_designs" ON public.a_plus_designs FOR ALL USING (auth.uid() = user_id);

-- Chat policies
CREATE POLICY "Users manage own chat threads" ON public.chat_threads FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own chat messages" ON public.chat_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.chat_threads WHERE id = chat_messages.thread_id AND user_id = auth.uid())
);

-- Jobs policies
CREATE POLICY "Users view own jobs" ON public.jobs FOR ALL USING (auth.uid() = user_id);
