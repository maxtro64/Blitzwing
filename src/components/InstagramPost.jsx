import React, { useEffect } from 'react';

const InstagramPost = ({ postUrl }) => {
  useEffect(() => {
    // Load Instagram's embed script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="instagram-post-container my-4">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          margin: '0 auto',
          maxWidth: '540px',
          width: '100%',
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#000', textDecoration: 'none' }}
          >
            Loading Instagram Post...
          </a>
        </div>
      </blockquote>
    </div>
  );
};

export default InstagramPost;