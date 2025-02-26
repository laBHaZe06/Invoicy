import Image from 'next/image'
import '../../styles/logoNav.css'
export default function LogoNav() {
  return (
    <div className="logo">
      <Image
        src="/images/Invoicy.png"
        width={200}
        height={200}
        loading="lazy"
        quality={80}
        alt="Logo invoicy"
      />
    </div>
  )
}