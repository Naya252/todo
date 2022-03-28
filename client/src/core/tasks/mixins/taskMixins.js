import * as taskRepository from "../repositories/taskRepository";
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["UPDATE_COMPLETE_TASK"]),
    changeCompleted(task) {
      task.completed = !task.completed;
      taskRepository
        .changeTaskCompleted({ id: task._id, completed: task.completed })
        .then(() => {
          if (this.$route.name == "oneTask") {
            const data = {
              completed: task.completed,
              parentId: task.parentId,
              id: task._id,
            };
            this.UPDATE_COMPLETE_TASK(data);
          }
          if (task.completed) {
            this.SET_ADD_ALERT({
              type: "suc",
              text: `The task "${task.title}" completed`,
            });
          } else {
            this.SET_ADD_ALERT({
              type: "info",
              text: `The task "${task.title}" returned to work`,
            });
          }
        });
    },
  },
};
