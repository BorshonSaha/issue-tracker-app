'use client';
import { useState } from 'react';

export default function CustomerFeedbackForm() {
  const [formData, setFormData] = useState({
    customerId: '',
    preferredEmail: '',
    feedbackType: 'SUGGESTION',
    prefersPushNotifications: false,
    description: '',
    feedbackDate: '',
    createdBy: '',
    updatedBy: '',
    isActive: true,
  });

  console.log(formData);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = `
      mutation AddCustomerFeedback {
        addCustomerFeedback(
          input: {
            customerId: ${formData.customerId}
            preferredEmail: "${formData.preferredEmail}"
            feedbackType: ${formData.feedbackType}
            prefersPushNotifications: ${formData.prefersPushNotifications}
            description: "${formData.description}"
            feedbackDate: "${formData.feedbackDate}"
            createdBy: "${formData.createdBy}"
            updatedBy: "${formData.updatedBy}"
            isActive: ${formData.isActive}
          }
        ) {
          feedbackId
          customerId
          preferredEmail
          feedbackType
          prefersPushNotifications
          description
          feedbackDate
          feedbackStatus
          createdBy
          createdAt
          updatedBy
          updatedAt
          isActive
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:8081/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Customer Feedback Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerId" className="block text-sm font-medium">Customer ID</label>
          <input
            type="number"
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="preferredEmail" className="block text-sm font-medium">Preferred Email</label>
          <input
            type="email"
            id="preferredEmail"
            name="preferredEmail"
            value={formData.preferredEmail}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="feedbackType" className="block text-sm font-medium">Feedback Type</label>
          <select
            id="feedbackType"
            name="feedbackType"
            value={formData.feedbackType}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="SUGGESTION">Suggestion</option>
            <option value="COMPLAINT">Complaint</option>
            <option value="QUERY">Query</option>
          </select>
        </div>

        <div>
          <label htmlFor="prefersPushNotifications" className="block text-sm font-medium">Prefers Push Notifications</label>
          <input
            type="checkbox"
            id="prefersPushNotifications"
            name="prefersPushNotifications"
            checked={formData.prefersPushNotifications}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="feedbackDate" className="block text-sm font-medium">Feedback Date</label>
          <input
            type="date"
            id="feedbackDate"
            name="feedbackDate"
            value={formData.feedbackDate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="createdBy" className="block text-sm font-medium">Created By</label>
          <input
            type="text"
            id="createdBy"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="updatedBy" className="block text-sm font-medium">Updated By</label>
          <input
            type="text"
            id="updatedBy"
            name="updatedBy"
            value={formData.updatedBy}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="isActive" className="block text-sm font-medium">Is Active</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
