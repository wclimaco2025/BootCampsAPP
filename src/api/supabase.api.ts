import { createClient } from '@supabase/supabase-js';

// Importa las variables de entorno necesarias para la conexión a Supabase
// Tomado de la documentacion de Supabase

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY || '';

export const supabaseAPI = createClient(supabaseUrl, supabaseKey);