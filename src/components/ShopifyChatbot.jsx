'use client'

// import { useState, useRef, useEffect } from 'react';
// import { Send, Upload, X, Check, Bot, User, MessageCircle, Sparkles } from 'lucide-react';

// export default function ShopifyChatbot() {
//   const [messages, setMessages] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [inputValue, setInputValue] = useState('');
//   const [userData, setUserData] = useState({
//     name: '',
//     products: [],
//     phone: '',
//     email: '',
//     address: ''
//   });
//   const [isOpen, setIsOpen] = useState(true);
//   const [showHomeScreen, setShowHomeScreen] = useState(true);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [currentProductData, setCurrentProductData] = useState({
//     file: null,
//     fileName: '',
//     size: '',
//     quantity: ''
//   });
//   const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
//   const messagesEndRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const productList = [
//     { id: 1, name: 'Embroidery patches' },
//     { id: 2, name: 'Chenille patches' },
//     { id: 3, name: '3D Embroidered patches' },
//     { id: 4, name: 'Full color printed patches' },
//     { id: 5, name: 'PVC patches' },
//     { id: 6, name: 'Silicone patches' },
//     { id: 7, name: 'Rhinestone patches' },
//     { id: 8, name: 'Matte black flex patches' },
//     { id: 9, name: 'Metallic flex patches' },
//     { id: 10, name: 'Bullion patches' },
//     { id: 11, name: 'Embroidery name patches' },
//     { id: 12, name: 'Velcro patches' },
//     { id: 13, name: 'Leather patches' },
//     { id: 14, name: 'Sublimated patches' },
//     { id: 15, name: 'Faux Leather patches' },
//     { id: 16, name: 'Woven patches' },
//     { id: 17, name: 'Full color flex patches' },
//     { id: 18, name: 'Camo patches' },
//     { id: 19, name: 'College Letters' },
//     { id: 20, name: 'Direct embroidered shirts / hats / hoodies' },
//     { id: 21, name: 'Printed clothing labels' },
//     { id: 22, name: 'Woven labels' },
//     { id: 23, name: 'Vinyl stickers' },
//     { id: 24, name: 'Keychains pvc patch (single side)' },
//     { id: 25, name: 'Keychains pvc patch (double side)' },
//     { id: 26, name: 'Beanies' },
//     { id: 27, name: 'Caps' },
//     { id: 28, name: 'DTF on shirts' },
//     { id: 29, name: 'Hoodies' },
//     { id: 30, name: 'Print embroidery' }
//   ];

//   const questions = [
//     { type: 'text', question: 'Hi! 👋 Welcome to our store. What is your name?', field: 'name' },
//     { type: 'list', question: 'What type of products do you need? (Select all that apply)', field: 'productTypes' },
//     { type: 'file', question: 'Please upload your design file for [PRODUCT]', field: 'file' },
//     { type: 'text', question: 'What size do you need for [PRODUCT]?', field: 'size' },
//     { type: 'text', question: 'What quantity do you need for [PRODUCT]?', field: 'quantity' },
//     { type: 'text', question: 'Please provide your phone number with country code', field: 'phone' },
//     { type: 'text', question: 'What is your email address?', field: 'email' },
//     { type: 'text', question: 'Please provide your shipping address', field: 'address' }
//   ];

//   useEffect(() => {
//     if (messages.length === 0 && !showHomeScreen) {
//       addBotMessage(questions[0].question);
//     }
//   }, [showHomeScreen]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const addBotMessage = (text, showProducts = false) => {
//     setMessages(prev => [...prev, { text, sender: 'bot', showProducts }]);
//   };

//   const addUserMessage = (text) => {
//     setMessages(prev => [...prev, { text, sender: 'user' }]);
//   };

//   const handleStartChat = () => {
//     setShowHomeScreen(false);
//   };

//   const handleProductToggle = (product) => {
//     setSelectedProducts(prev => {
//       const isSelected = prev.some(p => p.id === product.id);
//       if (isSelected) {
//         return prev.filter(p => p.id !== product.id);
//       } else {
//         return [...prev, product];
//       }
//     });
//   };

//   const handleProductConfirm = () => {
//     if (selectedProducts.length === 0) {
//       return;
//     }

//     const selectedText = selectedProducts.map(p => p.name).join(', ');
//     addUserMessage(`Selected products: ${selectedText}`);

//     setTimeout(() => {
//       setCurrentStep(2);
//       setCurrentProductIndex(0);
//       const currentProduct = selectedProducts[0];
//       const questionText = questions[2].question.replace('[PRODUCT]', `**${currentProduct.name}**`);
//       addBotMessage(questionText);
//     }, 500);
//   };
//     // formData.append('upload_preset', 'your_preset');

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await fetch('/api/upload', {
//       method: 'POST',
//       body: formData
//     });

//     const data = await response.json();
//     console.log(data);

//     if (file && data?.imageURL) {
//       setCurrentProductData(prev => ({ ...prev, file, fileName: file.name , fileImage:data?.imageURL}));
//       addUserMessage(`File uploaded: ${file.name}`);

//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }

//       setTimeout(() => {
//         setCurrentStep(3);
//         const currentProduct = selectedProducts[currentProductIndex];
//         const questionText = questions[3].question.replace('[PRODUCT]', `**${currentProduct.name}**`);
//         addBotMessage(questionText);
//       }, 500);
//     }
//   };

//   const showSummary = () => {
//     let summaryText = '📋 Please review your information:\n\n';
//     summaryText += `👤 Name: ${userData.name}\n\n`;

//     summaryText += '🛍️ Products:\n';
//     userData.products.forEach((product, index) => {
//       summaryText += `\n${index + 1}. ${product.productName}\n`;
//       summaryText += `   📁 File: ${product.fileName}\n`;
//       summaryText += `   📏 Size: ${product.size}\n`;
//       summaryText += `   🔢 Quantity: ${product.quantity}\n`;
//     });

//     summaryText += `\n📞 Phone: ${userData.phone}\n`;
//     summaryText += `📧 Email: ${userData.email}\n`;
//     summaryText += `📍 Address: ${userData.address}\n\n`;
//     summaryText += '✅ Is everything correct? (Please type "yes" or "no")';

//     addBotMessage(summaryText);
//     setAwaitingConfirmation(true);
//   };

//   const resetChatbot = () => {
//     setMessages([]);
//     setCurrentStep(0);
//     setInputValue('');
//     setUserData({
//       name: '',
//       products: [],
//       phone: '',
//       email: '',
//       address: ''
//     });
//     setSelectedProducts([]);
//     setCurrentProductIndex(0);
//     setCurrentProductData({
//       file: null,
//       fileName: '',
//       size: '',
//       quantity: ''
//     });
//     setAwaitingConfirmation(false);
//     setShowHomeScreen(true);
//     setIsOpen(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     if (awaitingConfirmation) {
//       const answer = inputValue.toLowerCase().trim();
//       addUserMessage(inputValue);

//       if (answer === 'yes' || answer === 'y') {
//         setTimeout(() => {
//           sendEmail();
//         }, 500);
//       } else {
//         setTimeout(() => {
//           addBotMessage('No problem! Feel free to start a new inquiry anytime. Chat closing...');
//           setTimeout(() => {
//             resetChatbot();
//           }, 2000);
//         }, 500);
//       }
//       setInputValue('');
//       return;
//     }

//     const currentQuestion = questions[currentStep];

//     if (currentStep === 0) {
//       setUserData(prev => ({ ...prev, name: inputValue }));
//       addUserMessage(inputValue);

//       setTimeout(() => {
//         setCurrentStep(1);
//         addBotMessage(questions[1].question, true);
//       }, 500);
//     } else if (currentStep === 3) {
//       setCurrentProductData(prev => ({ ...prev, size: inputValue }));
//       addUserMessage(inputValue);

//       setTimeout(() => {
//         setCurrentStep(4);
//         const currentProduct = selectedProducts[currentProductIndex];
//         const questionText = questions[4].question.replace('[PRODUCT]', `**${currentProduct.name}**`);
//         addBotMessage(questionText);
//       }, 500);
//     } else if (currentStep === 4) {
//       setCurrentProductData(prev => ({ ...prev, quantity: inputValue }));
//       addUserMessage(inputValue);

//       const currentProduct = selectedProducts[currentProductIndex];
//       const productData = {
//         productId: currentProduct.id,
//         productName: currentProduct.name,
//         file: currentProductData.file,
//         fileName: currentProductData.fileName,
//         size: currentProductData.size,
//         quantity: inputValue
//       };

//       setUserData(prev => ({
//         ...prev,
//         products: [...prev.products, productData]
//       }));

//       if (currentProductIndex < selectedProducts.length - 1) {
//         setTimeout(() => {
//           setCurrentProductIndex(currentProductIndex + 1);
//           setCurrentProductData({ file: null, fileName: '', size: '', quantity: '' });
//           setCurrentStep(2);
//           const nextProduct = selectedProducts[currentProductIndex + 1];
//           addBotMessage(`Great! Now let's get details for: **${nextProduct.name}**`);
//           setTimeout(() => {
//             const questionText = questions[2].question.replace('[PRODUCT]', `**${nextProduct.name}**`);
//             addBotMessage(questionText);
//           }, 800);
//         }, 500);
//       } else {
//         setTimeout(() => {
//           setCurrentStep(5);
//           addBotMessage(questions[5].question);
//         }, 500);
//       }
//     } else if (currentStep === 5) {
//       setUserData(prev => ({ ...prev, phone: inputValue }));
//       addUserMessage(inputValue);

//       setTimeout(() => {
//         setCurrentStep(6);
//         addBotMessage(questions[6].question);
//       }, 500);
//     } else if (currentStep === 6) {
//       setUserData(prev => ({ ...prev, email: inputValue }));
//       addUserMessage(inputValue);

//       setTimeout(() => {
//         setCurrentStep(7);
//         addBotMessage(questions[7].question);
//       }, 500);
//     } else if (currentStep === 7) {
//       const updatedUserData = { ...userData, address: inputValue };
//       setUserData(updatedUserData);
//       addUserMessage(inputValue);

//       setTimeout(() => {
//         addBotMessage('Thank you! Processing your inquiry...');
//         setTimeout(() => {
//           showSummary();
//         }, 1000);
//       }, 500);
//     }

//     setInputValue('');
//   };

//   const sendEmail = async () => {
//     addBotMessage('Sending your inquiry...');

//     const formData = new FormData();
//     formData.append('name', userData.name);
//     formData.append('phone', userData.phone);
//     formData.append('email', userData.email);
//     formData.append('address', userData.address);

//     userData.products.forEach((product, index) => {
//       formData.append(`product_${index}_name`, product.productName);
//       formData.append(`product_${index}_size`, product.size);
//       formData.append(`product_${index}_quantity`, product.quantity);
//       if (product.file) {
//         formData.append(`product_${index}_file`, product.file);
//       }
//     });
//     formData.append('total_products', userData.products.length);

//     try {
//       const response = await fetch('/api/send-inquiry', {
//         method: 'POST',
//         body: formData
//       });

//       if (response.ok) {
//         setTimeout(() => {
//           addBotMessage('✅ Your inquiry has been sent successfully! We will contact you soon. Thank you!');
//           setTimeout(() => {
//             addBotMessage('Chat will close in a moment...');
//             setTimeout(() => {
//               resetChatbot();
//             }, 2000);
//           }, 2000);
//         }, 1000);
//       } else {
//         setTimeout(() => {
//           addBotMessage('❌ Sorry, there was an error sending your inquiry. Please try again or contact us directly.');
//         }, 1000);
//       }
//     } catch (error) {
//       setTimeout(() => {
//         addBotMessage('❌ Sorry, there was an error sending your inquiry. Please try again or contact us directly.');
//       }, 1000);
//     }
//   };

//   if (!isOpen) {
//     return (
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all z-50"
//       >
//         <MessageCircle className="w-6 h-6" />
//       </button>
//     );
//   }

//   // const handleupload = async () => {
//   //   const res = await fetch('/api/upload', {
//   //     method: 'POST',
      
//   //   });

//   //   const data = await res.json();
//   //   console.log(data); // This should show your "API works!" message
//   // }

//   return (
//     <>
//       {/* <button className='bg-red-300 cursor-pointer' onClick={handleupload}>Api CAll</button> */}
//       <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden">
//         {showHomeScreen ? (
//           <div className="h-full flex flex-col bg-gradient-to-br from-green-400 to-green-600">
//             <div className="flex justify-end p-4">
//               <button onClick={() => setIsOpen(false)} className="text-white hover:bg-green-700 rounded-full p-2 transition-colors">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="flex-1 flex flex-col items-center justify-center text-white px-8 pb-20">
//               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
//                 <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                 </svg>
//               </div>

//               <h1 className="text-3xl font-bold text-center mb-3">
//                 Customer Service<br />Assistant
//               </h1>

//               <p className="text-green-100 text-center mb-8 text-sm">
//                 Fashion in Every Patch
//               </p>
//             </div>

//             <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
//               <div className="text-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center justify-center gap-2">
//                   Chat with us <span className="text-2xl">🤝</span>
//                 </h2>
//                 <p className="text-gray-600 text-sm">Ask us anything</p>
//               </div>

//               <button
//                 onClick={handleStartChat}
//                 className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-full font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center gap-2"
//               >
//                 <MessageCircle size={20} />
//                 <Sparkles size={16} />
//                 Let's Talk Together
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setShowHomeScreen(true)}
//                   className="hover:bg-green-800 rounded p-1 transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                   </svg>
//                 </button>
//                 <div>
//                   <h3 className="font-semibold text-lg">Product Inquiry</h3>
//                   <p className="text-xs text-green-100">We're here to help!</p>
//                 </div>
//               </div>
//               <button onClick={() => setIsOpen(false)} className="text-white hover:bg-green-800 rounded p-1">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//               {messages.map((msg, idx) => (
//                 <div key={idx}>
//                   <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
//                     {msg.sender === 'bot' && (
//                       <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
//                         <Bot size={18} className="text-white" />
//                       </div>
//                     )}
//                     <div
//                       className={`max-w-[75%] p-3 rounded-lg ${msg.sender === 'user'
//                         ? 'bg-green-600 text-white rounded-br-none'
//                         : 'bg-white text-gray-800 shadow rounded-bl-none'
//                         }`}
//                       dangerouslySetInnerHTML={{
//                         __html: msg.text
//                           .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
//                           .replace(/\n/g, '<br/>')
//                       }}
//                     />
//                     {msg.sender === 'user' && (
//                       <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
//                         <User size={18} className="text-white" />
//                       </div>
//                     )}
//                   </div>

//                   {msg.showProducts && (
//                     <div className="mt-3 bg-white rounded-lg shadow p-3 ml-10">
//                       <div className="max-h-64 overflow-y-auto mb-3">
//                         <div className="grid grid-cols-1 gap-2">
//                           {productList.map(product => {
//                             const isSelected = selectedProducts.some(p => p.id === product.id);
//                             return (
//                               <button
//                                 key={product.id}
//                                 onClick={() => handleProductToggle(product)}
//                                 className={`text-left p-2 rounded transition-colors border flex items-center justify-between ${isSelected
//                                   ? 'bg-green-50 border-green-500'
//                                   : 'hover:bg-gray-50 border-gray-200 hover:border-green-300'
//                                   }`}
//                               >
//                                 <span className="text-sm font-medium text-gray-700">
//                                   {product.id}. {product.name}
//                                 </span>
//                                 {isSelected && (
//                                   <Check size={18} className="text-green-600" />
//                                 )}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
//                       <button
//                         onClick={handleProductConfirm}
//                         disabled={selectedProducts.length === 0}
//                         className={`w-full py-2 rounded-lg font-medium transition-colors ${selectedProducts.length > 0
//                           ? 'bg-green-600 text-white hover:bg-green-700'
//                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                           }`}
//                       >
//                         Confirm Selection ({selectedProducts.length})
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="p-4 bg-white border-t">
//               {questions[currentStep]?.type === 'file' ? (
//                 <div>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleFileUpload}
//                     accept="image/*,.pdf,.ai,.eps,.psd"
//                     className="hidden"
//                   />
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <Upload size={20} />
//                     {currentProductData.fileName || 'Choose File'}
//                   </button>
//                 </div>
//               ) : questions[currentStep]?.type === 'list' ? (
//                 <div className="text-sm text-gray-500 text-center">
//                   Select products from the list above, then click Confirm
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
//                     placeholder={awaitingConfirmation ? 'Type yes or no...' : 'Type your answer...'}
//                     className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
//                   />
//                   <button
//                     onClick={handleSubmit}
//                     className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                     <Send size={20} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </>

//   );
// }
import { useState, useRef, useEffect } from 'react';
import { Send, Upload, X, Check, Bot, User, MessageCircle, Sparkles } from 'lucide-react';

export default function ShopifyChatbot() {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    products: [],
    phone: '',
    email: '',
    address: ''
  });
  const [isOpen, setIsOpen] = useState(true);
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentProductData, setCurrentProductData] = useState({
    file: null,
    fileName: '',
    fileImage: '',
    size: '',
    quantity: ''
  });
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const productList = [
    { id: 1, name: 'Embroidery patches' },
    { id: 2, name: 'Chenille patches' },
    { id: 3, name: '3D Embroidered patches' },
    { id: 4, name: 'Full color printed patches' },
    { id: 5, name: 'PVC patches' },
    { id: 6, name: 'Silicone patches' },
    { id: 7, name: 'Rhinestone patches' },
    { id: 8, name: 'Matte black flex patches' },
    { id: 9, name: 'Metallic flex patches' },
    { id: 10, name: 'Bullion patches' },
    { id: 11, name: 'Embroidery name patches' },
    { id: 12, name: 'Velcro patches' },
    { id: 13, name: 'Leather patches' },
    { id: 14, name: 'Sublimated patches' },
    { id: 15, name: 'Faux Leather patches' },
    { id: 16, name: 'Woven patches' },
    { id: 17, name: 'Full color flex patches' },
    { id: 18, name: 'Camo patches' },
    { id: 19, name: 'College Letters' },
    { id: 20, name: 'Direct embroidered shirts / hats / hoodies' },
    { id: 21, name: 'Printed clothing labels' },
    { id: 22, name: 'Woven labels' },
    { id: 23, name: 'Vinyl stickers' },
    { id: 24, name: 'Keychains pvc patch (single side)' },
    { id: 25, name: 'Keychains pvc patch (double side)' },
    { id: 26, name: 'Beanies' },
    { id: 27, name: 'Caps' },
    { id: 28, name: 'DTF on shirts' },
    { id: 29, name: 'Hoodies' },
    { id: 30, name: 'Print embroidery' }
  ];

  const questions = [
    { type: 'text', question: 'Hi! 👋 Welcome to our store. What is your name?', field: 'name' },
    { type: 'list', question: 'What type of products do you need? (Select all that apply)', field: 'productTypes' },
    { type: 'file', question: 'Please upload your design file for [PRODUCT]', field: 'file' },
    { type: 'text', question: 'What size do you need for [PRODUCT]?', field: 'size' },
    { type: 'text', question: 'What quantity do you need for [PRODUCT]?', field: 'quantity' },
    { type: 'text', question: 'Please provide your phone number with country code', field: 'phone' },
    { type: 'text', question: 'What is your email address?', field: 'email' },
    { type: 'text', question: 'Please provide your shipping address', field: 'address' }
  ];

  useEffect(() => {
    if (messages.length === 0 && !showHomeScreen) {
      addBotMessage(questions[0].question);
    }
  }, [showHomeScreen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text, showProducts = false) => {
    setMessages(prev => [...prev, { text, sender: 'bot', showProducts }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { text, sender: 'user' }]);
  };

  const handleStartChat = () => {
    setShowHomeScreen(false);
  };

  const handleProductToggle = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleProductConfirm = () => {
    if (selectedProducts.length === 0) {
      return;
    }

    const selectedText = selectedProducts.map(p => p.name).join(', ');
    addUserMessage(`Selected products: ${selectedText}`);
    
    setTimeout(() => {
      setCurrentStep(2);
      setCurrentProductIndex(0);
      const currentProduct = selectedProducts[0];
      const questionText = questions[2].question.replace('[PRODUCT]', `**${currentProduct.name}**`);
      addBotMessage(questionText);
    }, 500);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log(data);
      
      if (data?.imageURL) {
        setCurrentProductData(prev => ({ 
          ...prev, 
          file, 
          fileName: file.name, 
          fileImage: data.imageURL 
        }));
        addUserMessage(`File uploaded: ${file.name}`);

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        setTimeout(() => {
          setCurrentStep(3);
          const currentProduct = selectedProducts[currentProductIndex];
          const questionText = questions[3].question.replace('[PRODUCT]', `**${currentProduct.name}**`);
          addBotMessage(questionText);
        }, 500);
      }
    } catch (error) {
      console.error('File upload error:', error);
      addBotMessage('❌ Sorry, there was an error uploading the file. Please try again.');
    }
  };

  const showSummary = () => {
    let summaryText = '📋 Please review your information:\n\n';
    summaryText += `👤 Name: ${userData.name}\n\n`;
    
    summaryText += '🛍️ Products:\n';
    userData.products.forEach((product, index) => {
      summaryText += `\n${index + 1}. ${product.productName}\n`;
      summaryText += `   📁 File: ${product.fileName}\n`;
      summaryText += `   📏 Size: ${product.size}\n`;
      summaryText += `   🔢 Quantity: ${product.quantity}\n`;
    });
    
    summaryText += `\n📞 Phone: ${userData.phone}\n`;
    summaryText += `📧 Email: ${userData.email}\n`;
    summaryText += `📍 Address: ${userData.address}\n\n`;
    summaryText += '✅ Is everything correct? (Please type "yes" or "no")';
    
    addBotMessage(summaryText);
    setAwaitingConfirmation(true);
  };

  const resetChatbot = () => {
    setMessages([]);
    setCurrentStep(0);
    setInputValue('');
    setUserData({
      name: '',
      products: [],
      phone: '',
      email: '',
      address: ''
    });
    setSelectedProducts([]);
    setCurrentProductIndex(0);
    setCurrentProductData({
      file: null,
      fileName: '',
      fileImage: '',
      size: '',
      quantity: ''
    });
    setAwaitingConfirmation(false);
    setShowHomeScreen(true);
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (awaitingConfirmation) {
      const answer = inputValue.toLowerCase().trim();
      addUserMessage(inputValue);
      
      if (answer === 'yes' || answer === 'y') {
        setTimeout(() => {
          sendEmail();
        }, 500);
      } else {
        setTimeout(() => {
          addBotMessage('No problem! Feel free to start a new inquiry anytime. Chat closing...');
          setTimeout(() => {
            resetChatbot();
          }, 2000);
        }, 500);
      }
      setInputValue('');
      return;
    }

    const currentQuestion = questions[currentStep];
    
    if (currentStep === 0) {
      setUserData(prev => ({ ...prev, name: inputValue }));
      addUserMessage(inputValue);
      
      setTimeout(() => {
        setCurrentStep(1);
        addBotMessage(questions[1].question, true);
      }, 500);
    } else if (currentStep === 3) {
      setCurrentProductData(prev => ({ ...prev, size: inputValue }));
      addUserMessage(inputValue);
      
      setTimeout(() => {
        setCurrentStep(4);
        const currentProduct = selectedProducts[currentProductIndex];
        const questionText = questions[4].question.replace('[PRODUCT]', `**${currentProduct.name}**`);
        addBotMessage(questionText);
      }, 500);
    } else if (currentStep === 4) {
      setCurrentProductData(prev => ({ ...prev, quantity: inputValue }));
      addUserMessage(inputValue);
      
      const currentProduct = selectedProducts[currentProductIndex];
      const productData = {
        productId: currentProduct.id,
        productName: currentProduct.name,
        file: currentProductData.file,
        fileName: currentProductData.fileName,
        fileImage: currentProductData.fileImage,
        size: currentProductData.size,
        quantity: inputValue
      };
      
      setUserData(prev => ({
        ...prev,
        products: [...prev.products, productData]
      }));
      
      if (currentProductIndex < selectedProducts.length - 1) {
        setTimeout(() => {
          setCurrentProductIndex(currentProductIndex + 1);
          setCurrentProductData({ file: null, fileName: '', fileImage: '', size: '', quantity: '' });
          setCurrentStep(2);
          const nextProduct = selectedProducts[currentProductIndex + 1];
          addBotMessage(`Great! Now let's get details for: **${nextProduct.name}**`);
          setTimeout(() => {
            const questionText = questions[2].question.replace('[PRODUCT]', `**${nextProduct.name}**`);
            addBotMessage(questionText);
          }, 800);
        }, 500);
      } else {
        setTimeout(() => {
          setCurrentStep(5);
          addBotMessage(questions[5].question);
        }, 500);
      }
    } else if (currentStep === 5) {
      setUserData(prev => ({ ...prev, phone: inputValue }));
      addUserMessage(inputValue);
      
      setTimeout(() => {
        setCurrentStep(6);
        addBotMessage(questions[6].question);
      }, 500);
    } else if (currentStep === 6) {
      setUserData(prev => ({ ...prev, email: inputValue }));
      addUserMessage(inputValue);
      
      setTimeout(() => {
        setCurrentStep(7);
        addBotMessage(questions[7].question);
      }, 500);
    } else if (currentStep === 7) {
      const updatedUserData = { ...userData, address: inputValue };
      setUserData(updatedUserData);
      addUserMessage(inputValue);
      
      setTimeout(() => {
        addBotMessage('Thank you! Processing your inquiry...');
        setTimeout(() => {
          showSummary();
        }, 1000);
      }, 500);
    }

    setInputValue('');
  };

  const sendEmail = async () => {
    addBotMessage('Sending your inquiry...');

    const emailData = {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      address: userData.address,
      products: userData.products.map(product => ({
        productName: product.productName,
        fileName: product.fileName,
        fileImage: product.fileImage,
        size: product.size,
        quantity: product.quantity
      }))
    };
    console.log(emailData);
    
    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        setTimeout(() => {
          addBotMessage('✅ Your inquiry has been sent successfully! We will contact you soon. Thank you!');
          setTimeout(() => {
            addBotMessage('Chat will close in a moment...');
            setTimeout(() => {
              resetChatbot();
            }, 2000);
          }, 2000);
        }, 1000);
      } else {
        setTimeout(() => {
          addBotMessage('❌ Sorry, there was an error sending your inquiry. Please try again or contact us directly.');
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        addBotMessage('❌ Sorry, there was an error sending your inquiry. Please try again or contact us directly.');
      }, 1000);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden">
      {showHomeScreen ? (
        <div className="h-full flex flex-col bg-gradient-to-br from-green-400 to-green-600">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-green-700 rounded-full p-2 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-white px-8 pb-20">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-center mb-3">
              Customer Service<br />Assistant
            </h1>
            
            <p className="text-green-100 text-center mb-8 text-sm">
              Fashion in Every Patch
            </p>
          </div>
          
          <div className="bg-white rounded-t-3xl p-6 shadow-2xl">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center justify-center gap-2">
                Chat with us <span className="text-2xl">🤝</span>
              </h2>
              <p className="text-gray-600 text-sm">Ask us anything</p>
            </div>
            
            <button
              onClick={handleStartChat}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-full font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              <Sparkles size={16} />
              Let's Talk Together
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowHomeScreen(true)}
                className="hover:bg-green-800 rounded p-1 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h3 className="font-semibold text-lg">Product Inquiry</h3>
                <p className="text-xs text-green-100">We're here to help!</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-green-800 rounded p-1">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <Bot size={18} className="text-white" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[75%] p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-green-600 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 shadow rounded-bl-none'
                    }`}
                    dangerouslySetInnerHTML={{ 
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>') 
                    }}
                  />
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-white" />
                    </div>
                  )}
                </div>
                
                {msg.showProducts && (
                  <div className="mt-3 bg-white rounded-lg shadow p-3 ml-10">
                    <div className="max-h-64 overflow-y-auto mb-3">
                      <div className="grid grid-cols-1 gap-2">
                        {productList.map(product => {
                          const isSelected = selectedProducts.some(p => p.id === product.id);
                          return (
                            <button
                              key={product.id}
                              onClick={() => handleProductToggle(product)}
                              className={`text-left p-2 rounded transition-colors border flex items-center justify-between ${
                                isSelected 
                                  ? 'bg-green-50 border-green-500' 
                                  : 'hover:bg-gray-50 border-gray-200 hover:border-green-300'
                              }`}
                            >
                              <span className="text-sm font-medium text-gray-700">
                                {product.id}. {product.name}
                              </span>
                              {isSelected && (
                                <Check size={18} className="text-green-600" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      onClick={handleProductConfirm}
                      disabled={selectedProducts.length === 0}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        selectedProducts.length > 0
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Confirm Selection ({selectedProducts.length})
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t">
            {questions[currentStep]?.type === 'file' ? (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.ai,.eps,.psd"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={20} />
                  {currentProductData.fileName || 'Choose File'}
                </button>
              </div>
            ) : questions[currentStep]?.type === 'list' ? (
              <div className="text-sm text-gray-500 text-center">
                Select products from the list above, then click Confirm
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  placeholder={awaitingConfirmation ? 'Type yes or no...' : 'Type your answer...'}
                  className="flex-1 border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}