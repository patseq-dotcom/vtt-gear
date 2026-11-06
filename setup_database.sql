-- ==========================================
-- SCRIPT COMPLET D'INITIALISATION POSTGRESQL (SUPABASE)
-- ==========================================

-- 1. Table profiles (si pas déjà créée)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  display_name TEXT,
  email TEXT,
  cold_sensitivity TEXT DEFAULT 'neutral' CHECK (cold_sensitivity IN ('warm', 'neutral', 'cold')),
  default_rain_threshold NUMERIC DEFAULT 0.5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profils visibles par leur propriétaire"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Profils modifiables par leur propriétaire"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Profils insérables par leur propriétaire"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Fonction & Trigger pour auto-création à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Table gear_items (inventaire d'équipement)
CREATE TABLE IF NOT EXISTS public.gear_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  min_temp NUMERIC,
  max_temp NUMERIC,
  waterproof BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.gear_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Inventaire géré par son propriétaire"
  ON public.gear_items FOR ALL USING (auth.uid() = user_id);
