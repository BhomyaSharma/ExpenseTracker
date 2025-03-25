export function Input({ className = "", ...props }) {
    return (
      <input
        className={`w-full p-2 border rounded-md bg-gray-700 text-white ${className}`}
        {...props}
      />
    );
  }
  