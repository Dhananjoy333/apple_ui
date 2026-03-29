import Navbar from '@/app/_components/Navbar'
import Hero from "@/app/_components/Hero"
import Highlights from '@/app/_components/Highlights'
import Model from './_components/Model';

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Highlights/>
      <Model/>
    </main>
  );
}
