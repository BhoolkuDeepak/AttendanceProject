import React from 'react';

function HomePage() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-8 w-full">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Learning Journey</h1>

      <section>
        <h2 className="text-2xl font-semibold text-blue-600">What I've Learned in React</h2>
        <p className="mt-2 text-gray-800">
          In React, I've learned how to build dynamic and interactive user interfaces using components. 
          The core concepts like:
        </p>
        <ul className="list-disc ml-5 mt-2 text-gray-700">
          <li>Creating reusable components</li>
          <li>Using hooks like <code>useState</code> and <code>useEffect</code> for state management and side effects</li>
          <li>Handling routing with <code>react-router-dom</code></li>
          <li>Handling forms and API integration (e.g., using <code>fetch</code>)</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-blue-600">What I've Learned in C# and .NET</h2>
        <p className="mt-2 text-gray-800">
          In C# and .NET, I’ve focused on building robust back-end services and APIs. Some of the key concepts include:
        </p>
        <ul className="list-disc ml-5 mt-2 text-gray-700">
          <li>Building RESTful APIs with ASP.NET Core</li>
          <li>Dependency Injection (DI) for better code maintainability</li>
          <li>Working with JSON data</li>
          <li>CRUD operations, authentication, and authorization</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-blue-600">Full-Stack Development</h2>
        <p className="mt-2 text-gray-800">
          I’ve also learned how to connect both front-end and back-end in a full-stack application:
        </p>
        <ul className="list-disc ml-5 mt-2 text-gray-700">
          <li>Building a .NET Core API and interacting with it using React</li>
          <li>Handling authentication with JWT tokens</li>
          <li>Using <code>fetch</code> in React to make HTTP requests to the API</li>
          <li>Displaying data dynamically based on API responses</li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
