"use client"
import { useEffect, useState } from "react";
import ErrorIcon from "../ErrorIcon";
import LoadingSpinner from "../LoadingSpinner";

const ConnectCard = ({ onConnectionError }: { onConnectionError: () => void }) => {
    const [status, setStatus] = useState('waiting');
    const [buttonText, setButtonText] = useState('Waiting for Trezor...');

    const runConnectionSimulation = () => {
        setStatus('connecting');
        setButtonText('Establishing connection...');

        setTimeout(() => {
            setButtonText('Exchanging Keys...');
        }, 1000);

        setTimeout(() => {
            setStatus('error');
            setButtonText('Unable to read data');
            onConnectionError();
        }, 2000);
    };

    useEffect(() => {
        runConnectionSimulation();
    }, []);


    const handleRetry = () => {
        runConnectionSimulation();
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex h-[122px] w-[360px] max-w-full rounded-full p-2.5 bg-white items-center shadow-lg mb-16">
                <div className="flex-shrink-0 h-[100px] w-[100px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {/* The animated SVG from the original file can be complex to replicate. 
                    A simple loading indicator is used here. */}
                    <div className="w-full h-full bg-gray-100" />
                </div>
                <div className="flex flex-col mx-8 text-center text-gray-800 text-xl font-medium">
                    <span>Connect your Trezor</span>
                </div>
            </div>
            <button
                onClick={handleRetry}
                className={`flex items-center justify-center px-4 py-2 text-white font-semibold rounded transition-colors duration-150 ${status === 'error' ? 'bg-gray-600' : 'bg-green-600'}`}
            >
                <div className="w-5 h-5 mr-2">
                    {status === 'connecting' && <LoadingSpinner />}
                    {status === 'error' && <ErrorIcon />}
                </div>
                <span>{buttonText}</span>
            </button>
        </div>
    );
};

export default ConnectCard;