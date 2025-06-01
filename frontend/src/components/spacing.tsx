
interface spacingProps{
    height:number
}
const spacing = ({height}:spacingProps) => {
  return <div style={{height:height}}/>
}
export default spacing