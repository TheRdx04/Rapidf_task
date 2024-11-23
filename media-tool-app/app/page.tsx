import MediaToolAttachment from './components/media-tool-attachment'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Media Tool Attachment</h1>
        <MediaToolAttachment />
      </div>
    </main>
  )
}