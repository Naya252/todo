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
      <v-list class="py-0 pt-0" height="48">
        <v-list-item class="menuList">
          <v-list-item-icon
            @click.stop="TOGGLE_MINI(GET_MINI == true ? false : true)"
            style="cursor: pointer"
            link
            class="my-3"
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
            :disabled="item.disabled"
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

      <template v-slot:append>
        <v-divider
          v-if="!GET_MINI"
          class="mx-2 my-0"
          style="background: #e6e6e6"
        ></v-divider>

        <v-list class="py-0" height="56">
          <v-list-item-group>
            <v-list-item class="menuList" link>
              <v-list-item-icon>
                <v-icon color="MainColor" class="menuList__icon"
                  >mdi-cog</v-icon
                >
              </v-list-item-icon>

              <v-list-item-content class="text-left">
                <v-list-item-action-text class="menuList__title">
                  Settings
                </v-list-item-action-text>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
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
      <v-list class="py-0 pt-0" height="48">
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
            :disabled="item.disabled"
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
      <template v-slot:append>
        <v-divider
          v-if="!GET_MINI"
          class="mx-2 my-0"
          style="background: #e6e6e6"
        ></v-divider>

        <v-list class="py-0" height="56">
          <v-list-item-group>
            <v-list-item class="menuList" link>
              <v-list-item-icon>
                <v-icon color="MainColor" class="menuList__icon"
                  >mdi-cog</v-icon
                >
              </v-list-item-icon>

              <v-list-item-content class="text-left">
                <v-list-item-action-text class="menuList__title">
                  Settings
                </v-list-item-action-text>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
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
        title: "Home",
        icon: "mdi-home-outline",
        mt: 0,
        link: "#",
        disabled: true,
      },
      {
        title: "To-Do",
        icon: "mdi-clipboard-check-multiple-outline",
        mt: 0,
        link: "/",
        disabled: false,
      },
      {
        title: "Another",
        icon: "mdi-label-variant-outline",
        mt: 0,
        link: "#",
        disabled: true,
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

<style lang="scss" scoped>
.v-application--is-ltr .menuList .v-list-item__action:first-child,
.v-application--is-ltr .menuList .v-list-item__icon:first-child {
  margin-right: 16px !important;
}

.menuList__title {
  font-size: 0.88rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.06em !important;
  color: var(--v-textColor-base) !important;
}
.menuList__icon {
  color: var(--v-textColor-base) !important;
}

.menuList_active {
  background: var(--v-MainColor-base);

  &::before {
    opacity: 0 !important;
  }

  .menuList__icon {
    color: #fff !important;
  }

  .menuList__title {
    color: #fff !important;
  }
}

.v-navigation-drawer:not(.v-navigation-drawer--floating)
  .v-navigation-drawer__border {
  opacity: 0.5 !important;
}
</style>
