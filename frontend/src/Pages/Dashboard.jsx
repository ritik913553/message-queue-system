import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard({user}) {
    const navigate = useNavigate();
    if(!user) {
        navigate('/login');
        return null; 
    }
    const logoutHandler = async () => {
        
     try {
        const res = await axios.get('http://localhost:8000/api/v1/auth/logout', {
            withCredentials: true
        });
        console.log(res);
        if(res.status === 200) {
            navigate('/login');
        }
     } catch (error) {
        navigate('/login');
     }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center py-4 border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-white">
                        Welcome to the Dashboard
                    </h1>
                    {user && (
                        <div className="flex items-center space-x-3">
                            <span className="text-gray-300">
                                {user.name}
                            </span>
                        </div>
                    )}
                    <button onClick={logoutHandler} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">Logout</button>
                </header>

                <div className="h-92  flex items-center justify-center mt-8 w-full">
                    <img className="h-full w-92" src={user.profileImage} alt="" />
                </div>
              </div>
        </div>
    );
}
