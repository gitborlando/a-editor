import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    fill='none'
    width={13}
    height={16}
    viewBox='0 0 13 16'
    ref={ref}
    {...props}>
    <defs>
      <clipPath id='master_svg0_50_22'>
        <rect x={0} y={0} width={13} height={16} rx={0} />
      </clipPath>
    </defs>
    <g clipPath='url(#master_svg0_50_22)'>
      <g>
        <path
          d='M11.5782,14.72L1.22698,14.72C0.543003,14.7201,-0.00895068,14.0317,0.000110024,13.19L0.000110024,2.51C0.00454132,1.67832,0.551245,1.00545377,1.22698,1L4.77761,1C5.13428,1.00255936,5.47238,1.196024,5.70386,1.53L6.42698,2.5300000000000002C6.51049,2.63108,6.61928,2.69451,6.73573,2.71L11.5539,2.65C12.2506,2.63279,12.8191,3.33245,12.8051,4.1899999999999995L12.8051,13.19C12.8142,14.0317,12.2623,14.72,11.5782,14.72ZM1.22698,2C0.998132,2,0.81261,2.2283299999999997,0.81261,2.51L0.81261,13.19C0.812564,13.4701,0.999453,13.6956,1.22698,13.69L11.5782,13.69C11.8057,13.6957,11.9926,13.4701,11.9926,13.19L11.9926,4.1899999999999995C11.9927,3.9099,11.8058,3.6844,11.5782,3.69L6.76823,3.75C6.40755,3.72898,6.06972,3.52651,5.83386,3.19L5.11886,2.19C5.03462,2.0659099999999997,4.90895,1.9959449999999999,4.77761,2L1.22698,2Z'
          fill='#323333'
          fillOpacity={1}
        />
      </g>
      <g>
        <path
          d='M9.1153125,9.0703125L3.8828125,9.0703125C3.6584465,9.0703125,3.4765625,8.8464545,3.4765625,8.5703125C3.4765625,8.2941705,3.6584465,8.0703125,3.8828125,8.0703125L9.1153125,8.0703125C9.3396825,8.0703125,9.5215625,8.2941705,9.5215625,8.5703125C9.5215625,8.8464545,9.3396825,9.0703125,9.1153125,9.0703125Z'
          fill='#323333'
          fillOpacity={1}
        />
      </g>
      <g>
        <path
          d='M6.5,12.29765625C6.275634,12.29765625,6.09375,12.073796250000001,6.09375,11.79765625L6.09375,5.34765625C6.09375,5.07151325,6.275634,4.84765625,6.5,4.84765625C6.724365,4.84765625,6.90625,5.07151325,6.90625,5.34765625L6.90625,11.79765625C6.90625,12.073796250000001,6.724365,12.29765625,6.5,12.29765625Z'
          fill='#323333'
          fillOpacity={1}
        />
      </g>
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
