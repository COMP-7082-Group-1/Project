-- Add color palette field to events table
ALTER TABLE events 
ADD COLUMN color_palette JSONB DEFAULT NULL;

-- Create an index for faster queries
CREATE INDEX idx_events_color_palette ON events USING GIN (color_palette);
