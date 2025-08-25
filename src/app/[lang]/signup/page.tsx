import { RegisterForm } from "@/app/components";
import { getDictionary } from "../dictionaries";

const signup =async ({params}:{params:Promise<{lang:'en-US'|'es-ES'}>})=>{
    const {lang} = await params;
    const dict = await getDictionary(lang);

    return(
    <>
    <h1>Formulario de Registro</h1>
    <RegisterForm
     formTitle={dict.FormSignup.formTitle}
     formUser={dict.FormSignup.formUsername}
     formPass={dict.FormSignup.formPass}
     formSubmit={dict.FormSignup.formSubmit}

    />
    </>);
}
export default signup;