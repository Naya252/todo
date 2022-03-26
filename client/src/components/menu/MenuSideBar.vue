<template>
  <div style="display: inline-block">
    <!-- With mini menu -->
    <v-navigation-drawer
      v-if="GET_WINDOW_SIZE.x > 1023"
      app
      left
      disable-route-watcher
      disable-resize-watcher
      permanent
      :mini-variant.sync="minivariant"
      :value="GET_DRAWER"
      @input="TOGGLE_DRAWER"
      mobile-breakpoint="1024"
      :width="GET_WINDOW_SIZE.x > 767 ? 256 : 768"
    >
      <v-list class="py-0 pt-1" height="48">
        <v-list-item class="menuList">
          <v-list-item-icon
            @click.stop="TOGGLE_MINI(GET_MINI == true ? false : true)"
            style="cursor: pointer"
            link
          >
            <v-icon v-if="GET_MINI" class="menuList__icon">$menu</v-icon>
            <v-icon v-else class="menuList__icon">$arrowLeft</v-icon>
          </v-list-item-icon>

          <v-list-item-content
            @click.stop="TOGGLE_MINI(GET_MINI == true ? false : true)"
            class="text-left"
            style="cursor: pointer"
          >
            <v-list-item-action-text class="menuList__title"
              >Сollapse</v-list-item-action-text
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="ma-0"></v-divider>
      <v-list class="pt-0">
        <v-list-item-group>
          <v-list-item
            class="menuList"
            v-for="item in items"
            :key="item.title"
            link
            active-class="menuList_active"
            :class="`mt-${item.mt}`"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon class="menuList__icon">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content class="text-left">
              <v-list-item-action-text class="menuList__title">{{
                item.title
              }}</v-list-item-action-text>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!--  Without mini menu -->
    <v-navigation-drawer
      v-else
      app
      left
      disable-route-watcher
      disable-resize-watcher
      temporary
      :value="GET_DRAWER"
      @input="TOGGLE_DRAWER"
      mobile-breakpoint="1024"
      :width="GET_WINDOW_SIZE.x > 767 ? 256 : 768"
    >
      <v-list class="py-0 pt-1" height="48">
        <v-list-item class="menuList">
          <v-list-item-icon
            @click.stop="TOGGLE_DRAWER(false)"
            style="cursor: pointer"
            link
          >
            <v-icon class="menuList__icon">$arrowLeft</v-icon>
          </v-list-item-icon>

          <v-list-item-content
            @click.stop="TOGGLE_DRAWER(false)"
            class="text-left"
            style="cursor: pointer"
          >
            <v-list-item-action-text class="menuList__title"
              >Сollapse</v-list-item-action-text
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="ma-0"></v-divider>
      <v-list class="pt-0">
        <v-list-item-group>
          <v-list-item
            class="menuList"
            v-for="item in items"
            :key="item.title"
            link
            active-class="menuList_active"
            :class="`mt-${item.mt}`"
            :to="item.link"
            @click.stop="TOGGLE_DRAWER(false)"
          >
            <v-list-item-icon>
              <v-icon class="menuList__icon">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content class="text-left">
              <v-list-item-action-text class="menuList__title">{{
                item.title
              }}</v-list-item-action-text>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "MenuSideBar",
  data: () => ({
    drawerLeft: true,
    mini: true,
    items: [
      {
        title: "To-Do",
        icon: "mdi-clipboard-multiple-outline",
        mt: 0,
        link: "/",
      },
      {
        title: "Finished",
        icon: "mdi-clipboard-check-multiple-outline",
        mt: 0,
        link: "/about",
      },
    ],
  }),
  created() {
    this.LOADER_INCREMENT();
    this.SET_MINI();
    this.LOADER_DECREMENT();
  },
  computed: {
    ...mapGetters(["GET_MINI", "GET_DRAWER", "GET_WINDOW_SIZE"]),
    minivariant: {
      get() {
        return this.GET_MINI;
      },
      set(val) {
        return val;
      },
    },
  },
  methods: {
    ...mapMutations([
      "LOADER_INCREMENT",
      "LOADER_DECREMENT",
      "SET_MINI",
      "TOGGLE_MINI",
      "TOGGLE_DRAWER",
    ]),
  },
};
</script>
