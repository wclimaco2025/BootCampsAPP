import { createBrowserClient } from "@supabase/ssr";
import axios from "axios";

// Importa las variables de entorno necesarias para la conexión a Supabase
// Tomado de la documentacion de Supabase

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePublishKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";

// Cliente para el navegador que maneja cookies automáticamente
export const supabase = createBrowserClient(supabaseUrl, supabasePublishKey);

export const supabaseApi = axios.create({
  baseURL: supabaseUrl,
  headers: {
    "Content-Type": "application/json",
    apiKey: supabasePublishKey,
  },
});
