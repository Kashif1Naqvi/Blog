export const  Api = () => {
	let role = localStorage.role
	if(role === '1'){
		role = process.env.REACT_APP_BASE_URL.concat('/api/user') 
	}
	else if(role === '2'){
		role = process.env.REACT_APP_BASE_URL.concat('/api/super_admin') 
	}
	else {
		role = process.env.REACT_APP_BASE_URL.concat('/api') 
	}
	return role
}
