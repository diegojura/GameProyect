import { NavLink, Link } from "react-router";

function AppFooter() {

    return (
        <footer className="max-w-screen-xl bg-darksurf-200 rounded-lg shadow mt-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <hr className="my-6 border-gray-500 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2027 
                <Link to="/" className="hover:underline"> Diego Jurado Remix Project</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default AppFooter;