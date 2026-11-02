export default function Img(props) {
  return <img {...props} onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />;
}
