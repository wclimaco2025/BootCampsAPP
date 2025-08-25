"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '../../../services/supabase.service';

type TextProps = {
  formTitle: string;
  formUser: string;
  formPass: string;
  formSubmit: string;
  formName: string;
  formNamePlaceHolder: string;
  formLastName: string;
  formLastNamePlaceHolder: string;
  formUsername: string;
  formEmail: string;
  formEmailPlaceHolder: string;
}

type RegisterFormData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export const RegisterForm = (props: TextProps) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        setMessage('');

        try {
            const { data: authData, error } = await signUp(
                data.email, 
                data.password,
                {
                    name: data.name,
                    lastname: data.lastname
                }
            );

            if (error) {
                setMessage(`Error: ${error.message}`);
            } else if (authData.user) {
                setMessage('¡Registro exitoso! Revisa tu email para confirmar tu cuenta.');
                reset();
            }
        } catch (error) {
            setMessage('Error inesperado durante el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <div className='bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
                        {props.formTitle}
                    </h2>
                    
                    {message && (
                        <div className={`mb-4 p-3 rounded-md text-center ${
                            message.includes('Error') 
                                ? 'bg-red-100 text-red-700 border border-red-300' 
                                : 'bg-green-100 text-green-700 border border-green-300'
                        }`}>
                            {message}
                        </div>
                    )}

                    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-1 gap-4'>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    {props.formName}
                                </label>
                                <input 
                                    type='text'
                                    id="name"
                                    {...register('name', { 
                                        required: 'El nombre es requerido',
                                        minLength: {
                                            value: 2,
                                            message: 'El nombre debe tener al menos 2 caracteres'
                                        }
                                    })}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                                        errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder={props.formNamePlaceHolder}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                                    {props.formLastName}
                                </label>
                                <input 
                                    type='text'
                                    id="lastname"
                                    {...register('lastname', { 
                                        required: 'El apellido es requerido',
                                        minLength: {
                                            value: 2,
                                            message: 'El apellido debe tener al menos 2 caracteres'
                                        }
                                    })}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                                        errors.lastname ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder={props.formLastNamePlaceHolder}
                                />
                                {errors.lastname && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    {props.formEmail}
                                </label>
                                <input 
                                    type='email'
                                    id="email"
                                    {...register('email', { 
                                        required: 'El email es requerido',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Email inválido'
                                        }
                                    })}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder={props.formEmailPlaceHolder}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    {props.formPass}
                                </label>
                                <input 
                                    type='password'
                                    id="password"
                                    {...register('password', { 
                                        required: 'La contraseña es requerida',
                                        minLength: {
                                            value: 6,
                                            message: 'La contraseña debe tener al menos 6 caracteres'
                                        }
                                    })}
                                    autoComplete="new-password"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder={props.formPass}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                           
                            <div className='flex justify-center'>
                                <button 
                                    type='submit'
                                    disabled={loading}
                                    className={`w-full px-6 py-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                                        loading 
                                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    {loading ? 'Registrando...' : props.formSubmit}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>        
    )
}
