const { createApp } = Vue

createApp({
    data() {
        return {
            dataEvents: [],
            eventUpcoming: [],
            eventPast: [],
            listWithPorcent: [],
            capacity: [],
            maxPorcentage: [],
            lowPorcentage: [],


        }
    },
    created() {
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then(response => response.json())
            .then(data => {
                this.dataEvents = data.events
                this.newList(this.dataEvents)
                this.maxAndMin(this.listWithPorcent)
                this.eventUpcoming = this.listWithPorcent.filter(event => data.currentDate < event.date)
                this.eventPast = this.listWithPorcent.filter(event => data.currentDate > event.date)
                this.listWithPorcent.push({ name: "hola", capacity: 200000000, category: "cinema", estimae: 20000000, price: 10, assistance: 12000000 })

                console.log(this.listWithPorcent)
            })
        /* .catch(err => console.log(err)) */
    },
    methods: {

        newList: function (firstArray) {
            this.listWithPorcent = firstArray.map(event => {
                if (event.assistance) {
                    event.porcentage = ((event.assistance / event.capacity) * 100)
                    event.revenues = event.assistance * event.price
                    return {
                        name: event.name,
                        date: event.date,
                        porcentage: Math.round(event.porcentage),
                        capacity: event.capacity,
                        revenues: Math.round(event.revenues),
                        category: event.category,
                        assistance: event.assistance
                    }
                } else if (event.estimate) {
                    event.porcentage = ((event.estimate / event.capacity) * 100)
                    event.revenues = event.estimate * event.price
                    return {
                        name: event.name,
                        date: event.date,
                        porcentage: Math.round(event.porcentage),
                        capacity: event.capacity,
                        revenues: Math.round(event.revenues),
                        category: event.category,
                        estimate: event.estimate

                    }
                }
            })

        },


        maxAndMin: function (event) {
            let listCapacity = event.map(lista => lista.capacity)
            let listPorcentage = event.filter(select => select.assistance).map(lista => lista.porcentage)
            this.capacity = event.find(event => event.capacity === Math.max(...listCapacity))
            this.maxPorcentage = event.find(event => event.porcentage === Math.max(...listPorcentage))
            this.lowPorcentage = event.find(event => event.porcentage === Math.min(...listPorcentage))

        },
    }
}).mount('#app')