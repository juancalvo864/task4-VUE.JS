const { createApp } = Vue

createApp({
    data() {
        return {
            dataEvents: [],
            cardAssigned: [],

        }
    },
    created() {
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then(response => response.json())
            .then(data => {
                this.dataEvents = data.events
                this.params(this.dataEvents)
            })
            .catch(err => console.log(err))
    },
    methods: {
        params: function (event) {
            let parameterUrl = location.search
            let parameters = new URLSearchParams(parameterUrl)
            let id = parameters.get("id")
            this.cardAssigned = event.find(card => card._id === id);
        }
    }
}).mount('#app')



