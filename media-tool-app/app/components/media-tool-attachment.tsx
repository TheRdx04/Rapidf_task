"use client"

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, FileUp } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Metadata {
  name: string;
  size: string;
  mimetype: string;
  format: string;
}

export default function MediaToolAttachment() {
  const [file, setFile] = useState<File | null>(null)
  const [isPasswordProtected, setIsPasswordProtected] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.name.endsWith('.docx')) {
      setFile(selectedFile)
      setError(null)
      setMetadata(null)
      setDownloadUrl(null)
    } else {
      setFile(null)
      setMetadata(null)
      setDownloadUrl(null)
      setError('Please select a valid .docx file.')
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)
    if (isPasswordProtected && password) {
      formData.append('password', password)
    }

    try {
      const response = await fetch('http://localhost:5000/docxtopdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to convert file')
      }

      const data = await response.json()
      setMetadata(data.metadata)
      setDownloadUrl(data.downloadUrl)
    } catch (error) {
      setError('An error occurred while processing your file. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>MediaToolAttachment</CardTitle>
        <CardDescription>Upload a DOCX file and convert it to PDF</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileUp className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">DOCX file (MAX. 10MB)</p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".docx"
                  ref={fileInputRef}
                />
              </Label>
            </div>
            {file && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Selected file: {file.name}
              </p>
            )}
            {metadata && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-semibold mb-2">File Metadata</h3>
                <ul className="space-y-1">
                  <li className="text-sm"><span className="font-medium">Name:</span> {metadata.name}</li>
                  <li className="text-sm"><span className="font-medium">Size:</span> {metadata.size}</li>
                  <li className="text-sm"><span className="font-medium">Type:</span> {metadata.mimetype}</li>
                  <li className="text-sm"><span className="font-medium">Format:</span> {metadata.format}</li>
                </ul>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Switch
                id="password-protection"
                checked={isPasswordProtected}
                onCheckedChange={setIsPasswordProtected}
              />
              <Label htmlFor="password-protection">Enable password protection</Label>
            </div>
            {isPasswordProtected && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password for PDF"
                />
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <Button onClick={handleSubmit} disabled={!file || isLoading} className="w-full">
          {isLoading ? 'Converting...' : 'Convert to PDF'}
        </Button>
        {downloadUrl && (
          <Button asChild className="w-full">
            <a href={downloadUrl} download>Download PDF</a>
          </Button>
        )}
      </CardFooter>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Card>
  )
}

