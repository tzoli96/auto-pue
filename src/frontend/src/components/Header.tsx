export default function Header() {
    return (
        <header className="bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Auto PUE</h1>
                <div>
                    {/* Ide kerülhet a profilkép, keresősáv vagy egyéb fejléctartalom */}
                    <button className="text-gray-700 hover:text-gray-900">Logout</button>
                </div>
            </div>
        </header>
    );
}
