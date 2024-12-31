'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the GraphQL query
  const GET_FEEDBACKS = `
    query PaginatedCustomerFeedbacks($page: Int, $size: Int, $searchKey: String) {
      paginatedCustomerFeedbacks(page: $page, size: $size, searchKey: $searchKey) {
        totalPages
        totalElements
        currentPage
        size
        isFirst
        isLast
        content {
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
    }
  `;

  // Fetch data from the GraphQL API
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_FEEDBACKS,
          variables: { page, size: 3, searchKey: 'feedbackId' },
        }),
      });

      const { data } = await response.json();

      setFeedbacks(data.paginatedCustomerFeedbacks.content);
      setTotalPages(data.paginatedCustomerFeedbacks.totalPages);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-4">Customer Feedbacks</h1>
      <table className="min-w-full table-auto mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Feedback ID</th>
            <th className="px-4 py-2 border">Customer ID</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">Feedback Date</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.feedbackId}>
              <td className="px-4 py-2 border">{feedback.feedbackId}</td>
              <td className="px-4 py-2 border">{feedback.customerId}</td>
              <td className="px-4 py-2 border">{feedback.preferredEmail}</td>
              <td className="px-4 py-2 border">{feedback.feedbackType}</td>
              <td className="px-4 py-2 border">{new Date(feedback.feedbackDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{feedback.feedbackStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
