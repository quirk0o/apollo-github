import { Badge } from "antd";

function color(score) {
  if (score < 10) return "#52c41a"
  if (score < 20) return "#ffa940"
  return '#fe4d4f'
}

export function ComplexityBadge({score}) {
  return <Badge count={score} style={{backgroundColor: color(score)}} />
}
