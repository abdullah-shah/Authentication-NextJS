const UserProfilePage = ({params}: any)=> {
    return (
        <div className="flex items-center justify-center">
           <h1 className="text-2xl mt-2">Profile page 
           
           <span className="bg-orange-500 rounded px-2 mx-1 text-white">{params.id}</span></h1> 
        </div>
    )

}

export default UserProfilePage