import { withLayout } from "@javascript/hocs/withLayout"
import { useContent } from "@thoughtbot/superglue"

interface RootIndexProps {
  header: {
    title: string
    subtitle: string
  }
}

function RootIndex() {
  const {
    header: { title, subtitle },
  } = useContent<RootIndexProps>()

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-zinc-800 mb-4">{title}</h1>
      <p className="text-lg">{subtitle}</p>
    </div>
  )
}

export default withLayout(RootIndex, {
  showSidebar: false,
  containerSize: "xl",
})
