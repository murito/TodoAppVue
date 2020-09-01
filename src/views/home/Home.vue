<style scoped lang="scss" src="./Home.scss"></style>
<script src="./Home.js"></script>

<template>
    <div class="todo-body">
        <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title class="primary--text">TO DO LIST</v-card-title>
                        <v-card-text>
                            <v-container fluid class="mt-0 pt-0">
                                <v-row>
                                    <v-col cols="12" md="3" class="text-center pt-0">
                                        <v-card color="primary">
                                            <v-card-text class="white--text">
                                                <h2>
                                                    <v-icon color="white" class="mr-3">mdi-clock-alert-outline</v-icon>
                                                    Pending Tasks:
                                                </h2>
                                                <h1 class="mt-5">
                                                    {{ pendingTasks() }}
                                                </h1>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12" md="3" class="text-center pt-0">
                                        <v-card color="success">
                                            <v-card-text class="white--text">
                                                <h2>
                                                    <v-icon color="white" class="mr-3">mdi-checkbox-marked-circle-outline</v-icon>
                                                    Completed Tasks:
                                                </h2>
                                                <h1 class="mt-5">
                                                    {{ completedTasks() }}
                                                </h1>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <div class="chart">
                                            <bar-chart :chart-data="chart.data" :options="chart.options" :style="chart.styles"/>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-divider></v-divider>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            v-model="newTask"
                                            placeholder="Add a new task"
                                            append-icon="mdi-plus"
                                            @keypress.enter="addNewTask()"
                                            @click:append="addNewTask()"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-btn text :color="getColor('all')" @click="filter('all')">
                                            <v-icon>mdi-all-inclusive</v-icon>Show All
                                        </v-btn>
                                    </v-col>
                                    <v-col>
                                        <v-btn text :color="getColor('completed')" @click="filter('completed')">
                                            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>Completed
                                        </v-btn>
                                    </v-col>
                                    <v-col>
                                        <v-btn text :color="getColor('pending')" @click="filter('pending')">
                                            <v-icon>mdi-clock-alert-outline</v-icon>Pending
                                        </v-btn>
                                    </v-col>
                                    <v-col class="text-center">
                                        <v-divider vertical></v-divider>
                                    </v-col>
                                    <v-col>
                                        <v-btn text @click="removeCompleted()" color="red">
                                            <v-icon>mdi-delete-outline</v-icon>Remove Completed
                                        </v-btn>
                                    </v-col>
                                </v-row>

                                <v-divider></v-divider>

                                <v-row>
                                    <v-col>
                                        <v-list subheader two-line flat>
                                            <v-subheader>TO DO LIST</v-subheader>
                                            <v-list-item
                                                v-for="item in getTasks()"
                                                :key="item.id"
                                                :class="{'complete': item.state == 1}"
                                            >
                                                <template v-slot:default="{ active }">
                                                    <v-list-item-action
                                                        @click.prevent="toogleState(item.id)"
                                                    >
                                                        <v-checkbox
                                                            color="primary"
                                                            :input-value="active"
                                                            :true-value="1"
                                                            :false-value="0"
                                                            @click="item.state = item.state == 0 ? 1 : 0 "
                                                            v-model="item.state"
                                                        ></v-checkbox>
                                                    </v-list-item-action>

                                                    <v-list-item-content @dblclick="edit(item.id)">
                                                        <v-text-field
                                                            :value="item.text"
                                                            outlined
                                                            v-if="editing == item.id"
                                                            hide-details
                                                            @keypress.enter="updateText($event, item.id)"
                                                        ></v-text-field>
                                                        <div v-if="editing!=item.id">
                                                            <v-list-item-title
                                                                :class="{'line-through': item.state == 1 }"
                                                            >{{ item.text }}</v-list-item-title>
                                                            <v-list-item-subtitle>{{ item.state == 0 ? 'Pending' : 'Complete' }}</v-list-item-subtitle>
                                                        </div>
                                                    </v-list-item-content>

                                                    <v-list-item-action>
                                                        <v-btn
                                                            v-if="editing != item.id"
                                                            @click.prevent="edit(item.id)"
                                                            icon
                                                        >
                                                            <v-icon>mdi-pencil</v-icon>
                                                        </v-btn>
                                                        <v-btn
                                                            v-if="editing == item.id"
                                                            @click="closeEditing()"
                                                            icon
                                                        >
                                                            <v-icon>mdi-close</v-icon>
                                                        </v-btn>
                                                    </v-list-item-action>
                                                </template>
                                            </v-list-item>
                                        </v-list>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>