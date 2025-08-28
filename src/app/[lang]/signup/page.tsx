import { Header, RegisterForm } from "@/app/components";
import { getDictionary } from "../dictionaries";

const signup =async ({params}:{params:Promise<{lang:'en-US'|'es-ES'}>})=>{
    const {lang} = await params;
    const dict = await getDictionary(lang);

    return(
    <>
    <Header/>
    <RegisterForm
     formTitle={dict.FormSignup.formTitle}
     formName={dict.FormSignup.formName}
     formNamePlaceHolder={dict.FormSignup.formNamePlaceHolder}
     formLastName={dict.FormSignup.formLastName}
     formLastNamePlaceHolder={dict.FormSignup.formLastNamePlaceHolder}
     formUser={dict.FormSignup.formUsername}
     formPass={dict.FormSignup.formPass}
     formEmail={dict.FormSignup.formEmail}
     formEmailPlaceHolder={dict.FormSignup.formEmailPlaceHolder}
     formUsername={dict.FormSignup.formUsername}
     formSubmit={dict.FormSignup.formSubmit}

    />
    
    </>);
}
export default signup;