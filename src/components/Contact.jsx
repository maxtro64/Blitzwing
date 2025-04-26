import * as emailjs from 'emailjs-com';
import { useRef, useState } from 'react';

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    emailjs
      .sendForm(
        'service_1umzhck',
        'template_hc0bwk6', 
        form.current,
        'LAeSRARn9wQtpl8HF' 
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setIsSent(true);
          setIsLoading(false);
          form.current.reset(); // Reset the form after successful submission
        },
        (error) => {
          console.log('FAILED...', error.text);
          setError('Failed to send message. Please try again.');
          setIsLoading(false);
        }
      );
  };

  return (
    <section id="Contact" className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact</h1>
      <form ref={form} onSubmit={sendEmail} className="max-w-lg mx-auto">
        <div className="mb-4">
          <div className="formGroup">
            <label htmlFor="from_name" hidden>Name</label>
            <input
              type="text"
              name="from_name"
              id="from_name"
              placeholder="Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="formGroup">
            <label htmlFor="user_email" hidden>Email</label>
            <input
              type="email"
              name="email_id"
              id="email_id"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="formGroup">
            <label htmlFor="message" hidden>Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <input
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          value={isLoading ? 'Sending...' : 'Send'}
          disabled={isLoading}
        />

        {isSent && <p className="text-green-500 text-center mt-4">Message sent successfully!</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </section>
  );
};

export default Contact;