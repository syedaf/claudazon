import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
      </div>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff9900] focus:border-[#ff9900]"
          />
        </div>

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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff9900] focus:border-[#ff9900]"
          />
          <p className="mt-1 text-xs text-gray-500">
            Passwords must be at least 6 characters.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Re-enter password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff9900] focus:border-[#ff9900]"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#ff9900] hover:bg-[#e88900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff9900]"
          >
            Create your Claudazon account
          </button>
        </div>
      </form>

      <div className="mt-6 text-xs text-gray-500">
        By creating an account, you agree to Claudazon's{' '}
        <Link href="/conditions" className="text-[#007185] hover:underline">
          Conditions of Use
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-[#007185] hover:underline">
          Privacy Notice
        </Link>
        .
      </div>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <Link
          href="/auth/login"
          className="text-sm text-[#007185] hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
