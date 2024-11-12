"use client"
import { useState } from 'react';
import { useRouter } from 'next/router';

const SubmitButton = () => {
  const [accepted, setAccepted] = useState(false);  // This state could be based on form submission or user input
  const router = useRouter(null);  // Hook for programmatic navigation

  // Handle button click
  const handleClick = () => {
    if (accepted) {
      // Navigate to '/home' page if 'accepted' is true
      router.push('/home');
    } else {
      // Optionally show a message or do nothing when not accepted
      alert("You must accept to proceed.");
    }
  };

  return (
    <div>
      <div>
        {/* Button */}
        <button
          className="submit-button"
          onClick={handleClick}
          disabled={!accepted}  // Disable button if not accepted
          style={{
            cursor: accepted ? 'pointer' : 'not-allowed', // Change cursor to "not-allowed" when disabled
            backgroundColor: accepted ? 'green' : 'gray', // Change background color when disabled
          }}
        >
          Submit
        </button>
      </div>

      {/* Checkbox to toggle the 'accepted' state */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}  // Toggle acceptance status
          />
          I accept the terms and conditions
        </label>
      </div>
    </div>
  );
};

export default SubmitButton;
