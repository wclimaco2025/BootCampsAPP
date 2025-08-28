import { supabase } from "../api/supabase.api";
import type { AuthError, User, Session } from "@supabase/supabase-js";
import type { BootCamp } from "../types/BootCamps.types";

export type AuthResponse = {
  data: {
    user: User | null;
    session: Session | null;
  };
  error: AuthError | null;
};

export type AuthUser = User | null;

// =====================================//
// MÉTODOS DE AUTENTICACIÓN //
// =====================================//

//Registrar nuevo usuario
export const signUp = async (
  email: string,
  password: string,
  userData?: any
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData, // Metadata adicional del usuario
      },
    });

    return { data, error };
  } catch (error) {
    console.error("Error en Registro:", error);
    return {
      data: { user: null, session: null },
      error: error as AuthError,
    };
  }
};

//Iniciar sesión
export const signIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  } catch (error) {
    console.error("Error en Login:", error);
    return {
      data: { user: null, session: null },
      error: error as AuthError,
    };
  }
};

//Cerrar sesión
export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error("Error en Logout:", error);
    return { error: error as AuthError };
  }
};

// =====================================//
// MÉTODOS DE BOOTCAMPS //
// =====================================//

// Obtener todos los bootcamps
export const getBootcamps = async (): Promise<{
  data: BootCamp[] | null;
  error: any;
}> => {
  try {
    const { data, error } = await supabase
      .from('bootcamps')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error };
  } catch (error) {
    console.error("Error obteniendo bootcamps:", error);
    return { data: null, error };
  }
};

// Obtener bootcamp por ID
export const getBootcampById = async (id: string): Promise<{
  data: BootCamp | null;
  error: any;
}> => {
  try {
    const { data, error } = await supabase
      .from('bootcamps')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  } catch (error) {
    console.error("Error obteniendo bootcamp por ID:", error);
    return { data: null, error };
  }
};

// Obtener bootcamps por tecnología
export const getBootcampsByTechnology = async (technology: string): Promise<{
  data: BootCamp[] | null;
  error: any;
}> => {
  try {
    const { data, error } = await supabase
      .from('bootcamps')
      .select('*')
      .eq('technology', technology)
      .order('start_date', { ascending: true });

    return { data, error };
  } catch (error) {
    console.error("Error obteniendo bootcamps por tecnología:", error);
    return { data: null, error };
  }
};

// Obtener bootcamps por nivel
export const getBootcampsByLevel = async (level: string): Promise<{
  data: BootCamp[] | null;
  error: any;
}> => {
  try {
    const { data, error } = await supabase
      .from('bootcamps')
      .select('*')
      .eq('level', level)
      .order('start_date', { ascending: true });

    return { data, error };
  } catch (error) {
    console.error("Error obteniendo bootcamps por nivel:", error);
    return { data: null, error };
  }
};

// Obtener bootcamps disponibles (con cupos)
export const getAvailableBootcamps = async (): Promise<{
  data: BootCamp[] | null;
  error: any;
}> => {
  try {
    const { data, error } = await supabase
      .from('bootcamps')
      .select('*')
      .gt('max_students', 0)
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true });

    return { data, error };
  } catch (error) {
    console.error("Error obteniendo bootcamps disponibles:", error);
    return { data: null, error };
  }
};
