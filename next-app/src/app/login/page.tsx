export default function Login () {
  return (
    <>
    <div className="text-center">
      <h2 className="font-extrabold">LOGIN</h2>
    </div>
    <form className="max-w-sm mx-auto">
      <div className='mb-5'>
        <label for='email' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="emailInput" placeholder="Enter Email"/>
        <small id="emailHelp">We'll never shared your email.</small>
      </div>
      <div className='mb-5'>
        <label for='password' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="passwordInput" placeholder="Enter Password"/>
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Submit</button>
    </form>
    </>
  )
}
