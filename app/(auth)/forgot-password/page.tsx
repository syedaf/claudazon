import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Password assistance
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter the email address associated with your Claudazon account.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff9900] focus:border-[#ff9900]"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#ff9900] hover:bg-[#e88900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff9900]"
          >
            Continue
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/auth/login"
          className="text-sm text-[#007185] hover:underline"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
