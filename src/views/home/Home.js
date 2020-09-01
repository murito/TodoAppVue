import { mapState, mapMutations } from "vuex";
import barChart from '../../components/BarChart.vue';

export default {
    name: 'home',

    data: () => ({
        newTask: null,
        editing: null,
        currentFilter: 'all',
        chart: {
            data: {
                labels: ['Completed', 'Pending'],
                datasets: [
                    {
                        label: 'TodoList',
                        backgroundColor: ['#4CAF50', '#1c76d2'],
                        data: [0, 0]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            styles: {
                height: '200px',
                width: '100%',
                position: 'relative',
            }
        },
    }),

    computed: {
        ...mapState(['todoList'])
    },

    methods: {
        ...mapMutations(['addTask', 'updateTask', 'setTasks']),


        getTasks() {
            return this.todoList.filter(t => {
                if (this.currentFilter == 'completed') {
                    return t.state == 1;
                } else if (this.currentFilter == 'pending') {
                    return t.state == 0;
                } else {
                    return true;
                }
            });
        },

        removeCompleted() {
            this.setTasks(this.todoList.filter(t => t.state == 0));
        },

        addNewTask() {
            this.addTask({
                id: Math.random().toString(36).substr(2, 9),
                text: this.newTask,
                state: 0
            });

            this.newTask = null;
        },

        toogleState(id) {
            let task = this.todoList.find(t => t.id == id);
            if ( task ){
                this.updateTask({ id: id, update: { ...task, state: task.state == 0 ? 1 : 0 } });
            }
        },

        edit(id) {
            let task = this.todoList.find(t => t.id == id);
            if (task && task.state == 0) {
                this.editing = id;
            }
        },

        updateText(event, id) {
            let task = this.todoList.find(t => t.id == id);
            if( task ){
                this.updateTask({ id: id, update: {...task, text: event.target.value } });
            }
            this.editing = null;
        },

        closeEditing() {
            this.editing = null;
        },

        filter(action) {
            this.currentFilter = action;
        },

        getColor(icon) {
            return this.currentFilter == icon ? 'primary' : '';
        },

        pendingTasks() {
            return this.todoList.filter(t => t.state == 0).length;
        },

        completedTasks() {
            return this.todoList.filter(t => t.state == 1).length;
        },

        reloadChart(){
            this.chart.data = {
                labels: ['Completed', 'Pending'],
                datasets: [
                    {
                        backgroundColor: ['#4CAF50', '#1c76d2'],
                        data: [this.completedTasks(), this.pendingTasks()]
                    }
                ]
            };
        }
    },

    components: { barChart },

    watch: {
        todoList() {
            this.reloadChart();
        }
    },

    mounted() {
        this.reloadChart();
    }
}