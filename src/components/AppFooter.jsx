import { NavLink, Link } from "react-router";

function AppFooter() {

    return (
        <footer className="max-w-screen-xl bg-darksurf-200 rounded-lg shadow mt-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <hr className="my-6 border-black-500 sm:mx-auto dark:border-black-700 lg:my-8" />
                <span className="block text-sm text-black-500 sm:text-center dark:text-black-400">© 2025
                <Link to="/" className="hover:underline"> Diego Jurado REMIX 2014</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default AppFooter;