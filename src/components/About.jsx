import React from 'react'

const About = () => {
  return (
    <div className='container mx-auto px-4 py-8 md:py-12'>
      <div className='flex flex-col md:flex-row items-center gap-6 md:gap-12'>
        {/* Image - responsive sizing and margins */}
        <div className='w-full md:w-1/3 lg:w-1/4 flex justify-center mb-6 md:mb-0'>
          <img 
            src="about.webp" 
            className='h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg object-cover shadow-lg' 
            alt="Profile picture" 
          />
        </div>
        
        {/* Text content - responsive sizing and padding */}
        <div className='w-full md:w-2/3 lg:w-3/4'>
          <p className='text-base sm:text-lg md:text-xl leading-relaxed text-gray-300'>
            I'm a writer and storyteller with a passion for crafting character-driven narratives, 
            especially in sci-fi and superhero fiction. My focus is on developing compelling arcs, 
            exploring moral complexity, and building immersive worlds.
            <br /><br />
            Gaming has also played a big role in shaping my storytelling, influencing how I approach 
            character development and narrative structure. I'm particularly drawn to stories that 
            explore themes of identity, redemption, and the fine line between heroism and villainy.
            <br /><br />
            Beyond writing, I engage with an audience on social media, sharing my creative insights 
            and perspectives. While storytelling is my main focus, I'm always looking for ways to 
            refine my craft and create narratives that leave a lasting impact.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About