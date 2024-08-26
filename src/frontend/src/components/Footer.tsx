export default function Footer() {
    return (
        <footer className="bg-white p-4 border-t border-gray-200">
            <div className="container mx-auto text-center text-gray-500">
                &copy; {new Date().getFullYear()} AutoPUE. All rights reserved.
            </div>
        </footer>
    );
}
