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
                        <a href="/settings" className={cn("block py-2 text-gray-700 hover:bg-gray-100 rounded")}>
                            Settings
                        </a>
                    </li>
                    {/* További menüpontok */}
                </ul>
            </nav>
        </aside>
    );
}
