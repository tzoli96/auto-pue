import { cn } from "@/lib/utils"

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
            <nav>
                <ul>
                    <li>
                        <a href="/dashboard" className={cn("block py-2 text-gray-700 hover:bg-gray-100 rounded")}>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/filltered" className={cn("block py-2 text-gray-700 hover:bg-gray-100 rounded")}>
                            Filltered data
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block py-2 text-gray-400 cursor-not-allowed rounded"
                            onClick={(e) => e.preventDefault()}
                        >
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
