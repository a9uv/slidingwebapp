import { slides } from '@/slides'
import Slide from '@/app/components/Slide'

export default async function SlidePage({ params }: { params: { id: string } }) {
  
  const idstring= await params.id
  const id = parseInt(idstring)
  const slide = slides[id - 1]

  if (!slide) {
    return <div>Slide not found</div>
  }

  return <Slide content={slide} id={id} totalSlides={slides.length} />
}

export async function generateStaticParams() {
  return slides.map((_, index) => ({
    id: (index + 1).toString(),
  }))
}
