import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

export function OpenCartButton({
  className,
  quantity,
  ...props
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button variant="default" size="lg" className="" {...props}>
      <ShoppingCart />
      {quantity ? (
        <span className="font-mono">
          <span>• </span>
          {/* <Badge variant={"outline"} >{quantity}</Badge> */}
          <span className='textprimary' >{quantity}</span>
        </span>
      ) : null}
    </Button>
  )
}
