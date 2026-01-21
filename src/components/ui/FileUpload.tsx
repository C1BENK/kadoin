import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils/cn'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface FileUploadProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
  label?: string
  error?: string
}

export function FileUpload({
  files,
  onFilesChange,
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024,
  accept = { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
  label = 'Upload foto',
  error
}: FileUploadProps) {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
      onFilesChange(newFiles)
    },
    [files, maxFiles, onFilesChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onFilesChange(newFiles)
  }

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
      )}
      
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-romantic-500 bg-romantic-50"
            : "border-gray-300 hover:border-gray-400",
          error && "border-red-500"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-700">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-xs text-gray-500">
          or click to browse
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Max {maxFiles} files, up to {maxSize / 1024 / 1024}MB each
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Selected files ({files.length}/{maxFiles})
            </span>
            <button
              type="button"
              onClick={() => onFilesChange([])}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg border overflow-hidden bg-gray-100">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
                <p className="text-xs text-gray-600 truncate mt-1">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
