import React from 'react'

const Support = () => {
  const paymentMethods = [
    { name: 'PayPal', icon: 'https://cdn-icons-png.flaticon.com/512/174/174861.png' },
    { name: 'Venmo', icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670157.png' },
    { name: 'Cash App', icon: 'https://cdn-icons-png.flaticon.com/512/825/825454.png' },
    { name: 'Ko-fi', icon: 'https://cdn-icons-png.flaticon.com/512/2965/2965300.png' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Show Your Support
        </h1>
        
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
          If you enjoy my content and would like to support my work, here are some ways you can contribute.
          Every little bit helps me continue creating!
        </p>
        
        {/* Payment QR Code/Image */}
        <div className="mb-12 flex justify-center">
          <img 
            src="payment.jpeg" 
            className="h-64 sm:h-80 w-full bg-white object-contain rounded-lg shadow-md border border-gray-200 dark:border-gray-600" 
            alt="Payment QR codes" 
          />
        </div>
        
        {/* Payment Methods */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {paymentMethods.map((method) => (
            <div 
              key={method.name}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col items-center">
                <img 
                  src={method.icon} 
                  className="h-12 w-12 object-contain mb-3" 
                  alt={method.name} 
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">{method.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Thank You Message */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-900/30">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Thank You for Your Support!
          </h3>
          <p className="text-blue-600 dark:text-blue-300">
            Your generosity helps me continue creating content and improving my craft.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Support