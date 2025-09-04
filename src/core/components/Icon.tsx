
import { general } from "../../assets/icons";

interface IconProps {
    name: keyof typeof general;
    color?: string
}
const fillColor = (svgString:string,color: string,size=10)=>{

    return svgString?.replace('<svg', `<svg fill="${color}" height="${size}" width="${size}"`)
}
const Icon = (props:IconProps)=>{
    let color = props.color || 'currentColor'
    let svg = general[props.name]
    let coloredSvg = fillColor(svg,color)
    
    return <span dangerouslySetInnerHTML={{__html:coloredSvg}}/>
}
export default Icon;