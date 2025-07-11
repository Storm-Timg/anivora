-- Create profiles table for users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create anime table
CREATE TABLE public.anime (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_english TEXT,
  title_arabic TEXT NOT NULL,
  description TEXT,
  description_arabic TEXT,
  poster_url TEXT,
  banner_url TEXT,
  trailer_url TEXT,
  episodes_count INTEGER DEFAULT 0,
  duration_minutes INTEGER,
  status TEXT CHECK (status IN ('ongoing', 'completed', 'upcoming')) DEFAULT 'ongoing',
  rating DECIMAL(3,1) DEFAULT 0.0,
  year INTEGER,
  season TEXT CHECK (season IN ('spring', 'summer', 'fall', 'winter')),
  studio TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create genres table
CREATE TABLE public.genres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  name_arabic TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create anime_genres junction table
CREATE TABLE public.anime_genres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  anime_id UUID NOT NULL REFERENCES public.anime(id) ON DELETE CASCADE,
  genre_id UUID NOT NULL REFERENCES public.genres(id) ON DELETE CASCADE,
  UNIQUE(anime_id, genre_id)
);

-- Create episodes table
CREATE TABLE public.episodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  anime_id UUID NOT NULL REFERENCES public.anime(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  title TEXT,
  title_arabic TEXT,
  description TEXT,
  description_arabic TEXT,
  duration_minutes INTEGER,
  video_url TEXT,
  thumbnail_url TEXT,
  air_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(anime_id, episode_number)
);

-- Create user_favorites table
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  anime_id UUID NOT NULL REFERENCES public.anime(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, anime_id)
);

-- Create user_watch_history table
CREATE TABLE public.user_watch_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  anime_id UUID NOT NULL REFERENCES public.anime(id) ON DELETE CASCADE,
  episode_id UUID REFERENCES public.episodes(id) ON DELETE CASCADE,
  watch_progress INTEGER DEFAULT 0, -- in seconds
  completed BOOLEAN DEFAULT false,
  last_watched TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, episode_id)
);

-- Create user_ratings table
CREATE TABLE public.user_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  anime_id UUID NOT NULL REFERENCES public.anime(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, anime_id)
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  anime_id UUID REFERENCES public.anime(id) ON DELETE CASCADE,
  episode_id UUID REFERENCES public.episodes(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anime ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anime_genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for anime (public read)
CREATE POLICY "Anime are viewable by everyone" ON public.anime FOR SELECT USING (true);
CREATE POLICY "Genres are viewable by everyone" ON public.genres FOR SELECT USING (true);
CREATE POLICY "Anime genres are viewable by everyone" ON public.anime_genres FOR SELECT USING (true);
CREATE POLICY "Episodes are viewable by everyone" ON public.episodes FOR SELECT USING (true);

-- Create policies for user-specific data
CREATE POLICY "Users can view their own favorites" ON public.user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own favorites" ON public.user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON public.user_favorites FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own watch history" ON public.user_watch_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own watch history" ON public.user_watch_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own watch history" ON public.user_watch_history FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ratings" ON public.user_ratings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own ratings" ON public.user_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ratings" ON public.user_ratings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ratings" ON public.user_ratings FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Comments are viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_anime_updated_at BEFORE UPDATE ON public.anime FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_ratings_updated_at BEFORE UPDATE ON public.user_ratings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'username', 'مستخدم جديد')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample genres
INSERT INTO public.genres (name, name_arabic) VALUES
('Action', 'أكشن'),
('Adventure', 'مغامرة'),
('Comedy', 'كوميديا'),
('Drama', 'دراما'),
('Fantasy', 'فانتازيا'),
('Romance', 'رومانسي'),
('Thriller', 'إثارة'),
('Horror', 'رعب'),
('Mystery', 'غموض'),
('Slice of Life', 'شريحة من الحياة'),
('Sports', 'رياضة'),
('Supernatural', 'خارق للطبيعة'),
('Mecha', 'ميكا'),
('Historical', 'تاريخي'),
('School', 'مدرسي');

-- Insert sample anime
INSERT INTO public.anime (title, title_arabic, description_arabic, poster_url, episodes_count, status, rating, year, season, studio) VALUES
('Attack on Titan', 'هجوم العمالقة', 'في عالم حيث تهدد العمالقة البشرية، يقاتل إيرين وأصدقاؤه من أجل البقاء والحرية.', '/src/assets/anime-1.jpg', 87, 'completed', 9.0, 2013, 'spring', 'Madhouse'),
('Demon Slayer', 'قاتل الشياطين', 'تانجيرو يصبح قاتل شياطين لإنقاذ أخته المتحولة إلى شيطان.', '/src/assets/anime-2.jpg', 44, 'ongoing', 8.7, 2019, 'spring', 'Ufotable'),
('One Piece', 'قطعة واحدة', 'مونكي دي لوفي وطاقمه يبحثون عن الكنز الأسطوري "ون بيس".', '/src/assets/anime-3.jpg', 1000, 'ongoing', 9.1, 1999, 'fall', 'Toei Animation'),
('Naruto', 'ناروتو', 'ناروتو أوزوماكي ينجا شينوبي يحلم بأن يصبح هوكاغي قريته.', '/src/assets/anime-4.jpg', 720, 'completed', 8.4, 2002, 'fall', 'Pierrot');

-- Create sample episodes for first anime
INSERT INTO public.episodes (anime_id, episode_number, title_arabic, duration_minutes, air_date) 
SELECT 
  a.id,
  generate_series(1, 25) as episode_number,
  'الحلقة ' || generate_series(1, 25) as title_arabic,
  24 as duration_minutes,
  ('2013-04-06'::date + (generate_series(1, 25) - 1) * interval '1 week')::date as air_date
FROM public.anime a 
WHERE a.title = 'Attack on Titan';

-- Link sample anime with genres
INSERT INTO public.anime_genres (anime_id, genre_id)
SELECT a.id, g.id 
FROM public.anime a, public.genres g 
WHERE (a.title = 'Attack on Titan' AND g.name IN ('Action', 'Drama', 'Fantasy'))
   OR (a.title = 'Demon Slayer' AND g.name IN ('Action', 'Supernatural', 'Historical'))
   OR (a.title = 'One Piece' AND g.name IN ('Action', 'Adventure', 'Comedy'))
   OR (a.title = 'Naruto' AND g.name IN ('Action', 'Adventure', 'Martial Arts'));