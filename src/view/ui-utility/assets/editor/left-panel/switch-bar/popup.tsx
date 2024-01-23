import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width={16}
    height={16}
    viewBox='0 0 16 16'
    fill='none'
    ref={ref}
    {...props}>
    <g opacity={1} transform='translate(0 0)'>
      <mask id='bg-mask-0' fill='white'>
        <use transform='translate(0 0)' xlinkHref='#path_0' />
      </mask>
      <g mask='url(#bg-mask-0)'>
        <path
          id='\u8DEF\u5F84 1'
          fillRule='evenodd'
          opacity={1}
          d='M15.4531 9.60156C15.1516 9.60156 14.9062 9.84688 14.9062 10.1484L14.9062 13.7875C14.9062 14.4047 14.4047 14.9062 13.7875 14.9062L2.2125 14.9062C2.10781 14.9062 2.00625 14.8906 1.90937 14.8641L7.59375 9.17969L7.59375 12.0781C7.59375 12.3797 7.83906 12.625 8.14062 12.625C8.44219 12.625 8.6875 12.3797 8.6875 12.0781L8.6875 7.85938L8.6875 7.83281C8.6875 7.82812 8.6875 7.825 8.68594 7.82031C8.68594 7.81563 8.68594 7.81094 8.68437 7.80625C8.68437 7.80156 8.68281 7.79531 8.68281 7.79063C8.68281 7.7875 8.68125 7.78438 8.68125 7.77969C8.67969 7.77344 8.67969 7.76875 8.67813 7.7625C8.67813 7.75938 8.67656 7.75625 8.67656 7.75313C8.675 7.74687 8.67344 7.74219 8.67344 7.73594C8.67344 7.73281 8.67188 7.72969 8.67188 7.72656C8.67031 7.72031 8.66875 7.71562 8.66719 7.70937C8.66562 7.70625 8.66562 7.70312 8.66406 7.7C8.6625 7.69531 8.66094 7.69063 8.65938 7.68437C8.65781 7.68125 8.65781 7.67812 8.65625 7.67344L8.65156 7.65938C8.65 7.65469 8.64844 7.65156 8.64688 7.64687C8.64531 7.64219 8.64375 7.63906 8.64219 7.63594C8.64062 7.63125 8.6375 7.62656 8.63594 7.62344L8.63125 7.61406C8.62813 7.60938 8.62656 7.60469 8.62344 7.6C8.62187 7.59688 8.62031 7.59375 8.61875 7.59219C8.61563 7.5875 8.6125 7.58281 8.60938 7.57656C8.60781 7.57344 8.60625 7.57188 8.60469 7.56875C8.60156 7.56406 8.59844 7.55937 8.59531 7.55312C8.59375 7.55 8.59219 7.54844 8.59062 7.54531L8.58125 7.53125C8.57969 7.52812 8.57656 7.52656 8.575 7.52344C8.57187 7.51875 8.56875 7.51562 8.56563 7.51094C8.5625 7.50781 8.55937 7.50469 8.55625 7.5C8.55313 7.49687 8.55 7.49375 8.54844 7.49062C8.54219 7.48438 8.53594 7.47813 8.52969 7.47031C8.52344 7.46406 8.51719 7.45781 8.50937 7.45156C8.50625 7.44844 8.50313 7.44531 8.5 7.44375C8.49687 7.44063 8.49219 7.4375 8.48906 7.43437C8.48438 7.43125 8.48125 7.42812 8.47656 7.425C8.47344 7.42344 8.47031 7.42031 8.46875 7.41875L8.45469 7.40938C8.45156 7.40781 8.45 7.40625 8.44687 7.40469L8.43281 7.39531C8.42969 7.39375 8.42813 7.39219 8.425 7.39062C8.42031 7.3875 8.41562 7.38438 8.40938 7.38281C8.40625 7.38125 8.40312 7.37969 8.40156 7.37813C8.39688 7.375 8.39219 7.37344 8.3875 7.37031L8.37813 7.36562C8.37344 7.36406 8.36875 7.36094 8.36563 7.35938C8.3625 7.35781 8.35781 7.35625 8.35469 7.35469C8.35 7.35313 8.34688 7.35156 8.34219 7.35L8.32812 7.34531C8.325 7.34375 8.32031 7.34219 8.31719 7.34219C8.3125 7.34062 8.30781 7.33906 8.30156 7.3375C8.29844 7.33594 8.29531 7.33594 8.29219 7.33437C8.2875 7.33281 8.28125 7.33125 8.275 7.32969C8.27188 7.32969 8.26875 7.32812 8.26562 7.32812C8.25937 7.32656 8.25469 7.325 8.24844 7.325C8.24531 7.325 8.24219 7.32344 8.23906 7.32344C8.23281 7.32188 8.22812 7.32188 8.22188 7.32031C8.21875 7.32031 8.21406 7.31875 8.21094 7.31875C8.20625 7.31875 8.2 7.31719 8.19531 7.31719C8.19063 7.31719 8.18594 7.31719 8.18125 7.31563C8.17656 7.31563 8.17344 7.31563 8.16875 7.31406L3.92188 7.31406C3.62031 7.31406 3.375 7.55937 3.375 7.86094C3.375 8.1625 3.62031 8.40781 3.92188 8.40781L6.82031 8.40781L1.13594 14.0906C1.10938 13.9937 1.09375 13.8922 1.09375 13.7875L1.09375 2.2125C1.09375 1.59531 1.59531 1.09375 2.2125 1.09375L5.85156 1.09375C6.15312 1.09375 6.39844 0.848437 6.39844 0.546875C6.39844 0.245312 6.15312 1.19209e-07 5.85156 1.19209e-07L2.2125 1.19209e-07C0.992188 0 0 0.992188 0 2.2125L0 13.7875C0 15.0078 0.992188 16 2.2125 16L13.7875 16C15.0078 16 16 15.0078 16 13.7875L16 10.1484C16 9.84688 15.7547 9.60156 15.4531 9.60156ZM14.0578 0L11.6922 0C10.6203 0 9.75 0.870313 9.75 1.94219L9.75 4.30781C9.75 5.38125 10.6203 6.25 11.6922 6.25L14.0578 6.25C15.1313 6.25 16 5.37969 16 4.30781L16 1.94219C16 0.870313 15.1297 0 14.0578 0ZM14.9062 4.30781C14.9062 4.77656 14.525 5.15625 14.0578 5.15625L11.6922 5.15625C11.2234 5.15625 10.8438 4.775 10.8438 4.30781L10.8438 1.94219C10.8438 1.47344 11.225 1.09375 11.6922 1.09375L14.0578 1.09375C14.5266 1.09375 14.9062 1.475 14.9062 1.94219L14.9062 4.30781Z'
        />
      </g>
    </g>
    <defs>
      <rect id='path_0' x={0} y={0} width={16} height={16} rx={0} ry={0} />
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)
export default Memo
