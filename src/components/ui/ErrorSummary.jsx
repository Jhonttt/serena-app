export function ErrorSummary({ errors, fieldLabels = {} }) {
  const errorEntries = Object.entries(errors).filter(([_, error]) => error?.message);
  
  if (errorEntries.length === 0) return null;

  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <svg 
          className="w-5 h-5 text-red-600 shrink-0 mt-0.5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
            clipRule="evenodd" 
          />
        </svg>
        
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-800 mb-2">
            {errorEntries.length === 1 
              ? 'Hay un error en el formulario:' 
              : `Hay ${errorEntries.length} errores en el formulario:`}
          </h3>
          
          <ul className="space-y-1">
            {errorEntries.map(([fieldName, error]) => (
              <li key={fieldName} className="text-sm text-red-700 flex items-start gap-2">
                <span className="text-red-400 shrink-0">•</span>
                <span>
                  <strong className="font-medium">
                    {fieldLabels[fieldName] || fieldName}:
                  </strong>{' '}
                  {error.message}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}