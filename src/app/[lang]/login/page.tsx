import { Footer, Header, LoginForm } from "@/app/components";
import { getDictionary } from "../dictionaries";

const login = async ({params}:{params:Promise<{lang:'en-US'|'es-ES'}>}) => {
  const {lang} = await params;
  const dict = await getDictionary(lang);
  return (
    <>
    <Header/>
     <LoginForm 
      formUser={dict.FormLogin.formUser}
      formPass={dict.FormLogin.formPass}
      formEmail={dict.FormLogin.formEmail}
      formEmailPlaceHolder={dict.FormLogin.formEmailPlaceHolder}
      formSubmit={dict.FormLogin.formSubmit}
      formTitle={dict.FormLogin.formTitle}
     />
    </>
  )
}

export default login;
