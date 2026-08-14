-- ==============================================================================
-- LATEST PHOTOGRAPHY — Supabase PostgreSQL Database Schema
-- Brand: LATEST PHOTOGRAPHY (Jaffna, Sri Lanka)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & TYPES
DO $$ BEGIN
    CREATE TYPE project_type AS ENUM ('photography', 'design');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE publish_status AS ENUM ('draft', 'published');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    type project_type NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    type project_type NOT NULL,
    category TEXT NOT NULL,
    category_name TEXT NOT NULL,
    year TEXT NOT NULL,
    location TEXT,
    client TEXT,
    description TEXT,
    cover_image TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    status publish_status DEFAULT 'published',
    design_stages JSONB,
    poster_formats JSONB,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECT IMAGES TABLE
CREATE TABLE IF NOT EXISTS project_images (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    width INT,
    height INT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT 'global_settings',
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ANALYTICS EVENTS TABLE (Privacy-Conscious)
CREATE TABLE IF NOT EXISTS analytics_events (
    id BIGSERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,
    meta JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. INDEXES FOR HIGH-SPEED QUERYING
CREATE INDEX IF NOT EXISTS idx_projects_type_status ON projects(type, status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id, sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type, created_at DESC);

-- 9. ROW LEVEL SECURITY (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Public can read published projects and categories
CREATE POLICY "Public can view published projects" 
    ON projects FOR SELECT 
    USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Public can view project images" 
    ON project_images FOR SELECT 
    USING (true);

CREATE POLICY "Public can view categories" 
    ON categories FOR SELECT 
    USING (true);

CREATE POLICY "Public can view site settings" 
    ON site_settings FOR SELECT 
    USING (true);

CREATE POLICY "Public can insert analytics events" 
    ON analytics_events FOR INSERT 
    WITH CHECK (true);

-- Authenticated admins have full CRUD permissions
CREATE POLICY "Admins full access on projects" 
    ON projects FOR ALL 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access on project images" 
    ON project_images FOR ALL 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access on categories" 
    ON categories FOR ALL 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access on site settings" 
    ON site_settings FOR ALL 
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins full access on analytics" 
    ON analytics_events FOR ALL 
    USING (auth.role() = 'authenticated');
