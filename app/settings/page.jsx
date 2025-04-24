// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Input } from '../components/input';
// import { Button } from '../components/button';
// import { Upload, User, CreditCard, Settings, Shield, Clock } from 'lucide-react';
// import { Switch } from '@headlessui/react';
// import toast from 'react-hot-toast';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const SettingsPage = () => {
//   const [emailNotifications, setEmailNotifications] = useState(true);
//   const [twoFactorAuth, setTwoFactorAuth] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState('Free');
//   const [isLoading, setIsLoading] = useState(false);
//   const [activityLog, setActivityLog] = useState([]);
//   const [profilePic, setProfilePic] = useState(null);

//   const plans = [
//     { name: 'Free', price: '$0/month', features: ['Basic Support', 'Limited Access'] },
//     { name: 'Pro', price: '$15/month', features: ['Priority Support', 'Full Access', 'Customizable Features'] },
//     { name: 'Business', price: '$30/month', features: ['Premium Support', 'Unlimited Access', 'Advanced Customization'] },
//   ];

//   const handlePlanChange = (plan) => {
//     if (plan === selectedPlan) {
//       toast.error('This plan is already selected');
//       return;
//     }
//     setIsLoading(true);
//     setTimeout(() => {
//       setSelectedPlan(plan);
//       toast.success(`Plan updated to ${plan}`);
//       setIsLoading(false);
//       addActivityLog(`Plan updated to ${plan}`);
//     }, 1000);
//   };

//   const handleEmailToggle = () => {
//     setEmailNotifications((prev) => {
//       const newState = !prev;
//       toast.success(`Email notifications are now ${newState ? 'enabled' : 'disabled'}`);
//       addActivityLog(`Email notifications ${newState ? 'disabled' : 'enabled'}`);
//       return newState;
//     });
//   };

//   const handleTwoFactorToggle = () => {
//     setTwoFactorAuth((prev) => {
//       const newState = !prev;
//       toast.success(`Two-factor authentication ${newState ? 'enabled' : 'disabled'}`);
//       addActivityLog(`Two-factor authentication ${newState ? 'disabled' : 'enabled'}`);
//       return newState;
//     });
//   };

//   const handleProfilePicUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setProfilePic(e.target.result);
//         toast.success('Profile picture updated');
//         addActivityLog('Profile picture updated');
//       };
//       reader.readAsDataURL(file);
//     } else {
//       toast.error('Please upload a valid image file');
//     }
//   };

//   const addActivityLog = (activity) => {
//     const now = new Date();
//     const log = `${activity} at ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}`;
//     setActivityLog((prev) => [log, ...prev].slice(0, 5));
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const newLog = `Activity at ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}`;
//       setActivityLog((prev) => [newLog, ...prev].slice(0, 5));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <header className="sticky top-0 bg-white/80 backdrop-blur-md py-6 mb-12 z-10 rounded-b-xl shadow-sm">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h1 className="text-4xl font-bold text-gray-900 tracking-tight flex items-center">
//               <Settings className="w-8 h-8 text-blue-700 mr-3" />
//               Settings
//             </h1>
//             <p className="mt-2 text-lg text-gray-600">Customize your account and subscription preferences.</p>
//           </div>
//         </header>

//         {/* Profile Section */}
//         <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 animate-fade-in">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
//             <User className="w-6 h-6 text-blue-700 mr-2" />
//             Profile
//           </h2>
//           <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-6 sm:space-y-0">
//             <div className="relative group">
//               {profilePic ? (
//                 <img
//                   src={profilePic}
//                   alt="Profile"
//                   className="w-28 h-28 rounded-full object-cover ring-4 ring-gradient-to-r from-blue-500 to-indigo-500 group-hover:ring-8 transition-all duration-300"
//                 />
//               ) : (
//                 <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-gray-200 group-hover:ring-8 transition-all duration-300">
//                   <span className="text-gray-500 text-sm">No Image</span>
//                 </div>
//               )}
//               <label
//                 htmlFor="profile-pic"
//                 className="absolute bottom-0 right-0 bg-blue-700 p-2.5 rounded-full cursor-pointer hover:bg-blue-800 transition-colors shadow-sm"
//                 aria-label="Upload profile picture"
//               >
//                 <Upload className="w-5 h-5 text-white" />
//                 <input
//                   id="profile-pic"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleProfilePicUpload}
//                 />
//               </label>
//             </div>
//             <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Input
//                 type="text"
//                 placeholder="Full Name"
//                 className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg p-3"
//                 aria-label="Full Name"
//               />
//               <Input
//                 type="email"
//                 placeholder="Email Address"
//                 className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg p-3"
//                 aria-label="Email Address"
//               />
//             </div>
//           </div>
//           <div className="mt-6 flex justify-end">
//             <Button
//               text="Update Profile"
//               className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 rounded-lg px-8 py-3 font-semibold text-base shadow-md w-full sm:w-auto"
//               aria-label="Update Profile"
//             />
//           </div>
//         </section>

//         {/* Plan & Billing Section */}
//         <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 animate-fade-in">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
//             <CreditCard className="w-6 h-6 text-blue-700 mr-2" />
//             Plan & Billing
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {plans.map((plan) => (
//               <div
//                 key={plan.name}
//                 className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 ${
//                   selectedPlan === plan.name
//                     ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg'
//                     : 'border-gray-200 bg-white hover:shadow-lg hover:scale-105'
//                 }`}
//                 onClick={() => handlePlanChange(plan.name)}
//                 role="button"
//                 aria-label={`Select ${plan.name} plan`}
//               >
//                 <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
//                 <p className="text-gray-600 text-lg font-medium mt-1">{plan.price}</p>
//                 <ul className="mt-4 text-sm text-gray-600 space-y-2">
//                   {plan.features.map((feature, index) => (
//                     <li key={index} className="flex items-center">
//                       <span className="mr-2 text-blue-600">✓</span>{feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//           {isLoading && <Skeleton height={80} className="mt-6" />}
//         </section>

//         {/* Preferences Section */}
//         <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 animate-fade-in">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
//             <Settings className="w-6 h-6 text-blue-700 mr-2" />
//             Preferences
//           </h2>
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <span className="text-gray-900 font-medium">Email Notifications</span>
//               <Switch
//                 checked={emailNotifications}
//                 onChange={handleEmailToggle}
//                 className={`${
//                   emailNotifications ? 'bg-blue-700' : 'bg-gray-300'
//                 } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
//                 aria-label="Toggle email notifications"
//               >
//                 <span
//                   className={`${
//                     emailNotifications ? 'translate-x-6' : 'translate-x-1'
//                   } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200`}
//                 />
//               </Switch>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-900 font-medium">Two-Factor Authentication</span>
//               <Switch
//                 checked={twoFactorAuth}
//                 onChange={handleTwoFactorToggle}
//                 className={`${
//                   twoFactorAuth ? 'bg-blue-700' : 'bg-gray-300'
//                 } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
//                 aria-label="Toggle two-factor authentication"
//               >
//                 <span
//                   className={`${
//                     twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
//                   } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200`}
//                 />
//               </Switch>
//             </div>
//           </div>
//         </section>

//         {/* Security Section */}
//         <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 animate-fade-in">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
//             <Shield className="w-6 h-6 text-blue-700 mr-2" />
//             Security
//           </h2>
//           <div className="space-y-4">
//             <Input
//               type="password"
//               placeholder="New Password"
//               className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg p-3"
//               aria-label="New Password"
//             />
//             <Input
//               type="password"
//               placeholder="Confirm Password"
//               className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg p-3"
//               aria-label="Confirm Password"
//             />
//             <Button
//               text="Update Password"
//               className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 rounded-lg px-8 py-3 font-semibold"
//             />
//           </div>
//         </section>

//         {/* Activity Log Section */}
//         <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
//             <Clock className="w-6 h-6 text-blue-700 mr-2" />
//             Activity Log
//           </h2>
//           <ul className="space-y-3 text-gray-600">
//             {activityLog.length === 0 ? (
//               <Skeleton height={24} count={3} />
//             ) : (
//               activityLog.map((log, index) => (
//                 <li key={index} className="flex items-center">
//                   <span className="mr-2 text-blue-600">•</span>{log}
//                 </li>
//               ))
//             )}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;



'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { Upload, User, CreditCard, Settings, Shield, Clock, Trash2 } from 'lucide-react';
import { Switch } from '@headlessui/react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Free');
  const [isLoading, setIsLoading] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [profilePic, setProfilePic] = useState(null);

  const plans = [
    { name: 'Free', price: '$0/month', features: ['Basic Support', 'Limited Access'], priceId: 'price_free' },
    { name: 'Pro', price: '$15/month', features: ['Priority Support', 'Full Access', 'Customizable Features'], priceId: 'price_pro' },
    { name: 'Business', price: '$30/month', features: ['Premium Support', 'Unlimited Access', 'Advanced Customization'], priceId: 'price_business' },
  ];

  const handlePlanChange = async (plan) => {
    if (plan.name === selectedPlan) {
      toast.error('This plan is already selected');
      return;
    }
    if (plan.name === 'Free') {
      setIsLoading(true);
      setTimeout(() => {
        setSelectedPlan(plan.name);
        toast.success(`Plan updated to ${plan.name}`);
        setIsLoading(false);
        addActivityLog(`Plan updated to ${plan.name}`);
      }, 1000);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/create-checkout-session', {
        priceId: plan.priceId,
        planName: plan.name,
      });
      addActivityLog(`Initiated payment for ${plan.name}`);
      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      toast.error('Failed to initiate payment. Please try again.');
      addActivityLog(`Failed to initiate payment for ${plan.name}`);
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailToggle = () => {
    setEmailNotifications((prev) => {
      const newState = !prev;
      toast.success(`Email notifications are now ${newState ? 'enabled' : 'disabled'}`);
      addActivityLog(`Email notifications ${newState ? 'disabled' : 'enabled'}`);
      return newState;
    });
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorAuth((prev) => {
      const newState = !prev;
      toast.success(`Two-factor authentication ${newState ? 'enabled' : 'disabled'}`);
      addActivityLog(`Two-factor authentication ${newState ? 'disabled' : 'enabled'}`);
      return newState;
    });
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
        toast.success('Profile picture updated');
        addActivityLog('Profile picture updated');
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload a valid image file');
    }
  };

  const handleProfilePicDelete = () => {
    setProfilePic(null);
    toast.success('Profile picture deleted');
    addActivityLog('Profile picture deleted');
  };

  const addActivityLog = (activity) => {
    const now = new Date();
    const log = `${activity} at ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}`;
    setActivityLog((prev) => [log, ...prev].slice(0, 5));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newLog = `Activity at ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}`;
      setActivityLog((prev) => [newLog, ...prev].slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle success/cancel redirects from Stripe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const planName = urlParams.get('plan');
    if (sessionId && planName) {
      setSelectedPlan(planName);
      toast.success(`Successfully subscribed to ${planName}`);
      addActivityLog(`Successfully subscribed to ${planName}`);
      // Clear query params
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    const canceled = urlParams.get('canceled');
    if (canceled) {
      toast.error('Payment was canceled');
      addActivityLog('Payment was canceled');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md py-6 mb-12 z-10 rounded-b-xl shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight flex items-center">
              <Settings className="w-8 h-8 text-blue-700 mr-3" />
              Settings
            </h1>
            <p className="mt-2 text-lg text-gray-600">Customize your account and subscription preferences.</p>
          </div>
        </header>

        {/* Profile Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="w-6 h-6 text-blue-700 mr-2" />
            Profile
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-6 sm:space-y-0">
            <div className="relative group">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-gradient-to-r from-blue-500 to-indigo-500 group-hover:ring-8 transition-all duration-300"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-gray-200 group-hover:ring-8 transition-all duration-300">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
              <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 bg-blue-700 p-2.5 rounded-full cursor-pointer hover:bg-blue-800 transition-colors shadow-sm"
                aria-label="Upload profile picture"
              >
                <Upload className="w-5 h-5 text-white" />
                <input
                  id="profile-pic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicUpload}
                />
              </label>
              {profilePic && (
                <button
                  onClick={handleProfilePicDelete}
                  className="absolute bottom-0 left-0 bg-blue-700 p-2.5 rounded-full cursor-pointer hover:bg-blue-800 transition-colors shadow-sm"
                  aria-label="Delete profile picture"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg p-3"
                aria-label="Full Name"
              />
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg p-3"
                aria-label="Email Address"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              text="Update Profile"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 rounded-lg px-8 py-3 font-semibold text-base shadow-md w-full sm:w-auto"
              aria-label="Update Profile"
            />
          </div>
        </section>

        {/* Plan & Billing Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <CreditCard className="w-6 h-6 text-blue-700 mr-2" />
            Plan & Billing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.name
                    ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:shadow-lg hover:scale-105'
                } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => handlePlanChange(plan)}
                role="button"
                aria-label={`Select ${plan.name} plan`}
              >
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 text-lg font-medium mt-1">{plan.price}</p>
                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2 text-blue-600">✓</span>{feature}
                    </li>
                  ))}
                </ul>
                <Button
                  text={selectedPlan === plan.name ? 'Current Plan' : 'Select Plan'}
                  className={`mt-4 w-full bg-gradient-to-r ${
                    selectedPlan === plan.name
                      ? 'from-gray-400 to-gray-500 text-white cursor-not-allowed'
                      : 'from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg'
                  } transition-all duration-300 rounded-lg px-6 py-2 font-semibold`}
                  disabled={selectedPlan === plan.name || isLoading}
                />
              </div>
            ))}
          </div>
          {isLoading && <Skeleton height={80} className="mt-6" />}
        </section>

        {/* Preferences Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Settings className="w-6 h-6 text-blue-700 mr-2" />
            Preferences
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">Email Notifications</span>
              <Switch
                checked={emailNotifications}
                onChange={handleEmailToggle}
                className={`${
                  emailNotifications ? 'bg-blue-700' : 'bg-gray-300'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
                aria-label="Toggle email notifications"
              >
                <span
                  className={`${
                    emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200`}
                />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">Two-Factor Authentication</span>
              <Switch
                checked={twoFactorAuth}
                onChange={handleTwoFactorToggle}
                className={`${
                  twoFactorAuth ? 'bg-blue-700' : 'bg-gray-300'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
                aria-label="Toggle two-factor authentication"
              >
                <span
                  className={`${
                    twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200`}
                />
              </Switch>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-100 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 text-blue-700 mr-2" />
            Security
          </h2>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="New Password"
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg p-3"
              aria-label="New Password"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-lg p-3"
              aria-label="Confirm Password"
            />
            <Button
              text="Update Password"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 rounded-lg px-8 py-3 font-semibold"
            />
          </div>
        </section>

        {/* Activity Log Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Clock className="w-6 h-6 text-blue-700 mr-2" />
            Activity Log
          </h2>
          <ul className="space-y-3 text-gray-600">
            {activityLog.length === 0 ? (
              <Skeleton height={24} count={3} />
            ) : (
              activityLog.map((log, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-blue-600">•</span>{log}
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;