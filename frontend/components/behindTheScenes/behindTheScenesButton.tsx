import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { InfoIcon } from 'lucide-react'

export default function BehindTheScenesButton() {
  return (
      <Link href="/behind-the-scenes" passHref>
        <Button
          variant="outline"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <InfoIcon className="w-5 h-5 mr-2" />
          Behind the Scenes
        </Button>
      </Link>
  )
}