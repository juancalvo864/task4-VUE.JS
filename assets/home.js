

const { createApp } = Vue

createApp({
    data() {
        return {
            dataEvents: [],
            singleCategory: [],
            valueSearch: "",
            checked: [],
            eventFilters: [],
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
                this.eventFilter = [...this.eventFilters]
            })
            .catch(err => console.log(err))
    },
    methods: {
        crossFilter: function () {
            let filtradosPorBusqueda = this.eventFilters.filter(event => event.name.toLowerCase().startsWith(this.valueSearch.toLowerCase()));
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
                this.eventFilters = eventsDate.events
            } else if (title.innerText.toLowerCase().includes('upcoming')) {
                this.eventFilters = eventsDate.events.filter(event => event.date > eventsDate.currentDate)
            } else if (title.innerText.toLowerCase().includes('past')) {
                this.eventFilters = eventsDate.events.filter(event => event.date < eventsDate.currentDate)
                console.log(this.eventFilter)
            }

        }
    }
}).mount('#app')


