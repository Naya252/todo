<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <h1>Your lists</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row
          justify="space-around"
          class="mb-5 ma-0"
          v-for="list in lists"
          :key="list.id"
        >
          <v-col cols="12" sm="3" style="">
            <h3
              class="text-left"
              style="
                font-weight: normal;
                font-size: 1.5em;
                border-left: 3px solid #0097a7;
                padding-top: 5px;
                padding-left: 5px;
              "
            >
              {{ list.title }}
            </h3>
            <div class="text-left">
              <my-btn-icon
                :isTooltip="true"
                :id="`penBtn-${list.id}`"
                tooltipTitle="Edit title"
                @click="
                  SET_ADD_ALERT({
                    type: 'suc',
                    text: 'click edit',
                  })
                "
              >
                <v-icon>mdi-pen</v-icon>
              </my-btn-icon>

              <my-btn-icon
                :isTooltip="true"
                :id="`addTaskBtn-${list.id}`"
                tooltipTitle="Add task"
                @click="
                  SET_ADD_ALERT({
                    type: 'info',
                    text: 'click add',
                  })
                "
              >
                <v-icon>mdi-sticker-plus-outline</v-icon>
              </my-btn-icon>

              <my-btn-icon
                :isTooltip="true"
                :id="`moveListBtn-${list.id}`"
                tooltipTitle="Move"
                @click="
                  SET_ADD_ALERT({
                    type: 'err',
                    text: 'click move',
                  })
                "
              >
                <v-icon>mdi-format-line-spacing</v-icon>
              </my-btn-icon>
            </div>
          </v-col>
          <v-col cols="12" sm="9">
            <v-row class="ma-0" v-for="task in list.tasks" :key="task.id">
              <v-col cols="12" class="py-0">
                <v-list-group
                  style="border-top: 1px solid lightgrey"
                  color="#0097A7"
                  :id="task.id"
                >
                  <template v-slot:activator>
                    <v-list-item-title
                      class="pb-2 pt-1"
                      style="
                        font-size: inherit;
                        font-family: inherit;
                        white-space: pre-line;
                        text-align: left;
                        font-weight: 400;
                      "
                    >
                      {{ task.title }}
                    </v-list-item-title>
                  </template>
                  <v-list-item style="">
                    <div
                      class="mb-5"
                      v-html="task.description"
                      style="
                        font-size: inherit;
                        font-family: inherit;
                        text-align: justify;
                        padding-top: 3px;
                        margin-left: 10px;
                      "
                    ></div>
                  </v-list-item>
                </v-list-group>
              </v-col>
            </v-row>

            <!-- <v-row class="ma-0" v-for="task in list.tasks" :key="task.id">
              <v-col cols="12" class="py-0">
                <v-list-group
                  style="border-top: 1px solid lightgrey"
                  color="#0097A7"
                  :id="task.id"
                >
                  <template v-slot:activator>
                    <v-list-item-title
                      class="pb-2 pt-1"
                      style="
                        font-size: inherit;
                        font-family: inherit;
                        white-space: pre-line;
                        text-align: left;
                        font-weight: 400;
                      "
                    >
                      {{ task.title }}
                    </v-list-item-title>
                  </template>
                  <v-list-item style="">
                    <div
                      class="mb-5"
                      v-html="task.description"
                      style="
                        font-size: inherit;
                        font-family: inherit;
                        text-align: justify;
                        padding-top: 3px;
                        margin-left: 10px;
                      "
                    ></div>
                  </v-list-item>
                </v-list-group>
              </v-col>
            </v-row> -->
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-col class="col-4" v-for="list in lists" :key="list.id">
        <v-card>
          {{ list.title }}
          <div v-for="task in list.tasks" :key="task.id">
            {{ task.title }}
          </div>
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "TasksPage",

  data: () => ({
    lists: [
      {
        id: 1,
        title: "For me",
        tasks: [
          { id: 2, title: "Taks Title", description: "Description task" },
        ],
      },
      {
        id: 3,
        title: "Work",
        tasks: [
          { id: 4, title: "Taks Title 2", description: "Description task 2" },
          { id: 5, title: "Taks Title 3", description: "Description task 4" },
        ],
      },
      {
        id: 6,
        title: "Other",
        tasks: [
          { id: 7, title: "Taks Title 6", description: "Description task 6" },
          { id: 8, title: "Taks Title 7", description: "Description task 7" },
        ],
      },
    ],
  }),
  computed: {
    ...mapGetters(["LOADER_SHOW", "GET_WINDOW_SIZE"]),
  },
  methods: {
    ...mapMutations(["LOADER_INCREMENT", "LOADER_DECREMENT", "SET_ADD_ALERT"]),
  },
};
</script>
