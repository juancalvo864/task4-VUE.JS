

const { createApp } = Vue

createApp({
    data() {
        return {
            dataEvents: [],
            singleCategory: [],
            valueSearch: "",
            checked: [],
            eventFilter: [],


        }
    },
    created() {
        fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
            .then(response => response.json())
            .then(data => {
                this.dataEvents = data
                console.log(this.dataEvents)
                this.singleCategory = [...new Set(this.dataEvents.events.map(event => event.category))]
                this.filterTitle(this.dataEvents)
            })
            .catch(err => console.log(err))
    },
    methods: {
        crossFilter: function () {
            let filtradosPorBusqueda = this.dataEvents.events.filter(event => event.name.toLowerCase().startsWith(this.valueSearch.toLowerCase()));
            if (this.checked.length === 0) {
                this.eventFilter = filtradosPorBusqueda
            } else {
                let filtradosPorCheck = filtradosPorBusqueda.filter(event => this.checked.includes(event.category))
                this.eventFilter = filtradosPorCheck
            }
        },
        filterTitle: function (eventsDate) {
            const title = document.querySelector('title')

            if (title.innerText.toLowerCase().includes('home')) {
                this.eventFilter = eventsDate.events
            } else if (title.innerText.toLowerCase().includes('upcoming')) {
                this.eventFilter = eventsDate.events.filter(event => event.date > eventsDate.currentDate)
            } else if (title.innerText.toLowerCase().includes('past')) {
                this.eventFilter = eventsDate.events.filter(event => event.date < eventsDate.currentDate)
                console.log(this.eventFilter)
            }

        }
    }
}).mount('#app')


