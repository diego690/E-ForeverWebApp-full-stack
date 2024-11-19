import React,{useState, useEffect} from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Chatbot from '../components/chatbot'

const Home = () => {

  // Añadimos el estado para el userId
  const [userId, setUserId] = useState(null);

  // Efecto para obtener el userId del localStorage cuando el componente se monte
  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser._id); // O como sea que accedas al id en tu objeto de usuario
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  }, []);
  return (
    <div>
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
      <Chatbot userId={userId} />
    </div>
  )
}

export default Home
