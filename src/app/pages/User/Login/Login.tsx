import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";

import {FieldValues, useForm} from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import './Login.scss';

import {
    setAccessToken,
    setIsLogged,
    setRefreshToken,
    enqueueErrorMessage,
    enqueueSuccessMessage,
    authApi
} from "../../../store";
import {ROUTES} from "../../../constants";
import {useAppDispatch} from "../../../hooks";

import {LoginResponseType, DefaultResponseType} from "../../../types";

export const Login = () => {
    const isSignupPage = useLocation().pathname.slice(1) === 'signup';
    const navigator = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(false);
    const {
        register,
        getValues,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur"
    });
    const [signup] = authApi.useSignupMutation();
    const [login] = authApi.useLoginMutation();
    const dispatcher = useAppDispatch();

    const handleAgree = () => {
        setIsChecked(current => !current);
    }

    const handleTogglePasswordVisible = () => {
        setIsPasswordVisible(current => !current);
    }

    const handleTogglePasswordRepeatVisible = () => {
        setIsPasswordRepeatVisible(current => !current);
    }

    const resetFormState = () => {
        reset();
        setIsChecked(false);
    };

    const onSubmit = async (data: FieldValues) => {
        try {
            const result = isSignupPage
                ? await signup({
                    email: data.email,
                    password: data.password,
                    passwordRepeat: data.passwordRepeat
                }).unwrap()
                : await login({
                    email: data.email,
                    password: data.password,
                    rememberMe: data.rememberMe
                }).unwrap();

            if ((result as LoginResponseType).userId) {
                const userData = result as LoginResponseType;
                const message = isSignupPage
                    ? 'Пользователь успешно зарегистрирован'
                    : 'Авторизация прошла успешно';

                dispatcher(enqueueSuccessMessage(message));

                if (isSignupPage) {
                    resetFormState();
                    navigator(ROUTES.LOGIN);
                    return;
                }

                dispatcher(setIsLogged(true));
                dispatcher(setAccessToken(userData.accessToken));
                dispatcher(setRefreshToken(userData.refreshToken));
                navigator(ROUTES.HOME);
            }
        } catch (error) {
            let message = "Произошла ошибка, попробуйте позже";

            if ((error as { status: number, data: DefaultResponseType }).data) {
                message = (error as { status: number, data: DefaultResponseType }).data.message;
            }

            dispatcher(enqueueErrorMessage(message));
        }
    };

    return (
        <section className="login">
            <div className="container">
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="auth-form__title">
                        {isSignupPage ? 'Регистрация на сайте' : 'Вход в личный кабинет'}
                    </div>
                    <div className="auth-form__inputs">
                        <div className="auth-form__input">
                            <input type="text"
                                   className="input"
                                   autoComplete='email'
                                   placeholder="Электронная почта"
                                   style={{'borderColor': !isValid && errors?.email ? '#DE1818' : ''}}
                                   {...register('email', {
                                       required: 'Поле обязательно для заполнения',
                                       pattern: {
                                           value: /^[^$!#^\-_*'%?]*[a-z0-9\-_.]{1,64}@[a-z0-9.-]{1,253}\.[a-z]{2,}$/i,
                                           message: 'Введите действительный адрес электронной почты'
                                       }
                                   })}
                            />
                            <div className="hint">
                                {!isValid && errors?.email && errors?.email?.message?.toString()}
                            </div>
                        </div>
                        <div className="auth-form__input">
                            <input type={isPasswordVisible ? 'text' : 'password'}
                                   className="input"
                                   placeholder="Пароль"
                                   style={{'borderColor': !isValid && errors?.password ? '#DE1818' : ''}}
                                   {...register('password', {
                                       required: 'Поле обязательно для заполнения',
                                       pattern: {
                                           value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                           message: isSignupPage
                                               ? 'Пароль должен иметь длину не менее 8-ми символов. Обязательно наличие цифр, заглавной и строчной латинской букв'
                                               : 'Пароль не соответствует требованиям'
                                       }
                                   })}
                            />
                            <div className="hint">
                                {!isValid && errors?.password && errors?.password?.message?.toString()}
                            </div>
                            <Visibility
                                className='password-icon'
                                style={{display: isPasswordVisible ? 'none' : 'block'}}
                                onClick={handleTogglePasswordVisible}
                            />
                            <VisibilityOff
                                className='password-icon'
                                style={{display: isPasswordVisible ? 'block' : 'none'}}
                                onClick={handleTogglePasswordVisible}
                            />
                        </div>
                        {isSignupPage &&
                            <>
                                <div className="auth-form__input">
                                    <input type={isPasswordRepeatVisible ? 'text' : 'password'}
                                           className="input"
                                           placeholder="Повторите пароль"
                                           style={{'borderColor': !isValid && errors?.passwordRepeat ? '#DE1818' : ''}}
                                           {...register('passwordRepeat', {
                                               required: 'Поле обязательно для заполнения',
                                               validate: value => value === getValues('password') || 'Пароли не совпадают'
                                           })}
                                    />
                                    <div className="hint">
                                        {!isValid && errors?.passwordRepeat && errors?.passwordRepeat?.message?.toString()}
                                    </div>
                                    <Visibility
                                        className='password-icon'
                                        style={{display: isPasswordRepeatVisible ? 'none' : 'block'}}
                                        onClick={handleTogglePasswordRepeatVisible}
                                    />
                                    <VisibilityOff
                                        className='password-icon'
                                        style={{display: isPasswordRepeatVisible ? 'block' : 'none'}}
                                        onClick={handleTogglePasswordRepeatVisible}
                                    />
                                </div>
                                <div className="auth-form__checkbox">
                                    <label htmlFor="agree">
                                        <input type="checkbox"
                                               id="agree"
                                               checked={isChecked}
                                               {...register('agree', {
                                                   required: true
                                               })}
                                               onClick={() => handleAgree()}
                                        />
                                        <span/>
                                    </label>
                                    <div>
                                        Я принимаю&nbsp;
                                        <Link to={`${ROUTES.TERMS}#userAgreement`}>
                                            условия пользовательского соглашения&nbsp;
                                        </Link>
                                        и даю&nbsp;
                                        <Link to={`${ROUTES.TERMS}#personalDataProcessing`}>
                                            согласие на обработку персональных данных
                                        </Link>
                                    </div>
                                </div>
                            </>
                        }
                        {!isSignupPage &&
                            <div className="auth-form__checkbox">
                                <label htmlFor="remember">
                                    <input type="checkbox"
                                           id="remember"
                                           {...register('remember')}
                                    />
                                    <span>Запомнить меня</span>
                                </label>
                            </div>
                        }
                    </div>
                    <div className="auth-form__button">
                        <button className="button" disabled={!isValid}>
                            {isSignupPage ? "Зарегистрироваться" : "Войти"}
                        </button>
                    </div>

                    <div className="auth-form__link" onClick={resetFormState}>
                        {isSignupPage
                            ? <>Уже есть аккаунт?<Link to={ROUTES.LOGIN}>Войдите</Link></>
                            : <>Нет аккаунта?<Link to={ROUTES.SIGNUP}>Зарегистрируйтесь</Link></>
                        }
                    </div>
                </form>
                <div className={isSignupPage ? "page-image signup-image" : "page-image"}>
                    {isSignupPage
                        ? <img src="/images/page/signup-bckgrnd.png" alt="plant"/>
                        : <img src="/images/page/login-bckgrnd.png" alt="plant"/>
                    }
                </div>
            </div>
        </section>
    );
};