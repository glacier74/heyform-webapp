import { Button } from '@heyforms/ui'
import { isValid } from '@hpnp/utils/helper'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import Signature_pad from 'signature_pad'

interface SignaturePadProps extends Omit<IComponentProps, 'onChange'> {
  value?: string
  penColor?: string
  onChange?: (value: string) => void
}

export const SignaturePad: FC<SignaturePadProps> = ({ value, penColor, onChange }) => {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)
  const signaturePad = useMemo(() => {
    if (canvasRef) {
      return new Signature_pad(canvasRef, { penColor })
    }
  }, [canvasRef])

  function handleClear() {
    signaturePad?.clear()
  }

  function handleEndStroke() {
    onChange?.(signaturePad!.toDataURL('image/png'))
  }

  useEffect(() => {
    if (canvasRef) {
      // see https://github.com/szimek/signature_pad#handling-high-dpi-screens
      const ratio = Math.max(window.devicePixelRatio || 1, 1)

      canvasRef.width = canvasRef.offsetWidth * ratio
      canvasRef.height = canvasRef.offsetHeight * ratio
      canvasRef.getContext('2d')?.scale(ratio, ratio)
    }
  }, [canvasRef])

  useEffect(() => {
    if (signaturePad) {
      // see https://github.com/szimek/signature_pad/issues/147#issuecomment-191761079
      signaturePad.clear()

      if (isValid(value)) {
        signaturePad.fromDataURL(value!)
      }

      signaturePad.addEventListener('endStroke', handleEndStroke)
    }

    return () => {
      signaturePad?.removeEventListener('endStroke', handleEndStroke)
      signaturePad?.off()
    }
  }, [signaturePad])

  return (
    <div className="heyform-signature-pad">
      <div className="heyform-signature-wrapper">
        <canvas ref={setCanvasRef} />
      </div>
      <div className="heyform-signature-bottom">
        <span>Draw your signature above</span>
        <Button.Link onClick={handleClear}>Clear</Button.Link>
      </div>
    </div>
  )
}
