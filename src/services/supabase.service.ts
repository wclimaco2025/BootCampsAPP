import { supabase, supabaseApi } from "../api/supabase.api";
import type { AuthError, User, Session } from "@supabase/supabase-js";


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
