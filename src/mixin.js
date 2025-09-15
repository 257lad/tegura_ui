export default {
    methods: {
        async login(credentials) {
            try {
                const response = await axios.post('login/', credentials)
                if (response.status === 200) {
                    localStorage.setItem('teg_User_', JSON.stringify(response.data))
                    // this.$store.commit('setUser', response.data.user)
                    // this.$router.push({ name: 'home' })
                    return true
                } else {
                    return false 
                }
            } catch (error) {
                console.error(error)
                return false 
            }
        }

    },
}