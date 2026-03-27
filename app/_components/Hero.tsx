'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '@/utils'
import { useEffect, useState } from 'react'

function Hero() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 760) {
        setVideoSrc(smallHeroVideo)
      } else {
        setVideoSrc(heroVideo)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useGSAP(() => {
    gsap.to('.hero-title', {
      opacity: 1,
      delay: 2,
    })
    gsap.to('#cta',{
      opacity: 1,
      delay:2,
      y: -50
    })
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title">iPhone 15 Pro</p>

        <div className="md:w-10/12 w-9/12">
          {videoSrc && (
            <video autoPlay muted playsInline key={videoSrc}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
          <a href="#highlights" className='btn'>Buy</a>
          <p className='font-normal text-xl'>From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero