
import { general } from "../../assets/icons";

interface IconProps {
    name: keyof typeof general;
    color?: string
    size?:number|string
}
const fillColor = (svgString:string,color: string,size:number|string)=>{

    return svgString?.replace('<svg', `<svg fill="${color}" height="${size}" width="${size}"`)
}

const Icon = (props:IconProps)=>{
    let color = props.color || 'currentColor'
    let size = props.size || 10
    let svg = general[props.name]
    let coloredSvg = fillColor(svg,color,size)
    return <span style={{width:size,height:size, display:"flex",alignItems:"center",justifyContent:"center"}} dangerouslySetInnerHTML={{__html:coloredSvg}}/>
}
export default Icon;