export function Button({ children, className = "", ...props }) {
    return (
      <button
        className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  