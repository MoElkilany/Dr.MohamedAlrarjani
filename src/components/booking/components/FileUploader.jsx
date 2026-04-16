import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

function UploadIcon() {
  return (
    <svg className="w-10 h-10 text-[#0e8fa3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  );
}

function FileIcon({ name }) {
  const ext = name.split('.').pop().toLowerCase();
  const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
  const isPdf = ext === 'pdf';

  return (
    <div className="w-10 h-10 rounded-lg bg-[#0e8fa3]/10 flex items-center justify-center">
      {isImage ? (
        <svg className="w-5 h-5 text-[#0e8fa3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ) : isPdf ? (
        <svg className="w-5 h-5 text-[#0e8fa3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-[#0e8fa3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )}
    </div>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function FileUploader({ 
  label,
  accept = { 'image/*': [] },
  maxSize = 10 * 1024 * 1024,
  multiple = false,
  value = [],
  onChange,
  required = false,
}) {
  const [previews, setPreviews] = useState(value);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));
    
    const updated = multiple ? [...previews, ...newFiles] : newFiles;
    setPreviews(updated);
    onChange?.(multiple ? updated : updated[0]);
  }, [multiple, previews, onChange]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
  });

  const removeFile = (id) => {
    const updated = previews.filter(f => f.id !== id);
    setPreviews(updated);
    onChange?.(multiple ? updated : null);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#134E4A]/70 mb-2">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? 'border-[#0e8fa3] bg-[#0e8fa3]/5'
            : isDragReject
            ? 'border-red-400 bg-red-50'
            : 'border-[#0e8fa3]/30 hover:border-[#0e8fa3]/50 bg-[#F0FDFA]/50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-2">
          <UploadIcon />
          <div className="text-sm text-[#134E4A]/70">
            {isDragActive ? (
              <span className="text-[#0e8fa3]">أفلت الملفات هنا</span>
            ) : (
              <>
                <span className="text-[#0e8fa3] font-medium">انقر لرفع الملفات</span>
                {' أو اسحب وأفلت'}
              </>
            )}
          </div>
          <span className="text-xs text-[#134E4A]/50">
            {multiple ? 'يمكن رفع عدة ملفات' : 'ملف واحد'} • max {formatSize(maxSize)}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {previews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 space-y-2"
          >
            {previews.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#0e8fa3]/10"
              >
                {item.preview ? (
                  <img
                    src={item.preview}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <FileIcon name={item.name} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#134E4A] truncate">{item.name}</p>
                  <p className="text-xs text-[#134E4A]/50">{formatSize(item.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(item.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-[#134E4A]/50 hover:text-red-500 transition-colors"
                >
                  <XIcon />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}