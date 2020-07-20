module.exports = {
    pingWithoutAuth: () => {
        return {
            pong: "pong without Auth"
        }
    },
    pingWithAuth: async(args, req) =>{
        if(!req.isAuth) throw new Error('Unauthenticated!')
        return {
            pong: "pong with Auth"
        }
    }
}