//Props para la internacionalización
type TextProps = {
  formTitle:string;
  formUser:string;
  formPass:string;
  formSubmit:string;
}
export const LoginForm = (props:TextProps) => {

  return (<>
    <div>
      <div className='bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
        {props.formTitle}
      </h2>
      <form className='space-y-6' action=''>
         <div className='grid grid-cols-1 gap-4'>
            <div >
                <label>{props.formUser}</label>
                <input 
                 type='text'
                 id="user"
                 className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                 placeholder={props.formUser}/>
            </div>
            <div >
                <label>{props.formPass}</label>
                <input 
                 type='password'
                 id="pass"
                 className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                 placeholder={props.formPass}/>
            </div>
           
            <div className='flex justify-center'>
                <button 
                 type='submit'
                 className='w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                {props.formSubmit}
                </button>
            </div>
          </div>
      </form>
    </div>
    </div>
  </>)  
}
