import { LoginForm } from "@/app/components";
import { getDictionary } from "../dictionaries";

const login = async ({params}:{params:Promise<{lang:'en-US'|'es-ES'}>}) => {
  const {lang} = await params;
  const dict = await getDictionary(lang);
  return (
    <>
     <LoginForm 
      formUser={dict.FormLogin.formUser}
      formPass={dict.FormLogin.formPass}
      formSubmit={dict.FormLogin.formSubmit}
      formTitle={dict.FormLogin.formTitle}
     />
    </>
  )
}

export default login;
