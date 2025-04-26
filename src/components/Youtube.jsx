import React from 'react'

const Youtube = () => {
  const videos = [
    {
      id: 'pSD4jv3ol-A',
      title: 'Transformers Franchise Discussion',
      description: "Man, it's really sad, I loved this Franchise. Now it's bullshit. I mean, Transformers One is the only hope we had left, and after its low box office collection, I have lost all my faith in the franchise."
    },
    {
      id: 'IThiCT9Md-E',
      title: 'Upcoming Video Plans',
      description: "So, yeah. I have started creating long videos too. I don't really have much expectations, but I hope it will do good. I have already planned a lot more videos too. Starscream design Ranking, Rise of The Beasts Review, TF One sequel predictions, and all. But anyway, what do you guys wanna see me talk about?"
    },
    {
      id: 'LPOZ7-TfwjA',
      title: 'Gameplay Experience',
      description: "I continue my quest to play shitty games..."
    },
    {
      id: 'OjRgwaKjSR0',
      title: 'Transformers Game Review',
      description: "So, after watching trailer of new transformers film, I got hyped and played this piece of shit, and I wasted my whole weekend"
    }
  ];

  return (
    <section className='container mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      <h1 className='text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-0 dark:text-white'>
        My YouTube Videos
      </h1>
      
      <div className='space-y-12'>
        {videos.map((video, index) => (
          <div 
            key={index} 
            className='flex flex-col lg:flex-row gap-6 lg:gap-8 items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'
          >
            <div className='w-full lg:w-1/2 aspect-video'>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={`YouTube video player ${video.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className='rounded-lg w-full h-full min-h-[315px]'
              ></iframe>
            </div>
            
            <div className='w-full lg:w-1/2'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-3 text-gray-800 dark:text-white'>
                {video.title}
              </h2>
              <p className='text-gray-600 dark:text-gray-300'>
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Youtube